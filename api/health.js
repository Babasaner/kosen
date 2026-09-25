/**
 * Vercel serverless function exposing the deployment self-check.
 *
 * GET /api/health              reports which mail variables are present and
 *                              well formed, without revealing any of them.
 * GET /api/health?probe=1      additionally asks the mail provider to accept a
 *                              real call, so its verdict is visible. Requires
 *                              LEAD_DIAGNOSTICS=true, which keeps this off in
 *                              production.
 */
import { handleHealthCheck } from "../server/health.mjs";

export default async function handler(req, res) {
    if (req.method !== "GET" && req.method !== "HEAD") {
        res.setHeader("allow", "GET, HEAD");
        res.status(405).end();
        return;
    }

    const wantsProbe = new URL(req.url, "http://localhost").searchParams.has("probe");
    const result = await handleHealthCheck({ wantsProbe });

    res.setHeader("cache-control", "no-store");
    res.status(result.status).end(JSON.stringify(result.payload));
}
