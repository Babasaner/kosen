const fs = require('fs');
const path = require('path');
const sectionsDir = path.join(__dirname, 'src/screens/landing/sections');

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    // Fix: <img className="h-px w-full" alt="Line" src="data:image/svg+xml,..." />
    // -> <hr className="h-px w-full border-none bg-[#ac937e]" />
    content = content.replace(
        /<img\s+className="h-px w-full"\s+alt="Line"\s+src="data:[^"]+"\s*\/>/g,
        '<hr className="h-px w-full border-none bg-[#ac937e]" aria-hidden="true" />'
    );

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Fixed line imgs in:', path.relative(__dirname, filePath));
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
