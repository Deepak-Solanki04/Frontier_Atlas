const fs = require('fs');
let code = fs.readFileSync('app/models/page.tsx', 'utf8');

// 1. Add import
if (!code.includes('getCardDescription')) {
  code = code.replace(
    'import { getModels, getTrendingModels, getModelFacets, type ModelItem, type ModelFacets } from "@/lib/models";',
    'import { getModels, getTrendingModels, getModelFacets, type ModelItem, type ModelFacets } from "@/lib/models";\nimport { getCardDescription } from "@/lib/descriptions";'
  );
}

// 2. Browse by Capability
const capOld = `                        <p
  style={{
    fontFamily: "inherit",
    fontSize: "0.875rem",
    fontWeight: "400",
    color: "#6b7280",
    lineHeight: "1.25rem",
    marginTop: "0.375rem",
    marginLeft: "2.75rem",
    marginRight: "0.5rem",
    marginBottom: "0.25rem",
  }}
>
  Explore models for {cap.name.toLowerCase()}.
</p>`;

const capNew = `                        <p
  className="line-clamp-3"
  style={{
    fontFamily: "inherit",
    fontSize: "0.875rem",
    fontWeight: "400",
    color: "#6b7280",
    lineHeight: "1.25rem",
    marginTop: "0.375rem",
    marginLeft: "2.75rem",
    marginRight: "0.5rem",
    marginBottom: "0.25rem",
  }}
>
  {getCardDescription("capabilities", cap.name)}
</p>`;
code = code.replace(capOld, capNew);


// 3. Browse by Model Family
const famOld = `                        <p style={{
                          fontFamily: 'inherit',
                          fontSize: '0.875rem',
                          fontWeight: '400',
                          color: '#6b7280',
                          lineHeight: '1.25rem',
                          marginTop: '0.375rem',
                          marginLeft: '2.75rem',
                          marginRight: '0.5rem',
                          marginBottom: '0.25rem'
                        }}>
                          Explore models from the {fam.name} family.
                        </p>`;

const famNew = `                        <p className="line-clamp-3" style={{
                          fontFamily: 'inherit',
                          fontSize: '0.875rem',
                          fontWeight: '400',
                          color: '#6b7280',
                          lineHeight: '1.25rem',
                          marginTop: '0.375rem',
                          marginLeft: '2.75rem',
                          marginRight: '0.5rem',
                          marginBottom: '0.25rem'
                        }}>
                          {getCardDescription("families", fam.name)}
                        </p>`;
code = code.replace(famOld, famNew);


// 4. Browse by Organization
const orgOld = `                        <p style={{
                          fontFamily: 'inherit',
                          fontSize: '0.875rem',
                          fontWeight: '400',
                          color: '#6b7280',
                          lineHeight: '1.25rem',
                          marginTop: '0.375rem',
                          marginLeft: '2.75rem',
                          marginRight: '0.5rem',
                          marginBottom: '0.25rem'
                        }}>
                          Models developed by {v.name}.
                        </p>`;

const orgNew = `                        <p className="line-clamp-3" style={{
                          fontFamily: 'inherit',
                          fontSize: '0.875rem',
                          fontWeight: '400',
                          color: '#6b7280',
                          lineHeight: '1.25rem',
                          marginTop: '0.375rem',
                          marginLeft: '2.75rem',
                          marginRight: '0.5rem',
                          marginBottom: '0.25rem'
                        }}>
                          {getCardDescription("vendors", v.name)}
                        </p>`;
code = code.replace(orgOld, orgNew);

// 5. Browse by Domain
const domOld = `                        <p style={{
                          fontFamily: 'inherit',
                          fontSize: '0.875rem',
                          fontWeight: '400',
                          color: '#6b7280',
                          lineHeight: '1.25rem',
                          marginTop: '0.375rem',
                          marginLeft: '2.75rem',
                          marginRight: '0.5rem',
                          marginBottom: '0.25rem'
                        }}>
                          Explore models specialized in {d.name.toLowerCase()}.
                        </p>`;

const domNew = `                        <p className="line-clamp-3" style={{
                          fontFamily: 'inherit',
                          fontSize: '0.875rem',
                          fontWeight: '400',
                          color: '#6b7280',
                          lineHeight: '1.25rem',
                          marginTop: '0.375rem',
                          marginLeft: '2.75rem',
                          marginRight: '0.5rem',
                          marginBottom: '0.25rem'
                        }}>
                          {getCardDescription("domains", d.name)}
                        </p>`;
code = code.replace(domOld, domNew);

// 6. Trending Models
const trendOld = `                          <p style={{
                            fontFamily: 'inherit',
                            fontSize: '0.875rem',
                            fontWeight: '400',
                            color: '#6b7280',
                            lineHeight: '1.25rem',
                            marginTop: '0.375rem',
                            marginLeft: '2.75rem',
                            marginRight: '0.5rem',
                            marginBottom: '0.25rem'
                          }}>
                            {m.description.substring(0, 60)}...
                          </p>`;

const trendNew = `                          <p className="line-clamp-3" style={{
                            fontFamily: 'inherit',
                            fontSize: '0.875rem',
                            fontWeight: '400',
                            color: '#6b7280',
                            lineHeight: '1.25rem',
                            marginTop: '0.375rem',
                            marginLeft: '2.75rem',
                            marginRight: '0.5rem',
                            marginBottom: '0.25rem'
                          }}>
                            {getCardDescription("trending", m.name)}
                          </p>`;
code = code.replace(trendOld, trendNew);

fs.writeFileSync('app/models/page.tsx', code);
console.log('Descriptions successfully updated!');
