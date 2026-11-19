const fs = require('fs');
const cssPath = 'c:/Users/luixl/Desktop/Loja de magá site/styles.css';
let css = fs.readFileSync(cssPath, 'utf8');

// Fix: use object-fit: contain so image is never cropped
css = css.replace(
  'object-fit: cover;\n  object-position: center center;',
  'object-fit: contain;\n  object-position: center center;'
);

fs.writeFileSync(cssPath, css, 'utf8');
console.log('Done - object-fit changed to contain');
