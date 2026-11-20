const fs = require('fs');
const cssPath = 'c:/Users/luixl/Desktop/Loja de magá site/styles.css';
let css = fs.readFileSync(cssPath, 'utf8');

// 1. Update the FIRST .hero-logo-display block (add position: relative)
css = css.replace(
`.hero-logo-display {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 340px;
}`,
`.hero-logo-display {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 340px;
  position: relative;
  overflow: hidden;
}`
);

// 2. Replace the entire hero bg art block at the bottom with the corrected version
const oldBlock = `/* ===== Hero Background Art (large bg layer) ===== */
.hero-logo-display {
  position: relative;
  overflow: hidden;
}

.hero-bg-art {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center center;
  opacity: 0.18;
  mix-blend-mode: screen;
  pointer-events: none;
  z-index: 0;
  filter: contrast(1.2) brightness(1.05);
  user-select: none;
}

.hero-logo-big {
  position: relative;
  z-index: 1;
}`;

const newBlock = `/* ===== Hero Background Art (large bg layer) ===== */
.hero-bg-art {
  position: absolute;
  inset: -10% -5%;
  width: 110%;
  height: 120%;
  object-fit: contain;
  object-position: center center;
  opacity: 0.22;
  mix-blend-mode: screen;
  pointer-events: none;
  z-index: 0;
  filter: contrast(1.15) brightness(1.1);
  user-select: none;
}

.hero-logo-big {
  position: relative;
  z-index: 1;
  width: 60%;
  max-width: 320px;
}`;

if (css.includes(oldBlock)) {
  css = css.replace(oldBlock, newBlock);
  console.log('Replaced full block OK');
} else {
  // Fallback: just replace .hero-bg-art rule
  css = css.replace(
    /\.hero-bg-art \{[\s\S]*?\}/,
    `.hero-bg-art {
  position: absolute;
  inset: -10% -5%;
  width: 110%;
  height: 120%;
  object-fit: contain;
  object-position: center center;
  opacity: 0.22;
  mix-blend-mode: screen;
  pointer-events: none;
  z-index: 0;
  filter: contrast(1.15) brightness(1.1);
  user-select: none;
}`
  );
  // Update hero-logo-big to be smaller
  css = css.replace(
    /\.hero-logo-big \{\s*position: relative;\s*z-index: 1;\s*\}/,
    `.hero-logo-big {
  position: relative;
  z-index: 1;
  width: 60%;
  max-width: 320px;
}`
  );
  console.log('Fallback replacement done');
}

fs.writeFileSync(cssPath, css, 'utf8');
console.log('CSS saved');
