const fs = require('fs');
const path = require('path');
const sectionsDir = path.join(__dirname, 'src/screens/landing/sections');

// Replace the broken data URIs in JS string values (not JSX attrs) with empty string or null
function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    // Replace data URI in JS string (for data arrays like partnerImages, investmentSteps, etc.)
    // Pattern: "data:image/svg+xml,...<stuff with unescaped quotes>"
    // Since the data URI itself contains unescaped double quotes, we can't reliably regex it
    // Instead, let's find lines with the data URI prefix and replace the whole src/imageUrl/lineSrc value
    
    const lines = content.split('\n');
    const fixed = lines.map(line => {
        if (line.includes('data:image/svg+xml')) {
            // Replace any data URI (the entire string value) with an empty string placeholder
            // src: "data:..." -> src: ""
            // imageUrl: "data:..." -> imageUrl: ""
            // lineSrc: "data:..." -> lineSrc: ""
            return line.replace(
                /(src|imageUrl|lineSrc):\s*"data:image\/svg\+xml[^,]*,/,
                (match, key) => `${key}: "`  // will be fixed to empty string next
            ).replace(
                /xmlns="http:\/\/www\.w3\.org\/2000\/svg"/g, ''
            ).replace(
                /viewBox="[^"]+"/g, ''
            ).replace(
                /preserveAspectRatio="[^"]+"/g, ''
            ).replace(
                /%3E%3Crect fill="[^"]+"/g, ''
            ).replace(
                / width="[^"]+"/g, ''
            ).replace(
                / height="[^"]+"/g, ''
            ).replace(
                /\/%3E%3C\/svg%3E",/g, '",'
            ).replace(
                /%3Csvg\s*/g, ''
            ).replace(
                /\/%3E%3C\/svg%3E"/g, '"'
            );
        }
        return line;
    });
    content = fixed.join('\n');

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Fixed data URIs in:', path.relative(__dirname, filePath));
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
console.log('Done. Checking remaining data URIs...');

// Do final check
let found = false;
function checkDir(dir) {
    for (const file of fs.readdirSync(dir)) {
        const full = path.join(dir, file);
        if (fs.statSync(full).isDirectory()) checkDir(full);
        else if (full.endsWith('.tsx')) {
            const c = fs.readFileSync(full, 'utf8');
            if (c.includes('data:image')) {
                console.log('STILL HAS data URI:', path.relative(__dirname, full));
                found = true;
            }
        }
    }
}
checkDir(sectionsDir);
if (!found) console.log('All data URIs cleared!');
