const fs = require('fs');
let code = fs.readFileSync('app/models/page.tsx', 'utf8');

// 1. Model Family (line 692-ish)
code = code.replace(
  /const \{ Icon: SkeletalIcon, color: strokeColor \} = getSkeletalIcon\(idx \+ 3, fam\.name\);\s*const isActive = selectedFamily === fam\.name;/,
  `const { Icon: SkeletalIcon, color: strokeColor } = getSkeletalIcon(idx + 3, fam.name);
                    const isActive = selectedFamily === fam.name;
                    const familyLogo = getOrgLogo(fam.name);`
);

code = code.replace(
  /<div className="flex-shrink-0 p-2 rounded-lg transition-transform group-hover:scale-150">\s*<SkeletalIcon size=\{20\} style=\{\{ color: strokeColor \}\} \/>\s*<\/div>/,
  `<div className="flex-shrink-0 p-2 rounded-lg transition-transform group-hover:scale-110">
                            {familyLogo ? (
                              <img src={familyLogo} alt={fam.name} className="w-[30px] h-[30px] object-contain rounded" />
                            ) : (
                              <SkeletalIcon size={20} style={{ color: strokeColor }} />
                            )}
                          </div>`
);

// 2. Trending Models (line 927-ish)
code = code.replace(
  /const \{ Icon: SkeletalIcon, color: strokeColor \} = getSkeletalIcon\(idx \+ 15, m\.name\);\s*return \(/,
  `const { Icon: SkeletalIcon, color: strokeColor } = getSkeletalIcon(idx + 15, m.name);
                    const modelLogo = getOrgLogo(m.vendor) || getOrgLogo(m.name);
                    return (`
);

code = code.replace(
  /<div className="flex-shrink-0 p-2 rounded-lg transition-transform group-hover:scale-150">\s*<SkeletalIcon size=\{20\} style=\{\{ color: strokeColor \}\} \/>\s*<\/div>/,
  `<div className="flex-shrink-0 p-2 rounded-lg transition-transform group-hover:scale-110">
                            {modelLogo ? (
                              <img src={modelLogo} alt={m.name} className="w-[30px] h-[30px] object-contain rounded" />
                            ) : (
                              <SkeletalIcon size={20} style={{ color: strokeColor }} />
                            )}
                          </div>`
);

fs.writeFileSync('app/models/page.tsx', code);
console.log('Successfully updated app/models/page.tsx');
