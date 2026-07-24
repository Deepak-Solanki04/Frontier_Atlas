"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  GitCommit, ArrowRight, Layers, ArrowLeft, Network, Box
} from "lucide-react";
import { getLineages, LineageItem } from "@/lib/models";

export default function LineagesDirectoryPage() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [lineages, setLineages] = useState<LineageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"models" | "domains">("models");

  useEffect(() => {
    getLineages()
      .then(setLineages)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24 font-sans">
      
      {/* ── TOP NAVIGATION BAR ── */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#F0F0F0]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-[#555555] hover:text-[#111111] transition-colors text-sm font-semibold no-underline">
              <ArrowLeft size={16} />
              <span>Home</span>
            </Link>
            <div className="hidden md:flex items-center gap-2 text-[13px] text-[#8B8B8B]">
              <span>&gt;</span>
              <span className="text-[#111111] font-medium">Evolution Lineages</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 mt-12">
        
        {/* HERO SECTION */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFF6F3] text-[#FF5A1F] border border-[#FFEDD5] text-[11px] font-bold uppercase tracking-wider mb-4">
            <GitCommit size={14} />
            <span>Evolutionary Trees</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#111111] tracking-tight mb-4">
            AI Evolution Lineages
          </h1>
          <p className="text-lg text-[#555555] max-w-2xl font-medium leading-relaxed">
            Trace the architectural evolution, capability scaling, and chronological development of the world's most influential AI models and domains.
          </p>
        </div>

        {/* TABS FOR TWO-SECTION LAYOUT */}
        <div className="flex items-center gap-2 mb-10 border-b border-[#EAE9E4] pb-px">
          <button
            onClick={() => setActiveTab("models")}
            className={`flex items-center gap-2 px-5 py-3 font-semibold text-sm transition-all relative top-[1px] ${
              activeTab === "models"
                ? "text-[#111111] border-b-2 border-[#111111]"
                : "text-[#8B8B8B] hover:text-[#555] border-b-2 border-transparent"
            }`}
          >
            <Layers size={16} />
            Model Families
          </button>
          
          <button
            onClick={() => setActiveTab("domains")}
            className={`flex items-center gap-2 px-5 py-3 font-semibold text-sm transition-all relative top-[1px] ${
              activeTab === "domains"
                ? "text-[#111111] border-b-2 border-[#111111]"
                : "text-[#8B8B8B] hover:text-[#555] border-b-2 border-transparent"
            }`}
          >
            <Network size={16} />
            Domain Lineages
            <span className="ml-1 px-1.5 py-0.5 rounded-[4px] bg-[#F0F0F0] text-[#8B8B8B] text-[9px] uppercase tracking-wider font-bold">
              Coming Soon
            </span>
          </button>
        </div>

        {/* CONTENT SECTIONS */}
        
        {/* DOMAIN SECTION (COMING SOON) */}
        {activeTab === "domains" && (
          <div className="text-center py-32 bg-white rounded-[16px] border border-dashed border-[#D1D5DB]">
            <Box size={32} className="mx-auto text-[#9CA3AF] mb-4" />
            <h3 className="text-lg font-bold text-[#111111] mb-2">Domain Lineages</h3>
            <p className="text-[#555555] font-medium max-w-md mx-auto">
              We are currently compiling comprehensive evolutionary trees for specific AI domains like Vision, Code, and Reasoning. Check back later!
            </p>
          </div>
        )}

        {/* MODEL FAMILY SECTION */}
        {activeTab === "models" && (
          <>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="bg-white rounded-[16px] border border-[#F0F0F0] p-8 h-[380px] animate-pulse" />
                ))}
              </div>
            ) : lineages.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-[16px] border border-[#F0F0F0]">
                <p className="text-[#555555] font-medium">No lineages found yet. The backend might still be synchronizing.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {lineages.map((lineage) => (
                <Link 
                  href={`/lineages/${lineage.id}`} 
                  key={lineage.id}
                  className="block group no-underline"
                  onMouseEnter={() => setHoveredId(lineage.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className="bg-white rounded-[12px] border border-[#F0F0F0] p-5 h-full flex flex-col hover:shadow-md transition-shadow duration-200 group no-underline relative overflow-hidden justify-between">
                    
                    <div>
                      <div className="flex items-start gap-3">
                        <div className={`w-[30px] h-[30px] rounded flex items-center justify-center border ${lineage.bgStyle}`}>
                          <Layers size={16} />
                        </div>
                        <div className="flex flex-col min-w-0 flex-1">
                          <h3 className="text-[15.5px] font-medium leading-5 text-[#111111] truncate" title={lineage.name}>
                            {lineage.name}
                          </h3>
                          <span className="text-[11px] font-medium text-[#8B8B8B] truncate">{lineage.vendor}</span>
                        </div>
                      </div>
                      
                      <p className="mt-3 text-[13.5px] leading-5 text-[#666] line-clamp-2">
                        {lineage.description}
                      </p>
                      
                      {/* SVG TIMELINE VISUALIZER */}
                      <div className="mt-4 pt-4 border-t border-[#F0F0F0]">
                        <div className="text-[10px] font-bold text-[#8B8B8B] uppercase tracking-wider mb-2">Evolutionary Path</div>
                        <div className="relative w-full h-[75px] flex items-center mt-2">
                          <svg viewBox="0 0 400 80" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" className="overflow-visible">
                            <defs>
                              <marker id={`arrow-${lineage.id}`} viewBox="0 0 8 8" refX="6" refY="4" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                                <path d="M 0 0 L 8 4 L 0 8 z" fill="#D1D5DB" />
                              </marker>
                            </defs>
                            {/* Lines connecting nodes */}
                            {lineage.nodes.slice(0, 4).map((node, i, arr) => {
                              if (i === arr.length - 1) return null;
                              const spacing = 400 / (Math.min(arr.length, 4) || 1);
                              const x1 = (i * spacing) + 30;
                              const x2 = ((i + 1) * spacing) + 10;
                              return (
                                <line key={`line-${i}`} x1={x1} y1="30" x2={x2} y2="30" stroke="#D1D5DB" strokeWidth="2.5" markerEnd={`url(#arrow-${lineage.id})`} />
                              );
                            })}
                            {/* Nodes */}
                            {lineage.nodes.slice(0, 4).map((node, i, arr) => {
                              const spacing = 400 / (Math.min(arr.length, 4) || 1);
                              const cx = (i * spacing) + 20;
                              const isLast = i === arr.length - 1;
                              const fill = isLast ? lineage.color : "#FFFFFF";
                              const stroke = isLast ? lineage.color : "#9CA3AF";
                              const textColor = isLast ? "#111111" : "#555555";
                              const fontWeight = isLast ? "700" : "500";
                              return (
                                <g key={`node-${i}`}>
                                  <circle cx={cx} cy="30" r="10" fill={fill} stroke={stroke} strokeWidth="2.5" />
                                  <text x={cx} y="58" textAnchor="middle" style={{ fontFamily: "monospace", fontSize: "13.5px", fill: textColor, fontWeight }}>
                                    {node.name.length > 12 ? node.name.substring(0, 10) + '..' : node.name}
                                  </text>
                                  {node.year && (
                                    <text x={cx} y="11" textAnchor="middle" style={{ fontFamily: "monospace", fontSize: "11.5px", fill: "#9CA3AF" }}>
                                      {node.year}
                                    </text>
                                  )}
                                </g>
                              );
                            })}
                            {lineage.nodes.length > 4 && (
                              <text x="390" y="34" textAnchor="start" style={{ fontFamily: "monospace", fontSize: "14px", fill: "#9CA3AF" }}>
                                +{lineage.nodes.length - 4}
                              </text>
                            )}
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#F0F0F0]">
                      <div className="flex gap-4">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-[#8B8B8B] uppercase tracking-wider mb-0.5">Nodes</span>
                          <span className="text-[12.5px] font-semibold text-[#111111]">{lineage.nodeCount || lineage.nodes.length} Gens</span>
                        </div>
                        <div className="w-[1px] h-6 bg-[#EAE9E4] mt-1" />
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-[#8B8B8B] uppercase tracking-wider mb-0.5">Latest</span>
                          <span className="text-[12.5px] font-semibold text-[#111111] truncate max-w-[80px]" title={lineage.latestModel}>{lineage.latestModel}</span>
                        </div>
                      </div>
                      
                      <div className={`flex items-center justify-center w-6 h-6 rounded-full bg-[#FAFAFA] border border-[#F0F0F0] text-[#111111] transition-transform duration-300 ${hoveredId === lineage.id ? 'translate-x-1 bg-[#111111] text-white border-[#111111]' : ''}`}>
                        <ArrowRight size={12} />
                      </div>
                    </div>

                  </div>
                </Link>
              ))}
            </div>
            )}
          </>
        )}

      </main>
    </div>
  );
}
