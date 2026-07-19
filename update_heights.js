const fs = require('fs');
let code = fs.readFileSync('app/models/page.tsx', 'utf8');

// The line-height is 1.25rem, so exactly 3 lines is 3.75rem
code = code.replaceAll(
  'lineHeight: "1.25rem",',
  'lineHeight: "1.25rem",\n    height: "3.75rem",\n    display: "-webkit-box",\n    WebkitLineClamp: 3,\n    WebkitBoxOrient: "vertical",\n    overflow: "hidden",'
);

code = code.replaceAll(
  "lineHeight: '1.25rem',",
  "lineHeight: '1.25rem',\n                          height: '3.75rem',\n                          display: '-webkit-box',\n                          WebkitLineClamp: 3,\n                          WebkitBoxOrient: 'vertical',\n                          overflow: 'hidden',"
);

fs.writeFileSync('app/models/page.tsx', code);
console.log('Heights successfully updated to guarantee exactly 3 lines!');
