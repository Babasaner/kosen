import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize, sep } from "node:path";
import { fileURLToPath } from "node:url";

const port = Number(process.env.PORT || 8787);
const maxBodySize = 16 * 1024;
const rateLimitWindowMs = 60 * 1000;
const rateLimitMaxRequests = 5;
const requestLog = new Map();
const projectLabels = new Set(["KŌMOREBI One", "KŌSEN One", "KŌSEN Two"]);
const contactChannels = new Set(["email", "telephone", "whatsapp"]);

const staticRoot = join(fileURLToPath(new URL("..", import.meta.url)), "dist");

const contentTypes = {
    ".avif": "image/avif",
    ".css": "text/css; charset=utf-8",
    ".gif": "image/gif",
    ".html": "text/html; charset=utf-8",
    ".ico": "image/x-icon",
    ".jpeg": "image/jpeg",
    ".jpg": "image/jpeg",
    ".js": "text/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".map": "application/json; charset=utf-8",
    ".mp4": "video/mp4",
    ".otf": "font/otf",
    ".pdf": "application/pdf",
    ".png": "image/png",
    ".svg": "image/svg+xml",
    ".ttf": "font/ttf",
    ".webp": "image/webp",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
};

// ---------------------------------------------------------------- env loading

const parseEnvFile = (contents) => {
    const values = {};

    for (const rawLine of contents.split(/\r?\n/)) {
        const line = rawLine.trim();

        if (!line || line.startsWith("#")) {
            continue;
        }

        const separator = line.indexOf("=");

        if (separator < 1) {
            continue;
        }

        const key = line.slice(0, separator).trim();
        let value = line.slice(separator + 1).trim();

        if (
            (value.startsWith('"') && value.endsWith('"') && value.length > 1) ||
            (value.startsWith("'") && value.endsWith("'") && value.length > 1)
        ) {
            value = value.slice(1, -1);
        }

        values[key] = value;
    }

    return values;
};

const loadEnvFiles = async () => {
    // Real environment variables always win over .env files.
    for (const name of [".env.local", ".env"]) {
        try {
            const contents = await readFile(join(process.cwd(), name), "utf8");
            const values = parseEnvFile(contents);

            for (const [key, value] of Object.entries(values)) {
                if (process.env[key] === undefined) {
                    process.env[key] = value;
                }
            }

            console.log(`Loaded environment from ${name}`);
        } catch {
            // Missing file is fine, the variable may come from the host instead.
        }
    }
};

// ------------------------------------------------------------------- security

const normalizeOrigin = (origin) => origin.trim().replace(/\/+$/, "").toLowerCase();

// Resolved lazily: .env files are loaded after this module starts evaluating.
let allowedOriginsCache = null;

const getAllowedOrigins = () => {
    if (allowedOriginsCache === null) {
        allowedOriginsCache = new Set(
            (process.env.ALLOWED_ORIGINS || process.env.ALLOWED_ORIGIN || "")
                .split(",")
                .map(normalizeOrigin)
                .filter(Boolean),
        );
    }

    return allowedOriginsCache;
};

// Local development must not depend on an exact port match: the Vite dev server
// changes ports, and the site is often previewed on a phone over the LAN.
const isLoopbackOrigin = (origin) => {
    try {
        const { hostname } = new URL(origin);
        return (
            hostname === "localhost" ||
            hostname === "127.0.0.1" ||
            hostname === "[::1]" ||
            hostname === "::1"
        );
    } catch {
        return false;
    }
};

// 10.x, 172.16-31.x, 192.168.x and .local hostnames. Only used when
// ALLOW_PRIVATE_ORIGINS=true, and never in production.
const isPrivateOrigin = (origin) => {
    try {
        const { hostname } = new URL(origin);
        if (hostname.endsWith(".local")) return true;
        const octets = hostname.split(".").map(Number);
        if (octets.length !== 4 || octets.some((octet) => !Number.isInteger(octet))) {
            return false;
        }
        const [a, b] = octets;
        return a === 10 || a === 127 || (a === 192 && b === 168) || (a === 172 && b >= 16 && b <= 31);
    } catch {
        return false;
    }
};

const resolveAllowedOrigin = (request) => {
    const origin = request.headers.origin;

    if (!origin) {
        return null;
    }

    const allowedOrigins = getAllowedOrigins();

    if (allowedOrigins.has("*") || allowedOrigins.has(normalizeOrigin(origin))) {
        return origin;
    }

    if (allowedOrigins.has("local-dev") && isLoopbackOrigin(origin)) {
        return origin;
    }

    if (allowedOrigins.has("local-dev") && isPrivateOrigin(origin)) {
        return origin;
    }

    return null;
};

