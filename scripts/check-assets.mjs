// Guards against the exact problem the client reported: images that silently
// fail to load. Every assetUrl()/href path referenced in the source must exist
// on disk, otherwise the build fails loudly.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = join(root, "src");
const publicDir = join(root, "public");

const collect = (dir) =>
    readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const full = join(dir, entry.name);
        return entry.isDirectory() ? collect(full) : [full];
    });

const sourceFiles = collect(srcDir).filter((file) => /\.(tsx?|html)$/.test(file));

const patterns = [
    /assetUrl\(\s*["'`]([^"'`]+)["'`]/g,
    /\bsrc:\s*["'`]([^"'`]+)["'`]/g,
    /src=\{["'`]([^"'`]+)["'`]\}/g,
    /href=\{?["'`]([^"'`]+)["'`]/g,
];

// A template expression such as plan/${file} is resolved at runtime, so it
// cannot be checked as a literal path. Brochures are validated separately below.
const isLiteralPath = (ref) => !/\$\{|\{/.test(ref);

const references = new Map();
for (const file of sourceFiles) {
    const content = readFileSync(file, "utf8");
    for (const pattern of patterns) {
        for (const [, ref] of content.matchAll(pattern)) {
            if (!isLiteralPath(ref)) continue;
            if (/^(https?:|data:|mailto:|tel:|#|\/)/.test(ref)) continue;
            if (!/\.(png|jpe?g|gif|svg|webp|avif|pdf|mp4|woff2?|ttf|otf)$/i.test(ref)) continue;
            if (!references.has(ref)) references.set(ref, new Set());
            references.get(ref).add(file.replace(`${root}/`, ""));
        }
    }
}

// Brochure PDFs: the site file lists them as bare file names under public/plan.
const brochureFiles = new Set();
for (const file of sourceFiles) {
    const content = readFileSync(file, "utf8");
    for (const [, name] of content.matchAll(/\bfile:\s*["'`]([^"'`]+\.pdf)["'`]/g)) {
        brochureFiles.add(name);
        const ref = `plan/${name}`;
        if (!references.has(ref)) references.set(ref, new Set());
        references.get(ref).add(file.replace(`${root}/`, ""));
    }
}

// Site-level values live in TS strings, catch them too.
const siteFile = join(srcDir, "lib", "site.ts");
if (statSync(siteFile, { throwIfNoEntry: false })) {
    const content = readFileSync(siteFile, "utf8");
    for (const [, ref] of content.matchAll(/["'`]((?:img|plan|fonts)\/[^"'`]+)["'`]/g)) {
        if (!isLiteralPath(ref)) continue;
        if (!references.has(ref)) references.set(ref, new Set(["src/lib/site.ts"]));
    }
}

const missing = [];
for (const [ref, sources] of references) {
    const candidates = [join(publicDir, ref), join(root, ref), join(srcDir, ref)];
    if (!candidates.some((candidate) => statSync(candidate, { throwIfNoEntry: false }))) {
        missing.push([ref, [...sources]]);
    }
}

if (missing.length > 0) {
    console.error(`\n  Missing ${missing.length} referenced asset(s):\n`);
    for (const [ref, sources] of missing) {
        console.error(`    ${ref}`);
        console.error(`      referenced in: ${sources.join(", ")}\n`);
    }
    process.exit(1);
}

if (brochureFiles.size === 0) {
    console.error("\n  No brochure PDF found in the source (expected file: \"*.pdf\" entries).");
    process.exit(1);
}

console.log(
    `  asset check: ${references.size} referenced files all present ` +
        `(${brochureFiles.size} brochure PDF)`,
);
