"use client";

import React, { use } from "react";
import Link from "next/link";
import { 
  ArrowLeft, GitCommit, Calendar, Cpu, Brain, Sparkles, Box, CheckCircle2, Zap
} from "lucide-react";

// Mock Data for a Specific Lineage Tree
const MOCK_LINEAGE_DATA: Record<string, any> = {
  "gpt": {
    name: "GPT Lineage",
    vendor: "OpenAI",
    description: "The generative pre-trained transformer models that popularized RLHF.",
    color: "#10B981", // Emerald
    nodes: [
      {
        id: "gpt-1",
        name: "GPT-1",
        date: "June 2018",
        parameters: "117M",
        highlights: ["First generative pre-training", "Decoder-only transformer base"],
        status: "Historical",
        icon: Box
      },
      {
        id: "gpt-2",
        name: "GPT-2",
        date: "February 2019",
        parameters: "1.5B",
        highlights: ["Zero-shot task transfer", "Unsupervised multitask learning"],
        status: "Historical",
        icon: Box
      },
      {
        id: "gpt-3",
        name: "GPT-3",
        date: "May 2020",
        parameters: "175B",
        highlights: ["Few-shot in-context learning", "Massive scale emergence"],
        status: "Historical",
        icon: Brain
      },
      {
        id: "instructgpt",
        name: "InstructGPT",
        date: "January 2022",
        parameters: "175B",
        highlights: ["RLHF introduced", "Alignment with human intent"],
        status: "Historical",
        icon: Sparkles
      },
      {
        id: "gpt-4",
        name: "GPT-4",
        date: "March 2023",
        parameters: "Est. 1.8T",
        highlights: ["MoE Architecture", "Advanced reasoning", "Multimodal"],
        status: "Legacy Active",
        icon: Cpu
      },
      {
        id: "gpt-4o",
        name: "GPT-4o",
        date: "May 2024",
        parameters: "Undisclosed",
        highlights: ["Omni-modal native processing", "Real-time voice inference"],
        status: "State of the Art",
        icon: Zap
      }
    ]
  }
};

export default function LineageDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const slug = resolvedParams?.slug.toLowerCase();
  
  // Fallback to GPT mock if the specific slug isn't mocked yet
  const lineage = MOCK_LINEAGE_DATA[slug] || MOCK_LINEAGE_DATA["gpt"];

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-32 font-sans">
      
      {/* ── TOP LUXURY NAVIGATION BAR ── */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#F0F0F0]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/lineages" className="flex items-center gap-2 text-[#555555] hover:text-[#111111] transition-colors text-sm font-semibold no-underline">
              <ArrowLeft size={16} />
              <span>Lineages Directory</span>
            </Link>
            <div className="hidden md:flex items-center gap-2 text-[13px] text-[#8B8B8B]">
              <span>&gt;</span>
              <span className="text-[#111111] font-medium">{lineage.name}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 md:px-8 mt-12">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#EAE9E4] text-[11px] font-bold uppercase tracking-wider text-[#8B8B8B] mb-4 shadow-sm">
            <GitCommit size={14} style={{ color: lineage.color }} />
            <span>{lineage.vendor} Family Tree</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#111111] tracking-tight mb-4">
            {lineage.name}
          </h1>
          <p className="text-lg text-[#555555] font-medium leading-relaxed">
            {lineage.description}
          </p>
        </div>

        {/* TIMELINE TREE */}
        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-[2px] bg-[#EAE9E4] -translate-x-1/2" />

          <div className="flex flex-col gap-12">
            {lineage.nodes.map((node: any, index: number) => {
              const isEven = index % 2 === 0;
              const isSota = node.status === "State of the Art";
              const Icon = node.icon;

              return (
                <div key={node.id} className={`relative flex items-center ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                  
                  {/* Timeline Center Node */}
                  <div className="absolute left-[27px] md:left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-white border-4 border-[#FAFAFA] shadow-sm flex items-center justify-center z-10" style={{ color: isSota ? lineage.color : '#8B8B8B' }}>
                    <Icon size={24} strokeWidth={isSota ? 2.5 : 2} />
                  </div>

                  {/* Spacer for the opposite side on desktop */}
                  <div className="hidden md:block w-1/2" />

                  {/* Card Content */}
                  <div className={`w-full md:w-1/2 pl-20 md:pl-0 ${isEven ? 'md:pr-12 text-left md:text-right' : 'md:pl-12 text-left'}`}>
                    <div className={`bg-white rounded-[16px] border ${isSota ? 'border-2' : 'border'} p-6 transition-all hover:shadow-md relative group cursor-pointer`}
                         style={{ borderColor: isSota ? lineage.color : '#F0F0F0' }}>
                      
                      {/* Connection Line to Center Node (Desktop only) */}
                      <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-12 h-[2px] bg-[#EAE9E4] transition-colors group-hover:bg-[#111111] ${isEven ? '-right-12' : '-left-12'}`} />

                      <div className={`flex items-center gap-3 mb-2 ${isEven ? 'md:justify-end' : ''}`}>
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#8B8B8B] uppercase tracking-wider">
                          <Calendar size={12} />
                          {node.date}
                        </div>
                        {isSota && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#FFF6F3] text-[#FF5A1F] border border-[#FFEDD5]">
                            SOTA
                          </span>
                        )}
                      </div>

                      <h3 className="text-2xl font-extrabold text-[#111111] tracking-tight mb-2 group-hover:text-[#FF5A1F] transition-colors">
                        {node.name}
                      </h3>

                      <div className={`text-sm font-bold text-[#555555] mb-4 ${isEven ? 'md:justify-end' : ''}`}>
                        {node.parameters} Parameters
                      </div>

                      <ul className={`space-y-2 ${isEven ? 'md:text-right' : 'text-left'}`}>
                        {node.highlights.map((highlight: string, i: number) => (
                          <li key={i} className={`flex items-start gap-2 text-[13px] font-medium text-[#555555] ${isEven ? 'md:flex-row-reverse' : ''}`}>
                            <CheckCircle2 size={14} className="shrink-0 mt-0.5 text-[#10B981]" />
                            <span className="leading-snug">{highlight}</span>
                          </li>
                        ))}
                      </ul>

                      {/* View Model Button (Mock) */}
                      <div className={`mt-5 pt-4 border-t border-[#F0F0F0] ${isEven ? 'md:text-right' : 'text-left'}`}>
                        <span className="inline-flex items-center gap-1 text-[12px] font-bold text-[#111111] uppercase tracking-wider group-hover:text-[#FF5A1F] transition-colors">
                          View Specs <ArrowRight size={14} />
                        </span>
                      </div>

                    </div>
                  </div>
                  
                </div>
              );
            })}
          </div>

          {/* Bottom faded fade out line */}
          <div className="absolute left-[27px] md:left-1/2 -bottom-20 w-[2px] h-20 bg-gradient-to-b from-[#EAE9E4] to-transparent -translate-x-1/2" />
        </div>

      </main>
    </div>
  );
}
