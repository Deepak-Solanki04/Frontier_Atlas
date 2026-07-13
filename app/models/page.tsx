"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Trophy, Cpu, Layers, ExternalLink, Code2, Check, Copy, X } from "lucide-react";
import { getModels, type ModelItem } from "@/lib/models";

const TOP_MODELS_BOXES = [
  {
    id: "claude-3-7-sonnet",
    rank: "1", rankBg: "#ffe4e6", rankColor: "#e11d48",
    iconBg: "#ff4d00",
    name: "Claude 3.7 Sonnet", sub: "Anthropic", domain: "reasoning",
    desc: "First hybrid reasoning frontier model enabling instantaneous or extended chain-of-thought verification.",
    score: "62.3%"
  },
  {
    id: "gpt-4o",
    rank: "2", rankBg: "#f3e8ff", rankColor: "#9333ea",
    iconBg: "#a855f7",
    name: "GPT-4o", sub: "OpenAI", domain: "multimodal",
    desc: "Flagship omni multimodal foundation model reasoning seamlessly across audio, vision, and text.",
    score: "88.7%"
  },
  {
    id: "deepseek-r1",
    rank: "3", rankBg: "#ecfccb", rankColor: "#65a30d",
    iconBg: "#84cc16",
    name: "DeepSeek R1", sub: "DeepSeek AI", domain: "reasoning",
    desc: "Breakthrough open reasoning model trained via large-scale RL directly eliciting long reasoning traces.",
    score: "79.8%"
  },
  {
    id: "gemini-2-0-flash",
    rank: "4", rankBg: "#dbeafe", rankColor: "#2563eb",
    iconBg: "#3b82f6",
    name: "Gemini 2.0 Flash", sub: "Google DeepMind", domain: "agentic",
    desc: "Next-generation agentic model delivering 2x speedup and native tool orchestration across 1M context.",
    score: "99.8%"
  },
  {
    id: "llama-3-3-70b",
    rank: "5", rankBg: "#ffedd5", rankColor: "#ea580c",
    iconBg: "#f97316",
    name: "Llama 3.3 70B", sub: "Meta AI", domain: "nlp",
    desc: "Open-weight instruction model matching Llama 3.1 405B performance on reasoning and code.",
    score: "93.8%"
  },
  {
    id: "qwen-2-5-max",
    rank: "6", rankBg: "#ccfbf1", rankColor: "#0d9488",
    iconBg: "#14b8a6",
    name: "Qwen 2.5 Max", sub: "Alibaba Cloud", domain: "reasoning",
    desc: "Large-scale flagship MoE model surpassing top commercial APIs across math and coding benchmarks.",
    score: "94.5%"
  },
  {
    id: "grok-3",
    rank: "7", rankBg: "#fce7f3", rankColor: "#db2777",
    iconBg: "#f43f5e",
    name: "Grok 3", sub: "xAI", domain: "nlp",
    desc: "Massive-scale foundation model trained on Colossus cluster featuring real-time knowledge indexing.",
    score: "73.4%"
  },
  {
    id: "qwen-2-5-coder-32b",
    rank: "8", rankBg: "#ffedd5", rankColor: "#ea580c",
    iconBg: "#ff6b00",
    name: "Qwen 2.5 Coder", sub: "Alibaba Cloud", domain: "computer-code",
    desc: "State-of-the-art open coding model achieving 50%+ on SWE-Bench Verified, rivaling closed models.",
    score: "51.4%"
  },
  {
    id: "mistral-large-2",
    rank: "9", rankBg: "#e0e7ff", rankColor: "#4f46e5",
    iconBg: "#6366f1",
    name: "Mistral Large 2", sub: "Mistral AI", domain: "agentic",
    desc: "Advanced frontier model engineered for high-precision function calling and structured json generation.",
    score: "91.2%"
  },
  {
    id: "flux-1-schnell",
    rank: "10", rankBg: "#ede9fe", rankColor: "#7c3aed",
    iconBg: "#8b5cf6",
    name: "FLUX.1 [schnell]", sub: "Black Forest Labs", domain: "computer-vision",
    desc: "Fast rectified flow transformer producing photorealistic images in 1 to 4 inference steps.",
    score: "94.1%"
  }
];

const ALL_VENDORS = [
  { id: "OpenAI", name: "OpenAI", count: 85 },
  { id: "Google DeepMind", name: "Google DeepMind", count: 71 },
  { id: "Anthropic", name: "Anthropic", count: 44 },
  { id: "Alibaba Cloud", name: "Alibaba Cloud", count: 47 },
  { id: "Meta AI", name: "Meta AI", count: 30 },
  { id: "Mistral AI", name: "Mistral AI", count: 30 },
  { id: "DeepSeek AI", name: "DeepSeek AI", count: 28 },
  { id: "NVIDIA", name: "NVIDIA", count: 18 },
  { id: "xAI", name: "xAI", count: 12 },
  { id: "Cohere", name: "Cohere", count: 9 },
  { id: "SpeakLeash", name: "SpeakLeash", count: 10 }
];

