// Starts the Vite dev server AND the API server together.
//
// Running `vite` alone leaves /api/leads dead: the proxy has nothing to forward
// to and the browser sees a 500, which the form reports as a failed send.
// Keeping both processes here removes the single most common cause of
// "L'envoi a échoué" during local testing.
import { spawn } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const children = [];
let shuttingDown = false;

const stopAll = (code = 0) => {
    if (shuttingDown) return;
    shuttingDown = true;
    for (const child of children) {
        if (child.exitCode === null) child.kill("SIGTERM");
    }
    setTimeout(() => process.exit(code), 200);
};

const run = (label, command, args) => {
    const child = spawn(command, args, {
        cwd: root,
        stdio: ["ignore", "pipe", "pipe"],
        env: process.env,
    });

    const prefix = `\x1b[2m[${label}]\x1b[0m `;
    const forward = (stream, target) => {
        let buffer = "";
        stream.on("data", (chunk) => {
            buffer += chunk.toString();
            const lines = buffer.split("\n");
            buffer = lines.pop() ?? "";
            for (const line of lines) {
                if (line.trim()) target.write(`${prefix}${line}\n`);
            }
        });
    };

    forward(child.stdout, process.stdout);
    forward(child.stderr, process.stderr);

    child.on("exit", (code, signal) => {
        if (shuttingDown) return;
        console.error(`${prefix}arrêté (code ${code ?? signal})`);
        stopAll(code ?? 1);
    });

    children.push(child);
    return child;
};

console.log("\x1b[1mKŌSEN — serveur web et API démarrés ensemble\x1b[0m");

run("api", process.execPath, ["server/index.mjs"]);
run("web", process.execPath, [
    resolve(root, "node_modules", "vite", "bin", "vite.js"),
    ...process.argv.slice(2),
]);

for (const signal of ["SIGINT", "SIGTERM"]) {
    process.on(signal, () => stopAll(0));
}

process.on("uncaughtException", (error) => {
    console.error(error);
    stopAll(1);
});
