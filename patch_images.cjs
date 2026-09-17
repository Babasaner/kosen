const fs = require('fs');
const path = require('path');

// Inline SVG placeholder data URI (1x1 semi-transparent gray)
const PLACEHOLDER_IMG = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3Crect fill="%2343413f" width="1" height="1"/%3E%3C/svg%3E';

// Line placeholder (1px wide transparent line)
const PLACEHOLDER_LINE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1" preserveAspectRatio="none"%3E%3Crect fill="%23ac937e" width="1" height="1"/%3E%3C/svg%3E';

const sectionsDir = path.join(__dirname, 'src/screens/landing/sections');

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    // Replace animaapp.com/img/line-*.svg with line placeholder
    content = content.replace(/https:\/\/c\.animaapp\.com\/EEMUw1qlB3TbilKITU7KZQ\/img\/line-[^"']+/g, PLACEHOLDER_LINE);

    // Replace all other animaapp.com image URLs with placeholder
    content = content.replace(/https:\/\/c\.animaapp\.com\/EEMUw1qlB3TbilKITU7KZQ\/img\/[^"') ]+/g, PLACEHOLDER_IMG);

    // Also remove url(...) Tailwind bg classes that still have animaapp in them
    content = content.replace(/,url\(https:\/\/c\.animaapp\.com\/[^)]+\)_[^\]]+\]/g, ']');

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Patched:', path.relative(__dirname, filePath));
    }
}

function walkDir(dir) {
    for (const file of fs.readdirSync(dir)) {
        const full = path.join(dir, file);
        if (fs.statSync(full).isDirectory()) walkDir(full);
        else if (full.endsWith('.tsx') || full.endsWith('.ts')) processFile(full);
    }
}

walkDir(sectionsDir);
console.log('Done.');
