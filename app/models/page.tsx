"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Trophy, Cpu, Layers, ExternalLink, Code2, Check, Copy, X, ArrowRight, Zap, Calendar, BookOpen, Building2 } from "lucide-react";
import { getModels, type ModelItem } from "@/lib/models";

const TOP_MODELS_BOXES = [
  {
    id: "gpt-5",
    rank: "1", rankBg: "#ffe4e6", rankColor: "#e11d48",
    name: "GPT-5", sub: "OpenAI", domain: "Reasoning", family: "GPT", capability: "Reasoning", collection: "Reasoning Models",
    desc: "Next-generation omni-reasoning flagship model combining breakthrough agentic execution, self-correction, and universal tool mastery.",
    score: "93.8% MMLU-Pro"
  },
  {
    id: "claude-opus-5",
    rank: "2", rankBg: "#f3e8ff", rankColor: "#9333ea",
    name: "Claude Opus 5", sub: "Anthropic", domain: "Agentic AI", family: "Claude", capability: "Agents", collection: "Agent Models",
    desc: "Apex frontier reasoning and constitutional safety model capable of deep academic synthesis, complex proof generation, and long-horizon planning.",
    score: "98.1% MATH-500"
  },
  {
    id: "gemini-2-5-pro",
    rank: "3", rankBg: "#dbeafe", rankColor: "#2563eb",
    name: "Gemini 2.5 Pro", sub: "Google DeepMind", domain: "Multimodal AI", family: "Gemini", capability: "Multimodal", collection: "Multimodal Models",
    desc: "Next-tier multimodal foundation model with native 2M+ token context, real-time video understanding, and multi-agent task planning.",
    score: "100% 2M Needle"
  },
  {
    id: "qwen3",
    rank: "4", rankBg: "#ccfbf1", rankColor: "#0d9488",
    name: "Qwen3", sub: "Qwen", domain: "Code Intelligence", family: "Qwen", capability: "Coding", collection: "Coding Models",
    desc: "Alibaba's next flagship open-weights multilingual and reasoning foundation model family with state-of-the-art coding and math accuracy.",
    score: "84.0% AIME"
  },
  {
    id: "llama-4",
    rank: "5", rankBg: "#ffedd5", rankColor: "#ea580c",
    name: "Llama 4", sub: "Meta AI", domain: "Large Language Models", family: "Llama", capability: "General Purpose", collection: "Open Source Models",
    desc: "Meta's next-generation open foundation model trained across multimodal text, vision, and audio with extreme compute efficiency.",
    score: "90.2% MMLU-Pro"
  },
  {
    id: "deepseek-r1",
    rank: "6", rankBg: "#ecfccb", rankColor: "#65a30d",
    name: "DeepSeek R1", sub: "DeepSeek AI", domain: "Reasoning", family: "DeepSeek", capability: "Reasoning", collection: "Reasoning Models",
    desc: "Breakthrough open reasoning model trained via large-scale RL directly eliciting long reasoning traces.",
    score: "79.8% AIME"
  },
  {
    id: "mistral-large-2",
    rank: "7", rankBg: "#e0e7ff", rankColor: "#4f46e5",
    name: "Mistral Large 2", sub: "Mistral AI", domain: "Agentic AI", family: "Mistral", capability: "Function Calling", collection: "Commercial Models",
    desc: "Advanced frontier model engineered for high-precision function calling and structured json generation.",
    score: "91.2% Berkeley"
  },
  {
    id: "grok-4",
    rank: "8", rankBg: "#fce7f3", rankColor: "#db2777",
    name: "Grok 4", sub: "xAI", domain: "Search & Retrieval", family: "Grok", capability: "Search", collection: "Large Language Models",
    desc: "Massive-scale foundation model integrated with real-time global search, deep mathematical logic, and coding auto-verification.",
    score: "86.5% AIME"
  },
  {
    id: "flux-1-schnell",
    rank: "9", rankBg: "#ede9fe", rankColor: "#7c3aed",
    name: "FLUX.1 [schnell]", sub: "Black Forest Labs", domain: "Computer Vision", family: "FLUX", capability: "Image Generation", collection: "Image Generation Models",
    desc: "Fast rectified flow transformer producing photorealistic images in 1 to 4 inference steps.",
    score: "94.1% Typography"
  },
  {
    id: "sam-2",
    rank: "10", rankBg: "#fee2e2", rankColor: "#b91c1c",
    name: "SAM 2", sub: "Meta AI", domain: "Computer Vision", family: "SAM", capability: "Computer Vision", collection: "Vision Language Models",
    desc: "Unified promptable visual segmentation model tracking objects across video frames and static images in real-time.",
    score: "76.3 J&F SA-V"
  }
];

const BROWSE_BY_CAPABILITY = [
  "General Purpose", "Reasoning", "Coding", "Agents", "Chat", "Instruction Following",
  "Function Calling", "Tool Use", "Embeddings", "Reranking", "Computer Vision",
  "Image Generation", "Video Generation", "Speech", "Audio", "OCR", "Document AI",
  "Multimodal", "Translation", "Search", "Planning", "Robotics", "Healthcare", "Scientific AI"
];

