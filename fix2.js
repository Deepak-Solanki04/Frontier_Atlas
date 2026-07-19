const fs = require('fs');
const pagePath = 'app/models/page.tsx';
let pageCode = fs.readFileSync(pagePath, 'utf8');

// Precisely replace ONLY useMemo blocks!
pageCode = pageCode.replace(/useMemo\(\(\) => \{([\s\S]*?)\}, \[.*?\]\);/g, '(() => {})();');
pageCode = pageCode.replace(/, useMemo/g, '');

fs.writeFileSync(pagePath, pageCode);
console.log('Fixed app/models/page.tsx');
