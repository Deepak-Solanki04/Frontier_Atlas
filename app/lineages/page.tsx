"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  GitCommit, ArrowRight, Sparkles, Box, Activity, ChevronRight, Layers, ArrowLeft
} from "lucide-react";

// Mock Data for Lineages Index
const MOCK_LINEAGES = [
  {
    id: "gpt",
    name: "GPT Lineage",
    vendor: "OpenAI",
    description: "The pioneering generative pre-trained transformer models that popularized instruction tuning and RLHF, establishing the modern LLM paradigm.",
    color: "#10B981", // Emerald
    bgStyle: "bg-emerald-50 border-emerald-200 text-emerald-600",
    nodeCount: 7,
    latestModel: "GPT-4o",
    timeline: "2018 - Present"
  },
  {
    id: "llama",
    name: "LLaMA Lineage",
    vendor: "Meta AI",
    description: "A foundational open-weight language model family designed for research, scaling from efficient 7B models up to massive 400B dense architectures.",
    color: "#3B82F6", // Blue
    bgStyle: "bg-blue-50 border-blue-200 text-blue-600",
    nodeCount: 6,
    latestModel: "Llama 3.1",
    timeline: "2023 - Present"
  },
  {
    id: "claude",
    name: "Claude Lineage",
    vendor: "Anthropic",
    description: "Constitutional AI models focused on safety, highly steerable reasoning, and massive context window capabilities for enterprise tasks.",
    color: "#D97757", // Anthropic-ish
    bgStyle: "bg-orange-50 border-orange-200 text-orange-600",
    nodeCount: 5,
    latestModel: "Claude 3.5 Sonnet",
    timeline: "2023 - Present"
  },
  {
    id: "gemini",
    name: "Gemini Lineage",
    vendor: "Google DeepMind",
    description: "Natively multimodal foundation models trained simultaneously across text, images, audio, and video for highly capable general intelligence.",
    color: "#8B5CF6", // Purple
    bgStyle: "bg-purple-50 border-purple-200 text-purple-600",
    nodeCount: 4,
    latestModel: "Gemini 1.5 Pro",
    timeline: "2023 - Present"
  }
];

export default function LineagesDirectoryPage() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24 font-sans">
      
      {/* ── TOP LUXURY NAVIGATION BAR ── */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#F0F0F0]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-[#555555] hover:text-[#111111] transition-colors text-sm font-semibold no-underline">
              <ArrowLeft size={16} />
              <span>Home</span>
            </Link>
            <div className="hidden md:flex items-center gap-2 text-[13px] text-[#8B8B8B]">
              <span>&gt;</span>
              <span className="text-[#111111] font-medium">Model Lineages</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 mt-12">
        
        {/* HERO SECTION */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFF6F3] text-[#FF5A1F] border border-[#FFEDD5] text-[11px] font-bold uppercase tracking-wider mb-4">
            <GitCommit size={14} />
            <span>Evolutionary Trees</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#111111] tracking-tight mb-4">
            Foundation Model Lineages
          </h1>
          <p className="text-lg text-[#555555] max-w-2xl font-medium leading-relaxed">
            Trace the architectural evolution, capability scaling, and chronological development of the world's most influential AI model families.
          </p>
        </div>

        {/* LINEAGES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_LINEAGES.map((lineage) => (
            <Link 
              href={`/lineages/${lineage.id}`} 
              key={lineage.id}
              className="block group no-underline"
              onMouseEnter={() => setHoveredId(lineage.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="bg-white rounded-[16px] border border-[#F0F0F0] p-8 h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between">
                
                {/* Background decorative glow */}
                <div 
                  className={`absolute -right-20 -top-20 w-64 h-64 rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none`}
                  style={{ backgroundColor: lineage.color }}
                />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-[12px] flex items-center justify-center border ${lineage.bgStyle}`}>
                      <Layers size={24} />
                    </div>
                    <span className="text-[12px] font-bold text-[#8B8B8B] uppercase tracking-wider bg-[#F8F7F2] px-3 py-1 rounded-full border border-[#EAE9E4]">
                      {lineage.vendor}
                    </span>
                  </div>

                  <h2 className="text-2xl font-extrabold text-[#111111] tracking-tight mb-3 group-hover:text-[#FF5A1F] transition-colors">
                    {lineage.name}
                  </h2>
                  
                  <p className="text-[15px] font-medium text-[#555555] leading-relaxed mb-8">
                    {lineage.description}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-[#F0F0F0]">
                  <div className="flex gap-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-[#8B8B8B] uppercase tracking-wider mb-1">Nodes</span>
                      <span className="text-sm font-extrabold text-[#111111]">{lineage.nodeCount} Generations</span>
                    </div>
                    <div className="w-[1px] h-8 bg-[#EAE9E4]" />
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-[#8B8B8B] uppercase tracking-wider mb-1">Latest</span>
                      <span className="text-sm font-extrabold text-[#111111]">{lineage.latestModel}</span>
                    </div>
                  </div>
                  
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full bg-[#FAFAFA] border border-[#F0F0F0] text-[#111111] transition-transform duration-300 ${hoveredId === lineage.id ? 'translate-x-2 bg-[#111111] text-white border-[#111111]' : ''}`}>
                    <ArrowRight size={18} />
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>

      </main>
    </div>
  );
}