const BROWSE_BY_FAMILY = [
  { name: "GPT", count: 18, org: "OpenAI" },
  { name: "Claude", count: 14, org: "Anthropic" },
  { name: "Gemini", count: 16, org: "Google DeepMind" },
  { name: "Llama", count: 15, org: "Meta AI" },
  { name: "Qwen", count: 22, org: "Alibaba Cloud / Qwen" },
  { name: "DeepSeek", count: 12, org: "DeepSeek AI" },
  { name: "Mistral", count: 14, org: "Mistral AI" },
  { name: "Gemma", count: 10, org: "Google DeepMind" },
  { name: "Phi", count: 8, org: "Microsoft Research" },
  { name: "Falcon", count: 6, org: "TII" },
  { name: "GLM", count: 11, org: "Zhipu AI" },
  { name: "InternLM", count: 7, org: "Shanghai AI Lab" },
  { name: "Molmo", count: 5, org: "Allen Institute for AI" },
  { name: "Whisper", count: 6, org: "OpenAI" },
  { name: "CLIP", count: 8, org: "OpenAI / Community" },
  { name: "SAM", count: 4, org: "Meta AI" },
  { name: "FLUX", count: 6, org: "Black Forest Labs" },
  { name: "Stable Diffusion", count: 14, org: "Stability AI" },
  { name: "Pixtral", count: 4, org: "Mistral AI" },
  { name: "Janus", count: 3, org: "DeepSeek AI" }
];

const BROWSE_BY_ORGANIZATION = [
  { name: "OpenAI", count: 85 },
  { name: "Anthropic", count: 44 },
  { name: "Google DeepMind", count: 71 },
  { name: "Meta AI", count: 35 },
  { name: "Microsoft", count: 24 },
  { name: "NVIDIA", count: 18 },
  { name: "Alibaba", count: 47 },
  { name: "Qwen", count: 32 },
  { name: "DeepSeek", count: 28 },
  { name: "Mistral AI", count: 30 },
  { name: "xAI", count: 14 },
  { name: "Cohere", count: 12 },
  { name: "Amazon", count: 16 },
  { name: "Apple", count: 11 },
  { name: "IBM", count: 9 },
  { name: "ByteDance", count: 15 },
  { name: "Moonshot AI", count: 8 },
  { name: "Zhipu AI", count: 14 },
  { name: "MiniMax", count: 7 },
  { name: "Hugging Face", count: 42 }
];

const BROWSE_BY_RESEARCH_AREA = [
  { name: "Large Language Models", count: 342, leader: "OpenAI / GPT-5" },
  { name: "Reasoning", count: 185, leader: "DeepSeek / R1" },
  { name: "Agentic AI", count: 164, leader: "Anthropic / Claude Opus 5" },
  { name: "Computer Vision", count: 210, leader: "Meta / SAM 2" },
  { name: "Multimodal AI", count: 195, leader: "Google / Gemini 2.5 Pro" },
  { name: "Code Intelligence", count: 178, leader: "Alibaba / Qwen3" },
  { name: "Document AI", count: 92, leader: "Moonshot / Kimi K2" },
  { name: "OCR", count: 84, leader: "Alibaba / Qwen 2 VL" },
  { name: "Speech", count: 115, leader: "OpenAI / Whisper V3" },
  { name: "Audio", count: 96, leader: "Meta / AudioCraft" },
  { name: "Video", count: 88, leader: "OpenAI / Sora" },
  { name: "Embodied AI", count: 64, leader: "Google / RT-2" },
  { name: "Robotics", count: 72, leader: "Google / RT-2" },
  { name: "Scientific AI", count: 82, leader: "Google / AlphaFold 3" },
  { name: "Healthcare AI", count: 75, leader: "Microsoft / Med-PaLM" },
  { name: "Mathematics", count: 110, leader: "DeepSeek / R1" },
  { name: "Search & Retrieval", count: 130, leader: "xAI / Grok 4" },
  { name: "Recommendation Systems", count: 54, leader: "Meta / DLRM" },
  { name: "Graph Learning", count: 42, leader: "DeepMind / GraphCast" },
  { name: "Time Series", count: 48, leader: "Chronos / Amazon" }
];

const TRENDING_MODELS = [
  { name: "GPT-5", org: "OpenAI", family: "GPT", elo: "1410", desc: "Omni-reasoning flagship model combining agentic execution and self-correction." },
  { name: "Claude Opus 5", org: "Anthropic", family: "Claude", elo: "1405", desc: "Apex constitutional reasoning model for academic synthesis and complex proofs." },
  { name: "Claude Sonnet 5", org: "Anthropic", family: "Claude", elo: "1395", desc: "High-throughput workhorse model optimized for autonomous coding and browser control." },
  { name: "Gemini 2.5 Pro", org: "Google DeepMind", family: "Gemini", elo: "1390", desc: "Native 2M+ token multimodal model with real-time video and multi-agent planning." },
  { name: "Gemini 2.5 Flash", org: "Google DeepMind", family: "Gemini", elo: "1375", desc: "Ultra-low-latency multimodal model for instantaneous streaming and tool orchestration." },
  { name: "DeepSeek R1", org: "DeepSeek AI", family: "DeepSeek", elo: "1378", desc: "Breakthrough open reasoning model via large-scale RL directly eliciting long CoT." },
  { name: "Qwen3", org: "Qwen", family: "Qwen", elo: "1385", desc: "Next flagship open-weights multilingual and reasoning foundation model family." },
  { name: "Llama 4", org: "Meta AI", family: "Llama", elo: "1388", desc: "Open multimodal foundation model with extreme compute efficiency and 400B+ MoE scale." },
  { name: "Kimi K2", org: "Moonshot AI", family: "Moonshot", elo: "1360", desc: "Long-context specialist offering deep comprehension across 2M+ bilingual tokens." },
  { name: "GLM-4.5", org: "Zhipu AI", family: "GLM", elo: "1365", desc: "Flagship bilingual reasoning model excelling in complex function calling and math." },
  { name: "Mistral Medium", org: "Mistral AI", family: "Mistral", elo: "1340", desc: "Balanced enterprise model delivering fast instruction following and JSON output." },
  { name: "Grok 4", org: "xAI", family: "Grok", elo: "1395", desc: "Massive-scale model integrated with real-time global search and mathematical logic." },
  { name: "Phi-4", org: "Microsoft Research", family: "Phi", elo: "1305", desc: "14B small language model trained exclusively on synthetic reasoning step traces." },
  { name: "Gemma 3", org: "Google DeepMind", family: "Gemma", elo: "1342", desc: "State-of-the-art open weights model delivering unmatched single-GPU reasoning." },
  { name: "Molmo", org: "Allen Institute for AI", family: "Molmo", elo: "1338", desc: "Open vision-language model matching proprietary leaders on zero-shot VQA." }
];

