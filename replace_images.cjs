const fs = require('fs');
const path = require('path');

const sectionsDir = path.join(__dirname, 'src/screens/landing/sections');

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // Replace background-image styles
    if (content.includes('style={{')) {
        const newContent = content.replace(/backgroundImage:\s*["']url\(https:\/\/c\.animaapp\.com\/[^)]+\)["']/g, "backgroundColor: '#43413f' /* Placeholder background */");
        if (newContent !== content) {
            content = newContent;
            changed = true;
        }
    }

    // Replace inline tailwind bg-[url(...)]
    if (content.includes('bg-[url(')) {
        const newContent = content.replace(/,url\(https:\/\/c\.animaapp\.com\/[^)]+\)/g, '')
                                  .replace(/bg-\[url\(https:\/\/c\.animaapp\.com\/[^)]+\)\]/g, 'bg-muted');
        if (newContent !== content) {
            content = newContent;
            changed = true;
        }
    }

    // Replace <img ... src="https://c.animaapp.com/..." />
    // This is a bit tricky with regex, let's just replace the src with a local fallback if it's an icon,
    // or import PlaceholderImage if it's a structural image.
    // Actually, looking at the paths, things like "polygon-1.svg", "line-2.svg" are icons.
    // "image-17.png", "kosen-one.png" are large images.
    // If we just change the src to a transparent PNG or leave it, it might still 404 if it doesn't exist.
    // For now, let's replace all c.animaapp.com image links with a generic local path or a data URI so it doesn't 404,
    // and let the user replace them.
    // The user specifically asked: "Utiliser des placeholders visuels... Eviter les erreurs 404... Ne modifie pas le design"
    // I can generate a 1x1 transparent PNG data URI for icons, and a gray data URI for big images.
    // Better yet, I can just replace the img tag with <PlaceholderImage />. 
    // To do that programmatically without breaking JSX is risky.
    
    fs.writeFileSync(filePath, content, 'utf8');
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith('.tsx')) {
            processFile(fullPath);
        }
    }
}

walkDir(sectionsDir);
console.log('Done processing backgrounds.');
