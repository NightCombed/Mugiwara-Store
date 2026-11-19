const fs = require('fs');
const path = 'c:/Users/luixl/Desktop/Loja de magá site/index.html';
let html = fs.readFileSync(path, 'utf8');

// Remove the broken marble-signal iframe
const before = html.length;
html = html.replace(/<iframe src="marble-signal\/index\.html"[^>]*><\/iframe>\s*/g, '');
const after = html.length;

fs.writeFileSync(path, html, 'utf8');
console.log('Done. Removed', before - after, 'chars (iframe tag)');
