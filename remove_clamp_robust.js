const fs = require('fs');
let code = fs.readFileSync('app/models/page.tsx', 'utf8');

// Use regex to remove Webkit clamp lines from styles globally, regardless of exact whitespace
code = code.replace(/display:\s*['"]-webkit-box['"],\s*WebkitLineClamp:\s*3,\s*WebkitBoxOrient:\s*['"]vertical['"],/g, '');

// And remove className="line-clamp-3"
code = code.replace(/className="line-clamp-3"/g, '');

fs.writeFileSync('app/models/page.tsx', code);
console.log('Clamp removed successfully!');
