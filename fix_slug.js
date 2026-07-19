const fs = require('fs');
let code = fs.readFileSync('lib/models.ts', 'utf8');

code = code.replace('slug: string;', 'slug?: string;');
code = code.replace('researchAreas: string[];', 'researchAreas?: string[];');

fs.writeFileSync('lib/models.ts', code);
console.log('Made slug and researchAreas optional in lib/models.ts');
