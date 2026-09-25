/**
 * Lead API, portable across runtimes.
 *
 * Everything in this file is plain JavaScript with no dependency on node:http,
 * the filesystem or any framework, so the exact same validation, rate limiting
 * and Brevo call can be used by:
 *   - server/index.mjs  : a long running Node server (VPS, localhost, reverse proxy)
 *   - api/leads.js      : a Vercel serverless function
 *
 * The only entry point is handleLeadRequest(), which takes plain values and
 * returns a plain { status, headers, payload } object.
 */
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const projectLabels = new Set(["KŌMOREBI One", "KŌSEN One", "KŌSEN Two"]);
const contactChannels = new Set(["email", "telephone", "whatsapp"]);

const rateLimitWindowMs = 60 * 1000;
const rateLimitMaxRequests = 5;
const requestLog = new Map();

const brevoEndpoint = "https://api.brevo.com/v3/smtp/email";

// --------------------------------------------------------------- env loading

const parseEnvFile = (contents) => {
    const values = {};

    for (const rawLine of contents.split(/\r?\n/)) {
        const line = rawLine.trim();

        if (!line || line.startsWith("#")) continue;

        const separator = line.indexOf("=");

        if (separator === -1) continue;

        const key = line.slice(0, separator).trim().replace(/^export\s+/, "");
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

/**
 * Local development convenience only. Real environment variables always win,
 * and on platforms like Vercel there is no .env file so this is a no-op.
 */
export const loadEnvFiles = async () => {
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

// ------------------------------------------------------------------ security

const normalizeOrigin = (origin) => origin.trim().replace(/\/+$/, "").toLowerCase();

const readAllowedOrigins = () => {
    // Read on each call: on serverless platforms the environment is only
    // guaranteed to be final after the module has been evaluated.
    return new Set(
        (process.env.ALLOWED_ORIGINS || process.env.ALLOWED_ORIGIN || "")
            .split(",")
            .map(normalizeOrigin)
            .filter(Boolean),
    );
};

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

// 10.x, 172.16-31.x, 192.168.x and .local hostnames, for previewing on a phone
// over the LAN. Only honoured when "local-dev" is listed explicitly.
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

export const resolveAllowedOrigin = (originHeader) => {
    if (!originHeader) return null;

    const allowedOrigins = readAllowedOrigins();

    if (allowedOrigins.has("*") || allowedOrigins.has(normalizeOrigin(originHeader))) {
        return originHeader;
    }

    if (allowedOrigins.has("local-dev") && isLoopbackOrigin(originHeader)) {
        return originHeader;
    }

    if (allowedOrigins.has("local-dev") && isPrivateOrigin(originHeader)) {
        return originHeader;
    }

    return null;
};

export const corsHeaders = (originHeader) => {
    const allowedOrigin = resolveAllowedOrigin(originHeader);

    return allowedOrigin
        ? {
              "Access-Control-Allow-Origin": allowedOrigin,
              "Access-Control-Allow-Headers": "Content-Type",
              "Access-Control-Allow-Methods": "POST, OPTIONS",
              Vary: "Origin",
          }
        : { Vary: "Origin" };
};

/**
 * Abuse guard. In-memory, so on serverless it is per instance and resets on a
 * cold start: it slows down casual spam, it is not a security boundary.
 */
const isRateLimited = (clientIp) => {
    const address = clientIp || "unknown";
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

// --------------------------------------------------------------- validation

const clean = (value, maxLength = 200) =>
    typeof value === "string" ? value.trim().slice(0, maxLength) : "";

export const validateLead = (input) => {
    const source = input && typeof input === "object" ? input : {};

    const lead = {
        firstName: clean(source.firstName, 80),
        lastName: clean(source.lastName, 80),
        email: clean(source.email, 160),
        phone: clean(source.phone, 50),
        country: clean(source.country, 100),
        property: clean(source.property, 80),
        wantsCallback: source.wantsCallback === true,
        contactChannel: clean(source.contactChannel, 30),
        consent: source.consent === true,
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

    // Requesting a callback without naming a channel would store a preference
    // the lead never expressed, so both must be present together.
    if (lead.wantsCallback && !contactChannels.has(lead.contactChannel)) {
        return { error: "Veuillez indiquer le canal de contact souhaité." };
    }

    if (!lead.wantsCallback) {
        lead.contactChannel = "";
    }

    return { lead };
};

// --------------------------------------------------------------------- brevo

/**
 * Environment values are always trimmed. A value pasted into a hosting
 * dashboard often carries a trailing space or newline, which passes a simple
 * "is it set" check but is then rejected by the API as an invalid key or an
 * unknown sender.
 */
const readEnv = (name) => {
    const value = process.env[name];
    return typeof value === "string" ? value.trim() : "";
};

export const sendLeadToBrevo = async (lead) => {
    const apiKey = readEnv("BREVO_API_KEY");
    const recipientEmail = readEnv("BREVO_RECIPIENT_EMAIL");
    const senderEmail = readEnv("BREVO_SENDER_EMAIL");
    const senderName = readEnv("BREVO_SENDER_NAME") || "KŌSEN";

    if (!apiKey || !recipientEmail || !senderEmail) {
        const missing = [
            ["BREVO_API_KEY", apiKey],
            ["BREVO_RECIPIENT_EMAIL", recipientEmail],
            ["BREVO_SENDER_EMAIL", senderEmail],
        ]
            .filter(([, value]) => !value)
            .map(([name]) => name);

        const error = new Error("BREVO_NOT_CONFIGURED");
        error.missing = missing;
        throw error;
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

    const brevoResponse = await fetch(brevoEndpoint, {
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
        const error = new Error("BREVO_SEND_FAILED");
        error.upstreamStatus = brevoResponse.status;
        error.upstreamDetail = detail.slice(0, 500);
        throw error;
    }

    const result = (await brevoResponse.json()).messageId;
    console.log(`Lead delivered to ${recipientEmail} for ${lead.property} (${lead.country}) — ${result}`);

    return result;
};

// ------------------------------------------------------------------- routing

const jsonResponse = (statusCode, payload, originHeader) => ({
    status: statusCode,
    headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
        ...corsHeaders(originHeader),
    },
    payload,
});

/**
 * Handles a request against /api/leads.
 *
 * @param {object} input
 * @param {string} input.method      HTTP method.
 * @param {string} [input.origin]   Raw Origin header, for CORS.
 * @param {string} [input.clientIp] Client address, for rate limiting.
 * @param {unknown} input.body      Parsed object or raw JSON string.
 * @returns {Promise<{status:number, headers:object, payload:object|undefined}>}
 */
export const handleLeadRequest = async ({ method, origin, clientIp, body }) => {
    if (method === "OPTIONS") {
        return { status: 204, headers: corsHeaders(origin), payload: undefined };
    }

    if (method !== "POST") {
        return jsonResponse(405, { message: "Méthode non autorisée." }, origin);
    }

    if (isRateLimited(clientIp)) {
        return jsonResponse(
            429,
            { message: "Trop de tentatives. Réessayez dans une minute." },
            origin,
        );
    }

    let input;

    try {
        if (typeof body === "string") {
            input = body.trim() ? JSON.parse(body) : {};
        } else {
            input = body ?? {};
        }
    } catch {
        return jsonResponse(400, { message: "La demande est invalide." }, origin);
    }

    if (clean(input.website)) {
        // Honeypot field filled in by a bot: pretend it worked, send nothing.
        return jsonResponse(200, { ok: true }, origin);
    }

    const validation = validateLead(input);

    if (validation.error) {
        return jsonResponse(400, { message: validation.error }, origin);
    }

    try {
        await sendLeadToBrevo(validation.lead);
        return jsonResponse(200, { ok: true }, origin);
    } catch (error) {
        const notConfigured = error instanceof Error && error.message === "BREVO_NOT_CONFIGURED";
        const upstreamStatus = error?.upstreamStatus;
        const upstreamDetail = error?.upstreamDetail;

        if (notConfigured) {
            console.error(
                `Lead submission failed: missing environment variable(s) ${(error.missing || []).join(", ")}. ` +
                    "Set them in the hosting dashboard (watch out for trailing spaces) and redeploy.",
            );
        } else {
            console.error(
                `Lead submission failed: Brevo returned ${upstreamStatus ?? "no response"}`,
                upstreamDetail ?? error,
            );
        }

        const payload = {
            message: notConfigured
                ? "Le service de réception des demandes n'est pas configuré."
                : "L'envoi a échoué. Veuillez réessayer.",
        };

        // Opt-in diagnostics, for debugging a deployment without exposing the
        // provider's response to the public. Never on unless explicitly set.
        if (readEnv("LEAD_DIAGNOSTICS") === "true") {
            payload.diagnostics = {
                notConfigured,
                missing: error?.missing,
                upstreamStatus,
                upstreamDetail,
            };
        }

        return jsonResponse(notConfigured ? 503 : 500, payload, origin);
    }
};

export const missingBrevoVariables = () =>
    ["BREVO_API_KEY", "BREVO_RECIPIENT_EMAIL", "BREVO_SENDER_EMAIL"].filter(
        (name) => !readEnv(name),
    );