const corsHeaders = (request) => {
    const allowedOrigin = resolveAllowedOrigin(request);

    return allowedOrigin
        ? {
            "Access-Control-Allow-Origin": allowedOrigin,
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            Vary: "Origin",
        }
        : { Vary: "Origin" };
};

const sendJson = (response, statusCode, payload, request) => {
    response.writeHead(statusCode, {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
        ...corsHeaders(request),
    });
    response.end(JSON.stringify(payload));
};

const readJsonBody = async (request) => {
    let body = "";

    for await (const chunk of request) {
        body += chunk;
        if (Buffer.byteLength(body, "utf8") > maxBodySize) {
            throw new Error("PAYLOAD_TOO_LARGE");
        }
    }

    return body.trim() ? JSON.parse(body) : {};
};

const clean = (value, maxLength = 200) =>
    typeof value === "string" ? value.trim().slice(0, maxLength) : "";

const validateLead = (input) => {
    const lead = {
        firstName: clean(input.firstName, 80),
        lastName: clean(input.lastName, 80),
        email: clean(input.email, 160),
        phone: clean(input.phone, 50),
        country: clean(input.country, 100),
        property: clean(input.property, 80),
        wantsCallback: input.wantsCallback === true,
        contactChannel: clean(input.contactChannel, 30),
        consent: input.consent === true,
    };

    if (!lead.firstName || !lead.lastName || !lead.phone || !lead.country) {
        return { error: "Veuillez compléter les champs obligatoires." };
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.email)) {
        return { error: "Veuillez renseigner une adresse e-mail valide." };
    }

    if (!projectLabels.has(lead.property)) {
        return { error: "Le bien sélectionné n'est pas valide." };
    }

    if (!lead.consent) {
        return { error: "Le consentement est obligatoire." };
    }

    // Requesting a callback without naming a channel would store a preference the
    // lead never expressed, so both must be present together.
    if (lead.wantsCallback && !contactChannels.has(lead.contactChannel)) {
        return { error: "Veuillez indiquer le canal de contact souhaité." };
    }

    if (!lead.wantsCallback) {
        lead.contactChannel = "";
    }

    return { lead };
};

const sendLeadToBrevo = async (lead) => {
    const apiKey = process.env.BREVO_API_KEY;
    const recipientEmail = process.env.BREVO_RECIPIENT_EMAIL;
    const senderEmail = process.env.BREVO_SENDER_EMAIL;
    const senderName = process.env.BREVO_SENDER_NAME || "KŌSEN";

    if (!apiKey || !recipientEmail || !senderEmail) {
        throw new Error("BREVO_NOT_CONFIGURED");
    }

    const subject = `Demande landing KŌSEN : ${lead.property}, ${lead.country}`;
    const textContent = [
        `Prénom : ${lead.firstName}`,
        `Nom : ${lead.lastName}`,
        `E-mail : ${lead.email}`,
        `Téléphone / WhatsApp : ${lead.phone}`,
        `Pays de résidence : ${lead.country}`,
        `Bien recherché : ${lead.property}`,
        `Souhaite être rappelé par un conseiller : ${lead.wantsCallback ? "Oui" : "Non"}`,
        `Canal préféré : ${lead.wantsCallback ? lead.contactChannel || "non renseigné" : "non applicable"}`,
        "Consentement : Oui",
    ].join("\n");

    const brevoResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
            accept: "application/json",
            "api-key": apiKey,
            "content-type": "application/json",
        },
        body: JSON.stringify({
            sender: { email: senderEmail, name: senderName },
            to: [{ email: recipientEmail, name: "Ali" }],
            replyTo: { email: lead.email, name: `${lead.firstName} ${lead.lastName}` },
            subject,
            textContent,
        }),
        signal: AbortSignal.timeout(10_000),
    });

    if (!brevoResponse.ok) {
        const detail = await brevoResponse.text();
        console.error("Brevo rejected lead", brevoResponse.status, detail);
        throw new Error("BREVO_SEND_FAILED");
    }

    const result = (await brevoResponse.json()).messageId;
    console.log(`Lead delivered to ${recipientEmail} for ${lead.property} (${lead.country}) — ${result}`);
};

const getClientAddress = (request) => {
    const forwarded = request.headers["x-forwarded-for"];

    if (typeof forwarded === "string" && forwarded.length > 0) {
        return forwarded.split(",")[0].trim();
    }

    return request.socket.remoteAddress || "unknown";
};

const isRateLimited = (request) => {
    const address = getClientAddress(request);
    const now = Date.now();

    for (const [key, timestamps] of requestLog) {
        const recent = timestamps.filter((timestamp) => now - timestamp < rateLimitWindowMs);

        if (recent.length === 0) {
            requestLog.delete(key);
        } else {
            requestLog.set(key, recent);
        }
    }

    const recentRequests = (requestLog.get(address) || []).filter(
        (timestamp) => now - timestamp < rateLimitWindowMs,
    );

    recentRequests.push(now);
    requestLog.set(address, recentRequests);

    return recentRequests.length > rateLimitMaxRequests;
};

