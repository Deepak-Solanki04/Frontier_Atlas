const fs = require('fs');
let code = fs.readFileSync('app/models/page.tsx', 'utf8');

// Remove line-clamp-3 class
code = code.replaceAll('className="line-clamp-3"', '');

// Remove the webkit clamp properties from styles
code = code.replaceAll('display: "-webkit-box",\n    WebkitLineClamp: 3,\n    WebkitBoxOrient: "vertical",\n    ', '');
code = code.replaceAll("display: '-webkit-box',\n                          WebkitLineClamp: 3,\n                          WebkitBoxOrient: 'vertical',\n                          ", '');

fs.writeFileSync('app/models/page.tsx', code);
console.log('Removed line-clamp to eliminate ellipsis dots!');
