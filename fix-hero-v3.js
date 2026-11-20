const fs = require('fs');
const cssPath = 'c:/Users/luixl/Desktop/Loja de magá site/styles.css';
let css = fs.readFileSync(cssPath, 'utf8');

// 1. Restore hero-logo-big to original size (undo the 60% / 320px change)
css = css.replace(
`.hero-logo-big {
  position: relative;
  z-index: 1;
  width: 60%;
  max-width: 320px;
}`,
`.hero-logo-big {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 520px;
  height: auto;
}`
);

// 2. Make hero-bg-art MUCH bigger - centered, 2x the container
css = css.replace(
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
}`,
`.hero-bg-art {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 220%;
  height: 220%;
  object-fit: contain;
  opacity: 0.22;
  mix-blend-mode: screen;
  pointer-events: none;
  z-index: 0;
  filter: contrast(1.15) brightness(1.1);
  user-select: none;
}`
);

fs.writeFileSync(cssPath, css, 'utf8');
console.log('Done - logo restored to full size, bg-art set to 220%');
