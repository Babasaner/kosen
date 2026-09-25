// Simulates how Vercel invokes api/leads.js: a req/res pair, with the body
// already parsed, proxied over HTTP so the real handler is exercised end to end.
import { createServer } from "node:http";
import handler from "../api/leads.js";
import { loadEnvFiles } from "../server/lead-api.mjs";

await loadEnvFiles();

const server = createServer((req, res) => {
    let raw = "";
    req.on("data", (chunk) => {
        raw += chunk;
    });
    req.on("end", () => {
        let body;
        const type = req.headers["content-type"] || "";
        if (type.includes("application/json")) {
            try {
                body = JSON.parse(raw || "{}");
            } catch {
                body = raw;
            }
        } else {
            body = raw;
        }

        handler(
            {
                method: req.method,
                headers: req.headers,
                socket: req.socket,
                body,
            },
            {
                status(code) {
                    res.statusCode = code;
                    return this;
                },
                setHeader(name, value) {
                    res.setHeader(name, value);
                    return this;
                },
                end(payload) {
                    res.end(payload);
                },
            },
        );
    });
});

server.listen(8799, () => console.log("Vercel adapter listening on 8799"));
