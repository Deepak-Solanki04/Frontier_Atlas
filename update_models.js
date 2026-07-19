const fs = require('fs');
let code = fs.readFileSync('lib/models.ts', 'utf8');

code = code.replace(
  'vendor: string;\n  description: string;',
  'vendor: string;\n  vendorLogoUrl?: string;\n  description: string;'
);

code = code.replace(
  'vendor: item.vendor || item.vendoranization || item.platform || "Open Weights / Research",',
  'vendor: item.vendor || item.organization || item.platform || "Open Weights / Research",\n          vendorLogoUrl: item.vendorLogoUrl,'
);

fs.writeFileSync('lib/models.ts', code);
console.log('Successfully updated lib/models.ts');
