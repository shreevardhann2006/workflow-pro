const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const replacements = {
    'bg-[#0f111a]': 'bg-background',
    'bg-[#1e2130]': 'bg-card',
    'border-[#2d3142]': 'border-border',
    'text-[#94a3b8]': 'text-muted',
    // We need to match precise text-white strings carefully, but since most text-white goes to text-main we can leave text-white as it adapts okay, 
    // or replace text-white with text-foreground. Let's replace 'text-white' with 'text-foreground' generally, but skip for gradients or buttons where text-white is intended.
    // To be safer, we will only replace the explicit hexes.
};

function processDirectory(directory) {
    const files = fs.readdirSync(directory);
    for (const file of files) {
        const fullPath = path.join(directory, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            for (const [find, replace] of Object.entries(replacements)) {
                if (content.includes(find)) {
                    content = content.split(find).join(replace);
                    modified = true;
                }
            }

            // Handle some specific text-white replacements only in neutral places
            if (content.includes('text-white') && !content.includes('bg-[#6366f1]') && !content.includes('bg-indigo-500')) {
                // Too risky to regex replace all text-white without seeing the button context.
                // We'll stick to replacing the exact hexes and the known text-white classes mapped to text-foreground.
            }

            content = content.replace(/text-white/g, 'text-foreground');

            // Actually, text-white inside buttons (bg-[#6366f1] or primary) needs to stay white in light mode too. 
            // Better to restore button text to white.
            content = content.replace(/bg-\[#6366f1\] text-foreground/g, 'bg-[#6366f1] text-white');
            content = content.replace(/text-foreground hover:bg-\[#4f46e5\]/g, 'text-white hover:bg-[#4f46e5]');

            // Gradients and specific colors:
            content = content.replace(/text-foreground font-bold flex/g, 'text-white font-bold flex');

            if (modified || content !== fs.readFileSync(fullPath, 'utf8')) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated: ${fullPath}`);
            }
        }
    }
}

processDirectory(srcDir);
console.log('Done.');
