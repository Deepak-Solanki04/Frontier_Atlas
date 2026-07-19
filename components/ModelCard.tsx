import React from "react";
import Link from "next/link";
import type { ModelItem } from "@/lib/models";

export default function ModelCard({
  model,
  onInspect,
}: {
  model: ModelItem;
  onInspect: (model: ModelItem) => void;
}) {
  return (
    <div className="bg-white border border-[#E5E5E0] rounded-[4px] p-5 flex flex-col justify-between hover:border-[#111111] transition-colors duration-200 group">
      <div>
        {/* Top Mono Kicker */}
        <div className="font-mono text-[10px] uppercase tracking-wider text-[#8B8B8B] mb-2 flex items-center justify-between">
          <span>{model.org}</span>
          {model.elo && (
            <span className="text-[#FF5A1F] font-semibold">ELO {model.elo}</span>
          )}
        </div>

        {/* Serif Title */}
        <Link href={`/models/${model.id}`}>
          <h3
            className="text-[22px] font-medium text-[#111111] leading-tight mb-2.5 group-hover:text-[#FF5A1F] transition-colors"
            style={{ fontFamily: "'EB Garamond', 'Iowan Old Style', Palatino, Georgia, serif" }}
          >
            {model.name}
          </h3>
        </Link>

        {/* Editorial Description */}
        <p
          className="text-[#555555] text-[15px] leading-relaxed mb-5 line-clamp-2"
          style={{ fontFamily: "'EB Garamond', 'Iowan Old Style', Palatino, Georgia, serif" }}
        >
          {model.description}
        </p>

        {/* Monospace Benchmarks Block */}
        {model.benchmarks && model.benchmarks.length > 0 && (
          <div className="bg-[#F8F7F2] border border-[#E5E5E0] rounded-[4px] p-3 mb-5 font-mono text-[11px] space-y-1.5">
            <div className="text-[10px] uppercase tracking-wider text-[#8B8B8B] pb-1 border-b border-[#E5E5E0] flex justify-between">
              <span>Benchmark</span>
              <span>Score</span>
            </div>
            {model.benchmarks.map((bm, idx) => (
              <div key={idx} className="flex items-center justify-between text-[#111111]">
                <span className="text-[#555555] truncate max-w-[150px]">{bm.name}</span>
                <span className="font-semibold">{bm.score}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Specs & Action */}
      <div className="pt-3 border-t border-[#E5E5E0] flex items-center justify-between font-mono text-[11px] text-[#8B8B8B]">
        <div>
          <span className="text-[#111111] font-semibold">{model.paperCount}</span> papers · {model.context || "128k"}
        </div>

        <button
          onClick={() => onInspect(model)}
          className="font-mono text-[11px] text-[#111111] hover:text-[#FF5A1F] font-semibold uppercase tracking-wider underline underline-offset-4"
        >
          Inspect -&gt;
        </button>
      </div>
    </div>
  );
}
