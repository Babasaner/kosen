/**
 * Vercel serverless function for the lead endpoint.
 *
 * Vercel maps /api/leads to this file and invokes it with a Node.js request and
 * response. All the real logic lives in server/lead-api.mjs, shared verbatim
 * with the long running Node server, so both deployment targets behave
 * identically.
 */
import { handleLeadRequest } from "../server/lead-api.mjs";

const clientIp = (req) => {
    const forwarded = req.headers["x-forwarded-for"];

    if (typeof forwarded === "string" && forwarded.length > 0) {
        return forwarded.split(",")[0].trim();
    }

    return req.headers["x-real-ip"] || req.socket?.remoteAddress || "unknown";
};

export default async function handler(req, res) {
    // Vercel already parses application/json into req.body, but a raw string
    // (or a text/plain body) is handled by the shared API as well.
    const result = await handleLeadRequest({
        method: req.method,
        origin: req.headers.origin,
        clientIp: clientIp(req),
        body: req.body,
    });

    res.status(result.status);

    for (const [name, value] of Object.entries(result.headers)) {
        res.setHeader(name, value);
    }

    res.end(result.payload === undefined ? undefined : JSON.stringify(result.payload));
}
