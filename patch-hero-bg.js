const fs = require('fs');

const htmlPath = 'c:/Users/luixl/Desktop/Loja de magá site/index.html';
const cssPath = 'c:/Users/luixl/Desktop/Loja de magá site/styles.css';

// 1. Patch HTML - inject hero-bg-art img before the main logo img
let html = fs.readFileSync(htmlPath, 'utf8');

const oldLogoDisplay = `      <div class="hero-logo-display">
        <iframe src="marble-signal/index.html" class="hero-marble-iframe" tabindex="-1" aria-hidden="true" scrolling="no" frameborder="0"></iframe>
        <img src="images/logo.png" alt="Mugiwara Store" class="hero-logo-big">
      </div>`;

const newLogoDisplay = `      <div class="hero-logo-display">
        <iframe src="marble-signal/index.html" class="hero-marble-iframe" tabindex="-1" aria-hidden="true" scrolling="no" frameborder="0"></iframe>
        <img src="images/hero-bg-art.jpg" alt="" class="hero-bg-art" aria-hidden="true">
        <img src="images/logo.png" alt="Mugiwara Store" class="hero-logo-big">
      </div>`;

if (html.includes(oldLogoDisplay)) {
  html = html.replace(oldLogoDisplay, newLogoDisplay);
  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log('HTML patched OK');
} else {
  console.log('HTML target not found - trying fallback');
  // Fallback: just inject before the logo img
  html = html.replace(
    '<img src="images/logo.png" alt="Mugiwara Store" class="hero-logo-big">',
    '<img src="images/hero-bg-art.jpg" alt="" class="hero-bg-art" aria-hidden="true">\n        <img src="images/logo.png" alt="Mugiwara Store" class="hero-logo-big">'
  );
  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log('HTML fallback patched');
}

// 2. Patch CSS - add hero-bg-art styles and update hero-logo-display to position: relative
let css = fs.readFileSync(cssPath, 'utf8');

const bgArtCss = `
/* ===== Hero Background Art (decorative watermark) ===== */
.hero-logo-display {
  position: relative;
}

.hero-bg-art {
  position: absolute;
  bottom: -10px;
  right: -20px;
  width: 72%;
  max-width: 340px;
  height: auto;
  object-fit: contain;
  opacity: 0.13;
  mix-blend-mode: screen;
  pointer-events: none;
  z-index: 0;
  filter: blur(0.4px) contrast(1.15) brightness(1.1);
  user-select: none;
  border-radius: 4px;
}

.hero-logo-big {
  position: relative;
  z-index: 1;
}
`;

// Avoid duplicates
if (!css.includes('.hero-bg-art')) {
  css += bgArtCss;
  fs.writeFileSync(cssPath, css, 'utf8');
  console.log('CSS patched OK');
} else {
  console.log('CSS already has hero-bg-art, skipping');
}
