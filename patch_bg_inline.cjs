const fs = require('fs');
const path = require('path');
const sectionsDir = path.join(__dirname, 'src/screens/landing/sections');

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    // Fix inline style backgroundImage that still has data URI with unencoded quotes
    // Replace: backgroundImage: `linear-gradient(...), url(${...})` where URL is data URI
    content = content.replace(
        /backgroundImage:\s*`linear-gradient\([^`]+\), url\(\$\{([^}]+)\}\)`,/g,
        (match, urlExpr) => {
            return `backgroundColor: '#1a1a1a', /* bg for: ${urlExpr} */`;
        }
    );

    // Replace remaining data: URI src in style objects
    content = content.replace(
        /backgroundImage:\s*["']url\(data:image\/svg\+xml[^'"]+\)["']/g,
        `backgroundColor: '#43413f' /* image placeholder */`
    );

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Fixed bg inline in:', path.relative(__dirname, filePath));
    }
}

function walkDir(dir) {
    for (const file of fs.readdirSync(dir)) {
        const full = path.join(dir, file);
        if (fs.statSync(full).isDirectory()) walkDir(full);
        else if (full.endsWith('.tsx')) processFile(full);
    }
}

walkDir(sectionsDir);
console.log('Done.');
