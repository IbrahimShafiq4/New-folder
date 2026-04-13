const fs = require('fs');

let content = fs.readFileSync('main.js', 'utf8');

// Replace "Ablex" with "Equal Opportunities" globally
content = content.replace(/Ablex/g, 'Equal Opportunities');

// Replace "ابليكس" with "فرص متساوية" globally
content = content.replace(/ابليكس/g, 'فرص متساوية');

// Fix specific occurrences that might have been mangled
// For instance, the image was: logo/logo.png for Equal Opportunity
// Restore "Ablex · main.js" at line 2 just to be safe if desired, or keep as Equal Opportunities.

// Write back to main.js
fs.writeFileSync('main.js', content, 'utf8');
console.log('Replacement complete.');
