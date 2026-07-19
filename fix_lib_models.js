const fs = require('fs');
let code = fs.readFileSync('lib/models.ts', 'utf8');

const newInterface = `export interface ModelItem {
  id: string;
  name: string;
  slug: string;
  vendor: string;
  description: string;
  parameterCount?: string;
  contextWindow?: string;
  releaseDate?: string;
  createdAt?: string;
  license?: string;
  trendingScore?: number;
  capabilities: string[];
  researchAreas: string[];
  paperCount: number;
  benchmarkScore?: Record<string, number>;
  quickstart?: string;
  modelFamily?: string;
  architecture?: string;
  category?: string;
}`;

code = code.replace(/export interface ModelItem \{[\s\S]*?\}/, newInterface);

// Update mockModels keys
code = code.replace(/\borg:/g, 'vendor:');
code = code.replace(/\bdesc:/g, 'description:');
code = code.replace(/\btags:/g, 'capabilities:');
// area: is a string in mockModels, but researchAreas expects array of strings. 
// We will replace area: "..." with researchAreas: ["..."]
code = code.replace(/area:\s*"([^"]+)"/g, 'researchAreas: ["$1"]');
code = code.replace(/\belo:/g, 'trendingScore:');
code = code.replace(/\bparams:/g, 'parameterCount:');
code = code.replace(/\bcontext:/g, 'contextWindow:');
code = code.replace(/\bfamily:/g, 'modelFamily:');

// Now we need to fix getModelFacets which uses the old properties
code = code.replace(/m\.tags/g, 'm.capabilities');
code = code.replace(/m\.family/g, 'm.modelFamily');
code = code.replace(/m\.org/g, 'm.vendor');
code = code.replace(/m\.area/g, '(m.researchAreas && m.researchAreas[0])');

// Fix enrichModelItem
const newEnrich = `export function enrichModelItem(item: any): ModelItem {
  return {
    ...item,
    id: item.id || item.slug || Math.random().toString(36).substring(7),
    slug: item.slug || item.id,
    name: item.name || item.title || "Foundation Model",
    vendor: item.vendor || item.organization || item.platform || "Open Weights / Research",
    description: item.description || item.desc || item.source || "Advanced neural foundation model evaluated across frontier cognitive benchmarks.",
    releaseDate: item.releaseDate || item.time || "2024-2025",
    license: item.license || "Proprietary",
    trendingScore: typeof item.trendingScore === "number" ? item.trendingScore : (typeof item.elo === "number" ? item.elo : 1350),
    capabilities: Array.isArray(item.capabilities) ? item.capabilities : (Array.isArray(item.tags) ? item.tags : ["General Purpose", "Reasoning"]),
    researchAreas: Array.isArray(item.researchAreas) ? item.researchAreas : (item.area ? [item.area] : ["General Purpose"]),
    paperCount: typeof item.paperCount === "number" ? item.paperCount : (typeof item.comments === "number" ? item.comments : 120),
    benchmarkScore: item.benchmarkScore || (Array.isArray(item.benchmarks) ? item.benchmarks.reduce((acc, curr) => ({...acc, [curr.name]: curr.value}), {}) : {}),
    parameterCount: item.parameterCount || item.params,
    contextWindow: item.contextWindow || item.context,
    modelFamily: item.modelFamily || item.family,
    category: item.category,
    architecture: item.architecture
  };
}`;
code = code.replace(/export function enrichModelItem\([\s\S]*?return \{[\s\S]*?\};\n\}/, newEnrich);

fs.writeFileSync('lib/models.ts', code);
console.log('Fixed lib/models.ts');
