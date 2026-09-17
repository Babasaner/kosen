const fs = require('fs');
const path = require('path');
const sectionsDir = path.join(__dirname, 'src/screens/landing/sections');

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    // Replace <img ... src="data:image/svg+xml,..." ... /> with a <div> placeholder
    // We need to handle both self-closing and not
    // Pattern: <img followed by src that contains data:image/svg+xml
    content = content.replace(
        /<img\s([^>]*?)src="data:image\/svg\+xml[^"]*"([^>]*?)\/>/gs,
        (match, before, after) => {
            // Extract className from before or after
            const classMatch = (before + after).match(/className="([^"]+)"/);
            const cls = classMatch ? classMatch[1] : 'w-full h-full object-cover';
            const altMatch = (before + after).match(/alt="([^"]*)"/);
            const alt = altMatch ? altMatch[1] : 'Image placeholder';
            return `<div className="${cls} bg-[#43413f]" aria-label="${alt}" role="img" />`;
        }
    );

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Fixed img placeholders in:', path.relative(__dirname, filePath));
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
