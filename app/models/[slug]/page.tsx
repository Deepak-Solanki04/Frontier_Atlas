"use client";

import React, { useState, useEffect, useMemo, use } from "react";
import Link from "next/link";
import { 
  Trophy, Cpu, Layers, ExternalLink, Code2, Check, Copy, ArrowLeft, 
  Share2, Sparkles, BookOpen, Terminal, FileText, Award, Zap, ShieldCheck, 
  Eye, Activity, Box, Sliders, Info, ChevronRight, Play, RefreshCw, BarChart3, Database,
  Brain, Wrench, Link2
} from "lucide-react";
import { fetchApi } from "@/lib/api";
import { getModels, type ModelItem } from "@/lib/models";
import PaperCard from "@/components/PaperCard";
import { topicData } from "@/data/topicData";

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

  // Active Main Tab ("evals" | "workbench" | "architecture" | "literature")
  const [activeTab, setActiveTab] = useState<"evals" | "workbench" | "architecture" | "literature">("evals");

  // Workbench Interactive Toggles & State
  const [sdkLang, setSdkLang] = useState<"python" | "typescript" | "curl" | "ollama">("python");
  const [enableThinking, setEnableThinking] = useState(true);
  const [enableTools, setEnableTools] = useState(false);
  const [enableStreaming, setEnableStreaming] = useState(true);

  // Benchmarks Comparison Mode ("standard" | "human")
  const [evalMode, setEvalMode] = useState<"standard" | "human">("standard");

  useEffect(() => {
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
    if (!model || !model.papers) return [];
    return model.papers.map((p: any) => p.paper).filter(Boolean).slice(0, 10);
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

  // Dynamic Interactive Code Generator based on user toggles
  const generatedCode = useMemo(() => {
    if (!model) return "";
    const baseId = model.slug || model.id;

    if (sdkLang === "python") {
      let code = `import anthropic\n\nclient = anthropic.Anthropic()\n\n`;
      let paramsList = `  model="${baseId}",\n  max_tokens=${enableThinking ? 16384 : 4096},\n`;
      
      if (enableThinking) {
        paramsList += `  thinking={\n    "type": "enabled",\n    "budget_tokens": 12000\n  },\n`;
      }
      if (enableTools) {
        paramsList += `  tools=[\n    {\n      "name": "execute_code",\n      "description": "Execute Python in sandboxed verification environment",\n      "input_schema": {"type": "object", "properties": {"code": {"type": "string"}}}\n    }\n  ],\n`;
      }
      if (enableStreaming) {
        code += `with client.messages.stream(\n${paramsList}  messages=[{"role": "user", "content": "Analyze and verify frontier model architecture."}]\n) as stream:\n    for text in stream.text_stream:\n        print(text, end="", flush=True)`;
      } else {
        code += `response = client.messages.create(\n${paramsList}  messages=[{"role": "user", "content": "Analyze and verify frontier model architecture."}]\n)\nprint(response.content[0].text)`;
      }
      return code;
    }

    if (sdkLang === "typescript") {
      let code = `import { Anthropic } from '@anthropic-ai/sdk';\n\nconst anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });\n\n`;
      let paramsList = `  model: '${baseId}',\n  max_tokens: ${enableThinking ? 16384 : 4096},\n`;
      if (enableThinking) {
        paramsList += `  thinking: { type: 'enabled', budget_tokens: 12000 },\n`;
      }
      if (enableTools) {
        paramsList += `  tools: [{ name: 'get_benchmark_data', input_schema: { type: 'object' } }],\n`;
      }
      if (enableStreaming) {
        code += `const stream = await anthropic.messages.create({\n${paramsList}  stream: true,\n  messages: [{ role: 'user', content: 'Synthesize architecture benchmarks.' }]\n});\n\nfor await (const chunk of stream) {\n  if (chunk.type === 'content_block_delta') process.stdout.write(chunk.delta.text);\n}`;
      } else {
        code += `const msg = await anthropic.messages.create({\n${paramsList}  messages: [{ role: 'user', content: 'Synthesize architecture benchmarks.' }]\n});\nconsole.log(msg.content[0].text);`;
      }
      return code;
    }

    if (sdkLang === "curl") {
      const body: any = {
        model: baseId,
        max_tokens: enableThinking ? 16384 : 4096,
        messages: [{ role: "user", content: "Explain model scaling laws." }]
      };
      if (enableThinking) body.thinking = { type: "enabled", budget_tokens: 12000 };
      if (enableStreaming) body.stream = true;

      return `curl https://api.anthropic.com/v1/messages \\\n  -H "x-api-key: $ANTHROPIC_API_KEY" \\\n  -H "anthropic-version: 2023-06-01" \\\n  -H "content-type: application/json" \\\n  -d '${JSON.stringify(body, null, 2)}'`;
    }

    // Ollama
    return `# Step 1: Pull the open-weight model or configure API bridge in Ollama\nollama pull ${baseId}\n\n# Step 2: Run interactive terminal session with custom flags\nollama run ${baseId} --verbose "${enableThinking ? "Think step-by-step and verify math proofs." : "Provide concise summary."}"`;
  }, [model, sdkLang, enableThinking, enableTools, enableStreaming]);

  const handleCopyCode = (textToCopy?: string) => {
    const text = textToCopy || generatedCode;
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

          <div className="flex items-center gap-3">
            <button onClick={handleShare} className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#F8F7F2] border border-[#EAE9E4] text-[#555555] hover:text-[#111111] transition-colors text-[13px] font-semibold">
              <Share2 size={15} />
              <span className="hidden sm:inline">{shareCopied ? "Link Copied!" : "Share Profile"}</span>
            </button>
            
            <Link href="/trending" className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#FF5A1F] text-white hover:bg-[#e04d16] transition-colors text-[13px] font-bold no-underline">
              <span>Explore Research</span>
              <ExternalLink size={14} />
            </Link>
          </div>
        </div>
      </header>

      {/* ── HERO SECTION: CLEAN LIGHT CARD ── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mt-8">
        <div className="bg-white rounded-[12px] border border-[#F0F0F0] p-6 md:p-10 shadow-sm relative overflow-hidden">
          
          {/* Top Metadata Strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 relative z-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#FFF6F3] text-[#FF5A1F] border border-[#FFEDD5] text-[11px] font-bold uppercase tracking-wide">
                <Sparkles size={13} />
                <span>{model.vendor} Certified</span>
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#F8F7F2] border border-[#EAE9E4] text-[11px] font-bold uppercase tracking-wide text-[#555555]">
                <span>License:</span>
                <span className="text-[#111111]">{model.license || "Proprietary Commercial"}</span>
              </span>
              {model.releaseDate && (
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#F8F7F2] border border-[#EAE9E4] text-[11px] font-bold uppercase tracking-wide text-[#555555]">
                  <span>Released:</span>
                  <span className="text-[#111111]">{model.releaseDate}</span>
                </span>
              )}
            </div>

            {model.elo && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#111111] text-white text-[11px] font-extrabold uppercase tracking-wider shadow-sm">
                <Zap size={13} style={{ fill: "#ffffff" }} />
                <span>GLOBAL ELO RATING: {model.elo}</span>
              </div>
            )}
          </div>

          {/* Title & Core Summary */}
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#111111] tracking-tight mb-4 relative z-10">
            {model.name}
          </h1>
          <p className="text-[#555555] text-lg max-w-3xl leading-relaxed mb-10 relative z-10 font-medium">
            {model.description}
          </p>

          {/* 4-Cell Interactive Architecture & Spec Pods inside Hero */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
            
            <div className="bg-[#F8F7F2] border border-[#EAE9E4] rounded-[8px] p-4 transition-shadow hover:shadow-md cursor-default">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8B8B8B]">Architecture Specs</span>
                <Cpu size={16} className="text-[#FF5A1F]" />
              </div>
              <div className="text-lg font-extrabold text-[#111111] mb-1">
                {model.parameterCount || "Not Specified"}
              </div>
              <span className="text-[11px] font-bold text-[#10B981]"><Check size={12} className="inline mr-1 relative -top-[1px]" /> High-Density Mixture-of-Experts</span>
            </div>

            <div className="bg-[#F8F7F2] border border-[#EAE9E4] rounded-[8px] p-4 transition-shadow hover:shadow-md cursor-default">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8B8B8B]">Context Capacity</span>
                <Box size={16} className="text-[#3B82F6]" />
              </div>
              <div className="text-lg font-extrabold text-[#111111] mb-1">
                {model.contextWindow || "Not Specified"}
              </div>
              <span className="text-[11px] font-bold text-[#3B82F6]"><Check size={12} className="inline mr-1 relative -top-[1px]" /> Native Prompt Caching Supported</span>
            </div>

            <div className="bg-[#F8F7F2] border border-[#EAE9E4] rounded-[8px] p-4 transition-shadow hover:shadow-md cursor-default">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8B8B8B]">Primary Specialization</span>
                <Activity size={16} className="text-[#FF5A1F]" />
              </div>
              <div className="text-lg font-extrabold text-[#111111] mb-1">
                {model.category || "General Purpose"}
              </div>
              <span className="text-[11px] font-bold text-[#A8A39E]"><Activity size={12} className="inline mr-1 relative -top-[1px]" /> Instantaneous vs Extended CoT</span>
            </div>

            <div className="bg-[#F8F7F2] border border-[#EAE9E4] rounded-[8px] p-4 transition-shadow hover:shadow-md cursor-default">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8B8B8B]">Literature Citations</span>
                <BookOpen size={16} className="text-[#8B5CF6]" />
              </div>
              <div className="text-lg font-extrabold text-[#111111] mb-1">
                {model.paperCount} Verified Papers
              </div>
              <span className="text-[11px] font-bold text-[#8B5CF6]"><BookOpen size={12} className="inline mr-1 relative -top-[1px]" /> Indexed in Frontier Repository</span>
            </div>

          </div>
        </div>
      </section>

      {/* ── STATE-OF-THE-ART INTERACTIVE TAB BAR ── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mt-8">
        <div className="flex items-center overflow-x-auto border-b-2 border-[#EAE9E4] pb-[-2px] gap-2 md:gap-8 hide-scrollbar">
          
          <button
            onClick={() => setActiveTab("evals")}
            className={`flex items-center gap-2 pb-3 px-2 border-b-2 transition-colors whitespace-nowrap text-sm font-bold ${activeTab === "evals" ? "border-[#FF5A1F] text-[#111111]" : "border-transparent text-[#8B8B8B] hover:text-[#555555]"}`}
          >
            <Trophy size={16} className={activeTab === "evals" ? "text-[#FF5A1F]" : ""} />
            <span>Verified Academic Benchmarks</span>
            <span className="ml-1 bg-[#F8F7F2] text-[#555555] px-2 py-0.5 rounded text-xs border border-[#EAE9E4]">
              {model.benchmarks?.length || 0}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("workbench")}
            className={`flex items-center gap-2 pb-3 px-2 border-b-2 transition-colors whitespace-nowrap text-sm font-bold ${activeTab === "workbench" ? "border-[#10B981] text-[#111111]" : "border-transparent text-[#8B8B8B] hover:text-[#555555]"}`}
          >
            <Terminal size={16} className={activeTab === "workbench" ? "text-[#10B981]" : ""} />
            <span>Interactive SDK Workbench</span>
            <span className={`ml-1 px-2 py-0.5 rounded text-xs font-extrabold ${activeTab === "workbench" ? "bg-[#10B981] text-white" : "bg-[#F8F7F2] text-[#555555] border border-[#EAE9E4]"}`}>
              LIVE
            </span>
          </button>

          <button
            onClick={() => setActiveTab("architecture")}
            className={`flex items-center gap-2 pb-3 px-2 border-b-2 transition-colors whitespace-nowrap text-sm font-bold ${activeTab === "architecture" ? "border-[#3B82F6] text-[#111111]" : "border-transparent text-[#8B8B8B] hover:text-[#555555]"}`}
          >
            <Layers size={16} className={activeTab === "architecture" ? "text-[#3B82F6]" : ""} />
            <span>Architecture & Capabilities</span>
          </button>

          <button
            onClick={() => setActiveTab("literature")}
            className={`flex items-center gap-2 pb-3 px-2 border-b-2 transition-colors whitespace-nowrap text-sm font-bold ${activeTab === "literature" ? "border-[#8B5CF6] text-[#111111]" : "border-transparent text-[#8B8B8B] hover:text-[#555555]"}`}
          >
            <BookOpen size={16} className={activeTab === "literature" ? "text-[#8B5CF6]" : ""} />
            <span>Research Literature</span>
            <span className="ml-1 bg-[#F8F7F2] text-[#555555] px-2 py-0.5 rounded text-xs border border-[#EAE9E4]">
              {relatedPapers.length}
            </span>
          </button>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────────
          TAB 1: VERIFIED ACADEMIC BENCHMARKS & EVALUATION MATRIX
      ───────────────────────────────────────────────────────────────────────────── */}
      {activeTab === "evals" && (
        <section className="max-w-7xl mx-auto px-4 md:px-8 mt-8">
          
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 bg-white p-5 rounded-[12px] border border-[#F0F0F0]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#FFF6F3] flex items-center justify-center text-[#FF5A1F]">
                <BarChart3 size={24} />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-[#111111] mb-1 tracking-tight">Empirical Evaluation Leaderboard</h2>
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
                          <span className="text-[11px] font-bold text-[#10B981] bg-[#ECFDF5] px-1.5 py-0.5 rounded">Top 0.8% Global</span>
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

                    {/* Bottom Methodology Note */}
                    <div className="bg-[#F8F7F2] px-5 py-3 border-t border-[#EAE9E4] flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-[11px] font-bold text-[#555555] uppercase tracking-wider">
                        <ShieldCheck size={14} className="text-[#10B981]" />
                        <span>Verified Zero-Shot CoT</span>
                      </span>
                      <span className="text-[11px] font-bold text-[#FF5A1F] hover:underline cursor-pointer">
                        View Prompt Spec →
                      </span>
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
      )}

      {/* ─────────────────────────────────────────────────────────────────────────────
          TAB 2: INTERACTIVE SDK WORKBENCH & CODE PLAYGROUND
      ───────────────────────────────────────────────────────────────────────────── */}
      {activeTab === "workbench" && (
        <section className="max-w-7xl mx-auto px-4 md:px-8 mt-8">
          
          <div className="bg-white border border-[#F0F0F0] rounded-[12px] overflow-hidden shadow-sm">
            
            {/* Top Workbench Header */}
            <div className="bg-[#F8F7F2] border-b border-[#EAE9E4] p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-[10px] bg-white border border-[#EAE9E4] text-[#10B981] flex items-center justify-center shadow-sm">
                  <Terminal size={24} />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-[#111111] mb-1">Interactive SDK Workbench</h2>
                  <p className="text-[12px] font-bold text-[#8B8B8B] uppercase tracking-wider">Generate live inference code dynamically</p>
                </div>
              </div>

              {/* Language Switcher */}
              <div className="flex items-center bg-[#EAE9E4] p-1 rounded-[8px] overflow-x-auto w-full md:w-auto">
                {(["python", "typescript", "curl", "ollama"] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSdkLang(lang)}
                    className={`px-3 py-1.5 rounded-[6px] text-[12px] font-bold transition-all ${sdkLang === lang ? "bg-white shadow-sm text-[#111111]" : "text-[#555555] hover:text-[#111111]"}`}
                  >
                    {lang === "curl" ? "REST / cURL" : lang === "typescript" ? "TypeScript" : lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Capability Feature Toggles */}
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#F0F0F0] border-b border-[#F0F0F0]">
              
              <label className="flex items-center justify-between p-5 cursor-pointer hover:bg-[#FAFAFA] transition-colors group">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FFF6F3] text-[#FF5A1F] flex items-center justify-center shrink-0 border border-[#FFEDD5]">
                    <Cpu size={16} />
                  </div>
                  <div>
                    <div className="text-[13px] font-bold text-[#111111] mb-0.5 group-hover:text-[#FF5A1F] transition-colors">Extended CoT Reasoning</div>
                    <div className="text-[11px] font-medium text-[#8B8B8B]">Allocate 12k thinking tokens</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={enableThinking}
                  onChange={(e) => setEnableThinking(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-[#FF5A1F] focus:ring-[#FF5A1F]"
                />
              </label>

              <label className="flex items-center justify-between p-5 cursor-pointer hover:bg-[#FAFAFA] transition-colors group">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#EFF6FF] text-[#3B82F6] flex items-center justify-center shrink-0 border border-[#DBEAFE]">
                    <Sliders size={16} />
                  </div>
                  <div>
                    <div className="text-[13px] font-bold text-[#111111] mb-0.5 group-hover:text-[#3B82F6] transition-colors">Autonomous Tool Calling</div>
                    <div className="text-[11px] font-medium text-[#8B8B8B]">Attach execute_code sandbox</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={enableTools}
                  onChange={(e) => setEnableTools(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-[#3B82F6] focus:ring-[#3B82F6]"
                />
              </label>

              <label className="flex items-center justify-between p-5 cursor-pointer hover:bg-[#FAFAFA] transition-colors group">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#F0FDF4] text-[#10B981] flex items-center justify-center shrink-0 border border-[#DCFCE7]">
                    <Zap size={16} />
                  </div>
                  <div>
                    <div className="text-[13px] font-bold text-[#111111] mb-0.5 group-hover:text-[#10B981] transition-colors">Response Buffer Stream</div>
                    <div className="text-[11px] font-medium text-[#8B8B8B]">Real-time token delta output</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={enableStreaming}
                  onChange={(e) => setEnableStreaming(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-[#10B981] focus:ring-[#10B981]"
                />
              </label>

            </div>

            {/* Code Display Area */}
            <div className="bg-[#111111] p-5">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#333333]">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                    <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                    <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
                  </div>
                  <span className="ml-2 text-[12px] font-bold text-[#8B8B8B] tracking-wider">{model.id}.{sdkLang === "python" ? "py" : sdkLang === "typescript" ? "ts" : "sh"}</span>
                </div>
                
                <button
                  onClick={() => handleCopyCode()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] bg-[#222222] hover:bg-[#333333] border border-[#333333] transition-colors text-[11px] font-bold text-white uppercase tracking-wider"
                >
                  {copied ? (
                    <>
                      <Check size={14} className="text-[#10B981]" />
                      <span className="text-[#10B981]">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy Spec</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="text-[13px] font-mono text-[#E0E0E0] overflow-x-auto whitespace-pre-wrap leading-relaxed">
                <code>{generatedCode}</code>
              </pre>
            </div>

            {/* Bottom API Quick Specs */}
            <div className="bg-[#1A1A1A] px-5 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3 border-t border-[#333333]">
              <div className="flex flex-wrap items-center gap-2 md:gap-4 text-[11px] font-bold text-[#8B8B8B] uppercase tracking-wider">
                <span>API Endpoint: <strong className="text-white">api.anthropic.com/v1/messages</strong></span>
                <span className="text-[#333333]">•</span>
                <span>Context Window: <strong className="text-[#FF5A1F]">{model.context || "200k tokens"}</strong></span>
                <span className="text-[#333333]">•</span>
                <span>Prompt Caching: <strong className="text-[#10B981]">Enabled (-50% Cost)</strong></span>
              </div>
              <a href="https://docs.anthropic.com" target="_blank" rel="noreferrer" className="text-[11px] font-bold text-[#3B82F6] hover:underline uppercase tracking-wider whitespace-nowrap ml-4">
                View Docs →
              </a>
            </div>

          </div>

        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────────────────────
          TAB 3: ARCHITECTURE & CAPABILITIES DEEP-DIVE
      ───────────────────────────────────────────────────────────────────────────── */}
      {activeTab === "architecture" && (
        <section className="max-w-7xl mx-auto px-4 md:px-8 mt-12">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-block px-3 py-1 bg-[#FFF6F3] text-[#FF5A1F] rounded-full border border-[#FFEDD5] text-[11px] font-extrabold uppercase tracking-wider mb-4">
              System Topology & Engine
            </span>
            <h2 className="text-3xl font-extrabold text-[#111111] tracking-tight mb-3">
              Architectural Capabilities Suite
            </h2>
            <p className="text-base font-medium text-[#555555] leading-relaxed">
              Detailed technical breakdown of core sub-systems, token economics, and agentic safeguards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            
            <div className="bg-white p-6 rounded-[12px] border border-[#F0F0F0] hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-[#FFF6F3] text-[#FF5A1F] border border-[#FFEDD5] flex items-center justify-center text-xl mb-4">
                <Brain size={24} />
              </div>
              <h3 className="text-lg font-extrabold text-[#111111] tracking-tight mb-2">Hybrid Reasoning Engine</h3>
              <p className="text-[13px] font-medium text-[#555555] leading-relaxed mb-4">
                Seamlessly transitions between instantaneous high-throughput generation and deep mathematical verification where intermediate thought tokens are evaluated and self-corrected before final output.
              </p>
              <div className="text-[12px] font-bold text-[#FF5A1F]">
                <Check size={12} className="inline mr-1 relative -top-[1px]" /> Dynamic compute scaling per prompt
              </div>
            </div>

            <div className="bg-white p-6 rounded-[12px] border border-[#F0F0F0] hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-[#EFF6FF] text-[#3B82F6] border border-[#DBEAFE] flex items-center justify-center text-xl mb-4">
                <Wrench size={24} />
              </div>
              <h3 className="text-lg font-extrabold text-[#111111] tracking-tight mb-2">Autonomous Agentic Orchestration</h3>
              <p className="text-[13px] font-medium text-[#555555] leading-relaxed mb-4">
                Native training for multi-step tool execution, structured JSON schema enforcement, sandboxed terminal command generation, and browser navigation across complex full-repository coding tasks.
              </p>
              <div className="text-[12px] font-bold text-[#3B82F6]">
                <Check size={12} className="inline mr-1 relative -top-[1px]" /> 50%+ SWE-Bench Verified SOTA
              </div>
            </div>

            <div className="bg-white p-6 rounded-[12px] border border-[#F0F0F0] hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-[#F0FDF4] text-[#10B981] border border-[#DCFCE7] flex items-center justify-center text-xl mb-4">
                <Eye size={24} />
              </div>
              <h3 className="text-lg font-extrabold text-[#111111] tracking-tight mb-2">Multimodal Vision Understanding</h3>
              <p className="text-[13px] font-medium text-[#555555] leading-relaxed mb-4">
                State-of-the-art visual reasoning capable of reading dense engineering diagrams, extracting UI design systems from raw Figma screenshots, and interpreting multi-page academic PDFs with sub-pixel OCR.
              </p>
              <div className="text-[12px] font-bold text-[#10B981]">
                <Check size={12} className="inline mr-1 relative -top-[1px]" /> 1M pixel spatial resolution
              </div>
            </div>

            <div className="bg-white p-6 rounded-[12px] border border-[#F0F0F0] hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-[#FAF5FF] text-[#8B5CF6] border border-[#F3E8FF] flex items-center justify-center text-xl mb-4">
                <Zap size={24} />
              </div>
              <h3 className="text-lg font-extrabold text-[#111111] tracking-tight mb-2">High-Speed Token Economics</h3>
              <p className="text-[13px] font-medium text-[#555555] leading-relaxed mb-4">
                Optimized attention heads capable of delivering up to 60 tokens per second on commercial infrastructure, combined with automatic prompt caching that reduces repeated systemic context costs by over 50%.
              </p>
              <div className="text-[12px] font-bold text-[#8B5CF6]">
                <Check size={12} className="inline mr-1 relative -top-[1px]" /> Ultra-low latency TTFT (~250ms)
              </div>
            </div>

            <div className="bg-white p-6 rounded-[12px] border border-[#F0F0F0] hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-[#FFF1F2] text-[#E11D48] border border-[#FFE4E6] flex items-center justify-center text-xl mb-4">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-lg font-extrabold text-[#111111] tracking-tight mb-2">Constitutional Safeguards</h3>
              <p className="text-[13px] font-medium text-[#555555] leading-relaxed mb-4">
                Trained using advanced Direct Preference Optimization (DPO) and Constitutional AI principles to prevent reward hacking, hallucination loops, and unauthorized adversarial prompt injection.
              </p>
              <div className="text-[12px] font-bold text-[#E11D48]">
                <Check size={12} className="inline mr-1 relative -top-[1px]" /> ASL-3 Security Alignment Standard
              </div>
            </div>

            <div className="bg-white p-6 rounded-[12px] border border-[#F0F0F0] hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A] flex items-center justify-center text-xl mb-4">
                <Link2 size={24} />
              </div>
              <h3 className="text-lg font-extrabold text-[#111111] tracking-tight mb-2">Ecosystem Compatibility</h3>
              <p className="text-[13px] font-medium text-[#555555] leading-relaxed mb-4">
                Native drop-in integration across major enterprise frameworks including LangChain, Vercel AI SDK, LlamaIndex, Cursor IDE, OpenWebUI, and cloud providers (Amazon Bedrock / Google Cloud Vertex AI).
              </p>
              <div className="text-[12px] font-bold text-[#D97706]">
                <Check size={12} className="inline mr-1 relative -top-[1px]" /> Multi-cloud deployment ready
              </div>
            </div>

          </div>

        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────────────────────
          TAB 4: RESEARCH LITERATURE & ACADEMIC BIBLIOGRAPHY
      ───────────────────────────────────────────────────────────────────────────── */}
      {activeTab === "literature" && (
        <section className="max-w-7xl mx-auto px-4 md:px-8 mt-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-white p-5 rounded-[12px] border border-[#F0F0F0]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#FAF5FF] text-[#8B5CF6] flex items-center justify-center">
                <BookOpen size={24} />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-[#111111] mb-1 tracking-tight">Indexed Academic Citations</h2>
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
      )}

    </div>
  );
}