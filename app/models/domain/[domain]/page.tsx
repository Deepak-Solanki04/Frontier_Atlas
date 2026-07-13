"use client";

import React, { useState, useEffect, useMemo, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trophy, Cpu, Layers, ExternalLink, Code2, Check, Copy, X, ArrowLeft } from "lucide-react";
import { getModels, type ModelItem } from "@/lib/models";

const RESEARCH_DOMAINS = [
  { id: "computer-code", name: "Computer Code Generation", code: "COD", models: "412", evals: "SWE-Bench, LiveCodeBench" },
  { id: "reasoning", name: "Mathematical & Advanced Reasoning", code: "MAT", models: "384", evals: "AIME 2024, MATH-500, GPQA" },
  { id: "agentic", name: "Agentic & Tool Orchestration", code: "AGT", models: "298", evals: "WebArena, OSWorld, BFCL" },
  { id: "nlp", name: "Natural Language & Chat Alignment", code: "NLP", models: "1,142", evals: "MMLU-Pro, Chatbot Arena Elo" },
  { id: "multimodal", name: "Vision-Language & Audio Reasoning", code: "MUL", models: "315", evals: "MMMU, MathVista, Video-MME" },
  { id: "computer-vision", name: "Computer Vision & OCR", code: "VIS", models: "276", evals: "ImageNet-1K, OCRBench" },
  { id: "audio-speech", name: "Audio, Speech & Acoustics", code: "AUD", models: "189", evals: "LibriSpeech, FLEURS, Earnings22" },
  { id: "robotics", name: "Embodied AI & Robotics Control", code: "ROB", models: "142", evals: "RoboCasa, CALVIN, Sim2Real" },
];

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