const RECENTLY_RELEASED = [
  { name: "GPT-5", org: "OpenAI", date: "February 2025", family: "GPT", desc: "Next-generation omni-reasoning flagship foundation model." },
  { name: "Claude Opus 5", org: "Anthropic", date: "February 2025", family: "Claude", desc: "Apex constitutional reasoning and complex planning model." },
  { name: "Grok 4", org: "xAI", date: "February 2025", family: "Grok", desc: "Real-time global search model with deep mathematical verification." },
  { name: "Qwen3", org: "Qwen", date: "January 2025", family: "Qwen", desc: "Alibaba's flagship open-weights reasoning and multilingual model." },
  { name: "Gemini 2.5 Pro", org: "Google DeepMind", date: "January 2025", family: "Gemini", desc: "Multimodal frontier model with native 2M token context windows." },
  { name: "Llama 4", org: "Meta AI", date: "January 2025", family: "Llama", desc: "Multimodal open MoE architecture engineered for efficiency." },
  { name: "DeepSeek V3", org: "DeepSeek AI", date: "December 2024", family: "DeepSeek", desc: "High-efficiency 671B MoE with Multi-Head Latent Attention." },
  { name: "Claude 3.7 Sonnet", org: "Anthropic", date: "February 2025", family: "Claude", desc: "First hybrid reasoning frontier model for agentic workflows." }
];

const POPULAR_COLLECTIONS = [
  { name: "Reasoning Models", count: "84 Models", icon: "🧠" },
  { name: "Coding Models", count: "62 Models", icon: "💻" },
  { name: "Vision Language Models", count: "75 Models", icon: "👁️" },
  { name: "Open Source Models", count: "210 Models", icon: "🌐" },
  { name: "Commercial Models", count: "145 Models", icon: "🏢" },
  { name: "Long Context Models", count: "58 Models", icon: "📜" },
  { name: "Small Language Models", count: "46 Models", icon: "⚡" },
  { name: "Large Language Models", count: "340 Models", icon: "📚" },
  { name: "Multimodal Models", count: "115 Models", icon: "🎭" },
  { name: "Embedding Models", count: "38 Models", icon: "🔗" },
  { name: "Speech Models", count: "42 Models", icon: "🎙️" },
  { name: "OCR Models", count: "34 Models", icon: "📄" },
  { name: "Image Generation Models", count: "55 Models", icon: "🎨" },
  { name: "Video Generation Models", count: "28 Models", icon: "🎬" },
  { name: "Agent Models", count: "68 Models", icon: "🤖" }
];

function ModelsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const vendorParam = searchParams?.get("vendor") || null;
  const domainParam = searchParams?.get("domain") || null;
  const capabilityParam = searchParams?.get("capability") || null;
  const familyParam = searchParams?.get("family") || null;
  const collectionParam = searchParams?.get("collection") || null;

  const [allModels, setAllModels] = useState<ModelItem[]>([]);
  const [selectedVendor, setSelectedVendor] = useState<string | null>(vendorParam);
  const [selectedDomain, setSelectedDomain] = useState<string | null>(domainParam);
  const [selectedCapability, setSelectedCapability] = useState<string | null>(capabilityParam);
  const [selectedFamily, setSelectedFamily] = useState<string | null>(familyParam);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(collectionParam);
  const [searchQuery, setSearchQuery] = useState("");
  const [inspectedModel, setInspectedModel] = useState<ModelItem | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setSelectedVendor(vendorParam);
    setSelectedDomain(domainParam);
    setSelectedCapability(capabilityParam);
    setSelectedFamily(familyParam);
    setSelectedCollection(collectionParam);
  }, [vendorParam, domainParam, capabilityParam, familyParam, collectionParam]);

  useEffect(() => {
    getModels().then((data) => {
      setAllModels(data);
    });
  }, []);

  const clearAllFilters = () => {
    setSelectedVendor(null);
    setSelectedDomain(null);
    setSelectedCapability(null);
    setSelectedFamily(null);
    setSelectedCollection(null);
    setSearchQuery("");
    router.push("/models", { scroll: false });
  };

  const updateURL = (params: { vendor?: string | null; domain?: string | null; capability?: string | null; family?: string | null; collection?: string | null }) => {
    const v = params.vendor !== undefined ? params.vendor : selectedVendor;
    const d = params.domain !== undefined ? params.domain : selectedDomain;
    const c = params.capability !== undefined ? params.capability : selectedCapability;
    const f = params.family !== undefined ? params.family : selectedFamily;
    const col = params.collection !== undefined ? params.collection : selectedCollection;

    const urlParams = new URLSearchParams();
    if (v) urlParams.set("vendor", v);
    if (d) urlParams.set("domain", d);
    if (c) urlParams.set("capability", c);
    if (f) urlParams.set("family", f);
    if (col) urlParams.set("collection", col);

    const queryString = urlParams.toString();
    router.push(queryString ? `/models?${queryString}` : "/models", { scroll: false });

    setTimeout(() => {
      const dirElem = document.getElementById("model-directory");
      if (dirElem) {
        dirElem.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const handleCapabilityClick = (cap: string) => {
    const next = selectedCapability === cap ? null : cap;
    setSelectedCapability(next);
    setSelectedVendor(null); setSelectedDomain(null); setSelectedFamily(null); setSelectedCollection(null);
    updateURL({ capability: next, vendor: null, domain: null, family: null, collection: null });
  };

  const handleFamilyClick = (fam: string) => {
    const next = selectedFamily === fam ? null : fam;
    setSelectedFamily(next);
    setSelectedVendor(null); setSelectedDomain(null); setSelectedCapability(null); setSelectedCollection(null);
    updateURL({ family: next, vendor: null, domain: null, capability: null, collection: null });
  };

  const handleVendorClick = (vName: string) => {
    const next = selectedVendor === vName ? null : vName;
    setSelectedVendor(next);
    setSelectedDomain(null); setSelectedCapability(null); setSelectedFamily(null); setSelectedCollection(null);
    updateURL({ vendor: next, domain: null, capability: null, family: null, collection: null });
  };

  const handleDomainClick = (dName: string) => {
    const next = selectedDomain === dName ? null : dName;
    setSelectedDomain(next);
    setSelectedVendor(null); setSelectedCapability(null); setSelectedFamily(null); setSelectedCollection(null);
    updateURL({ domain: next, vendor: null, capability: null, family: null, collection: null });
  };

  const handleCollectionClick = (col: string) => {
    const next = selectedCollection === col ? null : col;
    setSelectedCollection(next);
    setSelectedVendor(null); setSelectedDomain(null); setSelectedCapability(null); setSelectedFamily(null);
    updateURL({ collection: next, vendor: null, domain: null, capability: null, family: null });
  };

  const activeFilterLabel = selectedVendor || selectedDomain || selectedCapability || selectedFamily || selectedCollection || null;

  const filteredCatalogModels = useMemo(() => {
    return allModels.filter(m => {
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matches = m.name.toLowerCase().includes(q) || m.org.toLowerCase().includes(q) || (m.desc && m.desc.toLowerCase().includes(q)) || (m.tags && m.tags.some(t => t.toLowerCase().includes(q)));
        if (!matches) return false;
      }
      if (selectedVendor) {
        const vLower = selectedVendor.toLowerCase();
        if (!m.org.toLowerCase().includes(vLower) && !vLower.includes(m.org.toLowerCase())) return false;
      }
      if (selectedFamily) {
        const fLower = selectedFamily.toLowerCase();
        if (m.family?.toLowerCase() !== fLower && !m.name.toLowerCase().includes(fLower)) return false;
      }
      if (selectedCapability) {
        const cLower = selectedCapability.toLowerCase();
        if (m.category?.toLowerCase() !== cLower && !m.tags.some(t => t.toLowerCase().includes(cLower)) && !m.area.toLowerCase().includes(cLower)) return false;
      }
      if (selectedDomain) {
        const dLower = selectedDomain.toLowerCase();
        if (!m.area.toLowerCase().includes(dLower) && !m.tags.some(t => t.toLowerCase().includes(dLower)) && !m.desc.toLowerCase().includes(dLower)) return false;
      }
      if (selectedCollection) {
        const colLower = selectedCollection.toLowerCase().replace(" models", "").trim();
        if (!m.tags.some(t => t.toLowerCase().includes(colLower)) && !m.area.toLowerCase().includes(colLower) && m.category?.toLowerCase() !== colLower) return false;
      }
      return true;
    });
  }, [allModels, selectedVendor, selectedDomain, selectedCapability, selectedFamily, selectedCollection, searchQuery]);

  const topModelForSelection = useMemo(() => {
    if (!activeFilterLabel) return null;
    return TOP_MODELS_BOXES.find(card => {
      if (selectedVendor && (card.sub.toLowerCase().includes(selectedVendor.toLowerCase()) || selectedVendor.toLowerCase().includes(card.sub.toLowerCase()))) return true;
      if (selectedFamily && card.family.toLowerCase() === selectedFamily.toLowerCase()) return true;
      if (selectedCapability && card.capability.toLowerCase() === selectedCapability.toLowerCase()) return true;
      if (selectedDomain && (card.domain.toLowerCase().includes(selectedDomain.toLowerCase()) || selectedDomain.toLowerCase().includes(card.domain.toLowerCase()))) return true;
      if (selectedCollection && card.collection.toLowerCase().includes(selectedCollection.toLowerCase())) return true;
      return false;
    }) || TOP_MODELS_BOXES[0];
  }, [selectedVendor, selectedFamily, selectedCapability, selectedDomain, selectedCollection, activeFilterLabel]);

  const handleCopyQuickstart = () => {
    if (inspectedModel?.quickstart) {
      navigator.clipboard.writeText(inspectedModel.quickstart);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="unified-page-wrapper topic-page-wrapper pb-24">
      <div className="models-directory-container max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* 1. HERO SECTION (Page 1) */}
        <div className="py-12 border-b border-[#EAE9E4] mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <span className="text-[11px] font-mono font-extrabold uppercase tracking-widest text-[#FF5A1F] bg-[#FFF6F3] px-3 py-1 rounded-[2px] border border-[#FFEDD5] mb-3 inline-block">
                Frontier Atlas Directory
              </span>
              <h1 className="text-[40px] sm:text-[48px] font-black text-[#111111] tracking-tight leading-[1.1] mb-4">
                AI Models
              </h1>
              <p className="text-[16px] text-[#333333] font-bold max-w-4xl leading-relaxed mb-2">
                Discover foundation models, language models, vision models, multimodal models, reasoning models, coding models, embedding models, and AI agents from leading research labs and organizations.
              </p>
              <p className="text-[14px] text-[#666666] font-medium max-w-4xl leading-relaxed">
                Explore model capabilities, benchmarks, research papers, datasets, tasks, architectures, and real-world applications—all in one place.
              </p>
            </div>

            {/* Buttons exactly as requested in Hero */}
            <div className="flex items-center gap-3 shrink-0 flex-wrap">
              <a
                href="#model-directory"
                className="px-5 py-2.5 bg-[#111111] hover:bg-[#FF5A1F] text-white rounded-[2px] font-bold text-[13px] transition-colors shadow-sm flex items-center gap-2 no-underline"
              >
                <span>Browse Models</span>
                <ArrowRight size={14} />
              </a>
              <button
                onClick={() => {
                  const el = document.getElementById("trending-models-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-5 py-2.5 bg-[#F8F7F2] hover:bg-[#E5E5E0] text-[#111111] border border-[#E5E5E0] rounded-[2px] font-bold text-[13px] transition-colors"
              >
                Compare Models
              </button>
              <Link
                href="/models?submit=true"
                onClick={(e) => {
                  e.preventDefault();
                  alert("To submit a new frontier model or benchmark record to Frontier Atlas, please contact submit@frontier-atlas.ai or open a pull request on our GitHub data registry.");
                }}
                className="px-5 py-2.5 bg-white hover:bg-[#F8F7F2] text-[#555555] hover:text-[#111111] border border-[#E5E5E0] rounded-[2px] font-bold text-[13px] transition-colors no-underline"
              >
                Submit Model
              </Link>
            </div>
          </div>

          {/* Hero Search Input Box */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B8B8B]" size={18} />
            <input
              type="text"
              placeholder="Search across all models, organizations, families, or verification tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-3.5 bg-white border border-[#E5E5E0] focus:border-[#111111] rounded-[2px] text-[14px] font-medium text-[#111111] placeholder-[#8B8B8B] outline-none transition-colors shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8B8B8B] hover:text-[#111111]"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* 2. BROWSE BY CAPABILITY (Page 2) */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#EAE9E4]">
            <h2 className="text-[20px] font-black text-[#111111] tracking-tight flex items-center gap-2">
              <Zap size={20} className="text-[#FF5A1F]" />
              <span>Browse by Capability</span>
            </h2>
            <span className="text-[12px] font-bold text-[#8B8B8B] font-mono">24 Capabilities</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {BROWSE_BY_CAPABILITY.map((cap) => {
              const isActive = selectedCapability === cap;
              return (
                <button
                  key={cap}
                  onClick={() => handleCapabilityClick(cap)}
                  className={`px-3.5 py-2 rounded-[2px] border text-[12.5px] font-bold transition-all flex items-center gap-1.5 ${
                    isActive
                      ? "bg-[#111111] text-white border-[#111111] shadow-md"
                      : "bg-white text-[#444444] border-[#E5E5E0] hover:border-[#111111] hover:text-[#111111]"
                  }`}
                >
                  <span>{cap}</span>
                  {isActive && <Check size={13} className="text-[#FF5A1F]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. BROWSE BY MODEL FAMILY (Page 2 & 3) */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#EAE9E4]">
            <h2 className="text-[20px] font-black text-[#111111] tracking-tight flex items-center gap-2">
              <Layers size={20} className="text-[#FF5A1F]" />
              <span>Browse by Model Family</span>
            </h2>
            <span className="text-[12px] font-bold text-[#8B8B8B] font-mono">20 Model Families</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {BROWSE_BY_FAMILY.map((fam) => {
              const isActive = selectedFamily === fam.name;
              return (
                <button
                  key={fam.name}
                  onClick={() => handleFamilyClick(fam.name)}
                  className={`p-4 rounded-[2px] border text-left transition-all flex flex-col justify-between h-24 ${
                    isActive
                      ? "bg-[#111111] text-white border-[#111111] shadow-md"
                      : "bg-white text-[#111111] border-[#E5E5E0] hover:border-[#111111]"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="font-black text-[16px] tracking-tight">{fam.name}</span>
                    <span className={`text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-[2px] ${
                      isActive ? "bg-[#FF5A1F] text-white" : "bg-[#F8F7F2] text-[#666666]"
                    }`}>
                      {fam.count}
                    </span>
                  </div>
                  <span className={`text-[11.5px] font-bold truncate ${isActive ? "text-[#CCCCCC]" : "text-[#777777]"}`}>
                    {fam.org}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. BROWSE BY ORGANIZATION (Page 1 & 2) */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#EAE9E4]">
            <h2 className="text-[20px] font-black text-[#111111] tracking-tight flex items-center gap-2">
              <Building2 size={20} className="text-[#FF5A1F]" />
              <span>Browse by Organization</span>
            </h2>
            <span className="text-[12px] font-bold text-[#8B8B8B] font-mono">20 Leading Labs</span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {BROWSE_BY_ORGANIZATION.map((v) => {
              const isActive = selectedVendor === v.name;
              return (
                <button
                  key={v.name}
                  onClick={() => handleVendorClick(v.name)}
                  className={`px-4 py-2 rounded-[2px] border text-[13px] font-bold transition-all flex items-center gap-2 ${
                    isActive
                      ? "bg-[#111111] text-white border-[#111111] shadow-md"
                      : "bg-white text-[#333333] border-[#E5E5E0] hover:border-[#111111] hover:text-[#111111]"
                  }`}
                >
                  <span>{v.name}</span>
                  <span className={`font-mono text-[11px] px-1.5 py-0.5 rounded-[2px] ${
                    isActive ? "bg-[#FF5A1F] text-white" : "bg-[#F8F7F2] text-[#666666]"
                  }`}>
                    {v.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. BROWSE BY RESEARCH AREA (Page 3) */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#EAE9E4]">
            <h2 className="text-[20px] font-black text-[#111111] tracking-tight flex items-center gap-2">
              <Cpu size={20} className="text-[#FF5A1F]" />
              <span>Browse by Research Area</span>
            </h2>
            <span className="text-[12px] font-bold text-[#8B8B8B] font-mono">20 Modalities &amp; Domains</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5">
            {BROWSE_BY_RESEARCH_AREA.map((d) => {
              const isActive = selectedDomain === d.name;
              return (
                <div
                  key={d.name}
                  onClick={() => handleDomainClick(d.name)}
                  className={`p-4 rounded-[2px] border cursor-pointer transition-all flex flex-col justify-between ${
                    isActive
                      ? "bg-[#111111] text-white border-[#111111] shadow-lg"
                      : "bg-white text-[#111111] border-[#E5E5E0] hover:border-[#111111]"
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-black text-[15px] tracking-tight leading-snug">{d.name}</h3>
                      <span className={`font-mono text-[11px] font-extrabold px-2 py-0.5 rounded-[2px] shrink-0 ${
                        isActive ? "bg-[#FF5A1F] text-white" : "bg-[#F8F7F2] text-[#555555]"
                      }`}>
                        {d.count}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#EAE9E4]/30 flex items-center justify-between text-[11.5px] font-bold">
                    <span className={isActive ? "text-[#CCCCCC]" : "text-[#777777]"}>Top: {d.leader}</span>
                    <span className={isActive ? "text-[#FF5A1F]" : "text-[#FF5A1F]"}>&rarr;</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 6. TRENDING MODELS (Page 4) */}
        <div id="trending-models-section" className="mb-14">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#EAE9E4]">
            <h2 className="text-[20px] font-black text-[#111111] tracking-tight flex items-center gap-2">
              <Trophy size={20} className="text-[#FF5A1F]" />
              <span>Trending Models</span>
            </h2>
            <span className="text-[12px] font-bold text-[#8B8B8B] font-mono">Most Active in 2025</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {TRENDING_MODELS.map((m, idx) => (
              <div
                key={m.name}
                className="bg-white border border-[#E5E5E0] hover:border-[#FF5A1F] p-4 rounded-[2px] transition-all flex flex-col justify-between shadow-sm hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-black uppercase tracking-wider bg-[#FFF6F3] text-[#FF5A1F] px-2 py-0.5 rounded-[2px] border border-[#FFEDD5]">
                      #{idx + 1} Trending
                    </span>
                    <span className="text-[11.5px] font-mono font-extrabold text-[#16A34A]">⚡ {m.elo}</span>
                  </div>
                  <h3 className="text-[16.5px] font-black text-[#111111] tracking-tight mb-1">{m.name}</h3>
                  <div className="text-[12px] font-extrabold text-[#555555] mb-2">{m.org} &middot; {m.family}</div>
                  <p className="text-[12.5px] text-[#666666] font-medium line-clamp-2 leading-relaxed mb-4">{m.desc}</p>
                </div>
                <button
                  onClick={() => {
                    const match = allModels.find(x => x.name.toLowerCase() === m.name.toLowerCase() || x.name.toLowerCase().includes(m.name.toLowerCase()));
                    if (match) setInspectedModel(match);
                    else {
                      setInspectedModel({
                        id: m.name.toLowerCase().replace(/\s+/g, "-"),
                        name: m.name,
                        org: m.org,
                        desc: m.desc,
                        params: "Dense / MoE Scale",
                        context: "256k tokens",
                        releaseDate: "Expected 2025",
                        license: "Proprietary / Open",
                        elo: Number(m.elo),
                        tags: [m.family, "Trending 2025", "SOTA"],
                        area: "Reasoning & Multimodal",
                        paperCount: 320,
                        benchmarks: [{ name: "Verified SOTA Benchmark", score: `${m.elo} Elo`, value: 92, max: 100, color: "#FF5A1F" }],
                        quickstart: `# Quickstart snippet for ${m.name}\ncurl -X POST https://api.frontier-atlas.ai/v1/chat/completions \\\n  -H "Authorization: Bearer $API_KEY" \\\n  -d '{"model": "${m.name.toLowerCase().replace(/\s+/g, "-")}", "messages": [{"role": "user", "content": "Hello world"}]}'`,
                        family: m.family,
                        category: "Reasoning"
                      });
                    }
                  }}
                  className="w-full py-2 bg-[#F8F7F2] hover:bg-[#111111] text-[#111111] hover:text-white rounded-[2px] font-bold text-[12px] transition-colors border border-[#E5E5E0] flex items-center justify-center gap-1.5"
                >
                  <span>Inspect Specs</span>
                  <ExternalLink size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 7. RECENTLY RELEASED (Page 4) */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#EAE9E4]">
            <h2 className="text-[20px] font-black text-[#111111] tracking-tight flex items-center gap-2">
              <Calendar size={20} className="text-[#FF5A1F]" />
              <span>Recently Released</span>
            </h2>
            <span className="text-[12px] font-bold text-[#8B8B8B] font-mono">Latest Foundation Arrivals</span>
          </div>
          <div className="bg-white border border-[#E5E5E0] rounded-[2px] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="models-data-table w-full">
                <thead>
                  <tr className="border-b-2 border-[#111111]">
                    <th className="py-3 px-4 text-[11px] font-black uppercase text-[#666666]">Model Name</th>
                    <th className="py-3 px-4 text-[11px] font-black uppercase text-[#666666]">Organization</th>
                    <th className="py-3 px-4 text-[11px] font-black uppercase text-[#666666]">Release Date</th>
                    <th className="py-3 px-4 text-[11px] font-black uppercase text-[#666666]">Model Family</th>
                    <th className="py-3 px-4 text-[11px] font-black uppercase text-[#666666]">Short Description</th>
                  </tr>
                </thead>
                <tbody>
                  {RECENTLY_RELEASED.map((r) => (
                    <tr
                      key={r.name}
                      onClick={() => {
                        const match = allModels.find(x => x.name.toLowerCase() === r.name.toLowerCase() || x.name.toLowerCase().includes(r.name.toLowerCase()));
                        if (match) setInspectedModel(match);
                      }}
                      className="border-b border-[#EAE9E4] hover:bg-[#FFF8F6] transition-colors cursor-pointer"
                    >
                      <td className="py-3.5 px-4 font-black text-[14.5px] text-[#111111] flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#FF5A1F] inline-block"></span>
                        <span>{r.name}</span>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-[13.5px] text-[#555555]">{r.org}</td>
                      <td className="py-3.5 px-4 font-mono font-bold text-[13px] text-[#FF5A1F]">{r.date}</td>
                      <td className="py-3.5 px-4 font-extrabold text-[13px] text-[#111111]">
                        <span className="px-2.5 py-1 bg-[#F8F7F2] rounded-[2px] border border-[#EAE9E4]">{r.family}</span>
                      </td>
                      <td className="py-3.5 px-4 text-[13px] font-medium text-[#444444] max-w-md">{r.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 8. POPULAR MODEL COLLECTIONS (Page 4 & 5) */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#EAE9E4]">
            <h2 className="text-[20px] font-black text-[#111111] tracking-tight flex items-center gap-2">
              <BookOpen size={20} className="text-[#FF5A1F]" />
              <span>Popular Model Collections</span>
            </h2>
            <span className="text-[12px] font-bold text-[#8B8B8B] font-mono">15 Curated Tracks</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {POPULAR_COLLECTIONS.map((col) => {
              const isActive = selectedCollection === col.name;
              return (
                <button
                  key={col.name}
                  onClick={() => handleCollectionClick(col.name)}
                  className={`p-4 rounded-[2px] border text-left transition-all flex flex-col justify-between h-24 ${
                    isActive
                      ? "bg-[#111111] text-white border-[#111111] shadow-md"
                      : "bg-white text-[#111111] border-[#E5E5E0] hover:border-[#111111]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[20px]">{col.icon}</span>
                    <span className={`text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-[2px] ${
                      isActive ? "bg-[#FF5A1F] text-white" : "bg-[#F8F7F2] text-[#666666]"
                    }`}>
                      {col.count}
                    </span>
                  </div>
                  <span className="font-black text-[13.5px] tracking-tight line-clamp-2 mt-2 leading-tight">
                    {col.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 9. MODEL DIRECTORY (Page 5 & 6 Table Section) */}
        <div id="model-directory" className="models-catalog-section rounded-[2px]">
          <div className="models-catalog-header">
            <div className="models-catalog-title-box">
              <span className="text-[11px] font-mono font-extrabold uppercase tracking-widest text-[#FF5A1F] bg-[#FFF6F3] px-2.5 py-1 rounded-[2px] border border-[#FFEDD5] inline-block mb-1">
                {activeFilterLabel ? `Filtered Directory: ${activeFilterLabel}` : "Unfiltered Registry"}
              </span>
              <h2>Model Directory ({filteredCatalogModels.length} {filteredCatalogModels.length === 1 ? "Model" : "Models"})</h2>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              {activeFilterLabel && (
                <button
                  onClick={clearAllFilters}
                  className="px-4 py-2 bg-[#FFF6F3] hover:bg-[#FFEDD5] text-[#FF5A1F] border border-[#FFEDD5] rounded-[2px] font-extrabold text-[12.5px] transition-colors flex items-center gap-1.5"
                >
                  <X size={14} />
                  <span>Clear Filter ({activeFilterLabel})</span>
                </button>
              )}
              <span className="text-[12.5px] font-extrabold text-[#666666]">
                Sorted by SOTA Elo Rank &amp; Release Velocity
              </span>
            </div>
          </div>

          {/* Top model highlighted normally at start of directory when filter is active (styled cleanly without bulky box) */}
          {activeFilterLabel && topModelForSelection && (
            <div className="mb-8 pb-6 border-b border-[#EAE9E4] bg-[#F8F7F2]/60 p-6 rounded-[2px] border border-[#EAE9E4]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 bg-[#FFF6F3] text-[#FF5A1F] rounded-[2px] border border-[#FFEDD5] font-extrabold">
                    ⚡ SOTA Leader &middot; {topModelForSelection.sub} ({activeFilterLabel})
                  </span>
                  <span className="text-[12px] font-mono text-[#666666] font-bold">
                    Rank #1 verified benchmark leader
                  </span>
                </div>
                <div className="flex items-baseline gap-3.5 flex-wrap">
                  <h3 className="text-[24px] font-black text-[#111111] tracking-tight">
                    {topModelForSelection.name}
                  </h3>
                  <span className="text-[14.5px] font-extrabold text-[#FF5A1F]">
                    {topModelForSelection.score}
                  </span>
                </div>
                <p className="text-[14px] text-[#555555] font-medium mt-1.5 max-w-3xl leading-relaxed">
                  {topModelForSelection.desc}
                </p>
              </div>
              <button
                onClick={() => {
                  const match = allModels.find(x => x.name.toLowerCase() === topModelForSelection.name.toLowerCase() || x.name.toLowerCase().includes(topModelForSelection.name.toLowerCase()));
                  if (match) setInspectedModel(match);
                }}
                className="px-5 py-2.5 bg-[#111111] hover:bg-[#333333] text-white rounded-[2px] font-bold text-[13px] transition-colors flex items-center gap-2 self-start sm:self-center shrink-0 shadow-sm"
              >
                <span>Inspect Specs</span>
                <ExternalLink size={14} />
              </button>
            </div>
          )}

          {filteredCatalogModels.length === 0 ? (
            <div className="py-16 text-center bg-[#F8F7F2] rounded-[2px] border border-dashed border-[#EAE9E4]">
              <p className="text-[15px] font-bold text-[#555555]">No deep evaluation records match your exact filter ({activeFilterLabel || searchQuery}) right now.</p>
              <button
                onClick={clearAllFilters}
                className="mt-3 text-[13px] font-extrabold text-[#FF5A1F] hover:underline cursor-pointer"
              >
                Reset All Filters &amp; Browse All Foundation Models &rarr;
              </button>
            </div>
          ) : (
            <div className="models-catalog-table-wrapper">
              <table className="models-data-table">
                <thead>
                  <tr>
                    <th className="w-[45px]">#</th>
                    <th>Model</th>
                    <th>Organization</th>
                    <th>Model Family</th>
                    <th>Category</th>
                    <th>Parameters</th>
                    <th>Context Window</th>
                    <th>License</th>
                    <th style={{ textAlign: "right" }}>Benchmarks</th>
                    <th>Papers</th>
                    <th>Release Date</th>
                    <th style={{ textAlign: "right" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCatalogModels.map((model, idx) => (
                    <tr key={model.id} onClick={() => setInspectedModel(model)}>
                      <td className="col-idx">{(idx + 1).toString().padStart(3, "0")}</td>
                      <td className="col-name">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#FF5A1F] inline-block shrink-0"></span>
                          <span>{model.name}</span>
                        </div>
                      </td>
                      <td style={{ fontWeight: 700, color: "#555555" }}>{model.org}</td>
                      <td style={{ fontWeight: 800, color: "#111111" }}>
                        <span className="px-2 py-0.5 bg-[#F8F7F2] rounded-[2px] border border-[#EAE9E4] text-[12px]">{model.family || "Foundation"}</span>
                      </td>
                      <td style={{ color: "#555555", fontWeight: 700 }}>{model.category || "General Purpose"}</td>
                      <td style={{ fontFamily: "monospace", fontSize: "12.5px", color: "#333333" }}>{model.params || "Dense / MoE"}</td>
                      <td style={{ fontFamily: "monospace", fontSize: "12.5px", color: "#111111", fontWeight: 700 }}>{model.context || "128k tokens"}</td>
                      <td style={{ color: "#555555", fontSize: "12.5px", fontWeight: 600 }}>{model.license || "Proprietary"}</td>
                      <td style={{ textAlign: "right", fontWeight: 900, color: "#FF5A1F", fontFamily: "monospace" }}>
                        {model.elo ? `⚡ ${model.elo} Elo` : `${model.benchmarks?.length || 3} verified`}
                      </td>
                      <td style={{ color: "#555555", fontWeight: 700 }}>{model.paperCount || 150} papers</td>
                      <td style={{ fontFamily: "monospace", fontSize: "12px", color: "#777777" }}>{model.releaseDate || "2024-2025"}</td>
                      <td className="col-action">
                        <button className="models-inspect-btn rounded-[2px]">Inspect &rarr;</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* INSPECT MODEL SLIDE-OVER MODAL */}
      {inspectedModel && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl h-full overflow-y-auto p-6 md:p-8 shadow-2xl flex flex-col justify-between border-l border-[#E5E5E0]">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E5E5E0] mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-extrabold uppercase px-2.5 py-1 bg-[#FFF6F3] text-[#FF5A1F] rounded-[2px] border border-[#FFEDD5]">
                      {inspectedModel.org}
                    </span>
                    {inspectedModel.family && (
                      <span className="text-[11px] font-bold uppercase px-2.5 py-1 bg-[#F8F7F2] text-[#333333] rounded-[2px] border border-[#EAE9E4]">
                        Family: {inspectedModel.family}
                      </span>
                    )}
                  </div>
                  <h2 className="text-[28px] font-black text-[#111111] mt-2">
                    {inspectedModel.name}
                  </h2>
                </div>
                <button
                  onClick={() => setInspectedModel(null)}
                  className="w-10 h-10 rounded-[2px] bg-[#F8F7F2] hover:bg-[#E5E5E0] flex items-center justify-center text-[#555555] transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <p className="text-[15px] text-[#555555] font-medium leading-relaxed mb-6">
                {inspectedModel.desc}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 bg-[#F8F7F2] p-4 rounded-[2px] border border-[#EAE9E4] text-[12px]">
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-[#8B8B8B] block mb-1">Architecture</span>
                  <span className="font-extrabold text-[#111111]">{inspectedModel.params || "Dense / MoE"}</span>
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-[#8B8B8B] block mb-1">Context</span>
                  <span className="font-extrabold text-[#111111]">{inspectedModel.context || "128k tokens"}</span>
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-[#8B8B8B] block mb-1">Elo / SOTA</span>
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
                  <div className="bg-[#F8F7F2] rounded-[2px] p-4 border border-[#EAE9E4] space-y-3.5">
                    {inspectedModel.benchmarks.map((bm, i) => (
                      <div key={i}>
                        <div className="flex items-center justify-between text-[13px] font-bold mb-1">
                          <span className="text-[#333333]">{bm.name}</span>
                          <span className="text-[#111111] font-black">{bm.score}</span>
                        </div>
                        <div className="w-full bg-[#E5E5E0] h-2 rounded-[2px] overflow-hidden">
                          <div
                            className="h-full rounded-[2px]"
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
                      className="flex items-center gap-1 text-[12px] font-bold px-3 py-1 bg-[#F3F4F6] hover:bg-[#E5E7EB] rounded-[2px] transition-colors"
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
                  <pre className="bg-[#111111] text-[#F8F7F2] p-4 rounded-[2px] text-[12px] font-mono overflow-x-auto border border-[#333333] leading-relaxed">
                    <code>{inspectedModel.quickstart}</code>
                  </pre>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-[#E5E5E0] flex items-center justify-between">
              <Link
                href={`/models/${inspectedModel.id}`}
                className="px-5 py-2.5 bg-[#FF5A1F] hover:bg-[#e04810] text-white rounded-[2px] font-extrabold text-[13px] transition-colors no-underline flex items-center gap-2"
              >
                <span>View Full Model Detail Page</span>
                <ExternalLink size={14} />
              </Link>
              <button
                onClick={() => setInspectedModel(null)}
                className="px-4 py-2.5 bg-[#F8F7F2] hover:bg-[#E5E5E0] text-[#111111] rounded-[2px] font-bold text-[13px] transition-colors"
              >
                Close Panel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ModelsPage() {
  return (
    <Suspense fallback={<div className="p-16 text-center text-[#8B8B8B] font-extrabold">Loading Frontier Atlas Models Directory...</div>}>
      <ModelsContent />
    </Suspense>
  );
}
