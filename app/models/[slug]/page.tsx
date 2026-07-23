"use client";

import React, { useState, useEffect, useMemo, use } from "react";
import Link from "next/link";
import { 
  Cpu, Layers, ExternalLink, Check, Copy, ArrowLeft, 
  Sparkles, BookOpen, Terminal, Zap, ShieldCheck, 
  Eye, Activity, Box, Sliders, BarChart3,
  Brain, Wrench, Link2
} from "lucide-react";
import { fetchApi } from "@/lib/api";
import { type ModelItem } from "@/lib/models";

function getEnrichedAbstract(paper: any): string {
  return paper.abstract || "";
}

function getSotaRankingHtml(paper: any): string {
  const badge = '<span class="inline-flex items-center gap-1 bg-[#FFF6F3] text-[#FF5A1F] font-bold text-[11px] px-2 py-0.5 rounded border border-[#FFEDD5] uppercase tracking-wider mr-2"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg> SOTA Ranking</span>';
  
  if (paper.sotaHtml) {
    return badge + paper.sotaHtml;
  }
  
  return "";
}

function PaperCard({ paper }: { paper: any }) {
  const enrichedAbstract = getEnrichedAbstract(paper);
  const sotaRankingHtml = getSotaRankingHtml(paper);

  return (
    <article className="bg-white rounded-[12px] border border-[#F0F0F0] p-5 hover:shadow-md transition-shadow mb-4 flex flex-col md:flex-row gap-5">
      {/* Thumbnail */}
      {paper.thumbnail && (
        <Link href="#" className="shrink-0">
          <img 
            src={paper.thumbnail} 
            alt={paper.title} 
            className="w-full md:w-48 h-32 md:h-full max-h-40 object-cover rounded-[8px] bg-[#F8F7F2] border border-[#EAE9E4]"
          />
        </Link>
      )}

      {/* Body */}
      <div className="flex-1 min-w-0 flex flex-col">
        <h2 className="text-lg font-normal text-[#111111] leading-snug mb-1 tracking-tight">
          <Link href="#" className="hover:text-[#FF5A1F] transition-colors no-underline">{paper.title}</Link>
        </h2>
        
        <div className="text-[13px] font-medium text-[#555555] mb-3">
          {paper.meta}
        </div>
        
        <p className="text-[14px] text-[#555555] leading-relaxed mb-4 line-clamp-3">
          {enrichedAbstract}
        </p>

        {/* SOTA Ranking */}
        <div 
          className="mb-4 text-[13px] text-[#111111] font-medium leading-relaxed" 
          dangerouslySetInnerHTML={{ __html: sotaRankingHtml }} 
        />

        {/* Domain tags */}
        {(() => {
          const allTags = [
            ...(paper.tagsRow1 || []).map((t: any) => typeof t === 'object' ? t.text : t),
            ...(paper.tagsRow2 || [])
          ].filter((t: string) => t && !t.startsWith('+'));

          return allTags.length > 0 ? (
            <div className="flex flex-wrap gap-2 mb-4">
              {allTags.map((tagText: string, i: number) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#F8F7F2] border border-[#EAE9E4] text-[#555555] text-[11px] font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F]" />
                  {tagText}
                </span>
              ))}
            </div>
          ) : null;
        })()}

        {/* Metrics */}
        <div className="flex flex-wrap items-center gap-6 mt-auto pt-4 border-t border-[#F0F0F0]">
          {paper.metrics?.map((metric: any, i: number) => {
            const isUpvote = metric.icon === '↑' || metric.label === 'Upvotes';
            return (
              <div key={i} className="flex items-center gap-2">
                <div className={`flex items-center justify-center ${isUpvote ? 'text-[#FF5A1F]' : 'text-[#8B8B8B]'}`}>
                  {metric.icon === '↑' ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="18 15 12 9 6 15"/></svg>
                  ) : metric.icon === 'github' ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
                  ) : metric.icon === 'chat' ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                  ) : null}
                </div>
                <div className="flex flex-col">
                  <span className={`text-[13px] font-extrabold leading-none ${isUpvote ? 'text-[#FF5A1F]' : 'text-[#111111]'}`}>{metric.value}</span>
                  {metric.label && <span className="text-[10px] font-bold text-[#8B8B8B] uppercase tracking-widest mt-0.5">{metric.label}</span>}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </article>
  );
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

  // Benchmarks Comparison Mode ("standard" | "human")
  const [evalMode, setEvalMode] = useState<"standard" | "human">("standard");

  useEffect(() => {
    window.scrollTo(0, 0);
    setLogoError(false);
    if (resolvedParams?.slug) {
      const cleanId = resolvedParams.slug.toLowerCase().trim();
      fetchApi<{ status: string, data: any }>(`/api/v1/models/${cleanId}`)
        .then(response => {
          if (response.status === "success" && response.data) {
            setModel(response.data);
          } else {
            setModel(null);
          }
          setLoading(false);
        })
        .catch(err => {
        console.error("Failed to load model:", err);
        setLoading(false);
      });
    }
  }, [resolvedParams?.slug]);

  // Find related research papers citing or mentioning this model
  const relatedPapers = useMemo(() => {
    if (!model || !(model as any).papers) return [];
    return (model as any).papers.map((p: any) => p.paper).filter(Boolean).slice(0, 10);
  }, [model]);
  
  const benchmarkArray = useMemo(() => {
    if (!model || !model.benchmarkScore) return [];
    return Object.entries(model.benchmarkScore).map(([key, value]) => {
      return {
        name: key.toUpperCase(),
        score: typeof value === 'number' ? value.toFixed(1) : value,
        value: Number(value) || 0,
        color: "#FF5A1F" // fallback brand color
      };
    });
  }, [model]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="text-center p-10">
          <div className="w-12 h-12 rounded-full bg-[#111111] flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Cpu size={24} className="text-[#FF5A1F]" />
          </div>
          <div className="text-[13px] font-bold text-[#8B8B8B] uppercase tracking-wider animate-pulse">Loading Architecture Profile...</div>
        </div>
      </div>
    );
  }

  if (!model) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-6">
        <div className="bg-white border border-[#F0F0F0] rounded-[12px] p-10 max-w-md w-full text-center shadow-sm">
          <div className="w-16 h-16 bg-[#FFF6F3] text-[#FF5A1F] rounded-full flex items-center justify-center mx-auto mb-5 border border-[#FFEDD5]">
            <Sparkles size={32} />
          </div>
          <h1 className="text-2xl font-extrabold text-[#111111] mb-3 tracking-tight">Model Profile Not Found</h1>
          <p className="text-base text-[#555555] mb-8 leading-relaxed font-medium">
            We couldn&apos;t find an indexed AI foundation model matching <code className="bg-[#F8F7F2] border border-[#EAE9E4] px-2 py-1 rounded text-[#FF5A1F] text-[13px] font-bold mx-1">{resolvedParams.slug}</code>.
          </p>
          <Link
            href="/models"
            className="flex items-center justify-center gap-2 w-full p-3.5 bg-[#111111] hover:bg-[#222222] text-white rounded-[8px] transition-colors font-bold text-sm no-underline shadow-sm"
          >
            <ArrowLeft size={16} />
            <span>Return to Models Directory</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24">
      
      {/* ── TOP LUXURY NAVIGATION BAR (Glassmorphism + Sticky) ── */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#F0F0F0]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/models" className="flex items-center gap-2 text-[#555555] hover:text-[#111111] transition-colors text-sm font-semibold no-underline">
              <ArrowLeft size={16} />
              <span>Directory</span>
            </Link>
            <div className="hidden md:flex items-center gap-2 text-[13px] text-[#8B8B8B]">
              <Link href="/" className="hover:text-[#111111] transition-colors no-underline">Home</Link>
              <span>&gt;</span>
              <Link href="/models" className="hover:text-[#111111] transition-colors no-underline">Directory</Link>
              <span>&gt;</span>
              <Link href="/models" className="hover:text-[#111111] transition-colors no-underline">Models</Link>
              <span>&gt;</span>
              <span className="text-[#111111] font-medium">{model.name}</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── HERO SECTION: CLEAN LIGHT CARD ── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mt-8">
        <div className="bg-white rounded-[12px] border border-[#F0F0F0] p-6 md:p-10 shadow-sm relative overflow-hidden flex flex-col md:flex-row gap-8 justify-between">
          <div className="flex-1">
          
          {/* Top Metadata Strip */}
          {(model as any).elo && (
            <div className="flex mb-4 relative z-10">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#111111] text-white text-[11px] font-bold uppercase tracking-wider shadow-sm">
                <Zap size={13} style={{ fill: "#ffffff" }} />
                <span>GLOBAL ELO RATING: {(model as any).elo}</span>
              </div>
            </div>
          )}

          {/* Title & Core Summary */}
          <h1 className="text-lg md:text-2xl font-bold text-[#111111] tracking-tight mb-3 relative z-10">
            {model.name}
          </h1>
          <p className="text-[#555555] text-lg max-w-3xl leading-relaxed mb-10 relative z-10 font-medium">
            {model.description}
          </p>

          {/* 4-Cell Interactive Architecture & Spec Pods inside Hero */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
            
            <div className="bg-[#F8F7F2] border border-[#EAE9E4] rounded-[8px] p-3 transition-shadow hover:shadow-md cursor-default">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#8B8B8B]">Architecture Specs</span>
                <Cpu size={14} className="text-[#FF5A1F]" />
              </div>
              <div className="text-base font-bold text-[#111111]">
                {model.parameterCount || "Not Specified"}
              </div>
            </div>

            <div className="bg-[#F8F7F2] border border-[#EAE9E4] rounded-[8px] p-3 transition-shadow hover:shadow-md cursor-default">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#8B8B8B]">Context Capacity</span>
                <Box size={14} className="text-[#3B82F6]" />
              </div>
              <div className="text-base font-bold text-[#111111]">
                {model.contextWindow || "Not Specified"}
              </div>
            </div>

            <div className="bg-[#F8F7F2] border border-[#EAE9E4] rounded-[8px] p-3 transition-shadow hover:shadow-md cursor-default">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#8B8B8B]">Primary Specialization</span>
                <Activity size={14} className="text-[#FF5A1F]" />
              </div>
              <div className="text-base font-bold text-[#111111]">
                {model.category || "General Purpose"}
              </div>
            </div>

            <div className="bg-[#F8F7F2] border border-[#EAE9E4] rounded-[8px] p-3 transition-shadow hover:shadow-md cursor-default">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#8B8B8B]">Literature Citations</span>
                <BookOpen size={14} className="text-[#8B5CF6]" />
              </div>
              <div className="text-base font-bold text-[#111111]">
                {model.paperCount} Verified Papers
              </div>
            </div>
          
          </div>
          </div>

          {/* Logo on the Right Side */}
          {model.vendorLogoUrl && !logoError ? (
            <div className="hidden md:flex flex-col items-end justify-start shrink-0">
              <div className="w-24 h-24 rounded-[12px] bg-[#F8F7F2] border border-[#EAE9E4] p-3 flex items-center justify-center">
                <img 
                  src={model.vendorLogoUrl} 
                  alt={model.vendor} 
                  onError={() => setLogoError(true)}
                  className="w-full h-full object-contain" 
                />
              </div>
            </div>
          ) : (
            <div className="hidden md:flex flex-col items-end justify-start shrink-0">
              <div className="w-24 h-24 rounded-[12px] bg-[#F8F7F2] border border-[#EAE9E4] p-3 flex items-center justify-center text-[#8B8B8B]">
                <Cpu size={40} />
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────────
          TAB 1: VERIFIED ACADEMIC BENCHMARKS & EVALUATION MATRIX
      ───────────────────────────────────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 mt-8">
          
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 bg-white p-5 rounded-[12px] border border-[#F0F0F0]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#FFF6F3] flex items-center justify-center text-[#FF5A1F]">
                <BarChart3 size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#111111] mb-1 tracking-tight">Empirical Evaluation Leaderboard</h2>
                <p className="text-sm font-medium text-[#555555]">Official verified evaluations vs baseline human expert threshold</p>
              </div>
            </div>

            <div className="flex items-center p-1 bg-[#F8F7F2] rounded-[8px] border border-[#EAE9E4]">
              <button
                onClick={() => setEvalMode("standard")}
                className={`px-4 py-2 rounded-[6px] text-[13px] font-bold transition-all ${evalMode === "standard" ? "bg-white shadow-sm text-[#111111] border border-[#EAE9E4]" : "text-[#8B8B8B] hover:text-[#555555] border border-transparent"}`}
              >
                <BarChart3 size={14} className="inline mr-1.5 relative -top-[1px]" /> Standard Matrix
              </button>
              <button
                onClick={() => setEvalMode("human")}
                className={`px-4 py-2 rounded-[6px] text-[13px] font-bold transition-all ${evalMode === "human" ? "bg-white shadow-sm text-[#16A34A] border border-[#EAE9E4]" : "text-[#8B8B8B] hover:text-[#555555] border border-transparent"}`}
              >
                <Zap size={14} className="inline mr-1.5 relative -top-[1px]" /> Human Baseline
              </button>
            </div>
          </div>

          {/* Benchmarks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benchmarkArray && benchmarkArray.length > 0 ? (
              benchmarkArray.map((bm, i) => {
                
                

                return (
                  <div key={i} className="bg-white rounded-[12px] border border-[#F0F0F0] overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-5">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: bm.color || "#FF5A1F" }} />
                            <span className="text-base font-extrabold text-[#111111] tracking-tight">{bm.name}</span>
                          </div>
                          <span className="text-[11px] font-bold text-[#8B8B8B] uppercase tracking-wider">Peer-Reviewed Verification Suite</span>
                        </div>
                        
                        <div className="flex flex-col items-end">
                          <span className="text-xl font-extrabold text-[#111111] tracking-tighter">{bm.score}</span>
                        </div>
                      </div>

                      {/* Gauge Bar */}
                      <div className="mb-2">
                        <div className="flex justify-between items-end mb-2 text-[11px] font-bold">
                          <span className="text-[#8B8B8B] uppercase">Model Capability</span>
                          
                        </div>

                        <div className="relative w-full h-3 bg-[#F0F0F0] rounded-full overflow-hidden">
                          <div
                            className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${bm.value}%`, backgroundColor: bm.color || "#FF5A1F" }}
                          />

                          {/* Human Expert Marker */}
                          
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full bg-white rounded-[12px] border border-[#F0F0F0] p-12 text-center">
                <p className="text-base font-bold text-[#555555]">Extensive evaluation suites are currently being compiled for this model.</p>
              </div>
            )}
          </div>

        </section>



      {/* ─────────────────────────────────────────────────────────────────────────────
          TAB 4: RESEARCH LITERATURE & ACADEMIC BIBLIOGRAPHY
      ───────────────────────────────────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 mt-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-white p-5 rounded-[12px] border border-[#F0F0F0]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#FAF5FF] text-[#8B5CF6] flex items-center justify-center">
                <BookOpen size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#111111] mb-1 tracking-tight">Indexed Academic Citations</h2>
                <p className="text-sm font-medium text-[#555555]">Peer-reviewed literature citing, evaluating, or comparing {model.name}</p>
              </div>
            </div>

            <span className="px-3 py-1.5 bg-[#F8F7F2] border border-[#EAE9E4] rounded-[8px] text-[12px] font-extrabold uppercase tracking-wider text-[#111111]">
              {relatedPapers.length} Papers Found
            </span>
          </div>

          {relatedPapers.length === 0 ? (
            <div className="bg-white rounded-[12px] border border-[#F0F0F0] p-16 text-center">
              <p className="text-lg font-extrabold text-[#555555] mb-5 tracking-tight">No direct paper citations indexed yet.</p>
              <Link href="/trending" className="inline-flex items-center gap-2 px-6 py-3 rounded-[8px] bg-[#FF5A1F] text-white hover:bg-[#e04d16] transition-colors text-sm font-bold no-underline shadow-sm">
                <span>Browse All Trending AI Research</span>
                <ExternalLink size={15} />
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {relatedPapers.map((paper: any, i: number) => (
                <PaperCard key={i} paper={paper} />
              ))}
            </div>
          )}
        </section>
    </div>
  );
}