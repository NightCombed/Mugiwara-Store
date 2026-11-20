const fs = require('fs');
const cssPath = 'c:/Users/luixl/Desktop/Loja de magá site/styles.css';
let css = fs.readFileSync(cssPath, 'utf8');

// Remove overflow: hidden from .hero-logo-display (it clips the bg art)
css = css.replace(
`.hero-logo-display {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 340px;
  position: relative;
  overflow: hidden;
}`,
`.hero-logo-display {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 340px;
  position: relative;
}`
);

// Increase opacity and ensure hero section clips the overflow
css = css.replace(
`  opacity: 0.22;`,
`  opacity: 0.32;`
);

// Make sure .hero has overflow hidden to contain the bg art
if (!css.includes('.hero {')) {
  console.log('.hero rule not found separately');
} else {
  // Add overflow hidden to .hero if not already there
  if (!css.match(/\.hero \{[^}]*overflow:\s*hidden/)) {
    css = css.replace('.hero {', '.hero {\n  overflow: hidden;');
    console.log('Added overflow:hidden to .hero');
  } else {
    console.log('.hero already has overflow:hidden');
  }
}

fs.writeFileSync(cssPath, css, 'utf8');
console.log('Done - overflow fixed, opacity raised to 0.32');
