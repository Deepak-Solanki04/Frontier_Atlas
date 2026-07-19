const fs = require('fs');
let code = fs.readFileSync('lib/descriptions.ts', 'utf8');
code = code.replace(/\\\`/g, '`');
code = code.replace(/\\\$/g, '$');
fs.writeFileSync('lib/descriptions.ts', code);
console.log('Fixed backslashes!');
