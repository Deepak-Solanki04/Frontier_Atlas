"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Search, Trophy, Cpu, Layers, ExternalLink, Code2, Check, Copy, X } from "lucide-react";
import { getModels, type ModelItem } from "@/lib/models";
import Sidebar from "@/components/Sidebar";
import PaperCard from "@/components/PaperCard";
import { topicData } from "@/data/topicData";

const TOP_MODELS_BOXES = [
  {
    rank: "1", rankBg: "#ffe4e6", rankColor: "#e11d48",
    iconBg: "#ff4d00",
    name: "Claude 3.7 Sonnet", sub: "Anthropic",
    desc: "First hybrid reasoning frontier model enabling instantaneous or extended chain-of-thought verification.",
    score: "62.3%"
  },
  {
    rank: "2", rankBg: "#f3e8ff", rankColor: "#9333ea",
    iconBg: "#a855f7",
    name: "GPT-4o", sub: "OpenAI",
    desc: "Flagship omni multimodal foundation model reasoning seamlessly across audio, vision, and text.",
    score: "88.7%"
  },
  {
    rank: "3", rankBg: "#ecfccb", rankColor: "#65a30d",
    iconBg: "#84cc16",
    name: "DeepSeek R1", sub: "DeepSeek AI",
    desc: "Breakthrough open reasoning model trained via large-scale RL directly eliciting long reasoning traces.",
    score: "79.8%"
  },
  {
    rank: "4", rankBg: "#dbeafe", rankColor: "#2563eb",
    iconBg: "#3b82f6",
    name: "Gemini 2.0 Flash", sub: "Google DeepMind",
    desc: "Next-generation agentic model delivering 2x speedup and native tool orchestration across 1M context.",
    score: "99.8%"
  },
  {
    rank: "5", rankBg: "#ffedd5", rankColor: "#ea580c",
    iconBg: "#f97316",
    name: "Llama 3.3 70B", sub: "Meta AI",
    desc: "Open-weight instruction model matching Llama 3.1 405B performance on reasoning and code.",
    score: "93.8%"
  },
  {
    rank: "6", rankBg: "#ccfbf1", rankColor: "#0d9488",
    iconBg: "#14b8a6",
    name: "Qwen 2.5 Max", sub: "Alibaba Cloud",
    desc: "Large-scale flagship MoE model surpassing top commercial APIs across math and coding benchmarks.",
    score: "94.5%"
  },
  {
    rank: "7", rankBg: "#fce7f3", rankColor: "#db2777",
    iconBg: "#f43f5e",
    name: "Grok 3", sub: "xAI",
    desc: "Massive-scale foundation model trained on Colossus cluster featuring real-time knowledge indexing.",
    score: "73.4%"
  },
  {
    rank: "8", rankBg: "#ffedd5", rankColor: "#ea580c",
    iconBg: "#ff6b00",
    name: "Qwen 2.5 Coder", sub: "Alibaba Cloud",
    desc: "State-of-the-art open coding model achieving 50%+ on SWE-Bench Verified, rivaling closed models.",
    score: "51.4%"
  },
  {
    rank: "9", rankBg: "#e0e7ff", rankColor: "#4f46e5",
    iconBg: "#6366f1",
    name: "Mistral Large 2", sub: "Mistral AI",
    desc: "Advanced frontier model engineered for high-precision function calling and structured json generation.",
    score: "91.2%"
  },
  {
    rank: "10", rankBg: "#ede9fe", rankColor: "#7c3aed",
    iconBg: "#8b5cf6",
    name: "FLUX.1 [schnell]", sub: "Black Forest Labs",
    desc: "Fast rectified flow transformer producing photorealistic images in 1 to 4 inference steps.",
    score: "94.1%"
  }
];

