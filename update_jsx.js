const fs = require('fs');
let code = fs.readFileSync('app/models/page.tsx', 'utf8');

// Update getOrgLogo
code = code.replace(
  'return "https://www.google.com/s2/favicons?domain=ai.com&sz=128";',
  'return null;'
);
code = code.replace(
  'function getOrgLogo(orgOrLeader: string): string {',
  'function getOrgLogo(orgOrLeader: string): string | null {'
);

// Section: Browse by Model Family
const familyTarget = `                    const { Icon: SkeletalIcon, color: strokeColor } = getSkeletalIcon(idx + 3, fam.name);
                    const isActive = selectedFamily === fam.name;`;
const familyReplacement = `                    const { Icon: SkeletalIcon, color: strokeColor } = getSkeletalIcon(idx + 3, fam.name);
                    const isActive = selectedFamily === fam.name;
                    const familyLogo = getOrgLogo(fam.name);`;
code = code.replace(familyTarget, familyReplacement);

const familyIconTarget = `<div className="flex-shrink-0 p-2 rounded-lg transition-transform group-hover:scale-150">
                            <SkeletalIcon size={20} style={{ color: strokeColor }} />
                          </div>`;
const familyIconReplacement = `<div className="flex-shrink-0 p-2 rounded-lg transition-transform group-hover:scale-110">
                            {familyLogo ? (
                              <img src={familyLogo} alt={fam.name} className="w-[30px] h-[30px] object-contain rounded" />
                            ) : (
                              <SkeletalIcon size={20} style={{ color: strokeColor }} />
                            )}
                          </div>`;
code = code.replace(familyIconTarget, familyIconReplacement);


// Section: Trending Models
const trendingTarget = `                    const { Icon: SkeletalIcon, color: strokeColor } = getSkeletalIcon(idx + 15, m.name);
                    return (`;
const trendingReplacement = `                    const { Icon: SkeletalIcon, color: strokeColor } = getSkeletalIcon(idx + 15, m.name);
                    const modelLogo = getOrgLogo(m.vendor) || getOrgLogo(m.name);
                    return (`;
code = code.replace(trendingTarget, trendingReplacement);

const trendingIconTarget = `<div className="flex-shrink-0 p-2 rounded-lg transition-transform group-hover:scale-150">
                            <SkeletalIcon size={20} style={{ color: strokeColor }} />
                          </div>`;
const trendingIconReplacement = `<div className="flex-shrink-0 p-2 rounded-lg transition-transform group-hover:scale-110">
                            {modelLogo ? (
                              <img src={modelLogo} alt={m.name} className="w-[30px] h-[30px] object-contain rounded" />
                            ) : (
                              <SkeletalIcon size={20} style={{ color: strokeColor }} />
                            )}
                          </div>`;
code = code.replace(trendingIconTarget, trendingIconReplacement);

// Section: Browse by Organization
// It already uses vendorLogo = vendorModel?.vendorLogoUrl; Let's fallback to getOrgLogo(v.name)
const orgTarget = `const vendorLogo = vendorModel?.vendorLogoUrl;`;
const orgReplacement = `const vendorLogo = vendorModel?.vendorLogoUrl || getOrgLogo(v.name);`;
code = code.replace(orgTarget, orgReplacement);

fs.writeFileSync('app/models/page.tsx', code);
console.log('Successfully updated app/models/page.tsx');
