"use client";

import React, { useState, useEffect, useMemo, use } from "react";
import Link from "next/link";
import { Trophy, Cpu, Layers, ExternalLink, Code2, Check, Copy, ArrowLeft, Share2, Sparkles, BookOpen, Terminal, FileText, LayoutGrid, SlidersHorizontal, ChevronDown, Award, Bookmark } from "lucide-react";
import { getModelById, getAllModelIds, type ModelItem } from "@/lib/models";
import PaperCard from "@/components/PaperCard";
import { topicData } from "@/data/topicData";
import Sidebar from "@/components/Sidebar";

export default function ModelDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const [model, setModel] = useState<ModelItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  // Live Design Concept Switcher state ("A" = Academic Ledger, "B" = Developer Playground, "C" = Editorial Dossier)
  const [activeConcept, setActiveConcept] = useState<"A" | "B" | "C">("A");
  
  // Concept B specific tab state
  const [conceptBTab, setConceptBTab] = useState<"evals" | "code" | "papers">("evals");
  const [codeLang, setCodeLang] = useState<"python" | "curl" | "typescript" | "ollama">("python");

  // Concept C specific TOC state
  const [tocOpen, setTocOpen] = useState(false);

  useEffect(() => {
    if (resolvedParams?.slug) {
      const found = getModelById(resolvedParams.slug);
      setModel(found || null);
      setLoading(false);
    }
  }, [resolvedParams?.slug]);

  const handleCopyQuickstart = (textToCopy?: string) => {
    const text = textToCopy || model?.quickstart;
    if (text) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  };

  // Find related research papers citing or mentioning this model
  const relatedPapers = useMemo(() => {
    if (!model) return [];
    const allPapers = Object.values(topicData).flatMap((t) => t?.papers || []);
    const uniqueMap = new Map();
    allPapers.forEach((p: any) => {
      if (p && p.title && !uniqueMap.has(p.title)) {
        uniqueMap.set(p.title, p);
      }
    });

    const list = Array.from(uniqueMap.values());
    const modelNameLower = model.name.toLowerCase();
    const orgLower = model.org.toLowerCase();
    const tagsLower = model.tags.map((t) => t.toLowerCase());

    return list.filter((paper: any) => {
      const title = (paper.title || "").toLowerCase();
      const abstract = (paper.abstract || "").toLowerCase();
      
      if (title.includes(modelNameLower) || abstract.includes(modelNameLower)) return true;
      if (title.includes(orgLower) || abstract.includes(orgLower)) return true;
      return tagsLower.some((t) => title.includes(t) || abstract.includes(t));
    }).slice(0, 10);
  }, [model]);

  // Generate code variants for Concept B code playground
  const codeVariants = useMemo(() => {
    if (!model) return { python: "", curl: "", typescript: "", ollama: "" };
    const baseId = model.id;
    return {
      python: model.quickstart || `import anthropic\n\nclient = anthropic.Anthropic()\nresponse = client.messages.create(\n  model="${baseId}",\n  max_tokens=1024,\n  messages=[{"role": "user", "content": "Run deep architectural verification."}]\n)`,
      curl: `curl https://api.frontier-atlas.com/v1/chat/completions \\\n  -H "Content-Type: application/json" \\\n  -H "Authorization: Bearer $API_KEY" \\\n  -d '{\n    "model": "${baseId}",\n    "messages": [{"role": "user", "content": "Analyze system topology"}]\n  }'`,
      typescript: `import { FrontierClient } from '@frontier-atlas/sdk';\n\nconst client = new FrontierClient({ apiKey: process.env.API_KEY });\nconst completion = await client.models.invoke('${baseId}', {\n  prompt: 'Synthesize benchmark evaluation matrices.'\n});\nconsole.log(completion.output);`,
      ollama: `# Pull open weights or proxy inference locally\nollama pull ${baseId}\nollama run ${baseId} "Verify algorithmic complexity"`
    };
  }, [model]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F7F2] flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3 animate-pulse text-center">
          <div className="w-12 h-12 rounded-full bg-[#E5E5E0]" />
          <div className="h-6 w-48 bg-[#E5E5E0] rounded" />
          <p className="text-[14px] text-[#8B8B8B] font-mono">Loading live model architecture...</p>
        </div>
      </div>
    );
  }

  if (!model) {
    return (
      <div className="min-h-screen bg-[#F8F7F2] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white border border-[#E5E5E0] rounded-2xl p-8 text-center shadow-lg">
          <div className="w-16 h-16 bg-[#FFF6F3] text-[#FF5A1F] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#FFEDD5]">
            <Sparkles size={28} />
          </div>
          <h1 className="text-[24px] font-black text-[#111111] mb-2">Model Not Found</h1>
          <p className="text-[15px] text-[#555555] mb-6">
            We couldn&apos;t find an AI foundation model matching the slug <code className="bg-[#F8F7F2] px-2 py-0.5 rounded text-[#FF5A1F] font-mono text-[13px]">{resolvedParams.slug}</code>.
          </p>
          <Link
            href="/models"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF5A1F] hover:bg-[#E0462D] text-white font-bold rounded-xl text-[14px] transition-colors shadow-sm"
          >
            <ArrowLeft size={16} />
            <span>Back to Models Directory</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F7F2] text-[#111111] pb-24 selection:bg-[#FF5A1F] selection:text-white">
      {/* ── TOP NAV BAR (Responsive) ── */}
      <header className="sticky top-0 z-50 bg-[#F8F7F2]/95 backdrop-blur-md border-b border-[#EAE9E4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <Link
            href="/models"
            className="flex items-center gap-2 text-[13px] font-bold text-[#555555] hover:text-[#111111] transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-white border border-[#E5E5E0] flex items-center justify-center group-hover:border-[#111111] transition-colors">
              <ArrowLeft size={14} />
            </div>
            <span className="hidden sm:inline">Directory</span>
            <span className="text-[#8B8B8B]">/</span>
            <span className="text-[#111111] font-extrabold truncate max-w-[150px] sm:max-w-none">{model.name}</span>
          </Link>

          {/* ── FLOATING LIVE DESIGN CONCEPT SWITCHER PILL ── */}
          <div className="flex items-center gap-1.5 bg-white border border-[#E5E5E0] rounded-full p-1 shadow-sm overflow-x-auto max-w-[55vw] sm:max-w-none">
            <span className="text-[10px] font-mono font-black uppercase text-[#FF5A1F] px-2.5 py-1 hidden lg:inline flex-shrink-0">
              ✨ Live Design Preview:
            </span>
            <button
              onClick={() => setActiveConcept("A")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono font-bold transition-all flex-shrink-0 ${
                activeConcept === "A"
                  ? "bg-[#111111] text-white shadow-sm"
                  : "text-[#555555] hover:bg-[#F3F4F6]"
              }`}
            >
              <LayoutGrid size={13} />
              <span>Concept A: Academic Ledger</span>
            </button>
            <button
              onClick={() => setActiveConcept("B")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono font-bold transition-all flex-shrink-0 ${
                activeConcept === "B"
                  ? "bg-[#FF5A1F] text-white shadow-sm"
                  : "text-[#555555] hover:bg-[#F3F4F6]"
              }`}
            >
              <Terminal size={13} />
              <span>Concept B: Developer Dashboard</span>
            </button>
            <button
              onClick={() => setActiveConcept("C")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono font-bold transition-all flex-shrink-0 ${
                activeConcept === "C"
                  ? "bg-[#7C3AED] text-white shadow-sm"
                  : "text-[#555555] hover:bg-[#F3F4F6]"
              }`}
            >
              <FileText size={13} />
              <span>Concept C: Editorial Dossier</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-[#E5E5E0] border border-[#E5E5E0] rounded-xl text-[12px] font-bold text-[#333333] transition-colors min-h-[40px]"
            >
              <Share2 size={14} />
              <span className="hidden md:inline">{shareCopied ? "Copied!" : "Share"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────────────────────
          CONCEPT A: "THE ACADEMIC TECHNICAL LEDGER" (Recommended Editorial Layout)
      ───────────────────────────────────────────────────────────────────────────── */}
      {activeConcept === "A" && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* LEFT SIDEBAR (3 cols on desktop) */}
            <div className="hidden lg:block lg:col-span-3 sticky top-24">
              <Sidebar />
            </div>

            {/* RIGHT MAIN COLUMN (9 cols on desktop, 12 on mobile) */}
            <div className="col-span-1 lg:col-span-9 space-y-8 sm:space-y-12">
              
              {/* 1. HERO PROFILE CARD */}
              <div className="bg-white border border-[#E5E5E0] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm relative overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 bg-[#FFF6F3] text-[#FF5A1F] rounded-full border border-[#FFEDD5]">
                      {model.org}
                    </span>
                    <span className="text-[11px] font-mono font-bold px-2.5 py-1 bg-[#F8F7F2] text-[#555555] rounded-full border border-[#EAE9E4]">
                      {model.license || "Proprietary"}
                    </span>
                    {model.releaseDate && (
                      <span className="text-[11px] font-mono text-[#8B8B8B]">
                        Released {model.releaseDate}
                      </span>
                    )}
                  </div>

                  {model.elo && (
                    <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#DCFCE7] text-[#16A34A] rounded-full border border-[#BBF7D0] font-mono font-black text-[13px] shadow-sm">
                      <span>⚡ ELO RATING</span>
                      <span className="text-[15px]">{model.elo}</span>
                    </div>
                  )}
                </div>

                <h1
                  className="text-[32px] sm:text-[42px] lg:text-[48px] font-extrabold text-[#111111] leading-tight mb-4"
                  style={{ fontFamily: "'EB Garamond', 'Iowan Old Style', Palatino, Georgia, serif" }}
                >
                  {model.name}
                </h1>

                <p
                  className="text-[17px] sm:text-[20px] text-[#444444] leading-relaxed mb-8 max-w-3xl"
                  style={{ fontFamily: "'EB Garamond', 'Iowan Old Style', Palatino, Georgia, serif" }}
                >
                  {model.desc}
                </p>

                <div className="flex flex-wrap gap-2 pt-6 border-t border-[#E5E5E0]">
                  {model.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[12px] font-mono font-medium px-3 py-1 bg-[#F3F4F6] text-[#333333] rounded-lg border border-[#E5E7EB]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* 2. RESPONSIVE ARCHITECTURE SPECS GRID (2x2 on mobile, 4x1 on desktop) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-white border border-[#E5E5E0] p-5 rounded-2xl shadow-sm">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#8B8B8B] block mb-1">Architecture</span>
                  <span className="text-[16px] sm:text-[18px] font-black text-[#111111]">{model.params || "Dense / MoE"}</span>
                </div>
                <div className="bg-white border border-[#E5E5E0] p-5 rounded-2xl shadow-sm">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#8B8B8B] block mb-1">Context Window</span>
                  <span className="text-[16px] sm:text-[18px] font-black text-[#111111]">{model.context || "128k tokens"}</span>
                </div>
                <div className="bg-white border border-[#E5E5E0] p-5 rounded-2xl shadow-sm">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#8B8B8B] block mb-1">Primary Domain</span>
                  <span className="text-[16px] sm:text-[18px] font-black text-[#FF5A1F]">{model.area}</span>
                </div>
                <div className="bg-white border border-[#E5E5E0] p-5 rounded-2xl shadow-sm">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#8B8B8B] block mb-1">Literature Citations</span>
                  <span className="text-[16px] sm:text-[18px] font-black text-[#111111]">{model.paperCount} papers</span>
                </div>
              </div>

              {/* 3. VERIFIED ACADEMIC BENCHMARKS */}
              {model.benchmarks && model.benchmarks.length > 0 && (
                <div className="bg-white border border-[#E5E5E0] rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E5E5E0]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#FFF6F3] text-[#FF5A1F] flex items-center justify-center border border-[#FFEDD5]">
                        <Trophy size={18} />
                      </div>
                      <div>
                        <h2 className="text-[18px] sm:text-[20px] font-black text-[#111111]">Verified Academic Benchmarks</h2>
                        <p className="text-[12px] text-[#8B8B8B] font-mono">Official evaluations reported across peer-reviewed leaderboards</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono font-bold bg-[#F8F7F2] px-3 py-1 rounded-full text-[#555555] border border-[#EAE9E4]">
                      SOTA EVAL
                    </span>
                  </div>

                  <div className="space-y-6">
                    {model.benchmarks.map((bm, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex items-center justify-between text-[14px] sm:text-[15px] font-bold">
                          <span className="text-[#333333] flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: bm.color || "#FF5A1F" }} />
                            {bm.name}
                          </span>
                          <span className="font-mono font-black text-[16px] text-[#111111]">{bm.score}</span>
                        </div>
                        <div className="w-full bg-[#F3F4F6] h-3 sm:h-3.5 rounded-full overflow-hidden p-0.5 border border-[#E5E7EB]">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${bm.value}%`, backgroundColor: bm.color || "#FF5A1F" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. INFERENCE QUICKSTART CODE SNIPPET */}
              {model.quickstart && (
                <div className="bg-white border border-[#E5E5E0] rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-[#E5E5E0]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#F3F4F6] text-[#111111] flex items-center justify-center border border-[#E5E7EB]">
                        <Code2 size={18} />
                      </div>
                      <div>
                        <h2 className="text-[18px] sm:text-[20px] font-black text-[#111111]">Inference Quickstart</h2>
                        <p className="text-[12px] text-[#8B8B8B] font-mono">Copy snippet to run local inference or API calls</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopyQuickstart()}
                      className="flex items-center gap-1.5 text-[13px] font-bold px-4 py-2.5 bg-[#F8F7F2] hover:bg-[#E5E5E0] border border-[#EAE9E4] rounded-xl transition-colors active:scale-95 min-h-[44px]"
                    >
                      {copied ? (
                        <>
                          <Check size={15} className="text-[#16A34A]" />
                          <span className="text-[#16A34A] font-mono">Copied to Clipboard!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={15} className="text-[#555555]" />
                          <span className="text-[#111111]">Copy Snippet</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="relative rounded-2xl overflow-hidden border border-[#333333] bg-[#111111]">
                    <div className="flex items-center justify-between px-4 py-2.5 bg-[#1A1A1A] border-b border-[#333333] text-[11px] font-mono text-[#8B8B8B]">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                        <span className="ml-2 text-[#CCCCCC] font-bold">quickstart.py</span>
                      </div>
                      <span>Python / REST SDK</span>
                    </div>
                    <pre className="p-5 text-[13px] sm:text-[14px] font-mono text-[#F8F7F2] overflow-x-auto leading-relaxed">
                      <code>{model.quickstart}</code>
                    </pre>
                  </div>
                </div>
              )}

              {/* 5. RELATED RESEARCH PAPERS FEED */}
              <div className="space-y-6 pt-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E0]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#FFF6F3] text-[#FF5A1F] flex items-center justify-center border border-[#FFEDD5]">
                      <BookOpen size={18} />
                    </div>
                    <div>
                      <h2 className="text-[20px] font-black text-[#111111]">Related Research Literature</h2>
                      <p className="text-[12px] text-[#8B8B8B] font-mono">Academic papers citing, evaluating, or discussing {model.name}</p>
                    </div>
                  </div>
                  <span className="text-[12px] font-bold text-[#8B8B8B] bg-white px-3 py-1 rounded-full border border-[#E5E5E0]">
                    {relatedPapers.length} Papers Found
                  </span>
                </div>

                {relatedPapers.length === 0 ? (
                  <div className="bg-white border border-[#E5E5E0] rounded-2xl p-10 text-center">
                    <p className="text-[15px] font-bold text-[#555555]">No direct paper citations found in our indexed repository yet.</p>
                    <Link href="/trending" className="inline-block mt-4 text-[13px] font-bold text-[#FF5A1F] hover:underline">
                      Browse All Trending AI Research →
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {relatedPapers.map((paper: any, i: number) => (
                      <PaperCard key={i} paper={paper} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      )}

      {/* ─────────────────────────────────────────────────────────────────────────────
          CONCEPT B: "THE DEVELOPER DASHBOARD & PLAYGROUND" (HuggingFace / Vercel Vibe)
      ───────────────────────────────────────────────────────────────────────────── */}
      {activeConcept === "B" && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            {/* LEFT STICKY DETAILS PANEL (5 cols on desktop, full width on mobile) */}
            <div className="lg:col-span-5 bg-white border border-[#E5E5E0] rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm lg:sticky lg:top-24 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-mono font-black uppercase tracking-wider px-3 py-1 bg-[#FFF6F3] text-[#FF5A1F] rounded-full border border-[#FFEDD5]">
                  {model.org}
                </span>
                {model.elo && (
                  <span className="text-[13px] font-mono font-black text-[#16A34A] bg-[#DCFCE7] px-3 py-1 rounded-full border border-[#BBF7D0]">
                    ⚡ ELO {model.elo}
                  </span>
                )}
              </div>

              <h1 className="text-[32px] sm:text-[38px] font-black text-[#111111] leading-tight font-sans">
                {model.name}
              </h1>

              <p className="text-[15px] sm:text-[16px] text-[#555555] leading-relaxed">
                {model.desc}
              </p>

              {/* Specs Stack */}
              <div className="bg-[#F8F7F2] rounded-2xl p-5 border border-[#EAE9E4] font-mono text-[13px] space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#EAE9E4]">
                  <span className="text-[#8B8B8B]">Parameters:</span>
                  <span className="font-black text-[#111111]">{model.params || "Dense / MoE"}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-[#EAE9E4]">
                  <span className="text-[#8B8B8B]">Context Limit:</span>
                  <span className="font-black text-[#111111]">{model.context || "128k tokens"}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-[#EAE9E4]">
                  <span className="text-[#8B8B8B]">License Type:</span>
                  <span className="font-black text-[#7C3AED]">{model.license || "Proprietary"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#8B8B8B]">Indexed Papers:</span>
                  <span className="font-black text-[#FF5A1F]">{model.paperCount} Citations</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {model.tags.map((tag, i) => (
                  <span key={i} className="text-[11px] font-mono font-bold px-2.5 py-1 bg-[#F3F4F6] text-[#444444] rounded-md border border-[#E5E7EB]">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Playground Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => handleCopyQuickstart(model.id)}
                  className="w-full py-3 bg-[#FF5A1F] hover:bg-[#E0462D] text-white font-bold rounded-xl text-[13px] transition-colors flex items-center justify-center gap-2 shadow-sm min-h-[44px]"
                >
                  <Copy size={16} />
                  <span>Copy Model ID ({model.id})</span>
                </button>
              </div>
            </div>

            {/* RIGHT INTERACTIVE TABS & PLAYGROUND (7 cols on desktop) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Responsive Sticky Tab Bar */}
              <div className="bg-white border border-[#E5E5E0] rounded-2xl p-2 flex items-center justify-between gap-1 shadow-sm overflow-x-auto">
                <button
                  onClick={() => setConceptBTab("evals")}
                  className={`flex items-center justify-center gap-2 flex-1 px-4 py-2.5 rounded-xl font-bold text-[13px] transition-all min-h-[44px] flex-shrink-0 ${
                    conceptBTab === "evals"
                      ? "bg-[#111111] text-white shadow-sm"
                      : "text-[#555555] hover:bg-[#F8F7F2]"
                  }`}
                >
                  <Trophy size={16} className={conceptBTab === "evals" ? "text-[#FF5A1F]" : ""} />
                  <span>Verified Evals ({model.benchmarks?.length || 0})</span>
                </button>
                <button
                  onClick={() => setConceptBTab("code")}
                  className={`flex items-center justify-center gap-2 flex-1 px-4 py-2.5 rounded-xl font-bold text-[13px] transition-all min-h-[44px] flex-shrink-0 ${
                    conceptBTab === "code"
                      ? "bg-[#111111] text-white shadow-sm"
                      : "text-[#555555] hover:bg-[#F8F7F2]"
                  }`}
                >
                  <Code2 size={16} className={conceptBTab === "code" ? "text-[#10B981]" : ""} />
                  <span>Code Playground</span>
                </button>
                <button
                  onClick={() => setConceptBTab("papers")}
                  className={`flex items-center justify-center gap-2 flex-1 px-4 py-2.5 rounded-xl font-bold text-[13px] transition-all min-h-[44px] flex-shrink-0 ${
                    conceptBTab === "papers"
                      ? "bg-[#111111] text-white shadow-sm"
                      : "text-[#555555] hover:bg-[#F8F7F2]"
                  }`}
                >
                  <BookOpen size={16} className={conceptBTab === "papers" ? "text-[#3B82F6]" : ""} />
                  <span>Papers ({relatedPapers.length})</span>
                </button>
              </div>

              {/* Tab 1: Evaluations */}
              {conceptBTab === "evals" && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="bg-white border border-[#E5E5E0] rounded-2xl p-6 shadow-sm space-y-5">
                    <h3 className="text-[18px] font-black text-[#111111] flex items-center justify-between">
                      <span>Official Academic Benchmark Matrix</span>
                      <span className="text-[11px] font-mono text-[#8B8B8B] font-normal">Updated July 2026</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {model.benchmarks?.map((bm, idx) => (
                        <div key={idx} className="bg-[#F8F7F2] border border-[#EAE9E4] p-5 rounded-2xl flex flex-col justify-between">
                          <div>
                            <span className="text-[12px] font-mono text-[#8B8B8B] block mb-1 uppercase tracking-wider">{bm.name}</span>
                            <span className="text-[28px] font-black text-[#111111] font-mono">{bm.score}</span>
                          </div>
                          <div className="pt-3 mt-3 border-t border-[#EAE9E4] flex items-center justify-between text-[11px] font-mono text-[#555555]">
                            <span>Percentile Rank:</span>
                            <span className="font-bold text-[#16A34A]">Top {Math.max(1, Math.round((100 - bm.value) / 5))}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Interactive Code Playground */}
              {conceptBTab === "code" && (
                <div className="bg-white border border-[#E5E5E0] rounded-2xl p-6 shadow-sm space-y-4 animate-fadeIn">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E5E5E0]">
                    <span className="text-[15px] font-black text-[#111111]">Select SDK / API Language:</span>
                    <div className="flex items-center gap-1.5 bg-[#F8F7F2] p-1 rounded-xl border border-[#EAE9E4] overflow-x-auto max-w-full">
                      {(["python", "curl", "typescript", "ollama"] as const).map((lang) => (
                        <button
                          key={lang}
                          onClick={() => setCodeLang(lang)}
                          className={`px-3 py-1.5 rounded-lg text-[12px] font-mono font-bold capitalize transition-colors min-h-[36px] flex-shrink-0 ${
                            codeLang === lang
                              ? "bg-[#111111] text-white"
                              : "text-[#555555] hover:text-[#111111]"
                          }`}
                        >
                          {lang === "curl" ? "REST / cURL" : lang}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="relative rounded-2xl overflow-hidden border border-[#333333] bg-[#111111]">
                    <div className="flex items-center justify-between px-4 py-3 bg-[#1A1A1A] border-b border-[#333333] text-[12px] font-mono text-[#CCCCCC]">
                      <span className="font-bold text-[#FF5A1F]">{model.id} - {codeLang}.py</span>
                      <button
                        onClick={() => handleCopyQuickstart(codeVariants[codeLang])}
                        className="flex items-center gap-1.5 px-3 py-1 bg-[#282828] hover:bg-[#383838] rounded-lg text-white text-[11px] font-bold transition-colors min-h-[32px]"
                      >
                        {copied ? <Check size={13} className="text-[#16A34A]" /> : <Copy size={13} />}
                        <span>{copied ? "Copied Code!" : "Copy Code"}</span>
                      </button>
                    </div>
                    <pre className="p-6 text-[13px] sm:text-[14px] font-mono text-[#F8F7F2] overflow-x-auto leading-relaxed">
                      <code>{codeVariants[codeLang]}</code>
                    </pre>
                  </div>
                </div>
              )}

              {/* Tab 3: Research Papers */}
              {conceptBTab === "papers" && (
                <div className="space-y-4 animate-fadeIn">
                  {relatedPapers.length === 0 ? (
                    <div className="bg-white border border-[#E5E5E0] rounded-2xl p-10 text-center">
                      <p className="text-[15px] font-bold text-[#555555]">No directly linked papers found for this model.</p>
                    </div>
                  ) : (
                    relatedPapers.map((paper: any, i: number) => (
                      <PaperCard key={i} paper={paper} />
                    ))
                  )}
                </div>
              )}

            </div>
          </div>
        </main>
      )}

      {/* ─────────────────────────────────────────────────────────────────────────────
          CONCEPT C: "THE EDITORIAL JOURNAL & RESEARCH DOSSIER" (Stripe Press Vibe)
      ───────────────────────────────────────────────────────────────────────────── */}
      {activeConcept === "C" && (
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 animate-fadeIn">
          
          {/* Magazine Hero Banner */}
          <div className="text-center pb-10 border-b border-[#E5E5E0] space-y-5">
            <span className="inline-block px-3 py-1 bg-[#111111] text-white font-mono text-[11px] font-black uppercase tracking-widest rounded-full">
              RESEARCH DOSSIER · {model.area}
            </span>
            
            <h1
              className="text-[40px] sm:text-[54px] lg:text-[64px] font-extrabold text-[#111111] leading-tight max-w-4xl mx-auto"
              style={{ fontFamily: "'EB Garamond', 'Iowan Old Style', Palatino, Georgia, serif" }}
            >
              {model.name}
            </h1>

            <p
              className="text-[18px] sm:text-[22px] text-[#555555] leading-relaxed max-w-3xl mx-auto italic"
              style={{ fontFamily: "'EB Garamond', 'Iowan Old Style', Palatino, Georgia, serif" }}
            >
              &ldquo;{model.desc}&rdquo;
            </p>

            <div className="flex items-center justify-center gap-6 pt-4 font-mono text-[13px] text-[#8B8B8B]">
              <span>By <strong className="text-[#111111]">{model.org}</strong></span>
              <span>•</span>
              <span>ELO Rating: <strong className="text-[#FF5A1F] font-black">{model.elo || "N/A"}</strong></span>
              <span>•</span>
              <span>{model.paperCount} Academic Citations</span>
            </div>
          </div>

          {/* Mobile Accordion TOC (< 1024px) */}
          <div className="lg:hidden mt-6">
            <button
              onClick={() => setTocOpen(!tocOpen)}
              className="w-full bg-white border border-[#E5E5E0] rounded-xl p-4 flex items-center justify-between font-bold text-[14px] text-[#111111] shadow-sm"
            >
              <span className="flex items-center gap-2">
                <Bookmark size={16} className="text-[#FF5A1F]" />
                <span>📑 Jump to Dossier Section</span>
              </span>
              <ChevronDown size={18} className={`transition-transform duration-200 ${tocOpen ? "rotate-180" : ""}`} />
            </button>
            {tocOpen && (
              <div className="bg-white border border-t-0 border-[#E5E5E0] rounded-b-xl p-4 space-y-2 font-mono text-[13px] text-[#555555]">
                <a href="#summary-section" onClick={() => setTocOpen(false)} className="block py-1 hover:text-[#FF5A1F]">1. Executive Architecture Summary</a>
                <a href="#benchmarks-section" onClick={() => setTocOpen(false)} className="block py-1 hover:text-[#FF5A1F]">2. Empirical Evaluation Matrix</a>
                <a href="#code-section" onClick={() => setTocOpen(false)} className="block py-1 hover:text-[#FF5A1F]">3. Implementation Quickstart</a>
                <a href="#papers-section" onClick={() => setTocOpen(false)} className="block py-1 hover:text-[#FF5A1F]">4. Cited Academic Literature</a>
              </div>
            )}
          </div>

          {/* Dossier Body + Sticky Right TOC on Desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-10 items-start">
            
            <div className="lg:col-span-8 space-y-12">
              
              {/* Section 1: Executive Summary */}
              <section id="summary-section" className="space-y-6">
                <h2
                  className="text-[28px] font-bold text-[#111111] pb-2 border-b border-[#E5E5E0]"
                  style={{ fontFamily: "'EB Garamond', 'Iowan Old Style', Palatino, Georgia, serif" }}
                >
                  1. Executive Architecture Summary
                </h2>
                
                <div
                  className="text-[18px] sm:text-[20px] text-[#333333] leading-relaxed space-y-5"
                  style={{ fontFamily: "'EB Garamond', 'Iowan Old Style', Palatino, Georgia, serif" }}
                >
                  <p>
                    <span className="float-left text-[64px] font-black leading-none pr-3 pt-1 text-[#FF5A1F]">
                      {model.name.slice(0, 1)}
                    </span>
                    {model.name.slice(1)} represents a foundational advancement in {model.area.toLowerCase()} models developed by {model.org}. Operating across a context window of <code className="font-mono bg-[#FFF6F3] text-[#FF5A1F] px-1.5 py-0.5 rounded text-[16px]">{model.context || "128k tokens"}</code>, the architecture utilizes a high-efficiency <strong className="text-[#111111]">{model.params || "Mixture-of-Experts (MoE)"}</strong> structure designed for high-density reasoning and computational stability.
                  </p>
                  <p>
                    By combining reinforcement learning with direct human preference optimization across multi-stage post-training pipelines, {model.name} achieves state-of-the-art benchmark verification while remaining highly accessible via {model.license || "proprietary APIs"}.
                  </p>
                </div>
              </section>

              {/* Section 2: Benchmarks Table */}
              <section id="benchmarks-section" className="space-y-6">
                <h2
                  className="text-[28px] font-bold text-[#111111] pb-2 border-b border-[#E5E5E0]"
                  style={{ fontFamily: "'EB Garamond', 'Iowan Old Style', Palatino, Georgia, serif" }}
                >
                  2. Empirical Evaluation Matrix
                </h2>

                <div className="bg-white border border-[#E5E5E0] rounded-2xl overflow-hidden shadow-sm font-mono text-[13px]">
                  <div className="bg-[#F8F7F2] px-6 py-3 border-b border-[#E5E5E0] font-bold text-[#8B8B8B] flex justify-between">
                    <span>ACADEMIC BENCHMARK</span>
                    <span>VERIFIED SCORE</span>
                  </div>
                  <div className="divide-y divide-[#EAE9E4]">
                    {model.benchmarks?.map((bm, i) => (
                      <div key={i} className="px-6 py-4 flex items-center justify-between text-[15px]">
                        <span className="font-bold text-[#111111]">{bm.name}</span>
                        <span className="font-black px-3 py-1 bg-[#DCFCE7] text-[#16A34A] rounded-full">{bm.score}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Section 3: Code */}
              <section id="code-section" className="space-y-6">
                <h2
                  className="text-[28px] font-bold text-[#111111] pb-2 border-b border-[#E5E5E0]"
                  style={{ fontFamily: "'EB Garamond', 'Iowan Old Style', Palatino, Georgia, serif" }}
                >
                  3. Implementation Quickstart
                </h2>

                <div className="rounded-2xl overflow-hidden border border-[#333333] bg-[#111111]">
                  <div className="flex items-center justify-between px-5 py-3 bg-[#1A1A1A] border-b border-[#333333] font-mono text-[12px] text-[#CCCCCC]">
                    <span>monograph_inference.py</span>
                    <button
                      onClick={() => handleCopyQuickstart()}
                      className="text-[#FF5A1F] font-bold hover:underline"
                    >
                      {copied ? "✓ Copied!" : "Copy Snippet →"}
                    </button>
                  </div>
                  <pre className="p-6 text-[13px] sm:text-[14px] font-mono text-[#F8F7F2] overflow-x-auto leading-relaxed">
                    <code>{model.quickstart}</code>
                  </pre>
                </div>
              </section>

              {/* Section 4: Literature */}
              <section id="papers-section" className="space-y-6">
                <h2
                  className="text-[28px] font-bold text-[#111111] pb-2 border-b border-[#E5E5E0]"
                  style={{ fontFamily: "'EB Garamond', 'Iowan Old Style', Palatino, Georgia, serif" }}
                >
                  4. Cited Academic Literature ({relatedPapers.length})
                </h2>

                <div className="space-y-4">
                  {relatedPapers.map((paper: any, i: number) => (
                    <PaperCard key={i} paper={paper} />
                  ))}
                </div>
              </section>
            </div>

            {/* Desktop Sticky TOC (Hidden on mobile) */}
            <div className="hidden lg:block lg:col-span-4 sticky top-28 bg-white border border-[#E5E5E0] rounded-2xl p-6 shadow-sm space-y-4 font-mono text-[13px]">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#8B8B8B] block pb-2 border-b border-[#E5E5E0]">
                Dossier Contents
              </span>
              <a href="#summary-section" className="block text-[#555555] hover:text-[#FF5A1F] transition-colors py-1">
                1. Executive Architecture Summary
              </a>
              <a href="#benchmarks-section" className="block text-[#555555] hover:text-[#FF5A1F] transition-colors py-1">
                2. Empirical Evaluation Matrix
              </a>
              <a href="#code-section" className="block text-[#555555] hover:text-[#FF5A1F] transition-colors py-1">
                3. Implementation Quickstart
              </a>
              <a href="#papers-section" className="block text-[#555555] hover:text-[#FF5A1F] transition-colors py-1">
                4. Cited Academic Literature ({relatedPapers.length})
              </a>
              
              <div className="pt-4 border-t border-[#EAE9E4]">
                <Link
                  href="/models"
                  className="w-full py-2.5 bg-[#FF5A1F] hover:bg-[#E0462D] text-white font-bold rounded-xl text-[12px] transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <ArrowLeft size={14} />
                  <span>Return to Directory</span>
                </Link>
              </div>
            </div>

          </div>
        </main>
      )}
    </div>
  );
}
