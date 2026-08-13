const fs = require('fs');
const path = require('path');

const dir = 'd:\\\\August Websites\\\\Electrician & Wiring Services';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'login.html' && f !== 'register.html');

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace theme button
    content = content.replace(
        /<button class="btn btn-link p-0 text-muted theme-toggle-btn"[^>]*>[\s\S]*?<\/button>/,
        `<button class="btn btn-link p-0 text-muted border border-secondary rounded-circle theme-toggle-btn d-flex align-items-center justify-content-center" style="width: 36px; height: 36px;" aria-label="Toggle Theme">
                        <i data-lucide="moon" width="18" height="18"></i>
                    </button>`
    );

    // Replace RTL button
    content = content.replace(
        /<button class="btn btn-link p-0 text-muted rtl-toggle-btn text-decoration-none fw-bold"[^>]*>[\s\S]*?<\/button>/,
        `<button class="btn btn-link p-0 text-muted border border-secondary rounded-circle rtl-toggle-btn d-flex align-items-center justify-content-center text-decoration-none" style="width: 36px; height: 36px;" aria-label="Toggle RTL">
                        <i data-lucide="arrow-right-left" width="18" height="18"></i>
                    </button>`
    );

    fs.writeFileSync(filePath, content, 'utf8');
}
console.log('Replaced successfully.');