export default function ModelsPage() {
  const [allModels, setAllModels] = useState<ModelItem[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("All Models & Architectures");
  const [search, setSearch] = useState("");
  const [inspectedModel, setInspectedModel] = useState<ModelItem | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    getModels().then((data) => {
      setAllModels(data);
    });
  }, []);

  // Gather core foundation model, attention, scaling, alignment, and architecture papers
  const modelPapers = useMemo(() => {
    const modelTopics = [
      "language-modeling",
      "transformer",
      "lora",
      "rlhf",
      "dpo",
      "world-models",
      "text-generation",
      "image-generation",
      "video-generation"
    ];

    const collected: any[] = [];
    const seen = new Set<string>();

    modelTopics.forEach((key) => {
      const topicObj = topicData[key];
      if (topicObj && topicObj.papers) {
        topicObj.papers.forEach((p: any) => {
          if (p && p.title && !seen.has(p.title)) {
            // Strictly exclude papers whose primary topic is agent autonomy or browser agents
            const titleLower = p.title.toLowerCase();
            const abstractLower = (p.abstract || "").toLowerCase();
            if (!titleLower.includes("agent") && !titleLower.includes("autogpt") && !titleLower.includes("chatdev")) {
              seen.add(p.title);
              collected.push(p);
            }
          }
        });
      }
    });

    return collected.filter((paper: any) => {
      const q = search.toLowerCase();
      const title = (paper.title || "").toLowerCase();
      const abstract = (paper.abstract || "").toLowerCase();

      // Check search filter
      if (q && !title.includes(q) && !abstract.includes(q)) {
        return false;
      }

      // Check tab filter
      if (selectedFilter === "Transformers & Attention") {
        return title.includes("attention") || title.includes("transformer") || abstract.includes("attention");
      }
      if (selectedFilter === "Post-Training & RLHF") {
        return title.includes("rlhf") || title.includes("feedback") || title.includes("preference") || title.includes("dpo") || abstract.includes("reward");
      }
      if (selectedFilter === "Efficient Adaptation (LoRA)") {
        return title.includes("lora") || title.includes("adaptation") || title.includes("parameter-efficient") || abstract.includes("low-rank");
      }
      if (selectedFilter === "World & Multimodal Models") {
        return title.includes("world model") || title.includes("image") || title.includes("video") || title.includes("diffusion") || abstract.includes("multimodal");
      }

      return true;
    });
  }, [search, selectedFilter]);

  const scrollToFeed = () => {
    const el = document.getElementById("models-feed-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleBoxClick = (name: string) => {
    const found = allModels.find((m) => m.name.toLowerCase().includes(name.toLowerCase()));
    if (found) {
      setInspectedModel(found);
    } else {
      scrollToFeed();
    }
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
  const relatedDomains = ["Transformers", "Language Modeling", "RLHF & DPO", "LoRA Adaptation", "World Models", "Multimodal Scaling"];

  return (
    <div className="unified-page-wrapper topic-page-wrapper">
      {/* ── TOP 100VH HERO SECTION ── */}
      <div className="topic-hero-container">
        {/* Breadcrumbs */}
        <div className="topic-breadcrumbs">
          {breadcrumbs.map((b, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <span className="crumb-sep">&gt;</span>}
              <span className={idx === breadcrumbs.length - 1 ? "crumb-current" : "crumb-link"}>{b}</span>
            </React.Fragment>
          ))}
        </div>

        {/* Badge Header */}
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

        {/* Title */}
        <h1 className="topic-hero-title">Models</h1>

        {/* Description */}
        <p className="topic-hero-desc">
          Explore state-of-the-art foundation models evaluated across verified academic benchmarks, reasoning tasks, and real-world agentic workflows.
        </p>

        {/* Stats Row */}
        <div className="topic-stats-row">
          {stats.map((s, i) => (
            <div key={i} className="topic-stat-item">
              <span className={`topic-stat-count ${s.orange ? "stat-orange" : ""}`}>{s.count}</span>
              <span className="topic-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <hr className="topic-hero-divider" />

        {/* Related Domains */}
        <div className="topic-related-row">
          <span className="topic-related-label">CORE TOPICS</span>
          <div className="topic-related-chips">
            {relatedDomains.map((t, i) => (
              <button
                key={i}
                onClick={() => {
                  setSelectedFilter("All Models & Architectures");
                  setSearch(t.split(" ")[0]);
                  scrollToFeed();
                }}
                className="topic-related-chip border-none cursor-pointer"
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Benchmarks Header */}
        <div className="topic-benchmarks-header">
          <h2 className="topic-benchmarks-title">Top Evaluated Foundation Models</h2>
          <span className="topic-benchmarks-badge">10</span>
        </div>

        {/* Grid of 10 Model Boxes */}
        <div className="topic-benchmarks-grid">
          {TOP_MODELS_BOXES.map((card, i) => (
            <div
              key={i}
              onClick={() => handleBoxClick(card.name)}
              className="benchmark-card cursor-pointer"
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
            </div>
          ))}
        </div>

        {/* Explore All Button */}
        <div className="topic-explore-container">
          <button onClick={scrollToFeed} className="topic-explore-btn">
            Explore model architecture papers & scaling research <span style={{ marginLeft: "4px", fontSize: "14px" }}>→</span>
          </button>
        </div>
      </div>

      {/* ── 2-COLUMN DISCOVERY FEED ROW BELOW HERO (Specific to Models topic) ── */}
      <div id="models-feed-section" className="discovery-feed-row" style={{ marginTop: "24px", paddingBottom: "60px" }}>
        <div className="discovery-sidebar-col">
          <Sidebar />
        </div>

        <div className="discovery-main-col">
          {/* Models Topic Filter Tabs */}
          <div className="time-filters flex flex-wrap items-center justify-between gap-4" style={{ marginBottom: "16px", borderBottom: "1px solid var(--border)", paddingBottom: "0" }}>
            <div className="flex items-center gap-1 flex-wrap">
              {["All Models & Architectures", "Transformers & Attention", "Post-Training & RLHF", "Efficient Adaptation (LoRA)", "World & Multimodal Models"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedFilter(tab)}
                  className={`time-filter ${selectedFilter === tab ? "active" : ""}`}
                  style={{
                    borderBottom: selectedFilter === tab ? "2px solid var(--brand-orange)" : "none",
                    fontWeight: selectedFilter === tab ? "700" : "600",
                    color: selectedFilter === tab ? "var(--text-dark)" : "var(--text-light)",
                    padding: "10px 14px"
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-[240px] mb-2 sm:mb-0">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B8B8B]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search architecture papers..."
                className="ds-input w-full pl-8 pr-3 h-8 text-[12px] font-medium"
              />
            </div>
          </div>

          {/* Spacious Research Papers List Feed for Models */}
          <div className="paper-list">
            {modelPapers.length === 0 ? (
              <div className="bg-white border border-[#E5E5E0] rounded-[14px] p-12 text-center">
                <p className="text-[15px] font-bold text-[#555555]">No model research papers found matching your filter</p>
                <button onClick={() => { setSearch(""); setSelectedFilter("All Models & Architectures"); }} className="ds-button mt-4 text-[12px]">
                  Reset Filters
                </button>
              </div>
            ) : (
              modelPapers.map((paper: any, i: number) => (
                <PaperCard key={i} paper={paper} />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Slide-over Inspect Modal */}
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

            <div className="pt-4 border-t border-[#E5E5E0] flex items-center justify-between">
              <span className="text-[12px] font-bold text-[#8B8B8B]">
                Cited in <strong className="text-[#111111]">{inspectedModel.paperCount} research papers</strong>
              </span>
              <Link
                href={`/${inspectedModel.area === "Agentic Coding" ? "agents" : "trending"}`}
                className="px-5 py-2.5 bg-[#FF5A1F] hover:bg-[#E0462D] text-white rounded-xl font-bold text-[13px] transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <span>View Related Papers</span>
                <ExternalLink size={14} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
