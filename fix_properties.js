const fs = require('fs');
let code = fs.readFileSync('lib/models.ts', 'utf8');

if (!code.includes('vendorLogoUrl?: string | null;')) {
  code = code.replace(
    'vendor: string;',
    'vendor: string;\n  vendorLogoUrl?: string | null;\n  benchmarks?: any[];\n  area?: string;\n  elo?: number;\n  org?: string;\n  context?: string;'
  );
}

// Fix the typo on line 923
code = code.replace(
  'area: ite(m.researchAreas && m.researchAreas[0]) || item.category || "General Purpose",',
  'area: (item.researchAreas && item.researchAreas[0]) || item.category || "General Purpose",'
);

fs.writeFileSync('lib/models.ts', code);
console.log('Fixed lib/models.ts properties');
