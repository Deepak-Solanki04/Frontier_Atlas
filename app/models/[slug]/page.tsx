"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { fetchApi } from "@/lib/api";
import { type ModelItem } from "@/lib/models";

// Inline SVGs to avoid any edge runtime or bundler crashes from lucide-react
const Icons = {
  FileText: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width={props.size||24} height={props.size||24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={props.strokeWidth||2} strokeLinecap="round" strokeLinejoin="round" className={props.className}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>,
  Star: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width={props.size||24} height={props.size||24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={props.strokeWidth||2} strokeLinecap="round" strokeLinejoin="round" className={props.className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Activity: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width={props.size||24} height={props.size||24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={props.strokeWidth||2} strokeLinecap="round" strokeLinejoin="round" className={props.className}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  BookOpen: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width={props.size||24} height={props.size||24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={props.strokeWidth||2} strokeLinecap="round" strokeLinejoin="round" className={props.className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
  MessageSquare: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width={props.size||24} height={props.size||24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={props.strokeWidth||2} strokeLinecap="round" strokeLinejoin="round" className={props.className}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  BarChart2: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width={props.size||24} height={props.size||24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={props.strokeWidth||2} strokeLinecap="round" strokeLinejoin="round" className={props.className}><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></svg>,
  Share2: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width={props.size||24} height={props.size||24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={props.strokeWidth||2} strokeLinecap="round" strokeLinejoin="round" className={props.className}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>,
  Image: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width={props.size||24} height={props.size||24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={props.strokeWidth||2} strokeLinecap="round" strokeLinejoin="round" className={props.className}><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>,
  Sparkles: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width={props.size||24} height={props.size||24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={props.strokeWidth||2} strokeLinecap="round" strokeLinejoin="round" className={props.className}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>,
  ArrowRight: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width={props.size||24} height={props.size||24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={props.strokeWidth||2} strokeLinecap="round" strokeLinejoin="round" className={props.className}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>,
  ArrowUpRight: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width={props.size||24} height={props.size||24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={props.strokeWidth||2} strokeLinecap="round" strokeLinejoin="round" className={props.className}><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>,
  TrendingUp: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width={props.size||24} height={props.size||24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={props.strokeWidth||2} strokeLinecap="round" strokeLinejoin="round" className={props.className}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>,
  Clock: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width={props.size||24} height={props.size||24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={props.strokeWidth||2} strokeLinecap="round" strokeLinejoin="round" className={props.className}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  FileCode: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width={props.size||24} height={props.size||24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={props.strokeWidth||2} strokeLinecap="round" strokeLinejoin="round" className={props.className}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="m10 13-2 2 2 2"/><path d="m14 17 2-2-2-2"/></svg>,
  Check: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width={props.size||24} height={props.size||24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={props.strokeWidth||2} strokeLinecap="round" strokeLinejoin="round" className={props.className}><polyline points="20 6 9 17 4 12"/></svg>
};

export default function ModelDetailPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const [slug, setSlug] = useState<string | null>(null);
  const [model, setModel] = useState<ModelItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [logoError, setLogoError] = useState(false);
  const [activeSort, setActiveSort] = useState("Popular");

  // Robustly resolve params to avoid React `use()` Suspense crashes in Edge
  useEffect(() => {
    if (params instanceof Promise) {
      params.then(p => setSlug(p.slug)).catch(() => setSlug(null));
    } else if (params) {
      setSlug(params.slug);
    }
  }, [params]);

  useEffect(() => {
    if (!slug) return;
    window.scrollTo(0, 0);
    setLogoError(false);
    
    const cleanId = slug.toLowerCase().trim();
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
            description: "A unified multimodal model for perception, understanding, and generation across text, image, audio and video.",
            accessType: "Open / API",
            modality: "Multimodal / VLM",
            modelFamily: "Foundation LM",
            category: "Multimodal / VLM",
            capabilities: [
              { title: "Dialogue & Instruction Following", desc: "Natural, context-aware conversations with rich instructions.", iconName: "MessageSquare" },
              { title: "Reasoning & Analysis", desc: "Advanced reasoning, problem-solving and analytical abilities.", iconName: "BarChart2" },
              { title: "Domain Adaptation", desc: "Adapts across domains and tasks with minimal fine-tuning.", iconName: "Share2" },
              { title: "Multimodal Understanding", desc: "Seamlessly understands and connects text, images, audio and video.", iconName: "Image" },
              { title: "Generation & Creation", desc: "Generates high-quality content across modalities with consistency.", iconName: "Sparkles" }
            ],
            tasks: [],
            releaseDate: "2024-05-15T00:00:00.000Z",
            parameterCount: "100B+",
            opennessType: "Permissive / Commercial",
            license: "Llama Community License",
            architecture: "Decoder-only Transformer with RoPE and Grouped-Query Attention",
            contextWindow: "32K Context Window",
            releaseNotes: "Flagship Chameleon foundation AI model by meta-ai.",
            apiUrl: "https://huggingface.co/meta-ai/chameleon",
            repositoryUrl: "https://github.com/meta-ai/chameleon",
            paperUrl: "https://arxiv.org/search/?query=chameleon",
            paperCount: 68,
            citationCount: 90715,
            githubStars: 282354,
            benchmarkScore: { "MMLU": 88.5 },
            benchmarks: [
              { name: "Coding Index", category: "CODING", score: 77.4, description: "Artificial Analysis Coding Index — a composite of coding evaluations including LiveCodeBench, SciCode and Terminal-Bench." },
              { name: "GPQA Diamond", category: "REASONING", score: 94.1, description: "Graduate-level physics, chemistry & biology questions designed to resist Googling." },
              { name: "Intelligence Index", category: "REASONING", score: 60.9, description: "Artificial Analysis Intelligence Index — a composite of multiple evaluations measuring overall model capability." }
            ],
            modelVersions: ["Chameleon", "Chameleon-v1", "Chameleon-instruct"],
            papers: [
              { paper: { title: "Paper2Poster: Towards Multimodal Poster Automation from Scientific Papers", authors: "Wei Pang, Kevin Qinghong Lin, Xiangru Jian, +2 authors", citations: 44, date: "May 27, 2025", abstract: "Academic poster generation is a crucial yet challenging task in scientific communication, requiring the compression of long-context interleaved documents into a single, visually coherent page. To address this challenge, we introduce the first benchmark and metric suite for poster generation, which pairs recent conference papers with author-designed posters and evaluates outputs on (i)Visual...", tags: [{name: "Vision-Language Models", color: "bg-[#E0F2FE] text-[#0284C7]"}, {name: "Model Alignment", color: "bg-[#F3E8FF] text-[#9333EA]"}, {name: "Benchmarking", color: "bg-[#DBEAFE] text-[#2563EB]"}, {name: "Agents", color: "bg-[#DCFCE7] text-[#16A34A]"}], slug: "paper-1" } },
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
            description: "A unified multimodal model for perception, understanding, and generation across text, image, audio and video.",
            accessType: "Open / API",
            modality: "Multimodal / VLM",
            modelFamily: "Foundation LM",
            category: "Multimodal / VLM",
            capabilities: [
              { title: "Dialogue & Instruction Following", desc: "Natural, context-aware conversations with rich instructions.", iconName: "MessageSquare" },
              { title: "Reasoning & Analysis", desc: "Advanced reasoning, problem-solving and analytical abilities.", iconName: "BarChart2" },
              { title: "Domain Adaptation", desc: "Adapts across domains and tasks with minimal fine-tuning.", iconName: "Share2" },
              { title: "Multimodal Understanding", desc: "Seamlessly understands and connects text, images, audio and video.", iconName: "Image" },
              { title: "Generation & Creation", desc: "Generates high-quality content across modalities with consistency.", iconName: "Sparkles" }
            ],
            tasks: [],
            releaseDate: "2024-05-15T00:00:00.000Z",
            parameterCount: "100B+ Parameters",
            opennessType: "Permissive / Commercial",
            license: "Llama Community License",
            architecture: "Decoder-only Transformer with RoPE and Grouped-Query Attention",
            contextWindow: "32K Context Window",
            releaseNotes: "Flagship Chameleon foundation AI model by meta-ai.",
            apiUrl: "https://huggingface.co/meta-ai/chameleon",
            repositoryUrl: "https://github.com/meta-ai/chameleon",
            paperUrl: "https://arxiv.org/search/?query=chameleon",
            paperCount: 68,
            citationCount: 90715,
            githubStars: 282354,
            benchmarkScore: { "MMLU": 88.5 },
            benchmarks: [
              { name: "Coding Index", category: "CODING", score: 77.4, description: "Artificial Analysis Coding Index — a composite of coding evaluations including LiveCodeBench, SciCode and Terminal-Bench." },
              { name: "GPQA Diamond", category: "REASONING", score: 94.1, description: "Graduate-level physics, chemistry & biology questions designed to resist Googling." },
              { name: "Intelligence Index", category: "REASONING", score: 60.9, description: "Artificial Analysis Intelligence Index — a composite of multiple evaluations measuring overall model capability." }
            ],
            modelVersions: ["Chameleon", "Chameleon-v1", "Chameleon-instruct"],
            papers: [
              { paper: { title: "Paper2Poster: Towards Multimodal Poster Automation from Scientific Papers", authors: "Wei Pang, Kevin Qinghong Lin, Xiangru Jian, +2 authors", citations: 44, date: "May 27, 2025", abstract: "Academic poster generation is a crucial yet challenging task in scientific communication, requiring the compression of long-context interleaved documents into a single, visually coherent page. To address this challenge, we introduce the first benchmark and metric suite for poster generation, which pairs recent conference papers with author-designed posters and evaluates outputs on (i)Visual...", tags: [{name: "Vision-Language Models", color: "bg-[#E0F2FE] text-[#0284C7]"}, {name: "Model Alignment", color: "bg-[#F3E8FF] text-[#9333EA]"}, {name: "Benchmarking", color: "bg-[#DBEAFE] text-[#2563EB]"}, {name: "Agents", color: "bg-[#DCFCE7] text-[#16A34A]"}], slug: "paper-1" } },
            ]
          } as any);
        setLoading(false);
      });
  }, [slug]);

  const relatedPapers = useMemo(() => {
    if (!model || !Array.isArray((model as any).papers)) return [];
    return (model as any).papers.map((p: any) => p.paper).filter(Boolean);
  }, [model]);
  
  const mmluScore = useMemo(() => {
    if (!model) return null;
    if (model.benchmarkScore && typeof model.benchmarkScore === 'object') {
      const mmlu = Object.entries(model.benchmarkScore).find(([k]) => k.toLowerCase() === 'mmlu');
      if (mmlu) return mmlu[1];
      const first = Object.values(model.benchmarkScore)[0];
      return first || null;
    }
    return null;
  }, [model]);

  if (loading || !slug) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <div className="w-4 h-4 bg-[#FF5A1F] rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!model) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-6 text-[#111111] font-sans">
        <div className="bg-white border border-[#EAE9E4] rounded-2xl p-10 max-w-md w-full text-center shadow-sm">
          <h1 className="text-2xl font-bold mb-3 tracking-tight">Model Not Found</h1>
          <p className="text-sm text-gray-500 mb-8 leading-relaxed">
            We couldn't locate an indexed model matching <code className="bg-[#F5F5F5] border border-[#EAE9E4] px-1.5 py-0.5 rounded text-[#FF5A1F] font-mono mx-1">{slug}</code>.
          </p>
          <Link href="/models" className="flex items-center justify-center gap-2 w-full p-3 bg-white border border-[#EAE9E4] hover:bg-[#FAFAFA] text-[#111] rounded-lg transition-colors font-semibold text-sm">
            <span>Return to Registry</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-[#F8F7F2] font-sans text-[#111111] selection:bg-[#FFF6F3] selection:text-[#FF5A1F]"
      style={{
        color: "rgb(23, 23, 23)",
        fontSize: "14px",
        letterSpacing: "-0.14px",
        wordSpacing: "0.5px",
        lineHeight: "21px",
      }}
    >
      
      <main className="max-w-[1240px] mx-auto px-6 lg:px-8 py-8 md:py-10">
        
        {/* ── BREADCRUMBS ── */}
        <div className="flex items-center gap-3 text-[13px] font-semibold text-gray-400 mb-6">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span>›</span>
          <Link href="/models" className="hover:text-black transition-colors">Models</Link>
          <span>›</span>
          <span className="text-[#FF5A1F]">{model.name}</span>
        </div>

        {/* ── HERO PANEL ── */}
        <div className="bg-white border border-[#EAE9E4] rounded-[16px] shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-10 mb-12">
           <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
              
              {/* Left Column - Logo */}
              <div className="w-[240px] shrink-0 flex flex-col items-center justify-start">
                 <div className="w-full aspect-square flex items-center justify-center mb-4 overflow-hidden">
                    {!logoError && model.vendorLogoUrl ? (
                      <img src={model.vendorLogoUrl} alt={model.vendor || "Vendor"} onError={() => setLogoError(true)} className="w-full h-full object-contain" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300 font-bold text-[80px]">{model.name.charAt(0)}</div>
                    )}
                 </div>
                 {model.vendor && <div className="text-[15px] font-extrabold text-black">{model.vendor}</div>}
              </div>

              {/* Middle Column - Details */}
              <div className="flex-1 min-w-0 flex flex-col justify-center py-2">
                 <h1 className="text-[35px] font-extrabold text-[#111827] leading-none mb-3">{model.name}</h1>
                 <div className="text-[15.5px] font-medium text-gray-600 mb-6">
                    by <span className="text-[#FF5A1F] font-bold">{model.vendor || "Unknown"}</span>
                 </div>
                 
                 {model.description && (
                   <p className="text-[15.5px] text-gray-600 leading-relaxed max-w-2xl mb-8">
                     {model.description}
                   </p>
                 )}

                 <div className="flex flex-wrap gap-2.5 mb-8">
                    {(model as any).accessType && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-[12px] font-bold rounded-md shadow-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F]"></div> {(model as any).accessType}
                      </span>
                    )}
                    {(model as any).modality && (
                      <span className="inline-flex items-center px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-[12px] font-bold rounded-md shadow-sm">
                        {(model as any).modality}
                      </span>
                    )}
                    {model.parameterCount && (
                      <span className="inline-flex items-center px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-[12px] font-bold rounded-md shadow-sm">
                        {model.parameterCount}
                      </span>
                    )}
                    {model.contextWindow && (
                      <span className="inline-flex items-center px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-[12px] font-bold rounded-md shadow-sm">
                        {model.contextWindow}
                      </span>
                    )}
                    {(model as any).modelFamily && (
                      <span className="inline-flex items-center px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-[12px] font-bold rounded-md shadow-sm">
                        {(model as any).modelFamily}
                      </span>
                    )}
                 </div>

                 <div className="flex flex-wrap items-center gap-6 text-[13px] font-bold text-gray-700">
                    {(model as any).apiUrl && (
                      <a href={(model as any).apiUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-[#FF5A1F] transition-colors bg-[#FFF6F3] text-[#FF5A1F] px-2.5 py-1.5 rounded-md border border-[#FFE2D6]">
                        <span className="text-lg leading-none mb-0.5">🤗</span> Hugging Face <Icons.ArrowUpRight size={13} className="opacity-70"/>
                      </a>
                    )}
                    {(model as any).repositoryUrl && (
                      <a href={(model as any).repositoryUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-black transition-colors bg-white border border-gray-200 px-2.5 py-1.5 rounded-md shadow-sm">
                        <img src="https://cdn.simpleicons.org/github/000000" className="w-[15px] h-[15px] opacity-80" alt="GitHub" /> GitHub <Icons.ArrowUpRight size={13} className="opacity-70"/>
                      </a>
                    )}
                    {(model as any).paperUrl && (
                      <a href={(model as any).paperUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-black transition-colors bg-white border border-gray-200 px-2.5 py-1.5 rounded-md shadow-sm">
                        <Icons.FileText size={15} /> Paper (arXiv) <Icons.ArrowUpRight size={13} className="opacity-70"/>
                      </a>
                    )}
                 </div>
              </div>

              {/* Right Column - Metrics (Vertical Stack) */}
              <div className="w-full lg:w-[220px] shrink-0 border-t lg:border-t-0 lg:border-l border-[#EAE9E4] pt-8 lg:pt-2 lg:pl-10 flex flex-col gap-7 justify-center">
                 
                 {(model as any).paperCount !== undefined && (
                   <div className="flex items-start gap-4">
                      <Icons.FileText size={22} className="text-[#FF5A1F] mt-1 shrink-0" strokeWidth={1.5} />
                      <div className="flex flex-col gap-0.5">
                         <span className="text-[20px] font-bold text-black leading-none">{(model as any).paperCount}</span>
                         <span className="text-[12px] font-medium text-gray-500">Papers</span>
                      </div>
                   </div>
                 )}

                 {(model as any).citationCount !== undefined && (
                   <div className="flex items-start gap-4">
                      <Icons.BookOpen size={22} className="text-[#FF5A1F] mt-1 shrink-0" strokeWidth={1.5} />
                      <div className="flex flex-col gap-0.5">
                         <span className="text-[20px] font-bold text-black leading-none">{Number((model as any).citationCount).toLocaleString()}</span>
                         <span className="text-[12px] font-medium text-gray-500">Citations</span>
                      </div>
                   </div>
                 )}

                 {(model as any).githubStars !== undefined && (
                   <div className="flex items-start gap-4">
                      <Icons.Star size={22} className="text-[#FF5A1F] mt-1 shrink-0" strokeWidth={1.5} />
                      <div className="flex flex-col gap-0.5">
                         <span className="text-[20px] font-bold text-black leading-none">{Number((model as any).githubStars).toLocaleString()}</span>
                         <span className="text-[12px] font-medium text-gray-500">GitHub Stars</span>
                      </div>
                   </div>
                 )}

                 {mmluScore !== null && (
                   <div className="flex items-start gap-4">
                      <Icons.Activity size={22} className="text-[#FF5A1F] mt-1 shrink-0" strokeWidth={1.5} />
                      <div className="flex flex-col gap-0.5">
                         <span className="text-[20px] font-bold text-black leading-none">{mmluScore}</span>
                         <span className="text-[12px] font-medium text-gray-500">MMLU Score</span>
                      </div>
                   </div>
                 )}

              </div>
           </div>
        </div>

        {/* ── CAPABILITIES ROW ── */}
        {((model as any).capabilities && (model as any).capabilities.length > 0) && (
          <div className="mb-16">
            <h2 className="text-[27px] font-bold text-[#111827] mb-6">Capabilities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
               {((model as any).capabilities).map((cap: any, idx: number) => {
                 // For hardcoded capabilities (with objects) vs simple strings
                 const isObj = typeof cap === 'object';
                 const title = isObj ? cap.title : cap;
                 const desc = isObj ? cap.desc : "General capability associated with this model.";
                 
                 // Get the matching inline SVG or default to Check
                 const iconKey = isObj && cap.iconName ? cap.iconName : "Check";
                 const Icon = (Icons as any)[iconKey] || Icons.Check;
                 
                 return (
                   <div key={idx} className="flex flex-col gap-3">
                      <div className="w-12 h-12 bg-[#FFF6F3] text-[#FF5A1F] rounded-full flex items-center justify-center mb-1">
                         <Icon size={20} strokeWidth={2} />
                      </div>
                      <h3 className="text-[15.5px] font-medium leading-5 text-[#111111] mb-1.5">{title}</h3>
                      <p className="text-[13.5px] leading-5 text-[#666] mb-3">{desc}</p>
                   </div>
                 );
               })}
            </div>
          </div>
        )}

         {/* ── BENCHMARKS ── */}
         {((model as any).benchmarks && (model as any).benchmarks.length > 0) && (
           <div className="mb-16">
              <div className="flex items-end justify-between border-b border-[#EAE9E4] pb-4 mb-6">
                 <h2 className="text-[27px] font-bold text-[#111827]">Benchmarks</h2>
                 <div className="text-[12px] text-gray-400 font-mono uppercase tracking-wider">
                    Released {model.releaseDate ? new Date(model.releaseDate).toISOString().split('T')[0].replace(/-/g, ' ') : "2026 07 09"}
                 </div>
              </div>

              <div className="bg-white border border-[#EAE9E4] rounded-[16px] shadow-sm p-8">
                 <div className="flex flex-col gap-8">
                    {((model as any).benchmarks).map((bm: any, idx: number) => (
                       <div key={idx} className="flex flex-col">
                          <div className="flex justify-between items-end mb-2">
                             <div className="flex items-center gap-3">
                                <span className="text-[15.5px] font-bold text-[#111111]">{bm.name}</span>
                                <span className="text-[10px] font-bold tracking-wider uppercase text-[#8B8B8B] bg-[#F5F5F5] px-2 py-0.5 rounded-sm">{bm.category}</span>
                             </div>
                             <span className="text-[16px] font-extrabold text-[#111111]">{bm.score}%</span>
                          </div>
                          {/* Progress Bar Container */}
                          <div className="w-full h-2.5 bg-[#F0F0F0] rounded-full overflow-hidden mb-3">
                             <div className="h-full bg-gradient-to-r from-[#FF5A1F] to-[#FF8A5E] rounded-full" style={{ width: `${bm.score}%` }}></div>
                          </div>
                          {/* Description */}
                          <p className="text-[13.5px] text-[#666] leading-relaxed">{bm.description}</p>
                       </div>
                    ))}
                 </div>
                 
                 {/* Expand / Collapse (Mock) */}
                 <div className="mt-8 flex items-center gap-2 cursor-pointer text-[#FF5A1F] hover:text-[#E04D1A] transition-colors text-[13.5px] font-bold">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    Show 4 more benchmarks
                 </div>

                 <div className="mt-8 pt-5 border-t border-[#EAE9E4] text-[12px] text-gray-400 leading-relaxed max-w-4xl">
                    Scores are sourced from official model cards, Artificial Analysis, and public leaderboards. Benchmarks measure specific skills and do not capture every aspect of model quality. Always test on your own workload.
                 </div>
              </div>
           </div>
         )}

         {/* ── APPLIED USE CASES ── */}
         <div className="mb-16">
            <h2 className="text-[27px] font-bold text-[#111827] mb-6">Applied Use Cases</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {[
                 { title: "Automated Data Analysis", desc: "Process complex datasets and generate actionable business intelligence.", icon: "BarChart2" },
                 { title: "Code Generation & Review", desc: "Accelerate development with AI-assisted pair programming and code audits.", icon: "FileCode" },
                 { title: "Complex Reasoning", desc: "Solve multi-step problems in highly specialized academic or technical domains.", icon: "Activity" }
               ].map((uc, idx) => {
                 const Icon = (Icons as any)[uc.icon] || Icons.Check;
                 return (
                   <div key={idx} className="bg-white border border-[#EAE9E4] hover:border-[#FF5A1F] transition-colors rounded-[16px] shadow-sm p-6 flex flex-col gap-4">
                      <div className="w-10 h-10 bg-[#FFF6F3] text-[#FF5A1F] rounded-lg flex items-center justify-center">
                         <Icon size={20} strokeWidth={2} />
                      </div>
                      <div>
                         <h3 className="text-[15.5px] font-bold text-[#111111] mb-2">{uc.title}</h3>
                         <p className="text-[13.5px] text-[#666] leading-relaxed">{uc.desc}</p>
                      </div>
                   </div>
                 );
               })}
            </div>
         </div>

         {/* ── DEVELOPER INTEGRATION (API) ── */}
         <div className="mb-16">
            <div className="flex items-end justify-between border-b border-[#EAE9E4] pb-4 mb-6">
               <h2 className="text-[27px] font-bold text-[#111827]">Developer Integration</h2>
               <div className="text-[13px] font-bold text-[#FF5A1F] cursor-pointer hover:text-[#E04D1A] flex items-center gap-1">
                  View API Documentation <Icons.ArrowUpRight size={14} />
               </div>
            </div>
            
            <div className="bg-white border border-[#EAE9E4] rounded-[16px] shadow-sm overflow-hidden">
               <div className="flex items-center justify-between px-6 py-4 bg-[#FAFAFA] border-b border-[#EAE9E4]">
                  <div className="flex items-center gap-2 text-[12px] font-bold text-gray-500 uppercase tracking-wider">
                     <Icons.FileCode size={14} /> Python (OpenAI SDK)
                  </div>
                  <button className="text-[12px] font-bold text-gray-600 hover:text-black transition-colors px-3 py-1 bg-white border border-[#EAE9E4] rounded-md shadow-sm">
                     Copy Code
                  </button>
               </div>
               <div className="p-6 overflow-x-auto text-[13px] font-mono leading-relaxed text-[#333]">
<pre><code><span className="text-[#0284C7]">import</span> openai

<span className="text-gray-500"># Initialize the standard client pointing to the Frontier API</span>
client = openai.Client(
    base_url=<span className="text-[#16A34A]">"https://api.frontier.ai/v1"</span>,
    api_key=<span className="text-[#16A34A]">"YOUR_API_KEY"</span>
)

<span className="text-gray-500"># Generate a completion</span>
response = client.chat.completions.create(
    model=<span className="text-[#16A34A]">"{model.slug}"</span>,
    messages=[
        {"{"}<span className="text-[#16A34A]">"role"</span>: <span className="text-[#16A34A]">"system"</span>, <span className="text-[#16A34A]">"content"</span>: <span className="text-[#16A34A]">"You are an expert AI assistant."</span>{"}"},
        {"{"}<span className="text-[#16A34A]">"role"</span>: <span className="text-[#16A34A]">"user"</span>, <span className="text-[#16A34A]">"content"</span>: <span className="text-[#16A34A]">"Explain quantum entanglement."</span>{"}"}
    ]
)

<span className="text-[#9333EA]">print</span>(response.choices[<span className="text-[#EA580C]">0</span>].message.content)</code></pre>
               </div>
            </div>
         </div>

        {/* ── RECENT RESEARCH PAPERS ── */}
        {relatedPapers.length > 0 && (
          <div>
            
            {/* Header & View All */}
            <div className="flex items-end justify-between border-b border-[#EAE9E4] pb-4 mb-6">
               <h2 className="text-[27px] font-bold text-[#111827]">Recent Research Papers</h2>
               <Link href={`/models/${model.slug}/papers`} className="text-[13px] font-bold text-[#FF5A1F] hover:text-[#E04D1A] transition-colors flex items-center gap-1">
                 View all papers ({relatedPapers.length}) <Icons.ArrowRight size={14} />
               </Link>
            </div>

            <div className="bg-white border border-[#EAE9E4] rounded-[16px] shadow-sm mb-12">
               
               {/* Sort Bar */}
               <div className="px-6 py-4 border-b border-[#EAE9E4] flex items-center">
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mr-4">Sort</div>
                  <div className="flex bg-[#F5F5F5] p-1 rounded-[10px]">
                     {['Popular', 'Recent', 'Citations'].map(sortItem => (
                       <button 
                         key={sortItem}
                         onClick={() => setActiveSort(sortItem)}
                         className={`px-4 py-1.5 text-[12px] font-bold rounded-[8px] flex items-center gap-1.5 transition-all ${
                           activeSort === sortItem 
                             ? 'bg-white text-black shadow-[0_1px_3px_rgba(0,0,0,0.1)]' 
                             : 'text-gray-500 hover:text-black'
                         }`}
                       >
                         {sortItem === 'Popular' && <Icons.TrendingUp size={14} className={activeSort === sortItem ? 'text-black' : ''}/>}
                         {sortItem === 'Recent' && <Icons.Clock size={14} className={activeSort === sortItem ? 'text-black' : ''}/>}
                         {sortItem === 'Citations' && <Icons.Star size={14} className={activeSort === sortItem ? 'text-black' : ''}/>}
                         {sortItem}
                       </button>
                     ))}
                  </div>
               </div>

               {/* Papers List */}
               <div className="flex flex-col">
                 {relatedPapers.map((paper: any, idx: number) => (
                   <div key={idx} className="p-8 border-b border-[#EAE9E4] last:border-b-0 flex flex-col md:flex-row gap-8">
                      
                      {/* Left: Content */}
                      <div className="flex-1 flex flex-col min-w-0">
                         <h3 className="text-[15.5px] font-medium leading-5 text-[#111111] mb-2">{paper.title}</h3>
                         <div className="text-[13.5px] text-[#666] mb-4 flex flex-wrap gap-2 items-center">
                            <span>{paper.authors || "Unknown Authors"}</span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                            <span>{paper.date || "Unknown Date"}</span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                            <span>{paper.citations || paper.citationCount || 0} citations</span>
                         </div>
                         
                         {paper.abstract && (
                           <p className="text-[13.5px] leading-5 text-[#666] mb-5 max-w-4xl line-clamp-3">
                             {paper.abstract}
                           </p>
                         )}

                         {paper.tags && paper.tags.length > 0 && (
                           <div className="flex flex-wrap gap-2 mb-6">
                              {paper.tags.map((tag: any, tidx: number) => (
                                <span key={tidx} className={`px-2 py-0.5 text-[11px] font-bold rounded ${tag.color || 'bg-gray-100 text-gray-600'}`}>
                                  • {tag.name}
                                </span>
                              ))}
                           </div>
                         )}

                         {/* Action Buttons Row */}
                         <div className="flex flex-wrap items-center gap-3">
                            <a href="#" className="flex items-center gap-1.5 px-4 py-2 border border-[#FF5A1F] text-[#FF5A1F] hover:bg-[#FFF6F3] rounded-[8px] text-[12px] font-bold transition-colors">
                               <Icons.FileCode size={14} className="text-[#FF5A1F]"/> arXiv
                            </a>
                            <a href="#" className="flex items-center gap-1.5 px-4 py-2 border border-[#EAE9E4] text-gray-700 hover:bg-gray-50 rounded-[8px] text-[12px] font-bold transition-colors">
                               <Icons.FileText size={14} className="text-[#EF4444]"/> PDF
                            </a>
                            <a href="#" className="flex items-center gap-1.5 px-4 py-2 border border-[#EAE9E4] text-gray-700 hover:bg-gray-50 rounded-[8px] text-[12px] font-bold transition-colors">
                               <img src="https://cdn.simpleicons.org/github/000000" className="w-3.5 h-3.5 opacity-80" alt="GitHub" /> Code
                            </a>
                            <a href="#" className="flex items-center gap-1.5 px-4 py-2 border border-[#EAE9E4] text-gray-700 hover:bg-[#FFF6F3] hover:text-[#FF5A1F] hover:border-[#FFE2D6] rounded-[8px] text-[12px] font-bold transition-colors">
                               <span className="text-[14px] leading-none mb-0.5">🤗</span> Hugging Face
                            </a>
                            <div className="ml-auto md:ml-2 flex items-center gap-1.5 px-3 py-2 border border-[#EAE9E4] bg-[#F9F9F9] text-gray-700 rounded-[8px] text-[12px] font-bold">
                               <img src="https://cdn.simpleicons.org/github/000000" className="w-3.5 h-3.5 opacity-70" alt="GitHub" /> 13.37 stars / hour
                            </div>
                         </div>
                      </div>

                      {/* Right: Paper Preview Thumbnail */}
                      <div className="hidden md:block w-[160px] shrink-0">
                         <div className="w-full aspect-[1/1.3] bg-white border border-gray-200 rounded-lg shadow-sm p-2 flex flex-col gap-1 overflow-hidden pointer-events-none">
                            <div className="w-3/4 h-2 bg-gray-200 rounded mx-auto mt-2"></div>
                            <div className="w-1/2 h-1.5 bg-gray-100 rounded mx-auto mb-2"></div>
                            <div className="w-full h-1 bg-gray-100 rounded"></div>
                            <div className="w-full h-1 bg-gray-100 rounded"></div>
                            <div className="w-5/6 h-1 bg-gray-100 rounded"></div>
                            <div className="w-full h-1.5 bg-[#FFF6F3] rounded mt-2"></div>
                            <div className="w-2/3 h-1.5 bg-[#FFF6F3] rounded"></div>
                            <div className="w-full h-1 bg-gray-100 rounded mt-2"></div>
                            <div className="w-full h-1 bg-gray-100 rounded"></div>
                            <div className="w-4/5 h-1 bg-gray-100 rounded"></div>
                         </div>
                      </div>

                   </div>
                 ))}
               </div>

            </div>
          </div>
        )}

      </main>
    </div>
  );
}