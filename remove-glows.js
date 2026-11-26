const fs = require('fs');

/* =========================================================
   1. HTML — remove hero-badge-pill (the pill in the hero)
   ========================================================= */
let html = fs.readFileSync('index.html', 'utf8');

// Remove the hero badge pill block (lines 67-69)
html = html.replace(
  /\s*<div class="hero-badge-pill">\s*[\s\S]*?<\/div>\s*(?=\n\s*<h1)/,
  '\n'
);

fs.writeFileSync('index.html', html, 'utf8');
console.log('HTML: hero-badge-pill removed');

/* =========================================================
   2. CSS — remove glows
   - drop-shadow with white/rgba light
   - box-shadow with white rgba (brightness glows)
   - keep dark/black shadows (structural depth, not glows)
   - remove --border-glow variable usage
   ========================================================= */
let css = fs.readFileSync('styles.css', 'utf8');

// Remove drop-shadow filters that produce white glow
css = css.replace(/\s*filter: drop-shadow\(0 0 \d+px rgba\(255,\s*255,\s*255,[\d\s.]+\)\);/g, '');
css = css.replace(/\s*filter: drop-shadow\(0 0 60px rgba\(255, 255, 255, 0\.08\)\);/g, '');
css = css.replace(/\s*filter: drop-shadow\(0 0 50px rgba\(255, 255, 255, 0\.12\)\);/g, '');
css = css.replace(/\s*filter: drop-shadow\(0 0 20px rgba\(255, 255, 255, 0\.15\)\);/g, '');

// Remove white-glow box-shadows (rgba white with high opacity glow)
css = css.replace(/box-shadow: 0 0 8px rgba\(255, 255, 255, 0\.8\);/g, 'box-shadow: none;');
css = css.replace(/box-shadow: 0 4px 14px rgba\(255, 255, 255, 0\.15\);/g, 'box-shadow: none;');
css = css.replace(/box-shadow: 0 2px 8px rgba\(255, 255, 255, 0\.2\);/g, 'box-shadow: none;');
css = css.replace(/box-shadow: 0 4px 12px rgba\(255, 255, 255, 0\.2\);/g, 'box-shadow: none;');

// Remove white glow part from compound shadows (keep dark shadow, remove white part)
css = css.replace(/box-shadow: 0 25px 50px -15px rgba\(255, 255, 255, 0\.06\), 0 0 1px 1px var\(--border-white\);/g,
  'box-shadow: 0 0 1px 1px var(--border-white);');

// Remove --border-glow variable (replace any usage with transparent)
css = css.replace(/--border-glow: rgba\(255, 255, 255, 0\.25\);/g, '--border-glow: transparent;');
css = css.replace(/var\(--border-glow\)/g, 'transparent');

// Remove status-dot glow (the green dot pulse glow)
css = css.replace(/box-shadow: 0 0 0 1px var\(--border-white\);/g, 'box-shadow: none;');

fs.writeFileSync('styles.css', css, 'utf8');
console.log('CSS: all white/light glows removed');
