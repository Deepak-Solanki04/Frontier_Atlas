"use client";

import React, { useState, useEffect, useMemo, use } from "react";
import Link from "next/link";
import { 
  Cpu, Layers, Check, Copy, ArrowLeft, 
  Sparkles, BookOpen, Terminal, Zap, ShieldCheck, 
  Eye, Activity, Box, Sliders, BarChart3,
  Brain, Wrench, Link2, ArrowUpRight, FileText,
  Star, Calendar, ChevronRight
} from "lucide-react";
import { fetchApi } from "@/lib/api";
import { type ModelItem } from "@/lib/models";

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default function ModelDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const [model, setModel] = useState<ModelItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLogoError(false);
    if (resolvedParams?.slug) {
      const cleanId = resolvedParams.slug.toLowerCase().trim();
      fetchApi<any>(`/api/v1/models/${cleanId}`)
        .then(response => {
          if (response && response.status === "success" && response.data) {
            setModel(response.data);
          } else if (response && (response.id || response.slug)) {
            setModel(response);
          } else {
            // BACKEND IS DOWN - USE HARDCODED DATA FOR VISUAL TESTING
            setModel({
              id: "m-chameleon",
              slug: "chameleon",
              name: "Chameleon",
              vendor: "Meta AI",
              vendorLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Meta-Logo.png",
              description: "Flagship Chameleon foundation AI model by meta-ai.",
              accessType: "Open / API",
              modality: "Early-Fusion Multimodal",
              modelFamily: "Foundation LM",
              category: "Multimodal / VLM",
              capabilities: ["Dialogue & Instruction Following", "Reasoning & Analysis", "Domain Adaptation"],
              tasks: [],
              releaseDate: "2024-05-15T00:00:00.000Z",
              parameterCount: "100B+",
              opennessType: "Permissive / Commercial",
              license: "Llama Community License",
              architecture: "Decoder-only Transformer with RoPE and Grouped-Query Attention",
              contextWindow: "32,768 tokens",
              releaseNotes: "Flagship Chameleon foundation AI model by meta-ai.",
              apiUrl: "https://huggingface.co/meta-ai/chameleon",
              repositoryUrl: "https://github.com/meta-ai/chameleon",
              paperUrl: "https://arxiv.org/search/?query=chameleon",
              paperCount: 68,
              citationCount: 90715,
              githubStars: 282354,
              benchmarkScore: { "MMLU": 88.5 },
              modelVersions: ["Chameleon", "Chameleon-v1", "Chameleon-instruct"],
              papers: [
                { paper: { title: "Double-Anonymous Review for Robotics", citations: 2854, slug: "paper-1" } },
                { paper: { title: "Partial stochastic resetting with refractory periods", citations: 2853, slug: "paper-2" } },
                { paper: { title: "Enhancing Question Answering on Charts Through Effective Pre-training Tasks", citations: 689, slug: "paper-3" } }
              ]
            } as any);
          }
          setLoading(false);
        })
        .catch(err => {
          console.error("Failed to load model:", err);
          // BACKEND IS DOWN - USE HARDCODED DATA FOR VISUAL TESTING
          setModel({
            id: "m-chameleon",
            slug: "chameleon",
            name: "Chameleon",
            vendor: "Meta AI",
            vendorLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Meta-Logo.png",
            description: "Flagship Chameleon foundation AI model by meta-ai.",
            accessType: "Open / API",
            modality: "Early-Fusion Multimodal",
            modelFamily: "Foundation LM",
            category: "Multimodal / VLM",
            capabilities: ["Dialogue & Instruction Following", "Reasoning & Analysis", "Domain Adaptation"],
            tasks: [],
            releaseDate: "2024-05-15T00:00:00.000Z",
            parameterCount: "100B+",
            opennessType: "Permissive / Commercial",
            license: "Llama Community License",
            architecture: "Decoder-only Transformer with RoPE and Grouped-Query Attention",
            contextWindow: "32,768 tokens",
            releaseNotes: "Flagship Chameleon foundation AI model by meta-ai.",
            apiUrl: "https://huggingface.co/meta-ai/chameleon",
            repositoryUrl: "https://github.com/meta-ai/chameleon",
            paperUrl: "https://arxiv.org/search/?query=chameleon",
            paperCount: 68,
            citationCount: 90715,
            githubStars: 282354,
            benchmarkScore: { "MMLU": 88.5 },
            modelVersions: ["Chameleon", "Chameleon-v1", "Chameleon-instruct"],
            papers: [
              { paper: { title: "Double-Anonymous Review for Robotics", citations: 2854, slug: "paper-1" } },
              { paper: { title: "Partial stochastic resetting with refractory periods", citations: 2853, slug: "paper-2" } },
              { paper: { title: "Enhancing Question Answering on Charts Through Effective Pre-training Tasks", citations: 689, slug: "paper-3" } }
            ]
          } as any);
          setLoading(false);
        });
    }
  }, [resolvedParams?.slug]);

  const relatedPapers = useMemo(() => {
    if (!model || !Array.isArray((model as any).papers)) return [];
    return (model as any).papers.map((p: any) => p.paper).filter(Boolean);
  }, [model]);
  
  const mmluScore = useMemo(() => {
    if (!model) return null;
    if (model.benchmarkScore && typeof model.benchmarkScore === 'object') {
      const mmlu = Object.entries(model.benchmarkScore).find(([k]) => k.toLowerCase() === 'mmlu');
      if (mmlu) return mmlu[1];
      // If no MMLU, grab the first available score
      const first = Object.values(model.benchmarkScore)[0];
      return first || null;
    }
    return null;
  }, [model]);

  const mmluLabel = useMemo(() => {
    if (!model) return null;
    if (model.benchmarkScore && typeof model.benchmarkScore === 'object') {
      const mmlu = Object.entries(model.benchmarkScore).find(([k]) => k.toLowerCase() === 'mmlu');
      if (mmlu) return 'MMLU Score';
      const first = Object.entries(model.benchmarkScore)[0];
      if (first) return `${first[0].toUpperCase()} Score`;
    }
    return null;
  }, [model]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="text-center p-10">
          <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Cpu size={24} className="text-gray-400" />
          </div>
          <div className="text-[13px] font-bold text-gray-400 uppercase tracking-wider animate-pulse">Loading Profile...</div>
        </div>
      </div>
    );
  }

  if (!model) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-6">
        <div className="bg-white border border-[#F0F0F0] rounded-[12px] p-10 max-w-md w-full text-center shadow-sm">
          <h1 className="text-2xl font-extrabold text-[#111111] mb-3 tracking-tight">Model Profile Not Found</h1>
          <p className="text-base text-[#555555] mb-8 leading-relaxed font-medium">
            We couldn&apos;t find an indexed AI foundation model matching <code className="bg-[#F8F7F2] border border-[#EAE9E4] px-2 py-1 rounded text-[#FF5A1F] text-[13px] font-bold mx-1">{resolvedParams.slug}</code>.
          </p>
          <Link href="/models" className="flex items-center justify-center gap-2 w-full p-3.5 bg-[#111111] hover:bg-[#222222] text-white rounded-[8px] transition-colors font-bold text-sm no-underline shadow-sm">
            <ArrowLeft size={16} />
            <span>Return to Models Directory</span>
          </Link>
        </div>
      </div>
    );
  }

  const anyTags = Array.isArray((model as any).capabilities) || Array.isArray((model as any).tasks) || Array.isArray((model as any).methods);

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-[#111111] selection:bg-[#EAEAEA]">
      
      {/* ── TOP NAV (Breadcrumbs) ── */}
      <header className="bg-[#FAFAFA] pt-6 pb-2">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 flex items-center gap-2 text-[13px] font-medium text-gray-500">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span className="text-gray-300">/</span>
          <Link href="/models" className="hover:text-black transition-colors">Models</Link>
          <span className="text-gray-300">/</span>
          <span className="text-black font-semibold">{model.name}</span>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-6 md:px-8 pt-10 pb-24">
        
        {/* ── HERO SECTION ── */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-12">
          
          {/* Logo Block */}
          <div className="w-[180px] shrink-0">
             <div className="aspect-square bg-white border border-gray-100 rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex items-center justify-center p-6 mb-4 overflow-hidden">
                {!logoError && model.vendorLogoUrl ? (
                  <img src={model.vendorLogoUrl} alt={model.vendor || "Vendor"} onError={() => setLogoError(true)} className="w-full h-full object-contain" />
                ) : (
                  <div className="w-full h-full bg-gray-50 rounded-2xl flex items-center justify-center text-gray-300 font-bold text-2xl">{model.name.charAt(0)}</div>
                )}
             </div>
             {model.vendor && <div className="text-center text-[14px] font-bold text-gray-900">{model.vendor}</div>}
          </div>
          
          {/* Core Info Block */}
          <div className="flex-1 min-w-0">
             {(model as any).accessType && (
               <div className="inline-block px-3 py-1 bg-[#ECFDF5] text-[#047857] font-semibold text-[12px] rounded-md mb-5 border border-[#A7F3D0]">
                  {(model as any).accessType}
               </div>
             )}
             
             <div className="flex flex-wrap items-center gap-4 mb-4">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-black leading-none">{model.name}</h1>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-[13px] font-bold text-gray-700 hover:bg-gray-50 shadow-sm transition-colors active:scale-95">
                  <Star size={16} className="text-gray-400" /> Save
                </button>
             </div>
             
             {model.description && (
               <p className="text-[16px] text-gray-600 mb-6 leading-relaxed">{model.description}</p>
             )}
             
             {/* Primary Tags (Family & Category) */}
             <div className="flex flex-wrap gap-2 mb-4">
                {(model as any).modelFamily && (
                  <span className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 text-[12px] font-semibold rounded-md">
                    {(model as any).modelFamily}
                  </span>
                )}
                {model.category && (
                  <span className="inline-flex items-center px-3 py-1.5 bg-[#FFF7ED] text-[#EA580C] text-[12px] font-semibold rounded-md">
                    {model.category}
                  </span>
                )}
             </div>

             {/* Secondary Tags (Capabilities/Tasks) */}
             {anyTags && (
               <div className="flex flex-wrap gap-2 mb-8">
                  {Array.isArray((model as any).capabilities) && ((model as any).capabilities).map((cap: string, i: number) => (
                    <span key={`cap-${i}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-[12px] font-semibold rounded-md shadow-sm">
                      <Sparkles size={14} className="text-gray-400" /> {cap}
                    </span>
                  ))}
                  {Array.isArray((model as any).tasks) && ((model as any).tasks).slice(0,3).map((task: any, i: number) => (
                    <span key={`task-${i}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-[12px] font-semibold rounded-md shadow-sm">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: task.color || '#3B82F6' }} /> {task.name}
                    </span>
                  ))}
               </div>
             )}

             {/* Action Links Row */}
             <div className="flex flex-wrap items-center gap-6 text-[14px] font-bold text-gray-800">
                {(model as any).apiUrl && (
                  <a href={(model as any).apiUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-orange-500 transition-colors">
                    <img src="https://cdn.simpleicons.org/huggingface/000000" alt="Hugging Face" className="w-[18px] h-[18px] opacity-80" /> Hugging Face <ArrowUpRight size={14} className="text-gray-400"/>
                  </a>
                )}
                {(model as any).repositoryUrl && (
                  <a href={(model as any).repositoryUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-orange-500 transition-colors">
                    <img src="https://cdn.simpleicons.org/github/000000" alt="GitHub" className="w-[18px] h-[18px] opacity-80" /> GitHub <ArrowUpRight size={14} className="text-gray-400"/>
                  </a>
                )}
                {(model as any).paperUrl && (
                  <a href={(model as any).paperUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-orange-500 transition-colors">
                    <FileText size={18} className="opacity-80" /> Paper (arXiv) <ArrowUpRight size={14} className="text-gray-400"/>
                  </a>
                )}
             </div>
          </div>
          
          {/* Metrics Block */}
          <div className="w-full lg:w-[280px] shrink-0">
             <div className="bg-white border border-gray-100 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 flex flex-col gap-6">
                
                {(model as any).paperCount !== undefined && (
                  <div className="flex items-start gap-4">
                     <div className="w-10 h-10 rounded-xl bg-[#ECFDF5] flex items-center justify-center shrink-0">
                        <BookOpen size={20} className="text-[#059669]" />
                     </div>
                     <div>
                        <div className="text-[20px] font-bold text-gray-900 leading-tight">{(model as any).paperCount}</div>
                        <div className="text-[13px] font-medium text-gray-500">Papers</div>
                     </div>
                  </div>
                )}

                {(model as any).citationCount !== undefined && (
                  <div className="flex items-start gap-4">
                     <div className="w-10 h-10 rounded-xl bg-[#FFF7ED] flex items-center justify-center shrink-0">
                        <Zap size={20} className="text-[#EA580C]" />
                     </div>
                     <div>
                        <div className="text-[20px] font-bold text-gray-900 leading-tight">{Number((model as any).citationCount).toLocaleString()}</div>
                        <div className="text-[13px] font-medium text-gray-500">Citations</div>
                     </div>
                  </div>
                )}

                {(model as any).githubStars !== undefined && (
                  <div className="flex items-start gap-4">
                     <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] flex items-center justify-center shrink-0">
                        <Star size={20} className="text-[#2563EB]" />
                     </div>
                     <div>
                        <div className="text-[20px] font-bold text-gray-900 leading-tight">{Number((model as any).githubStars).toLocaleString()}</div>
                        <div className="text-[13px] font-medium text-gray-500">GitHub Stars</div>
                     </div>
                  </div>
                )}

                {mmluScore !== null && (
                  <div className="flex items-start gap-4">
                     <div className="w-10 h-10 rounded-xl bg-[#F3E8FF] flex items-center justify-center shrink-0">
                        <Activity size={20} className="text-[#7C3AED]" />
                     </div>
                     <div>
                        <div className="text-[20px] font-bold text-gray-900 leading-tight">{mmluScore}</div>
                        <div className="text-[13px] font-medium text-gray-500">{mmluLabel}</div>
                     </div>
                  </div>
                )}
             </div>
          </div>
        </div>

        {/* ── TABS ── */}
        <div className="border-b border-gray-200 mb-10 flex gap-8 overflow-x-auto scrollbar-hide">
           <button className="border-b-2 border-orange-500 pb-3 text-[14px] font-bold text-black whitespace-nowrap">Overview</button>
           {Array.isArray((model as any).modelVersions) && (model as any).modelVersions.length > 0 && (
             <button className="border-b-2 border-transparent pb-3 text-[14px] font-bold text-gray-400 hover:text-gray-600 transition-colors whitespace-nowrap">Versions</button>
           )}
           {Array.isArray((model as any).researchAreas) && (model as any).researchAreas.length > 0 && (
             <button className="border-b-2 border-transparent pb-3 text-[14px] font-bold text-gray-400 hover:text-gray-600 transition-colors whitespace-nowrap">Research Areas</button>
           )}
           {relatedPapers.length > 0 && (
             <button className="border-b-2 border-transparent pb-3 text-[14px] font-bold text-gray-400 hover:text-gray-600 transition-colors whitespace-nowrap">Papers ({relatedPapers.length})</button>
           )}
        </div>

        {/* ── OVERVIEW CONTENT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
          
          {/* Left: Overview Specs Card */}
          <div className="bg-white border border-gray-100 rounded-3xl p-8 md:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.02)] h-fit">
             <h2 className="text-[18px] font-extrabold text-black mb-8">Overview</h2>
             
             <div className="grid grid-cols-[140px_1fr] md:grid-cols-[180px_1fr] gap-y-6">
                
                {((model as any).releaseDate || model.year) && (
                  <>
                    <div className="flex items-center gap-2 text-gray-500 text-[13px] font-bold"><Calendar size={16}/> Release Date</div>
                    <div className="text-[14px] font-bold text-gray-900">{formatDate((model as any).releaseDate) || model.year}</div>
                  </>
                )}

                {model.parameterCount && (
                  <>
                    <div className="flex items-center gap-2 text-gray-500 text-[13px] font-bold"><Box size={16}/> Parameter Count</div>
                    <div className="text-[14px] font-bold text-gray-900">{model.parameterCount}</div>
                  </>
                )}

                {((model as any).modality || model.category) && (
                  <>
                    <div className="flex items-center gap-2 text-gray-500 text-[13px] font-bold"><Sparkles size={16}/> Modality</div>
                    <div className="text-[14px] font-bold text-gray-900">{(model as any).modality || model.category}</div>
                  </>
                )}

                {(model as any).accessType && (
                  <>
                    <div className="flex items-center gap-2 text-gray-500 text-[13px] font-bold"><ShieldCheck size={16}/> Access Type</div>
                    <div className="text-[14px] font-bold text-gray-900">{(model as any).accessType}</div>
                  </>
                )}

                {(model as any).opennessType && (
                  <>
                    <div className="flex items-center gap-2 text-gray-500 text-[13px] font-bold"><Layers size={16}/> Openness Type</div>
                    <div className="text-[14px] font-bold text-gray-900">{(model as any).opennessType}</div>
                  </>
                )}

                {(model as any).license && (
                  <>
                    <div className="flex items-center gap-2 text-gray-500 text-[13px] font-bold"><ShieldCheck size={16}/> License</div>
                    <div className="text-[14px] font-bold text-gray-900">{(model as any).license}</div>
                  </>
                )}

                {(model as any).architecture && (
                  <>
                    <div className="flex items-center gap-2 text-gray-500 text-[13px] font-bold self-start mt-0.5"><Wrench size={16}/> Architecture</div>
                    <div className="text-[14px] font-bold text-gray-900 leading-snug">{(model as any).architecture}</div>
                  </>
                )}

                {model.contextWindow && (
                  <>
                    <div className="flex items-center gap-2 text-gray-500 text-[13px] font-bold"><Layers size={16}/> Context Window</div>
                    <div className="text-[14px] font-bold text-gray-900">{model.contextWindow}</div>
                  </>
                )}

                {(model as any).modelFamily && (
                  <>
                    <div className="flex items-center gap-2 text-gray-500 text-[13px] font-bold"><Layers size={16}/> Model Family</div>
                    <div className="text-[14px] font-bold text-gray-900">{(model as any).modelFamily}</div>
                  </>
                )}

                {model.category && (
                  <>
                    <div className="flex items-center gap-2 text-gray-500 text-[13px] font-bold"><Box size={16}/> Category</div>
                    <div className="text-[14px] font-bold text-gray-900">{model.category}</div>
                  </>
                )}

                {(model as any).releaseNotes && (
                  <>
                    <div className="flex items-center gap-2 text-gray-500 text-[13px] font-bold self-start mt-0.5"><FileText size={16}/> Release Notes</div>
                    <div className="text-[14px] font-bold text-gray-900 leading-snug">{(model as any).releaseNotes}</div>
                  </>
                )}

             </div>
          </div>
          
          {/* Right: Sidebar Cards */}
          <div className="flex flex-col gap-6">
             
             {/* Versions Card */}
             {Array.isArray((model as any).modelVersions) && ((model as any).modelVersions).length > 0 && (
               <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
                  <h2 className="flex items-center gap-2 text-[15px] font-extrabold text-black mb-4"><Layers size={18}/> Available Versions</h2>
                  <div className="flex flex-col gap-3 mt-6">
                     {((model as any).modelVersions).map((version: string, i: number) => (
                       <button key={i} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all group">
                         <span className="text-[14px] font-bold text-gray-900">{version}</span>
                         <ChevronRight size={16} className="text-gray-400 group-hover:text-black transition-colors" />
                       </button>
                     ))}
                  </div>
               </div>
             )}
             
             {/* Recent Papers Card */}
             {relatedPapers.length > 0 && (
               <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
                  <div className="flex items-center justify-between mb-6">
                     <h2 className="text-[15px] font-extrabold text-black">Recent Papers</h2>
                     {relatedPapers.length > 3 && (
                       <span className="text-orange-500 text-[13px] font-bold hover:text-orange-600 cursor-pointer transition-colors">View all ({relatedPapers.length}) →</span>
                     )}
                  </div>
                  <div className="flex flex-col gap-4 mt-6">
                     {relatedPapers.slice(0, 3).map((paper: any, i: number) => (
                       <Link key={i} href={`/papers/${paper.slug}`} className="flex items-start justify-between gap-4 p-4 border border-gray-100 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all group">
                         <div className="flex items-start gap-3">
                            <FileText size={16} className="text-gray-400 mt-0.5 shrink-0" />
                            <span className="text-[13.5px] font-bold text-gray-900 leading-snug group-hover:text-orange-600 transition-colors line-clamp-2">{paper.title}</span>
                         </div>
                         {(paper.citations || paper.citationCount) ? (
                           <div className="text-gray-600 px-2 py-1 rounded-md text-[11px] font-bold shrink-0">
                             {Number(paper.citations || paper.citationCount).toLocaleString()}
                           </div>
                         ) : null}
                       </Link>
                     ))}
                  </div>
                  {relatedPapers.length > 3 && (
                    <div className="text-center mt-6">
                      <button className="text-orange-500 text-[13px] font-bold hover:text-orange-600 transition-colors">View all papers →</button>
                    </div>
                  )}
               </div>
             )}

          </div>
        </div>

        {/* ── LINKS & RESOURCES FOOTER ── */}
        {((model as any).apiUrl || (model as any).repositoryUrl || (model as any).paperUrl) && (
          <div className="mt-8 bg-white border border-gray-100 rounded-3xl p-8 md:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
             <h2 className="flex items-center gap-2 text-[16px] font-extrabold text-black mb-8"><Link2 size={18}/> Links & Resources</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                
                {(model as any).apiUrl && (
                  <div>
                     <div className="text-[13px] text-gray-500 font-bold mb-2">Hugging Face</div>
                     <a href={(model as any).apiUrl} target="_blank" rel="noopener noreferrer" className="text-[14px] font-bold text-black flex items-center gap-1.5 hover:text-orange-500 transition-colors group">
                       <span className="truncate">{((model as any).apiUrl).replace('https://huggingface.co/', '')}</span>
                       <ArrowUpRight size={14} className="text-gray-400 group-hover:text-orange-500 shrink-0"/>
                     </a>
                  </div>
                )}
                
                {(model as any).repositoryUrl && (
                  <div>
                     <div className="text-[13px] text-gray-500 font-bold mb-2">GitHub Repository</div>
                     <a href={(model as any).repositoryUrl} target="_blank" rel="noopener noreferrer" className="text-[14px] font-bold text-black flex items-center gap-1.5 hover:text-orange-500 transition-colors group">
                       <span className="truncate">{((model as any).repositoryUrl).replace('https://', '')}</span>
                       <ArrowUpRight size={14} className="text-gray-400 group-hover:text-orange-500 shrink-0"/>
                     </a>
                  </div>
                )}
                
                {(model as any).paperUrl && (
                  <div>
                     <div className="text-[13px] text-gray-500 font-bold mb-2">Paper (arXiv)</div>
                     <a href={(model as any).paperUrl} target="_blank" rel="noopener noreferrer" className="text-[14px] font-bold text-black flex items-center gap-1.5 hover:text-orange-500 transition-colors group">
                       <span className="truncate">{((model as any).paperUrl).replace('https://', '')}</span>
                       <ArrowUpRight size={14} className="text-gray-400 group-hover:text-orange-500 shrink-0"/>
                     </a>
                  </div>
                )}

             </div>
          </div>
        )}
      </main>
    </div>
  );
}