// ------------------------------------------------------------- static serving

const resolveStaticPath = (url) => {
    const [pathname] = url.split("?");
    const decoded = decodeURIComponent(pathname);

    if (decoded.includes("\0")) {
        return null;
    }

    const requestedPath = decoded === "/" ? "/index.html" : decoded;
    const filePath = normalize(join(staticRoot, requestedPath));

    if (filePath !== staticRoot && !filePath.startsWith(staticRoot + sep)) {
        return null;
    }

    return filePath;
};

const serveStaticFile = async (request, response) => {
    const filePath = resolveStaticPath(request.url ?? "/");

    if (!filePath) {
        response.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
        response.end("Forbidden");
        return;
    }

    try {
        const content = await readFile(filePath);
        const extension = extname(filePath).toLowerCase();
        const isHashedAsset = filePath.includes(`${sep}assets${sep}`);

        response.writeHead(200, {
            "Content-Type": contentTypes[extension] || "application/octet-stream",
            "Cache-Control": isHashedAsset
                ? "public, max-age=31536000, immutable"
                : extension === ".html"
                  ? "no-cache"
                  : "public, max-age=86400",
        });
        response.end(content);
    } catch {
        response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        response.end("Not found");
    }
};

// -------------------------------------------------------------------- routing

const handlePreflight = (request, response) => {
    response.writeHead(204, corsHeaders(request));
    response.end();
};

const handleLead = async (request, response) => {
    if (isRateLimited(request)) {
        sendJson(response, 429, { message: "Trop de tentatives. Réessayez dans une minute." }, request);
        return;
    }

    try {
        const input = await readJsonBody(request);

        if (clean(input.website)) {
            // Honeypot field filled in by a bot: pretend it worked, send nothing.
            sendJson(response, 200, { ok: true }, request);
            return;
        }

        const validation = validateLead(input);

        if (validation.error) {
            sendJson(response, 400, { message: validation.error }, request);
            return;
        }

        await sendLeadToBrevo(validation.lead);
        sendJson(response, 200, { ok: true }, request);
    } catch (error) {
        if (error instanceof Error && error.message === "PAYLOAD_TOO_LARGE") {
            sendJson(response, 413, { message: "La demande est trop volumineuse." }, request);
            return;
        }

        if (error instanceof SyntaxError) {
            sendJson(response, 400, { message: "La demande est invalide." }, request);
            return;
        }

        console.error("Lead submission failed", error);
        sendJson(
            response,
            error instanceof Error && error.message === "BREVO_NOT_CONFIGURED" ? 503 : 500,
            {
                message:
                    error instanceof Error && error.message === "BREVO_NOT_CONFIGURED"
                        ? "Le service de réception des demandes n'est pas configuré."
                        : "L'envoi a échoué. Veuillez réessayer.",
            },
            request,
        );
    }
};

const server = createServer(async (request, response) => {
    try {
        if (request.method === "OPTIONS") {
            handlePreflight(request, response);
            return;
        }

        if (request.method === "POST" && (request.url ?? "").split("?")[0] === "/api/leads") {
            await handleLead(request, response);
            return;
        }

        if (request.method === "GET" || request.method === "HEAD") {
            await serveStaticFile(request, response);
            return;
        }

        sendJson(response, 405, { message: "Méthode non autorisée." }, request);
    } catch (error) {
        console.error("Unhandled request error", error);
        sendJson(response, 500, { message: "Erreur interne du serveur." }, request);
    }
});

await loadEnvFiles();

const missingVariables = ["BREVO_API_KEY", "BREVO_RECIPIENT_EMAIL", "BREVO_SENDER_EMAIL"].filter(
    (name) => !process.env[name],
);

server.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
        console.error("");
        console.error(`Le port ${port} est déjà utilisé, le serveur n'a pas démarré.`);
        console.error(
            "Fermez l'autre processus (ou changez PORT dans .env) puis relancez. Si le port est celui de l'API,",
        );
        console.error("le formulaire ne pourra pas envoyer de demande.");
        console.error("");
        process.exit(1);
    }

    console.error("Server error", error);
    process.exit(1);
});

server.listen(port, () => {
    console.log(`KŌSEN server listening on http://localhost:${port}`);
    console.log(`Serving static files from ${staticRoot}`);

    if (missingVariables.length > 0) {
        console.warn("");
        console.warn("WARNING: the lead form cannot send emails yet.");
        console.warn(`Missing environment variable(s): ${missingVariables.join(", ")}`);
        console.warn("Copy .env.example to .env and fill in the values, then restart the server.");
        console.warn("");
    }
});
