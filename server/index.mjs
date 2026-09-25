/**
 * Long running Node server: serves the built site from dist/ and delegates the
 * lead endpoint to the portable API in ./lead-api.mjs.
 *
 * Used for local development and for hosting on a VPS. On Vercel the same API
 * runs through api/leads.js instead, and this file is not used.
 */
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize, sep } from "node:path";
import { fileURLToPath } from "node:url";
import {
    handleLeadRequest,
    loadEnvFiles,
    missingBrevoVariables,
    corsHeaders,
} from "./lead-api.mjs";

const port = Number(process.env.PORT || 8787);
const maxBodySize = 16 * 1024;

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
    ".webm": "video/webm",
    ".webp": "image/webp",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
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
        const isHashedAsset = /\/(assets|plan)\//.test(filePath);

        response.writeHead(200, {
            "Content-Type": contentTypes[extension] || "application/octet-stream",
            "Content-Length": content.length,
            "Cache-Control": isHashedAsset
                ? "public, max-age=31536000, immutable"
                : "public, max-age=3600",
            "X-Content-Type-Options": "nosniff",
        });

        response.end(request.method === "HEAD" ? undefined : content);
    } catch {
        response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        response.end("Not found");
    }
};

// -------------------------------------------------------------------- routing

const readJsonBody = async (request) => {
    let body = "";

    for await (const chunk of request) {
        body += chunk;
        if (Buffer.byteLength(body, "utf8") > maxBodySize) {
            throw new Error("PAYLOAD_TOO_LARGE");
        }
    }

    return body;
};

const sendResult = (response, result) => {
    response.writeHead(result.status, result.headers);
    response.end(result.payload === undefined ? undefined : JSON.stringify(result.payload));
};

const server = createServer(async (request, response) => {
    try {
        const isLeadsPath = (request.url ?? "").split("?")[0] === "/api/leads";

        if (isLeadsPath && request.method === "OPTIONS") {
            sendResult(
                response,
                await handleLeadRequest({
                    method: "OPTIONS",
                    origin: request.headers.origin,
                    clientIp: request.socket.remoteAddress,
                    body: undefined,
                }),
            );
            return;
        }

        if (isLeadsPath && request.method !== "POST") {
            sendResult(
                response,
                await handleLeadRequest({
                    method: request.method,
                    origin: request.headers.origin,
                    clientIp: request.socket.remoteAddress,
                    body: undefined,
                }),
            );
            return;
        }

        if (isLeadsPath) {
            const forwarded = request.headers["x-forwarded-for"];

            const clientIp =
                (typeof forwarded === "string" && forwarded.split(",")[0].trim()) ||
                request.socket.remoteAddress ||
                "unknown";

            let body;

            try {
                body = await readJsonBody(request);
            } catch (error) {
                if (error instanceof Error && error.message === "PAYLOAD_TOO_LARGE") {
                    sendResult(response, {
                        status: 413,
                        headers: {
                            "Content-Type": "application/json; charset=utf-8",
                            ...corsHeaders(request.headers.origin),
                        },
                        payload: { message: "La demande est trop volumineuse." },
                    });
                    return;
                }

                throw error;
            }

            sendResult(
                response,
                await handleLeadRequest({
                    method: request.method,
                    origin: request.headers.origin,
                    clientIp,
                    body,
                }),
            );
            return;
        }

        if (request.method === "GET" || request.method === "HEAD") {
            await serveStaticFile(request, response);
            return;
        }

        sendResult(response, {
            status: 405,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                ...corsHeaders(request.headers.origin),
            },
            payload: { message: "Méthode non autorisée." },
        });
    } catch (error) {
        console.error("Unhandled request error", error);
        response.writeHead(500, { "Content-Type": "application/json; charset=utf-8" });
        response.end(JSON.stringify({ message: "Erreur interne du serveur." }));
    }
});

await loadEnvFiles();

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

    const missingVariables = missingBrevoVariables();

    if (missingVariables.length > 0) {
        console.warn("");
        console.warn("WARNING: the lead form cannot send emails yet.");
        console.warn(`Missing environment variable(s): ${missingVariables.join(", ")}`);
        console.warn("Copy .env.example to .env and fill in the values, then restart the server.");
        console.warn("");
    }
});
