"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  GitCommit, ArrowRight, Layers, ArrowLeft, Network, Box
} from "lucide-react";
import { getLineages, LineageItem } from "@/lib/models";

export default function LineagesDirectoryPage() {
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
                {lineages.map((lineage, idx) => (
                <Link 
                  href={`/lineages/${lineage.id}`} 
                  key={lineage.id}
                  className="block group no-underline"
                >
                  <div className="bg-white rounded-md border border-[#ECECEC] p-3.5 min-h-[155px] flex flex-col hover:shadow-md transition-shadow duration-200 group no-underline">
                    
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center transition-transform duration-200 group-hover:scale-125 w-[30px] h-[30px] rounded border" style={{ backgroundColor: lineage.bgStyle, borderColor: lineage.color + "40" }}>
                        <Layers size={16} />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-[#111111] text-[15px] font-medium leading-5">{lineage.name}</h3>
                        <span className="text-[11px] font-medium text-[#8B8B8B] truncate mt-0.5">{lineage.vendor}</span>
                      </div>
                    </div>

                    {lineage.description ? (
                      <p className="mt-2 text-[13px] leading-5 text-[#666] line-clamp-3">
                        {lineage.description}
                      </p>
                    ) : (
                      <div className="flex-1" />
                    )}

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
