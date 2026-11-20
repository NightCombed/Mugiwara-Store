const fs = require('fs');

const htmlPath = 'c:/Users/luixl/Desktop/Loja de magá site/index.html';
const cssPath  = 'c:/Users/luixl/Desktop/Loja de magá site/styles.css';

// --- HTML: move hero-bg-art OUT of hero-logo-display, into hero section directly ---
let html = fs.readFileSync(htmlPath, 'utf8');

// Remove from inside hero-logo-display
html = html.replace(
  `        <img src="images/hero-bg-art.jpg" alt="" class="hero-bg-art" aria-hidden="true">\n`,
  ''
);

// Place it right after the opening of <section class="hero" id="destaque">
html = html.replace(
  `<section class="hero" id="destaque">`,
  `<section class="hero" id="destaque">\n    <img src="images/hero-bg-art.jpg" alt="" class="hero-bg-art" aria-hidden="true">`
);

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('HTML updated — hero-bg-art moved to hero section level');

// --- CSS: reposition to cover right half of hero ---
let css = fs.readFileSync(cssPath, 'utf8');

css = css.replace(
`.hero-bg-art {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 220%;
  height: 220%;
  object-fit: contain;
  opacity: 0.32;
  mix-blend-mode: screen;
  pointer-events: none;
  z-index: 0;
  filter: contrast(1.15) brightness(1.1);
  user-select: none;
}`,
`.hero-bg-art {
  position: absolute;
  top: 50%;
  right: -5%;
  transform: translateY(-50%);
  width: 58%;
  height: 130%;
  object-fit: contain;
  object-position: center center;
  opacity: 0.28;
  mix-blend-mode: screen;
  pointer-events: none;
  z-index: 1;
  filter: contrast(1.15) brightness(1.1);
  user-select: none;
}`
);

fs.writeFileSync(cssPath, css, 'utf8');
console.log('CSS updated — bg-art now covers right half of hero at 58% width / 130% height');
