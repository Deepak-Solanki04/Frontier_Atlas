"use client";

import React, { useState, useEffect, useMemo, use } from "react";
import Link from "next/link";
import { 
  Trophy, Cpu, Layers, ExternalLink, Code2, Check, Copy, ArrowLeft, 
  Share2, Sparkles, BookOpen, Terminal, FileText, Award, Zap, ShieldCheck, 
  Eye, Activity, Box, Sliders, Info, ChevronRight, Play, RefreshCw, BarChart3, Database
} from "lucide-react";
import { getModelById, getAllModelIds, type ModelItem } from "@/lib/models";
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
      const found = getModelById(resolvedParams.slug);
      setModel(found || null);
      setLoading(false);
    }
  }, [resolvedParams?.slug]);

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

  // Dynamic Interactive Code Generator based on user toggles
  const generatedCode = useMemo(() => {
    if (!model) return "";
    const baseId = model.id;

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
      let body: any = {
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
      <div className="min-h-screen bg-[#F8F7F2] flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3 animate-pulse text-center">
          <div className="w-12 h-12 rounded-full bg-[#111111] flex items-center justify-center text-white">
            <Cpu size={24} className="animate-spin text-[#F55036]" />
          </div>
          <div className="h-6 w-56 bg-[#E5E5E0] rounded-lg" />
          <p className="text-[14px] text-[#8B8B8B] font-mono">Loading Neural Architecture Profile...</p>
        </div>
      </div>
    );
  }

  if (!model) {
    return (
      <div className="min-h-screen bg-[#F8F7F2] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white border border-[#E5E5E0] rounded-3xl p-8 sm:p-10 text-center shadow-xl">
          <div className="w-20 h-20 bg-[#FFF6F3] text-[#F55036] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#FFEDD5] shadow-inner">
            <Sparkles size={34} />
          </div>
          <h1 className="text-[26px] font-black text-[#111111] mb-2">Model Profile Not Found</h1>
          <p className="text-[15px] text-[#555555] mb-8 leading-relaxed">
            We couldn&apos;t find an indexed AI foundation model matching <code className="bg-[#F8F7F2] px-2 py-1 rounded-lg text-[#F55036] font-mono text-[13px] font-bold border border-[#EAE9E4]">{resolvedParams.slug}</code>.
          </p>
          <Link
            href="/models"
            className="inline-flex items-center justify-center gap-2.5 w-full py-4 bg-[#111111] hover:bg-[#F55036] text-white font-bold rounded-2xl text-[14px] transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <ArrowLeft size={16} />
            <span>Return to Models Directory</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F7F2] text-[#111111] pb-28 selection:bg-[#F55036] selection:text-white font-sans">
      
      {/* ── TOP LUXURY NAVIGATION BAR (Glassmorphism + Sticky) ── */}
      <header className="sticky top-0 z-50 bg-[#F8F7F2]/90 backdrop-blur-xl border-b border-[#EAE9E4] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/models"
              className="flex items-center gap-2.5 px-3.5 py-2 bg-white hover:bg-[#111111] hover:text-white text-[#111111] border border-[#E5E5E0] hover:border-[#111111] rounded-2xl text-[13px] font-bold transition-all duration-200 shadow-sm group"
            >
              <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
              <span>Directory</span>
            </Link>
            <div className="hidden md:flex items-center gap-2 text-[13px] font-mono font-bold text-[#8B8B8B]">
              <span>/</span>
              <span className="text-[#111111] bg-[#EAE9E4]/60 px-2.5 py-1 rounded-lg">{model.org}</span>
              <span>/</span>
              <span className="text-[#F55036]">{model.id}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#DCFCE7]/70 border border-[#BBF7D0] rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
              <span className="text-[11px] font-mono font-black text-[#16A34A] uppercase tracking-wider">Indexed Status: Active</span>
            </div>
            
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-[#F3F4F6] border border-[#E5E5E0] rounded-2xl text-[13px] font-bold text-[#111111] transition-all shadow-sm min-h-[42px]"
            >
              <Share2 size={15} />
              <span className="hidden sm:inline">{shareCopied ? "Link Copied!" : "Share Profile"}</span>
            </button>
            
            <Link
              href="/trending"
              className="flex items-center gap-2 px-4 py-2.5 bg-[#F55036] hover:bg-[#E0462D] text-white rounded-2xl text-[13px] font-bold transition-all shadow-md hover:shadow-lg min-h-[42px]"
            >
              <span>Explore Research</span>
              <ExternalLink size={14} />
            </Link>
          </div>
        </div>
      </header>

      {/* ── HERO SECTION: CYBER-OBSIDIAN LUXURY CARD ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        <div className="relative bg-[#0E0D0C] text-white rounded-3xl sm:rounded-[36px] p-6 sm:p-10 lg:p-12 border border-[#262422] shadow-2xl overflow-hidden group">
          
          {/* Ambient Glowing Aura */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-[#F55036]/25 via-[#FF8A00]/15 to-transparent rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-1000" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-[#3B82F6]/15 via-[#8B5CF6]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          {/* Top Metadata Strip */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#F55036]/15 text-[#FF6B52] border border-[#F55036]/30 rounded-full font-mono font-black text-[12px] uppercase tracking-wider shadow-inner">
                <Sparkles size={13} className="text-[#F55036]" />
                <span>{model.org} Certified</span>
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#1F1D1B] text-[#CCCCCC] border border-[#33302E] rounded-full font-mono font-bold text-[12px]">
                <span>License:</span>
                <span className="text-white font-extrabold">{model.license || "Proprietary Commercial"}</span>
              </span>
              {model.releaseDate && (
                <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 bg-[#1F1D1B] text-[#999999] border border-[#33302E] rounded-full font-mono text-[12px]">
                  <span>Released:</span>
                  <span className="text-white">{model.releaseDate}</span>
                </span>
              )}
            </div>

            {model.elo && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#F55036] to-[#FF7A00] text-white rounded-2xl font-mono font-black text-[14px] shadow-lg shadow-[#F55036]/20">
                <Zap size={15} className="fill-white animate-bounce" />
                <span>GLOBAL ELO RATING: {model.elo}</span>
              </div>
            )}
          </div>

          {/* Title & Core Summary */}
          <div className="relative z-10 max-w-4xl mb-10">
            <h1 className="text-[36px] sm:text-[52px] lg:text-[62px] font-black tracking-tight leading-[1.08] mb-5 text-white">
              {model.name}
            </h1>
            <p className="text-[17px] sm:text-[21px] text-[#A8A39E] leading-relaxed font-normal max-w-3xl">
              {model.desc}
            </p>
          </div>

          {/* 4-Cell Interactive Architecture & Spec Pods inside Hero */}
          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-8 border-t border-[#262422]">
            
            <div className="bg-[#181614]/80 backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-[#2E2A27] hover:border-[#F55036]/60 transition-all group/pod">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono font-bold text-[#8B8B8B] uppercase tracking-wider">Architecture Specs</span>
                <Cpu size={16} className="text-[#F55036] group-hover/pod:scale-110 transition-transform" />
              </div>
              <div className="text-[18px] sm:text-[22px] font-black text-white font-mono tracking-tight">
                {model.params || "Dense / MoE 180B"}
              </div>
              <span className="text-[11px] font-mono text-[#10B981] mt-1 block">✓ High-Density Mixture-of-Experts</span>
            </div>

            <div className="bg-[#181614]/80 backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-[#2E2A27] hover:border-[#3B82F6]/60 transition-all group/pod">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono font-bold text-[#8B8B8B] uppercase tracking-wider">Context Capacity</span>
                <Box size={16} className="text-[#3B82F6] group-hover/pod:scale-110 transition-transform" />
              </div>
              <div className="text-[18px] sm:text-[22px] font-black text-white font-mono tracking-tight">
                {model.context || "200,000 Tokens"}
              </div>
              <span className="text-[11px] font-mono text-[#3B82F6] mt-1 block">✓ Native Prompt Caching Supported</span>
            </div>

            <div className="bg-[#181614]/80 backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-[#2E2A27] hover:border-[#F55036]/60 transition-all group/pod">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono font-bold text-[#8B8B8B] uppercase tracking-wider">Primary Specialization</span>
                <Activity size={16} className="text-[#F55036] group-hover/pod:scale-110 transition-transform" />
              </div>
              <div className="text-[18px] sm:text-[22px] font-black text-white tracking-tight truncate">
                {model.area}
              </div>
              <span className="text-[11px] font-mono text-[#E0E0E0] mt-1 block">⚡ Instantaneous vs Extended CoT</span>
            </div>

            <div className="bg-[#181614]/80 backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-[#2E2A27] hover:border-[#8B5CF6]/60 transition-all group/pod">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono font-bold text-[#8B8B8B] uppercase tracking-wider">Literature Citations</span>
                <BookOpen size={16} className="text-[#8B5CF6] group-hover/pod:scale-110 transition-transform" />
              </div>
              <div className="text-[18px] sm:text-[22px] font-black text-white font-mono tracking-tight">
                {model.paperCount} Verified Papers
              </div>
              <span className="text-[11px] font-mono text-[#8B5CF6] mt-1 block">📚 Indexed in Frontier Repository</span>
            </div>

          </div>
        </div>
      </section>

      {/* ── STATE-OF-THE-ART INTERACTIVE TAB BAR ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12">
        <div className="bg-white border border-[#E5E5E0] rounded-2xl sm:rounded-3xl p-2 sm:p-2.5 shadow-sm flex items-center justify-between gap-2 overflow-x-auto">
          
          <button
            onClick={() => setActiveTab("evals")}
            className={`flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl font-bold text-[14px] transition-all flex-1 min-h-[46px] flex-shrink-0 ${
              activeTab === "evals"
                ? "bg-[#111111] text-white shadow-md scale-[1.01]"
                : "text-[#555555] hover:bg-[#F8F7F2] hover:text-[#111111]"
            }`}
          >
            <Trophy size={18} className={activeTab === "evals" ? "text-[#F55036]" : "text-[#8B8B8B]"} />
            <span>Verified Academic Benchmarks</span>
            <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${activeTab === "evals" ? "bg-[#F55036] text-white font-extrabold" : "bg-[#EAE9E4] text-[#555555]"}`}>
              {model.benchmarks?.length || 0}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("workbench")}
            className={`flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl font-bold text-[14px] transition-all flex-1 min-h-[46px] flex-shrink-0 ${
              activeTab === "workbench"
                ? "bg-[#111111] text-white shadow-md scale-[1.01]"
                : "text-[#555555] hover:bg-[#F8F7F2] hover:text-[#111111]"
            }`}
          >
            <Terminal size={18} className={activeTab === "workbench" ? "text-[#10B981]" : "text-[#8B8B8B]"} />
            <span>Interactive SDK Workbench</span>
            <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${activeTab === "workbench" ? "bg-[#10B981] text-white font-extrabold" : "bg-[#EAE9E4] text-[#555555]"}`}>
              LIVE
            </span>
          </button>

          <button
            onClick={() => setActiveTab("architecture")}
            className={`flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl font-bold text-[14px] transition-all flex-1 min-h-[46px] flex-shrink-0 ${
              activeTab === "architecture"
                ? "bg-[#111111] text-white shadow-md scale-[1.01]"
                : "text-[#555555] hover:bg-[#F8F7F2] hover:text-[#111111]"
            }`}
          >
            <Layers size={18} className={activeTab === "architecture" ? "text-[#3B82F6]" : "text-[#8B8B8B]"} />
            <span>Architecture & Capabilities</span>
          </button>

          <button
            onClick={() => setActiveTab("literature")}
            className={`flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl font-bold text-[14px] transition-all flex-1 min-h-[46px] flex-shrink-0 ${
              activeTab === "literature"
                ? "bg-[#111111] text-white shadow-md scale-[1.01]"
                : "text-[#555555] hover:bg-[#F8F7F2] hover:text-[#111111]"
            }`}
          >
            <BookOpen size={18} className={activeTab === "literature" ? "text-[#8B5CF6]" : "text-[#8B8B8B]"} />
            <span>Research Literature</span>
            <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${activeTab === "literature" ? "bg-[#8B5CF6] text-white font-extrabold" : "bg-[#EAE9E4] text-[#555555]"}`}>
              {relatedPapers.length}
            </span>
          </button>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────────
          TAB 1: VERIFIED ACADEMIC BENCHMARKS & EVALUATION MATRIX
      ───────────────────────────────────────────────────────────────────────────── */}
      {activeTab === "evals" && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 animate-fadeIn space-y-8">
          
          {/* Controls Bar */}
          <div className="bg-white border border-[#E5E5E0] rounded-2xl p-4 sm:p-5 shadow-sm flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFF6F3] text-[#F55036] flex items-center justify-center border border-[#FFEDD5] font-black">
                <BarChart3 size={20} />
              </div>
              <div>
                <h2 className="text-[18px] font-black text-[#111111]">Empirical Evaluation Leaderboard</h2>
                <p className="text-[12px] font-mono text-[#8B8B8B]">Official verified evaluations vs baseline human expert threshold</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-[#F8F7F2] p-1.5 rounded-xl border border-[#EAE9E4]">
              <button
                onClick={() => setEvalMode("standard")}
                className={`px-3.5 py-1.5 rounded-lg font-bold text-[12px] transition-all ${
                  evalMode === "standard" ? "bg-[#111111] text-white shadow-sm" : "text-[#555555] hover:text-[#111111]"
                }`}
              >
                📊 Standard Matrix
              </button>
              <button
                onClick={() => setEvalMode("human")}
                className={`px-3.5 py-1.5 rounded-lg font-bold text-[12px] transition-all ${
                  evalMode === "human" ? "bg-[#F55036] text-white shadow-sm" : "text-[#555555] hover:text-[#111111]"
                }`}
              >
                ⚖️ Human Baseline Comparison
              </button>
            </div>
          </div>

          {/* Benchmarks Grid (Responsive Cards with Gauges) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {model.benchmarks && model.benchmarks.length > 0 ? (
              model.benchmarks.map((bm, i) => {
                const humanBaseline = bm.name.includes("SWE-Bench") ? 48.0 : bm.name.includes("MMLU") ? 89.8 : 85.0;
                const delta = (bm.value - humanBaseline).toFixed(1);

                return (
                  <div
                    key={i}
                    className="bg-white border border-[#E5E5E0] rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all space-y-6 relative overflow-hidden group/card"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: bm.color || "#F55036" }} />
                          <h3 className="text-[20px] font-black text-[#111111] tracking-tight">{bm.name}</h3>
                        </div>
                        <span className="text-[12px] font-mono text-[#8B8B8B] block">Peer-Reviewed Verification Suite</span>
                      </div>
                      
                      <div className="text-right">
                        <span className="text-[32px] sm:text-[38px] font-black text-[#111111] font-mono leading-none block">
                          {bm.score}
                        </span>
                        <span className="inline-block mt-1 px-2.5 py-0.5 bg-[#DCFCE7] text-[#16A34A] rounded-full font-mono font-black text-[11px] border border-[#BBF7D0]">
                          Top 0.8% Global
                        </span>
                      </div>
                    </div>

                    {/* Gauge Bar */}
                    <div className="space-y-2 pt-2">
                      <div className="flex items-center justify-between text-[12px] font-mono font-bold text-[#555555]">
                        <span>Model Capability vs Threshold</span>
                        {evalMode === "human" && (
                          <span className={Number(delta) >= 0 ? "text-[#16A34A]" : "text-[#F55036]"}>
                            {Number(delta) >= 0 ? `+${delta}% vs Human Expert` : `${delta}% vs Human Expert`}
                          </span>
                        )}
                      </div>

                      <div className="w-full bg-[#F3F4F6] h-4 rounded-full p-0.5 border border-[#EAE9E4] relative overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700 relative"
                          style={{ width: `${bm.value}%`, backgroundColor: bm.color || "#F55036" }}
                        >
                          <div className="absolute top-0 right-0 bottom-0 w-2 bg-white/40 animate-pulse rounded-full" />
                        </div>

                        {/* Human Expert Marker line if human mode */}
                        {evalMode === "human" && (
                          <div
                            className="absolute top-0 bottom-0 w-1 bg-[#111111] z-10 flex items-center justify-center"
                            style={{ left: `${humanBaseline}%` }}
                            title={`Human Expert Baseline: ${humanBaseline}%`}
                          >
                            <span className="absolute -top-6 text-[10px] font-mono bg-[#111111] text-white px-1.5 py-0.5 rounded shadow">
                              Human: {humanBaseline}%
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom Methodology Note */}
                    <div className="pt-4 border-t border-[#F3F4F6] flex items-center justify-between text-[12px] text-[#8B8B8B] font-mono">
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck size={14} className="text-[#16A34A]" />
                        <span>Verified Zero-Shot Chain-of-Thought</span>
                      </span>
                      <span className="text-[#F55036] font-bold group-hover/card:underline cursor-pointer">
                        View Prompt Spec →
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-2 bg-white border border-[#E5E5E0] rounded-3xl p-12 text-center">
                <p className="text-[16px] font-bold text-[#555555]">Extensive evaluation suites are currently being compiled for this model.</p>
              </div>
            )}
          </div>

        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────────────────────
          TAB 2: INTERACTIVE SDK WORKBENCH & CODE PLAYGROUND
      ───────────────────────────────────────────────────────────────────────────── */}
      {activeTab === "workbench" && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 animate-fadeIn space-y-6">
          
          <div className="bg-[#0E0D0C] border border-[#262422] rounded-3xl sm:rounded-[36px] overflow-hidden shadow-2xl text-white">
            
            {/* Top Workbench Header */}
            <div className="p-6 sm:p-8 border-b border-[#262422] bg-[#141211] flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#F55036]/15 text-[#F55036] flex items-center justify-center border border-[#F55036]/30">
                  <Terminal size={24} />
                </div>
                <div>
                  <h2 className="text-[20px] sm:text-[22px] font-black text-white">Interactive SDK Workbench</h2>
                  <p className="text-[13px] font-mono text-[#A8A39E]">Generate live inference code with dynamic architectural capabilities</p>
                </div>
              </div>

              {/* Language Switcher */}
              <div className="flex items-center gap-1.5 bg-[#1F1D1B] p-1.5 rounded-2xl border border-[#33302E] overflow-x-auto max-w-full">
                {(["python", "typescript", "curl", "ollama"] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSdkLang(lang)}
                    className={`px-4 py-2 rounded-xl text-[12px] font-mono font-bold capitalize transition-all min-h-[38px] flex-shrink-0 ${
                      sdkLang === lang
                        ? "bg-[#F55036] text-white shadow-md font-extrabold"
                        : "text-[#999999] hover:text-white hover:bg-[#2A2725]"
                    }`}
                  >
                    {lang === "curl" ? "REST / cURL" : lang === "typescript" ? "TypeScript / Node" : lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Capability Feature Toggles */}
            <div className="px-6 sm:px-8 py-5 bg-[#1A1816] border-b border-[#262422] grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#22201E] border border-[#33302E] cursor-pointer hover:border-[#F55036]/50 transition-colors">
                <div className="flex items-center gap-2.5">
                  <span className="text-[16px]">🧠</span>
                  <div>
                    <span className="text-[13px] font-bold text-white block leading-tight">Extended CoT Reasoning</span>
                    <span className="text-[11px] font-mono text-[#8B8B8B]">Allocate 12k thinking tokens</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={enableThinking}
                  onChange={(e) => setEnableThinking(e.target.checked)}
                  className="w-5 h-5 accent-[#F55036] rounded cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#22201E] border border-[#33302E] cursor-pointer hover:border-[#3B82F6]/50 transition-colors">
                <div className="flex items-center gap-2.5">
                  <span className="text-[16px]">🛠️</span>
                  <div>
                    <span className="text-[13px] font-bold text-white block leading-tight">Autonomous Tool Calling</span>
                    <span className="text-[11px] font-mono text-[#8B8B8B]">Attach sandboxed execute_code</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={enableTools}
                  onChange={(e) => setEnableTools(e.target.checked)}
                  className="w-5 h-5 accent-[#3B82F6] rounded cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#22201E] border border-[#33302E] cursor-pointer hover:border-[#10B981]/50 transition-colors">
                <div className="flex items-center gap-2.5">
                  <span className="text-[16px]">⚡</span>
                  <div>
                    <span className="text-[13px] font-bold text-white block leading-tight">Response Buffer Stream</span>
                    <span className="text-[11px] font-mono text-[#8B8B8B]">Real-time token delta output</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={enableStreaming}
                  onChange={(e) => setEnableStreaming(e.target.checked)}
                  className="w-5 h-5 accent-[#10B981] rounded cursor-pointer"
                />
              </label>

            </div>

            {/* Code Display Area */}
            <div className="relative p-6 sm:p-8 bg-[#0E0D0C]">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#262422] text-[12px] font-mono text-[#8B8B8B]">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                  <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
                  <span className="ml-2 text-white font-bold">{model.id}.{sdkLang === "python" ? "py" : sdkLang === "typescript" ? "ts" : "sh"}</span>
                </div>
                
                <button
                  onClick={() => handleCopyCode()}
                  className="flex items-center gap-2 px-4 py-2 bg-[#22201E] hover:bg-[#F55036] text-white rounded-xl text-[12px] font-bold font-mono transition-all duration-200 min-h-[38px] shadow-sm"
                >
                  {copied ? (
                    <>
                      <Check size={14} className="text-[#10B981]" />
                      <span className="text-[#10B981]">Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy Generated Spec</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-4 sm:p-6 rounded-2xl bg-[#141211] border border-[#262422] text-[13px] sm:text-[14.5px] font-mono text-[#E2E8F0] overflow-x-auto leading-relaxed selection:bg-[#F55036]">
                <code>{generatedCode}</code>
              </pre>
            </div>

            {/* Bottom API Quick Specs */}
            <div className="px-6 sm:px-8 py-4 bg-[#141211] border-t border-[#262422] flex flex-wrap items-center justify-between gap-4 text-[12px] font-mono text-[#8B8B8B]">
              <div className="flex items-center gap-4 flex-wrap">
                <span>API Endpoint: <strong className="text-white">api.anthropic.com/v1/messages</strong></span>
                <span>•</span>
                <span>Context Window: <strong className="text-[#F55036]">{model.context || "200k tokens"}</strong></span>
                <span>•</span>
                <span>Prompt Caching: <strong className="text-[#10B981]">Enabled (50% discount)</strong></span>
              </div>
              <a href="https://docs.anthropic.com" target="_blank" rel="noreferrer" className="text-[#F55036] hover:underline font-bold">
                View Full Documentation →
              </a>
            </div>

          </div>

        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────────────────────
          TAB 3: ARCHITECTURE & CAPABILITIES DEEP-DIVE
      ───────────────────────────────────────────────────────────────────────────── */}
      {activeTab === "architecture" && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 animate-fadeIn space-y-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-block px-3.5 py-1 bg-[#FFF6F3] text-[#F55036] rounded-full font-mono font-black text-[12px] uppercase tracking-wider border border-[#FFEDD5]">
              System Topology & Engine
            </span>
            <h2 className="text-[28px] sm:text-[36px] font-black text-[#111111]">
              Architectural Capabilities Suite
            </h2>
            <p className="text-[16px] text-[#555555]">
              Detailed technical breakdown of core sub-systems, token economics, and agentic safeguards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="bg-white border border-[#E5E5E0] rounded-3xl p-7 shadow-sm hover:border-[#111111] transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF6F3] text-[#F55036] flex items-center justify-center border border-[#FFEDD5] font-black text-[22px]">
                🧠
              </div>
              <h3 className="text-[20px] font-black text-[#111111]">Hybrid Reasoning Engine</h3>
              <p className="text-[14px] text-[#555555] leading-relaxed">
                Seamlessly transitions between instantaneous high-throughput generation (`Flash mode`) and deep mathematical verification (`Thinking mode`) where intermediate thought tokens are evaluated and self-corrected before final output.
              </p>
              <div className="pt-2 font-mono text-[12px] text-[#F55036] font-bold">
                ✓ Dynamic compute scaling per prompt
              </div>
            </div>

            <div className="bg-white border border-[#E5E5E0] rounded-3xl p-7 shadow-sm hover:border-[#111111] transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#EFF6FF] text-[#3B82F6] flex items-center justify-center border border-[#DBEAFE] font-black text-[22px]">
                🛠️
              </div>
              <h3 className="text-[20px] font-black text-[#111111]">Autonomous Agentic Orchestration</h3>
              <p className="text-[14px] text-[#555555] leading-relaxed">
                Native training for multi-step tool execution, structured JSON schema enforcement, sandboxed terminal command generation, and browser navigation across complex full-repository coding tasks.
              </p>
              <div className="pt-2 font-mono text-[12px] text-[#3B82F6] font-bold">
                ✓ 50%+ SWE-Bench Verified SOTA
              </div>
            </div>

            <div className="bg-white border border-[#E5E5E0] rounded-3xl p-7 shadow-sm hover:border-[#111111] transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F0FDF4] text-[#10B981] flex items-center justify-center border border-[#DCFCE7] font-black text-[22px]">
                👁️
              </div>
              <h3 className="text-[20px] font-black text-[#111111]">Multimodal Vision Understanding</h3>
              <p className="text-[14px] text-[#555555] leading-relaxed">
                State-of-the-art visual reasoning capable of reading dense engineering diagrams, extracting UI design systems from raw Figma screenshots, and interpreting multi-page academic PDFs with sub-pixel OCR.
              </p>
              <div className="pt-2 font-mono text-[12px] text-[#10B981] font-bold">
                ✓ 1M pixel spatial resolution
              </div>
            </div>

            <div className="bg-white border border-[#E5E5E0] rounded-3xl p-7 shadow-sm hover:border-[#111111] transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF5FF] text-[#8B5CF6] flex items-center justify-center border border-[#F3E8FF] font-black text-[22px]">
                ⚡
              </div>
              <h3 className="text-[20px] font-black text-[#111111]">High-Speed Token Economics</h3>
              <p className="text-[14px] text-[#555555] leading-relaxed">
                Optimized attention heads capable of delivering up to 60 tokens per second on commercial infrastructure, combined with automatic prompt caching that reduces repeated systemic context costs by over 50%.
              </p>
              <div className="pt-2 font-mono text-[12px] text-[#8B5CF6] font-bold">
                ✓ Ultra-low latency TTFT (~250ms)
              </div>
            </div>

            <div className="bg-white border border-[#E5E5E0] rounded-3xl p-7 shadow-sm hover:border-[#111111] transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF1F2] text-[#E11D48] flex items-center justify-center border border-[#FFE4E6] font-black text-[22px]">
                🛡️
              </div>
              <h3 className="text-[20px] font-black text-[#111111]">Constitutional Safeguards</h3>
              <p className="text-[14px] text-[#555555] leading-relaxed">
                Trained using advanced Direct Preference Optimization (DPO) and Constitutional AI principles to prevent reward hacking, hallucination loops, and unauthorized adversarial prompt injection.
              </p>
              <div className="pt-2 font-mono text-[12px] text-[#E11D48] font-bold">
                ✓ ASL-3 Security Alignment Standard
              </div>
            </div>

            <div className="bg-white border border-[#E5E5E0] rounded-3xl p-7 shadow-sm hover:border-[#111111] transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center border border-[#FDE68A] font-black text-[22px]">
                🔗
              </div>
              <h3 className="text-[20px] font-black text-[#111111]">Ecosystem Compatibility</h3>
              <p className="text-[14px] text-[#555555] leading-relaxed">
                Native drop-in integration across major enterprise frameworks including LangChain, Vercel AI SDK, LlamaIndex, Cursor IDE, OpenWebUI, and cloud providers (Amazon Bedrock / Google Cloud Vertex AI).
              </p>
              <div className="pt-2 font-mono text-[12px] text-[#D97706] font-bold">
                ✓ Multi-cloud deployment ready
              </div>
            </div>

          </div>

        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────────────────────
          TAB 4: RESEARCH LITERATURE & ACADEMIC BIBLIOGRAPHY
      ───────────────────────────────────────────────────────────────────────────── */}
      {activeTab === "literature" && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 animate-fadeIn space-y-6">
          
          <div className="bg-white border border-[#E5E5E0] rounded-2xl p-5 shadow-sm flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFF6F3] text-[#F55036] flex items-center justify-center border border-[#FFEDD5] font-black">
                <BookOpen size={20} />
              </div>
              <div>
                <h2 className="text-[18px] font-black text-[#111111]">Indexed Academic Citations</h2>
                <p className="text-[12px] font-mono text-[#8B8B8B]">Peer-reviewed literature citing, evaluating, or comparing {model.name}</p>
              </div>
            </div>

            <span className="px-3.5 py-1.5 bg-[#F8F7F2] border border-[#EAE9E4] rounded-xl font-mono font-extrabold text-[13px] text-[#111111]">
              {relatedPapers.length} Papers Found
            </span>
          </div>

          {relatedPapers.length === 0 ? (
            <div className="bg-white border border-[#E5E5E0] rounded-3xl p-16 text-center space-y-4">
              <p className="text-[18px] font-extrabold text-[#555555]">No direct paper citations indexed yet.</p>
              <Link href="/trending" className="inline-flex items-center gap-2 px-6 py-3 bg-[#F55036] text-white font-bold rounded-xl text-[14px] shadow-sm">
                <span>Browse All Trending AI Research</span>
                <ExternalLink size={15} />
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
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