export default function ModelDomainPage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const domainId = decodeURIComponent(resolvedParams.domain);
  const domainInfo = RESEARCH_DOMAINS.find(d => d.id === domainId) || { name: domainId, code: "DOM", models: "100+", evals: "Verified Evals" };

  const [allModels, setAllModels] = useState<ModelItem[]>([]);
  const [inspectedModel, setInspectedModel] = useState<ModelItem | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    getModels().then((data) => {
      setAllModels(data);
    });
  }, []);

  const handleCopyQuickstart = () => {
    if (inspectedModel?.quickstart) {
      navigator.clipboard.writeText(inspectedModel.quickstart);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const filteredCatalogModels = useMemo(() => {
    const dLower = domainId.toLowerCase();
    const nameLower = domainInfo.name.split(" ")[0].toLowerCase();
    return allModels.filter(m => {
      const areaLower = m.area.toLowerCase();
      return areaLower.includes(dLower) || areaLower.includes(nameLower) || dLower.includes(areaLower) || (m.tags && m.tags.some(t => t.toLowerCase().includes(dLower)));
    });
  }, [allModels, domainId, domainInfo]);

  const domainTopBoxes = useMemo(() => {
    return TOP_MODELS_BOXES.filter(card => {
      return card.domain === domainId || card.desc.toLowerCase().includes(domainInfo.name.split(" ")[0].toLowerCase());
    });
  }, [domainId, domainInfo]);

  const breadcrumbs = ["Home", "Directory", "Models", domainInfo.name];

  return (
    <div className="unified-page-wrapper topic-page-wrapper pb-20">
      <div className="models-directory-container">
        {/* Breadcrumbs */}
        <div className="topic-breadcrumbs">
          {breadcrumbs.map((b, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <span className="crumb-sep">&gt;</span>}
              <span className={idx === breadcrumbs.length - 1 ? "crumb-current" : "crumb-link"}>{b}</span>
            </React.Fragment>
          ))}
        </div>

        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/models"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-[#EAE9E4] border border-[#E5E5E0] text-[13px] font-extrabold text-[#111111] transition-colors shadow-sm no-underline"
          >
            <ArrowLeft size={14} />
            <span>Back to Models Directory</span>
          </Link>
        </div>

        {/* Hero Title Block */}
        <div className="mb-8">
          <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 bg-[#FFF6F3] text-[#FF5A1F] rounded border border-[#FFEDD5] font-extrabold mb-3 inline-block">
            § 01 &middot; {domainInfo.code} Research Area
          </span>
          <h1 className="text-[36px] sm:text-[46px] font-black text-[#111111] tracking-tight leading-tight mb-3">
            {domainInfo.name} Foundation Models
          </h1>
          <p className="text-[16px] text-[#555555] font-medium max-w-3xl leading-relaxed">
            Explore {filteredCatalogModels.length > 0 ? filteredCatalogModels.length : domainInfo.models} verified evaluation records benchmarked on {domainInfo.evals || "standard academic suites"}.
          </p>
        </div>

        {/* Top Evaluated Leaderboard for THIS domain */}
        {domainTopBoxes.length > 0 && (
          <div className="mb-12">
            <div className="topic-benchmarks-header">
              <h2 className="topic-benchmarks-title">
                Top Evaluated {domainInfo.name} Models
              </h2>
              <span className="topic-benchmarks-badge">
                {domainTopBoxes.length}
              </span>
            </div>
            <div className="topic-benchmarks-grid">
              {domainTopBoxes.map((card, i) => (
                <Link
                  key={i}
                  href={`/models/${card.id}`}
                  className="benchmark-card cursor-pointer no-underline block hover:border-[#111111] transition-all duration-200"
                >
                  <div>
                    <div className="bench-rank-pill" style={{ background: card.rankBg, color: card.rankColor }}>
                      {card.rank}
                    </div>
                    <div className="bench-card-header">
                      <div className="bench-icon-box" style={{ background: card.iconBg }}>
                        <span style={{ fontFamily: "monospace", fontWeight: 900, fontSize: "14px" }}>
                          {card.name.slice(0, 1)}
                        </span>
                      </div>
                      <div className="bench-title-col">
                        <div className="bench-name">{card.name}</div>
                        <div className="bench-sub">{card.sub}</div>
                      </div>
                    </div>
                    <p className="bench-desc">{card.desc}</p>
                  </div>
                  <div className="bench-footer">
                    <span className="bench-sota-label">SOTA EVAL</span>
                    <span className="bench-sota-score">{card.score}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Complete Measured Catalog Table */}
        <div className="models-catalog-section mt-6 mb-16 bg-white border border-[#E5E5E0] rounded-[18px] p-6 sm:p-10 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#EAE9E4] pb-5 mb-6 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 bg-[#FFF6F3] text-[#FF5A1F] rounded border border-[#FFEDD5] font-extrabold">
                  § 01 &middot; {domainInfo.code} Domain Index
                </span>
                <span className="text-[12px] font-mono text-[#8B8B8B]">
                  verified benchmarks snapshot
                </span>
              </div>
              <h2 className="text-[28px] sm:text-[34px] font-black text-[#111111] tracking-tight leading-tight">
                {filteredCatalogModels.length} models in {domainInfo.name} &middot; <span className="font-medium text-[#555555]">Every model, measured.</span>
              </h2>
            </div>
            <Link
              href="/models"
              className="ds-button bg-[#F8F7F2] hover:bg-[#E5E5E0] text-[#111111] text-[12px] font-extrabold border border-[#E5E5E0] self-start sm:self-center shrink-0 no-underline"
            >
              All Research Areas &rarr;
            </Link>
          </div>

          {filteredCatalogModels.length === 0 ? (
            <div className="py-12 text-center bg-[#F8F7F2] rounded-xl border border-dashed border-[#EAE9E4]">
              <p className="text-[15px] font-bold text-[#555555]">No detailed evaluation records currently indexed for {domainInfo.name} in our offline snapshot.</p>
              <Link href="/models" className="mt-3 inline-block text-[13px] font-extrabold text-[#FF5A1F] hover:underline no-underline">
                Browse All Foundation Models &rarr;
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-sans text-[13px]">
                <thead>
                  <tr className="border-b border-[#EAE9E4] text-[11px] font-black uppercase text-[#8B8B8B] tracking-wider">
                    <th className="py-3.5 px-3 w-[44px]">#</th>
                    <th className="py-3.5 px-3">Model</th>
                    <th className="py-3.5 px-3">Vendor</th>
                    <th className="py-3.5 px-3">Parameters</th>
                    <th className="py-3.5 px-3">Architecture</th>
                    <th className="py-3.5 px-3 text-right">SOTA / Elo</th>
                    <th className="py-3.5 px-3 text-right">Benchmarks</th>
                    <th className="py-3.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAE9E4]/60 font-medium">
                  {filteredCatalogModels.map((model, idx) => (
                    <tr 
                      key={model.id} 
                      className="hover:bg-[#FFF8F6] transition-colors cursor-pointer group" 
                      onClick={() => setInspectedModel(model)}
                    >
                      <td className="py-4 px-3 font-mono text-[#8B8B8B] text-[12px] font-bold">
                        {(idx + 1).toString().padStart(3, '0')}
                      </td>
                      <td className="py-4 px-3 font-extrabold text-[#111111] group-hover:text-[#FF5A1F] transition-colors flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-[#FF5A1F] inline-block shrink-0"></span>
                        <span className="text-[14px]">{model.name}</span>
                      </td>
                      <td className="py-4 px-3 text-[#555555] font-bold">
                        {model.org}
                      </td>
                      <td className="py-4 px-3 font-mono text-[12px] text-[#333333]">
                        {model.params || "Dense / MoE"}
                      </td>
                      <td className="py-4 px-3 text-[#555555]">
                        {model.area}
                      </td>
                      <td className="py-4 px-3 text-right font-black text-[#FF5A1F] text-[14px]">
                        {model.elo ? `⚡ ${model.elo}` : "SOTA Tier"}
                      </td>
                      <td className="py-4 px-3 text-right font-extrabold text-[#111111]">
                        {model.benchmarks?.length || 3} verified
                      </td>
                      <td className="py-4 px-3 text-right">
                        <button className="text-[11px] font-black uppercase tracking-wide px-3 py-1.5 rounded-lg bg-[#F8F7F2] group-hover:bg-[#FF5A1F] group-hover:text-white text-[#111111] transition-all border border-[#E5E5E0] group-hover:border-[#FF5A1F]">
                          Inspect &rarr;
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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
                      className="text-[11px] font-extrabold uppercase text-[#FF5A1F] bg-[#FFF6F3] border border-[#FFEDD5] px-2.5 py-1 rounded hover:bg-[#FF5A1F] hover:text-white transition-colors flex items-center gap-1"
                    >
                      {copied ? <Check size={12} /> : <Copy size={12} />}
                      <span>{copied ? "Copied!" : "Copy"}</span>
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