const RESEARCH_DOMAINS = [
  { id: "nlp", name: "Natural Language & Chat", code: "nlp", models: 842, evals: "7,436 results", leader: "speakleash / Claude 3.7" },
  { id: "computer-vision", name: "Computer Vision & OCR", code: "computer-vision", models: 896, evals: "2,328 results", leader: "SOTA / Gemini 2.0" },
  { id: "computer-code", name: "Computer Code Generation", code: "computer-code", models: 152, evals: "297 results", leader: "Anthropic / Qwen" },
  { id: "reasoning", name: "Reasoning & Math CoT", code: "reasoning", models: 151, evals: "415 results", leader: "OpenAI / DeepSeek" },
  { id: "agentic", name: "Agentic AI & Tool Calling", code: "agentic", models: 164, evals: "225 results", leader: "OpenAI / Anthropic" },
  { id: "speech", name: "Speech & Audio Synthesis", code: "speech", models: 104, evals: "532 results", leader: "NVIDIA / OpenAI" },
  { id: "multimodal", name: "Omni Multimodal & Vision", code: "multimodal", models: 88, evals: "267 results", leader: "Alibaba / Google" },
  { id: "medical", name: "Medical & Biomedical AI", code: "medical", models: 50, evals: "83 results", leader: "Stanford / Research" }
];

function ModelsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const vendorParam = searchParams?.get("vendor") || null;
  const domainParam = searchParams?.get("domain") || null;

  const [inspectedModel, setInspectedModel] = useState<ModelItem | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (vendorParam) {
      router.replace(`/models/vendor/${encodeURIComponent(vendorParam)}`);
    } else if (domainParam) {
      router.replace(`/models/domain/${encodeURIComponent(domainParam)}`);
    }
  }, [vendorParam, domainParam, router]);

  const handleVendorClick = (vName: string | null) => {
    if (!vName) return;
    router.push(`/models/vendor/${encodeURIComponent(vName)}`);
  };

  const handleDomainClick = (dId: string | null) => {
    if (!dId) return;
    router.push(`/models/domain/${encodeURIComponent(dId)}`);
  };

  const handleCopyQuickstart = () => {
    if (inspectedModel?.quickstart) {
      navigator.clipboard.writeText(inspectedModel.quickstart);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const breadcrumbs = ["Home", "Directory", "Models"];
  const stats = [
    { count: "16", label: "Models Indexed", orange: true },
    { count: "6", label: "Research Domains", orange: false },
    { count: "1,357", label: "Benchmark Evals", orange: false },
    { count: "12", label: "Leading Vendors", orange: false },
  ];

  return (
    <div className="unified-page-wrapper topic-page-wrapper pb-20">
      <div className="models-directory-container">
        <div className="topic-breadcrumbs">
          {breadcrumbs.map((b, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <span className="crumb-sep">&gt;</span>}
              <span className={idx === breadcrumbs.length - 1 ? "crumb-current" : "crumb-link"}>{b}</span>
            </React.Fragment>
          ))}
        </div>

        <div className="topic-badge-row">
          <span className="topic-task-icon">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M9 3v18" />
              <path d="M15 3v18" />
              <path d="M3 9h18" />
              <path d="M3 15h18" />
            </svg>
          </span>
          <span className="topic-badge-label">FOUNDATION DIRECTORY</span>
        </div>

        <h1 className="topic-hero-title">Models</h1>

        <p className="topic-hero-desc">
          Explore state-of-the-art foundation models evaluated across verified academic benchmarks, reasoning tasks, and real-world agentic workflows.
        </p>

        <div className="topic-stats-row">
          {stats.map((s, i) => (
            <div key={i} className="topic-stat-item">
              <span className={`topic-stat-count ${s.orange ? "stat-orange" : ""}`}>{s.count}</span>
              <span className="topic-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        <hr className="topic-hero-divider" />

        <div className="models-section-title-strip">
          <div className="models-section-heading">
            <span>Vendor Index</span>
          </div>
          <span className="models-section-sub">Select any foundation model creator to inspect complete evaluations</span>
        </div>

        <div className="models-vendor-strip">
          <button
            onClick={() => {}}
            className="models-vendor-pill active"
          >
            <span>All Vendors</span>
            <span className="models-vendor-count">1,357</span>
          </button>
          {ALL_VENDORS.map((v) => (
            <button
              key={v.id}
              onClick={() => handleVendorClick(v.id)}
              className="models-vendor-pill"
            >
              <span>{v.name}</span>
              <span className="models-vendor-count">{v.count}</span>
            </button>
          ))}
          <span className="text-xs font-semibold text-[#8B8B8B] ml-1 italic">
            + 247 smaller vendors (291 models)
          </span>
        </div>

        <div className="models-section-title-strip">
          <div className="models-section-heading">
            <span>Research Areas &amp; Modalities</span>
          </div>
          <span className="models-section-sub">Click any domain to explore verified benchmark leaderboards</span>
        </div>

        <div className="models-areas-grid">
          {RESEARCH_DOMAINS.map((d) => (
            <div
              key={d.id}
              onClick={() => handleDomainClick(d.id)}
              className="models-area-card cursor-pointer hover:border-[#111111] transition-colors"
            >
              <div>
                <div className="models-area-code">{d.code}</div>
                <div className="models-area-title">{d.name}</div>
                <div className="models-area-stats">
                  <span className="text-[#111111] font-extrabold">{d.models}</span> models &middot; <span className="text-[#111111] font-extrabold">{d.evals}</span>
                </div>
              </div>
              <div className="models-area-leader">
                led by <span className="font-bold">{d.leader}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {inspectedModel && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl h-full overflow-y-auto p-6 md:p-8 shadow-2xl flex flex-col justify-between border-l border-[#E5E5E0]">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E5E5E0] mb-6">
                <div>
                  <span className="text-[11px] font-extrabold uppercase px-2.5 py-1 bg-[#FFF6F3] text-[#FF5A1F] rounded-full border border-[#FFEDD5]">
                    {inspectedModel.org}
                  </span>
                  <h2 className="text-[28px] font-black text-[#111111] mt-2">
                    {inspectedModel.name}
                  </h2>
                </div>
                <button
                  onClick={() => setInspectedModel(null)}
                  className="w-10 h-10 rounded-full bg-[#F8F7F2] hover:bg-[#E5E5E0] flex items-center justify-center text-[#555555] transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <p className="text-[15px] text-[#555555] font-medium leading-relaxed mb-6">
                {inspectedModel.desc}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 bg-[#F8F7F2] p-4 rounded-2xl border border-[#EAE9E4] text-[12px]">
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-[#8B8B8B] block mb-1">Architecture</span>
                  <span className="font-extrabold text-[#111111]">{inspectedModel.params || "Dense"}</span>
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-[#8B8B8B] block mb-1">Context</span>
                  <span className="font-extrabold text-[#111111]">{inspectedModel.context || "128k"}</span>
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-[#8B8B8B] block mb-1">Elo Rating</span>
                  <span className="font-extrabold text-[#16A34A]">{inspectedModel.elo ? `⚡ ${inspectedModel.elo}` : "N/A"}</span>
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-[#8B8B8B] block mb-1">Citations</span>
                  <span className="font-extrabold text-[#111111]">{inspectedModel.paperCount}</span>
                </div>
              </div>

              {inspectedModel.benchmarks && inspectedModel.benchmarks.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-[14px] font-black uppercase tracking-wider text-[#111111] mb-3 flex items-center gap-2">
                    <Trophy size={16} className="text-[#FF5A1F]" />
                    <span>Verified Academic Benchmarks</span>
                  </h3>
                  <div className="bg-[#F8F7F2] rounded-2xl p-4 border border-[#EAE9E4] space-y-3.5">
                    {inspectedModel.benchmarks.map((bm, i) => (
                      <div key={i}>
                        <div className="flex items-center justify-between text-[13px] font-bold mb-1">
                          <span className="text-[#333333]">{bm.name}</span>
                          <span className="text-[#111111] font-black">{bm.score}</span>
                        </div>
                        <div className="w-full bg-[#E5E5E0] h-2 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${bm.value}%`, backgroundColor: bm.color || "#FF5A1F" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {inspectedModel.quickstart && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[13px] font-black text-[#111111] flex items-center gap-1.5">
                      <Code2 size={16} className="text-[#FF5A1F]" />
                      <span>Inference Quickstart</span>
                    </span>
                    <button
                      onClick={handleCopyQuickstart}
                      className="flex items-center gap-1 text-[12px] font-bold px-3 py-1 bg-[#F3F4F6] hover:bg-[#E5E7EB] rounded-lg transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check size={13} className="text-[#16A34A]" />
                          <span className="text-[#16A34A]">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={13} className="text-[#555555]" />
                          <span>Copy Snippet</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="bg-[#111111] text-[#F8F7F2] p-4 rounded-2xl text-[12px] font-mono overflow-x-auto border border-[#333333] leading-relaxed">
                    <code>{inspectedModel.quickstart}</code>
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ModelsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8F7F2] flex items-center justify-center font-bold text-[#8B8B8B]">Loading Directory...</div>}>
      <ModelsContent />
    </Suspense>
  );
}
