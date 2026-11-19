const fs = require('fs');
const cssPath = 'c:/Users/luixl/Desktop/Loja de magá site/styles.css';
let css = fs.readFileSync(cssPath, 'utf8');

// Replace the existing hero-bg-art block with the new large background version
const oldBlock = `/* ===== Hero Background Art (decorative watermark) ===== */
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
}`;

const newBlock = `/* ===== Hero Background Art (large bg layer) ===== */
.hero-logo-display {
  position: relative;
  overflow: hidden;
}

.hero-bg-art {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
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

if (css.includes(oldBlock)) {
  css = css.replace(oldBlock, newBlock);
  fs.writeFileSync(cssPath, css, 'utf8');
  console.log('CSS updated — hero-bg-art is now a full background layer');
} else {
  console.log('Block not found exactly, trying partial match...');
  // Try replacing just the .hero-bg-art rule
  css = css.replace(
    /\.hero-bg-art \{[\s\S]*?^\}/m,
    `.hero-bg-art {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  opacity: 0.18;
  mix-blend-mode: screen;
  pointer-events: none;
  z-index: 0;
  filter: contrast(1.2) brightness(1.05);
  user-select: none;
}`
  );
  fs.writeFileSync(cssPath, css, 'utf8');
  console.log('CSS updated via regex fallback');
}
