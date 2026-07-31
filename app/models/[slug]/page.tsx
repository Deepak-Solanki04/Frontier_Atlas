"use client";

import React, { useState, useEffect, useMemo, use, memo, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Cpu, Layers, ExternalLink, Check, Copy, ArrowLeft, 
  Sparkles, BookOpen, Terminal, Zap, ShieldCheck, 
  Eye, Activity, Box, Sliders, BarChart3,
  Brain, Wrench, Link2, ArrowUpRight, FileText
} from "lucide-react";
import { fetchApi } from "@/lib/api";
import { type ModelItem } from "@/lib/models";

/* ─── Tag color map ──────────────────────────────────────────────────────── */
const TAG_COLORS: Record<
  string,
  { bg: string; text: string; dot: string; border?: string }
> = {
  purple: {
    bg: "bg-[#F3E8FF]",
    text: "text-[#6B21A8]",
    dot: "bg-[#9333EA]",
    border: "border border-[#D8B4FE]",
  },
  blue: {
    bg: "bg-[#E0F2FE]",
    text: "text-[#0369A1]",
    dot: "bg-[#0284C7]",
    border: "border border-[#BAE6FD]",
  },
  green: {
    bg: "bg-[#ECFDF5]",
    text: "text-[#047857]",
    dot: "bg-[#10B981]",
    border: "border border-[#A7F3D0]",
  },
  cyan: {
    bg: "bg-[#CFFAFE]",
    text: "text-[#0E7490]",
    dot: "bg-[#06B6D4]",
    border: "border border-[#CFFAFE]",
  },
  gray: {
    bg: "bg-white",
    text: "text-[#111111]",
    dot: "",
    border: "border border-[#E5E5E0]",
  },
};

const getTagColor = (label: string): string => {
  const map: Record<string, string> = {
    "Reinforcement Learning": "blue",
    "Image Understanding": "blue",
    Agents: "green",
    "Long Context": "purple",
    Robotics: "cyan",
    "World Models": "purple",
  };
  if (map[label]) return map[label];

  const colors = ["purple", "blue", "green", "cyan"];
  let hash = 0;
  for (let i = 0; i < label.length; i++) {
    hash = label.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

/* ─── Pill tag ───────────────────────────────────────────────────────────── */
const Pill = memo(
  ({ label, colorKey }: { label: string; colorKey: string }) => {
    const c = TAG_COLORS[colorKey] || TAG_COLORS.gray;
    const isGray = colorKey === "gray";

    return (
      <span
        className={`group h-[24px] inline-flex items-center px-2.5 rounded-[4px] text-[11px] cursor-pointer transition-all duration-200 hover:-translate-y-px hover:brightness-[0.96] hover:shadow-sm active:scale-95 select-none ${c.bg} ${c.text} ${c.border || ""} whitespace-nowrap`}
      >
        {!isGray && (
          <span
            className={`w-1.5 h-1.5 rounded-full mr-1.5 shrink-0 transition-transform duration-200 group-hover:scale-110 ${c.dot}`}
          />
        )}
        {label}
      </span>
    );
  },
);
Pill.displayName = "Pill";

/* ─── SOTA Display ───────────────────────────────────────────────────────── */
const SotaDisplay = memo(({ sota }: { sota: string }) => {
  if (!sota) return null;
  const segments = sota.split(" • ");

  return (
    <div className="mb-[10px] text-[11px] tracking-tight flex flex-wrap items-center gap-x-2 gap-y-1 w-full">
      {segments.map((segment, idx) => {
        const isSota = segment.startsWith("SOTA on ");
        const isOn = segment.includes(" on ");

        let prefix = "";
        let benchmarks = segment;

        if (isSota) {
          benchmarks = segment.replace("SOTA on ", "");
        } else if (isOn) {
          const parts = segment.split(" on ");
          prefix = parts[0];
          benchmarks = parts[1];
        }

        return (
          <span key={idx} className="inline-flex items-center">
            {idx > 0 && (
              <span className="text-[#9CA3AF] mx-1.5 font-normal">•</span>
            )}

            {isSota ? (
              <>
                <span className="text-[#B48C52] font-semibold mr-1 tracking-wide">
                  SOTA
                </span>
                <span className="mr-1 text-[10px]">🏆</span>
                <span className="text-[#8B8B8B] mr-1 font-normal">on</span>
                <span className="text-[#1E40AF] text-[11.5px] tracking-tighter">
                  {benchmarks}
                </span>
              </>
            ) : isOn ? (
              <>
                <span className="text-[#8B8B8B] font-normal mr-1">
                  {prefix}
                </span>
                <span className="text-[#8B8B8B] mr-1 font-normal">on</span>
                <span className="text-[#1E40AF] text-[11.5px] tracking-tighter">
                  {benchmarks}
                </span>
              </>
            ) : (
              <span className="text-[#8B8B8B] font-normal tracking-tight">
                {segment}
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
});
SotaDisplay.displayName = "SotaDisplay";

/* ─── Thumbnail ──────────────────────────────────────────────────────────── */
function getTitleColors(title: string): {
  bg1: string;
  bg2: string;
  accent: string;
} {
  const palettes = [
    { bg1: "#1a1a2e", bg2: "#16213e", accent: "#e94560" },
    { bg1: "#0f3460", bg2: "#533483", accent: "#e94560" },
    { bg1: "#1b262c", bg2: "#0f3460", accent: "#00b4d8" },
    { bg1: "#2d132c", bg2: "#ee4540", accent: "#c72c41" },
    { bg1: "#1a1a2e", bg2: "#2e4057", accent: "#048a81" },
    { bg1: "#212121", bg2: "#37474f", accent: "#ff6f00" },
    { bg1: "#1b1b2f", bg2: "#162447", accent: "#1f4068" },
    { bg1: "#2c003e", bg2: "#1a0533", accent: "#870160" },
  ];
  let hash = 0;
  for (let i = 0; i < title.length; i++)
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  return palettes[Math.abs(hash) % palettes.length];
}

function GeneratedCover({ title }: { title: string }) {
  const { bg1, bg2, accent } = getTitleColors(title);
  const words = (title || "Untitled").split(" ");
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length > 20 && cur) {
      lines.push(cur.trim());
      cur = w;
    } else cur = (cur + " " + w).trim();
    if (lines.length === 3) break;
  }
  if (cur && lines.length < 3) lines.push(cur.trim());
  const displayLines = lines.slice(0, 3);

  const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 200 250" preserveAspectRatio="none">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${bg1}"/>
          <stop offset="100%" stop-color="${bg2}"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg)"/>
      <rect x="0" y="0" width="100%" height="4" fill="${accent}"/>
      <circle cx="160" cy="50" r="55" fill="${accent}" fill-opacity="0.07"/>
      <circle cx="30" cy="210" r="40" fill="${accent}" fill-opacity="0.06"/>
      <rect x="12" y="16" width="42" height="14" rx="3" fill="${accent}" fill-opacity="0.9"/>
      <text x="33" y="27" font-family="monospace" font-size="8" fill="white" text-anchor="middle">arXiv</text>
      ${displayLines.map((line, i) => `<text x="12" y="${115 + i * 20}" font-family="Arial,sans-serif" font-size="11" font-weight="bold" fill="white" fill-opacity="0.95">${line.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")}</text>`).join("")}
      <rect x="12" y="247" width="30" height="3" rx="1.5" fill="${accent}"/>
    </svg>
  `;

  const dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgContent)}`;

  return (
    <div className="absolute inset-0 bg-[#3A3F45]">
      <img
        src={dataUrl}
        alt={`Cover for ${title}`}
        className="w-full h-full object-cover block"
      />
    </div>
  );
}

const isValidImageSrc = (src: string) => {
  if (!src || src === "null" || src === "None") return false;
  if (src.startsWith('/')) return true;
  if (src.startsWith('data:image/')) return true;
  try {
    new URL(src);
    return true;
  } catch {
    return false;
  }
};

const PaperThumbnail = memo(
  ({ title, thumbnail }: { title: string; thumbnail: string }) => {
    const [hasError, setHasError] = useState(false);

    return (
      <div className="w-[150px] sm:w-[180px] xl:w-[200px] aspect-[4/5] xl:aspect-auto xl:h-full shrink-0 bg-white border border-[#E5E5E0] shadow-sm relative mx-auto xl:mx-0 overflow-hidden rounded-[8px]">
        {isValidImageSrc(thumbnail) && !hasError ? (
          <img
            src={thumbnail}
            alt={title || "Paper thumbnail"}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-contain object-center"
            onError={() => setHasError(true)}
          />
        ) : (
          <GeneratedCover title={title} />
        )}
      </div>
    );
  },
);
PaperThumbnail.displayName = "PaperThumbnail";

const PaperCard = memo(({ paper }: { paper: any }) => {
  const upvotesNum = parseFloat(paper.upvotes) || 0;
  const router = useRouter();

  const safeAuthors = paper.authors || [];
  const visibleAuthors = safeAuthors.slice(0, 3);
  const remaining = safeAuthors.length - 3;
  const githubRepo = paper.repositories?.find(
    (repo: any) => repo.url?.includes("github.com")
  );
  const huggingFaceRepo = paper.repositories?.find(
    (repo: any) => repo.url?.includes("huggingface.co")
  );

  const handlePrefetch = useCallback(() => {
    router.prefetch(`/papers/${paper.slug}`);
  }, [router, paper.slug]);

  return (
    <Link
      href={`/papers/${paper.slug}`}
      className="no-underline block mb-4"
      onMouseEnter={handlePrefetch}
      onTouchStart={handlePrefetch}
    >
      <div className="group flex flex-col xl:flex-row gap-3 sm:gap-4 xl:gap-5 p-3 sm:p-4 xl:pt-2 xl:pb-2 bg-white xl:bg-transparent border xl:border-x-0 xl:border-t-0 border-[#E5E5E0] rounded-[12px] xl:rounded-none cursor-pointer hover:shadow-lg xl:hover:bg-white xl:hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out hover:-translate-y-1 relative hover:z-10 active:scale-[0.99]">
        {/* PDF thumbnail */}
        <div className="order-first xl:order-last shrink-0 w-full xl:w-auto mx-auto xl:mx-0 xl:self-stretch border-b xl:border-b-0 border-[#E5E5E0] pb-3 xl:pb-0 mb-1 xl:mb-0">
          <PaperThumbnail title={paper.title} thumbnail={paper.thumbnail} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          {/* Title */}
          <h3 className="text-[15px] sm:text-[17px] xl:text-[20px] font-serif font-medium text-[#111111] leading-snug xl:leading-[1.3] mb-1 xl:mb-1.5 group-hover:text-[#F55036] transition-colors line-clamp-2">
            {paper.title}
          </h3>

          {/* Authors + Date + Citations */}
          <div className="flex flex-wrap items-center gap-x-2 text-[13px] text-[#666666] mb-3">
            {visibleAuthors.length > 0 && (
              <>
                <div className="flex flex-wrap items-center">
                  {visibleAuthors.map((a: any, i: number) => (
                    <span key={a.slug || i}>
                      {i > 0 && <span>, </span>}
                      <span className="hover:text-[#F55036]">
                        {a.name}
                      </span>
                    </span>
                  ))}
                  {remaining > 0 && <span>, +{remaining}</span>}
                </div>
                <span className="text-[#CCCCCC]">·</span>
              </>
            )}

            <span>{paper.date}</span>

            <span className="text-[#CCCCCC]">·</span>

            <span>{paper.citations || paper.citationCount || 0} citations</span>
          </div>

          {/* Description */}
          <p className="text-[13px] sm:text-[13.5px] xl:text-[14px] text-[#444444] leading-[1.6] mb-3 line-clamp-3">
            {paper.abstract || paper.description}
          </p>

          {/* Benchmark / SOTA (Row 1) */}
          <div className="w-full">
            <SotaDisplay sota={paper.sota || paper.sotaHtml} />
          </div>

          {/* Tasks (Row 2) */}
          <div className="flex flex-wrap items-center gap-1.5 mb-1.5 w-full">
            {paper.tags?.slice(0, 4).map((t: string) => {
              const colorKey = getTagColor(t);
              return <Pill key={t} label={t} colorKey={colorKey} />;
            })}
            {(!paper.tags || paper.tags.length === 0) && paper.tagsRow1?.slice(0, 4).map((t: any) => {
              const text = typeof t === 'object' ? t.text : t;
              const colorKey = getTagColor(text);
              return <Pill key={text} label={text} colorKey={colorKey} />;
            })}
          </div>

          {/* Methods (Row 3) */}
          <div className="flex flex-wrap items-center gap-1.5 w-full">
            {paper.additionalTags?.slice(0, 4).map((t: string) => {
              return <Pill key={t} label={t} colorKey="gray" />;
            })}
            {(!paper.additionalTags || paper.additionalTags.length === 0) && paper.tagsRow2?.slice(0, 4).map((t: string) => {
              return <Pill key={t} label={t} colorKey="gray" />;
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-1 sm:gap-2 md:gap-3 mt-1.5 w-full">
            {(paper as any).arxivUrl && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open((paper as any).arxivUrl, "_blank");
                }}
                className="flex-1 flex items-center justify-center lg:justify-between xl:justify-center px-0.5 min-[375px]:px-1 md:px-2 lg:px-4 xl:px-2 h-[24px] md:h-[28px] lg:h-[48px] xl:h-[28px] bg-white text-[#b31b1b] border-[1.5px] border-[#b31b1b]/40 hover:border-[#b31b1b] hover:bg-[#b31b1b]/5 rounded-[6px] transition-all duration-300"
              >
                <div className="flex items-center gap-0.5 min-[375px]:gap-1 md:gap-1.5 lg:gap-3 xl:gap-1.5">
                  <div className="w-[12px] h-[12px] min-[375px]:w-[14px] min-[375px]:h-[14px] md:w-[20px] md:h-[20px] lg:w-8 lg:h-8 xl:w-[20px] xl:h-[20px] rounded-[4px] md:rounded-[6px] lg:rounded-[10px] xl:rounded-[6px] bg-transparent flex items-center justify-center">
                    <img src="https://cdn.simpleicons.org/arxiv/b31b1b" alt="arXiv" className="w-[9px] h-[9px] min-[375px]:w-[10px] min-[375px]:h-[10px] md:w-[12px] md:h-[12px] lg:w-4 lg:h-4 xl:w-[12px] xl:h-[12px]" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="font-medium lg:font-semibold xl:font-medium text-[7.5px] min-[375px]:text-[8.5px] sm:text-[9.5px] md:text-[11.5px] lg:text-[13px] xl:text-[11.5px] whitespace-nowrap tracking-tighter min-[375px]:tracking-tight">arXiv</span>
                    <span className="hidden lg:block text-[11px] text-[#666] xl:hidden">Original preprint</span>
                  </div>
                </div>
                <ArrowUpRight size={14} strokeWidth={1.5} className="hidden lg:block xl:hidden text-[#b31b1b]" />
              </button>
            )}

            {(paper as any).pdfUrl && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open((paper as any).pdfUrl, "_blank");
                }}
                className="flex-1 flex items-center justify-center lg:justify-between xl:justify-center px-0.5 min-[375px]:px-1 md:px-2 lg:px-4 xl:px-2 h-[24px] md:h-[28px] lg:h-[48px] xl:h-[28px] bg-white text-[#E54D59] border-[1.5px] border-[#E54D59]/40 hover:border-[#E54D59] hover:bg-[#E54D59]/5 rounded-[6px] transition-all duration-300"
              >
                <div className="flex items-center gap-0.5 min-[375px]:gap-1 md:gap-1.5 lg:gap-3 xl:gap-1.5">
                  <div className="w-[12px] h-[12px] min-[375px]:w-[14px] min-[375px]:h-[14px] md:w-[20px] md:h-[20px] lg:w-8 lg:h-8 xl:w-[20px] xl:h-[20px] rounded-[4px] md:rounded-[6px] lg:rounded-[10px] xl:rounded-[6px] bg-transparent flex items-center justify-center">
                    <FileText className="text-[#E54D59] w-[9px] h-[9px] min-[375px]:w-[10px] min-[375px]:h-[10px] md:w-[12px] md:h-[12px] lg:w-4 lg:h-4 xl:w-[12px] xl:h-[12px]" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="font-medium lg:font-semibold xl:font-medium text-[7.5px] min-[375px]:text-[8.5px] sm:text-[9.5px] md:text-[11.5px] lg:text-[13px] xl:text-[11.5px] whitespace-nowrap tracking-tighter min-[375px]:tracking-tight">PDF</span>
                    <span className="hidden lg:block text-[11px] text-[#666] xl:hidden">Full paper</span>
                  </div>
                </div>
                <ArrowUpRight size={14} strokeWidth={1.5} className="hidden lg:block xl:hidden text-[#E54D59]" />
              </button>
            )}

            {githubRepo && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open(githubRepo.url, "_blank");
                }}
                className="flex-1 flex items-center justify-center lg:justify-between xl:justify-center px-0.5 min-[375px]:px-1 md:px-2 lg:px-4 xl:px-2 h-[24px] md:h-[28px] lg:h-[48px] xl:h-[28px] bg-white text-[#24292f] border-[1.5px] border-[#24292f]/30 hover:border-[#24292f] hover:bg-[#24292f]/5 rounded-[6px] transition-all duration-300"
              >
                <div className="flex items-center gap-0.5 min-[375px]:gap-1 md:gap-1.5 lg:gap-3 xl:gap-1.5">
                  <div className="w-[12px] h-[12px] min-[375px]:w-[14px] min-[375px]:h-[14px] md:w-[20px] md:h-[20px] lg:w-8 lg:h-8 xl:w-[20px] xl:h-[20px] rounded-[4px] md:rounded-[6px] lg:rounded-[10px] xl:rounded-[6px] bg-transparent flex items-center justify-center">
                    <img src="https://cdn.simpleicons.org/github/24292f" alt="GitHub" className="w-[9px] h-[9px] min-[375px]:w-[10px] min-[375px]:h-[10px] md:w-[12px] md:h-[12px] lg:w-4 lg:h-4 xl:w-[12px] xl:h-[12px]" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="font-medium lg:font-semibold xl:font-medium text-[7.5px] min-[375px]:text-[8.5px] sm:text-[9.5px] md:text-[11.5px] lg:text-[13px] xl:text-[11.5px] whitespace-nowrap tracking-tighter min-[375px]:tracking-tight">GitHub</span>
                    <span className="hidden lg:block text-[11px] text-[#666] xl:hidden">
                      {upvotesNum > 0 ? `${upvotesNum >= 1000 ? (upvotesNum / 1000).toFixed(1) + "k" : upvotesNum} stars` : "0 stars"}
                    </span>
                  </div>
                </div>
                <ArrowUpRight size={14} strokeWidth={1.5} className="text-[#9CA3AF] hidden lg:block xl:hidden" />
              </button>
            )}

            {huggingFaceRepo && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open(huggingFaceRepo.url, "_blank");
                }}
                className="flex-1 flex items-center justify-center lg:justify-between xl:justify-center px-0.5 min-[375px]:px-1 md:px-2 lg:px-4 xl:px-2 h-[24px] md:h-[28px] lg:h-[48px] xl:h-[28px] bg-white text-[#FF9D00] border-[1.5px] border-[#FF9D00]/30 hover:border-[#FF9D00] hover:bg-[#FF9D00]/5 rounded-[6px] transition-all duration-300"
              >
                <div className="flex items-center gap-0.5 min-[375px]:gap-1 md:gap-1.5 lg:gap-3 xl:gap-1.5">
                  <div className="w-[12px] h-[12px] min-[375px]:w-[14px] min-[375px]:h-[14px] md:w-[20px] md:h-[20px] lg:w-8 lg:h-8 xl:w-[20px] xl:h-[20px] rounded-[4px] md:rounded-[6px] lg:rounded-[10px] xl:rounded-[6px] bg-transparent flex items-center justify-center">
                    <img src="https://cdn.simpleicons.org/huggingface" alt="Hugging Face" className="w-[9px] h-[9px] min-[375px]:w-[10px] min-[375px]:h-[10px] md:w-[12px] md:h-[12px] lg:w-4 lg:h-4 xl:w-[12px] xl:h-[12px]" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="font-medium lg:font-semibold xl:font-medium text-[7.5px] min-[375px]:text-[8.5px] sm:text-[9.5px] md:text-[11.5px] lg:text-[13px] xl:text-[11.5px] whitespace-nowrap tracking-tighter min-[375px]:tracking-tight">Hugging Face</span>
                    <span className="hidden lg:block text-[11px] text-[#666] xl:hidden">
                      {paper.repositories?.filter((repo: any) => repo.url?.includes("huggingface.co")).length || 0} models
                    </span>
                  </div>
                </div>
                <ArrowUpRight size={14} strokeWidth={1.5} className="text-[#9CA3AF] hidden lg:block xl:hidden" />
              </button>
            )}
          </div>
        </div>
      </div>
    </Link >
  );
});
PaperCard.displayName = "PaperCard";

export default function ModelDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const [model, setModel] = useState<ModelItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [logoError, setLogoError] = useState(false);

  // Benchmarks Comparison Mode ("standard" | "human")
  const [evalMode, setEvalMode] = useState<"standard" | "human">("standard");

  useEffect(() => {
    window.scrollTo(0, 0);
    setLogoError(false);
    if (resolvedParams?.slug) {
      const cleanId = resolvedParams.slug.toLowerCase().trim();
      fetchApi<{ status: string, data: any }>(`/api/v1/models/${cleanId}`)
        .then(response => {
          if (response.status === "success" && response.data) {
            setModel(response.data);
          } else {
            setModel(null);
          }
          setLoading(false);
        })
        .catch(err => {
        console.error("Failed to load model:", err);
        setLoading(false);
      });
    }
  }, [resolvedParams?.slug]);

  // Find related research papers citing or mentioning this model
  const relatedPapers = useMemo(() => {
    if (!model || !(model as any).papers) return [];
    return (model as any).papers.map((p: any) => p.paper).filter(Boolean).slice(0, 10);
  }, [model]);
  
  const benchmarkArray = useMemo(() => {
    if (!model || !model.benchmarkScore) return [];
    return Object.entries(model.benchmarkScore).map(([key, value]) => {
      return {
        name: key.toUpperCase(),
        score: typeof value === 'number' ? value.toFixed(1) : value,
        value: Number(value) || 0,
        color: "#FF5A1F" // fallback brand color
      };
    });
  }, [model]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="text-center p-10">
          <div className="w-12 h-12 rounded-full bg-[#111111] flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Cpu size={24} className="text-[#FF5A1F]" />
          </div>
          <div className="text-[13px] font-bold text-[#8B8B8B] uppercase tracking-wider animate-pulse">Loading Architecture Profile...</div>
        </div>
      </div>
    );
  }

  if (!model) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-6">
        <div className="bg-white border border-[#F0F0F0] rounded-[12px] p-10 max-w-md w-full text-center shadow-sm">
          <div className="w-16 h-16 bg-[#FFF6F3] text-[#FF5A1F] rounded-full flex items-center justify-center mx-auto mb-5 border border-[#FFEDD5]">
            <Sparkles size={32} />
          </div>
          <h1 className="text-2xl font-extrabold text-[#111111] mb-3 tracking-tight">Model Profile Not Found</h1>
          <p className="text-base text-[#555555] mb-8 leading-relaxed font-medium">
            We couldn&apos;t find an indexed AI foundation model matching <code className="bg-[#F8F7F2] border border-[#EAE9E4] px-2 py-1 rounded text-[#FF5A1F] text-[13px] font-bold mx-1">{resolvedParams.slug}</code>.
          </p>
          <Link
            href="/models"
            className="flex items-center justify-center gap-2 w-full p-3.5 bg-[#111111] hover:bg-[#222222] text-white rounded-[8px] transition-colors font-bold text-sm no-underline shadow-sm"
          >
            <ArrowLeft size={16} />
            <span>Return to Models Directory</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F4F5] pb-32 font-sans text-[#111111] selection:bg-orange-100 selection:text-orange-900">
      
      {/* ── TOP NAV ── */}
      <header className="sticky top-0 z-50 bg-[#F4F4F5]/90 backdrop-blur-md transition-all duration-300">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
          <Link href="/models" className="flex items-center gap-2 text-[#71717A] hover:text-[#111111] transition-colors text-[13px] font-semibold no-underline">
            <ArrowLeft size={16} />
            <span>Directory</span>
          </Link>
          <div className="hidden md:flex items-center gap-2 text-[12px] font-medium text-[#A1A1AA]">
            <Link href="/" className="hover:text-[#111111] transition-colors">Home</Link>
            <span className="text-[#D4D4D8]">/</span>
            <Link href="/models" className="hover:text-[#111111] transition-colors">Models</Link>
            <span className="text-[#D4D4D8]">/</span>
            <span className="text-[#111111] font-bold">{model.name}</span>
          </div>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-6 md:px-8 pt-8 space-y-8">
        
        {/* ── HERO CARD with 4-Column Grid ── */}
        <div className="bg-white rounded-[24px] border border-[#E4E4E7] shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden">
          <div className="p-8 md:p-12 pb-10">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-12">
              <div className="flex-1 max-w-4xl">
                {/* Title */}
                <h1 className="text-5xl md:text-[56px] font-extrabold text-[#18181B] tracking-tight leading-[1.1] mb-6">
                  {model.name}
                </h1>

                {/* Abstract */}
                {model.description && (
                  <p className="text-[18px] md:text-[20px] text-[#52525B] leading-[1.7] font-medium max-w-3xl">
                    {model.description}
                  </p>
                )}
              </div>

              {/* Logo */}
              {model.vendorLogoUrl && !logoError && (
                <div className="shrink-0 w-28 h-28 lg:w-36 lg:h-36 bg-white rounded-[20px] border border-[#E4E4E7] p-5 shadow-sm flex items-center justify-center relative">
                  <img 
                    src={model.vendorLogoUrl} 
                    alt={model.vendor || "Vendor"} 
                    onError={() => setLogoError(true)}
                    className="w-full h-full object-contain" 
                  />
                </div>
              )}
            </div>
          </div>

          {/* 4-COLUMN METADATA GRID (Requested feature) */}
          <div className="grid grid-cols-2 md:grid-cols-4 bg-[#FAFAFA] border-t border-[#F4F4F5] divide-x divide-y md:divide-y-0 divide-[#F4F4F5]">
            
            {/* Grid Item 1: Architecture */}
            {model.parameterCount && (
              <div className="p-6 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-[11px] font-extrabold text-[#A1A1AA] uppercase tracking-widest mb-2">
                  <Cpu size={14} className="text-[#FF5A1F]"/> Architecture Specs
                </div>
                <div className="text-[18px] font-extrabold text-[#18181B]">{model.parameterCount}</div>
              </div>
            )}

            {/* Grid Item 2: Context */}
            {model.contextWindow && (
              <div className="p-6 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-[11px] font-extrabold text-[#A1A1AA] uppercase tracking-widest mb-2">
                  <Box size={14} className="text-[#3B82F6]"/> Context Capacity
                </div>
                <div className="text-[18px] font-extrabold text-[#18181B]">{model.contextWindow}</div>
              </div>
            )}

            {/* Grid Item 3: Specialization/Category */}
            {model.category && (
              <div className="p-6 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-[11px] font-extrabold text-[#A1A1AA] uppercase tracking-widest mb-2">
                  <Activity size={14} className="text-[#10B981]"/> Primary Specialization
                </div>
                <div className="text-[18px] font-extrabold text-[#18181B]">{model.category}</div>
              </div>
            )}

            {/* Grid Item 4: ELO / Citations */}
            {(model as any).elo ? (
              <div className="p-6 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-[11px] font-extrabold text-[#A1A1AA] uppercase tracking-widest mb-2">
                  <Zap size={14} className="text-[#8B5CF6]"/> Global ELO
                </div>
                <div className="text-[18px] font-extrabold text-[#18181B]">{(model as any).elo}</div>
              </div>
            ) : relatedPapers && relatedPapers.length > 0 ? (
              <div className="p-6 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-[11px] font-extrabold text-[#A1A1AA] uppercase tracking-widest mb-2">
                  <BookOpen size={14} className="text-[#8B5CF6]"/> Literature Citations
                </div>
                <div className="text-[18px] font-extrabold text-[#18181B]">{relatedPapers.length} Verified Papers</div>
              </div>
            ) : null}

          </div>
        </div>

        {/* ── 2-COLUMN MAIN CONTENT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-16">
          
          {/* LEFT COLUMN (Benchmarks & Literature) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Benchmarks Card */}
            {benchmarkArray && benchmarkArray.length > 0 && (
              <div className="bg-white rounded-[24px] border border-[#E4E4E7] shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden">
                <div className="p-8 border-b border-[#F4F4F5] flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#FFF7ED] text-[#FF5A1F] flex items-center justify-center shrink-0">
                    <BarChart3 size={24} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-extrabold text-[#18181B] tracking-tight mb-1">Empirical Evaluation Leaderboard</h2>
                    <p className="text-[#71717A] text-[15px]">Official verified evaluations vs baseline human expert threshold</p>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="overflow-x-auto rounded-[16px] border border-[#F4F4F5]">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#FAFAFA] border-b border-[#F4F4F5]">
                          <th className="py-5 px-6 text-[12px] font-extrabold text-[#A1A1AA] uppercase tracking-widest w-[40%]">Benchmark / Dataset</th>
                          <th className="py-5 px-6 text-[12px] font-extrabold text-[#A1A1AA] uppercase tracking-widest w-[20%]">Score</th>
                          <th className="py-5 px-6 text-[12px] font-extrabold text-[#A1A1AA] uppercase tracking-widest">Performance Metric</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F4F4F5]">
                        {benchmarkArray.map((bm, i) => (
                          <tr key={i} className="hover:bg-[#FAFAFA] transition-colors group">
                            <td className="py-5 px-6">
                              <span className="font-extrabold text-[#18181B] text-[15px]">{bm.name}</span>
                            </td>
                            <td className="py-5 px-6">
                              <span className="font-extrabold text-[16px] text-[#18181B] bg-white border border-[#E4E4E7] px-3 py-1 rounded-md shadow-sm">{bm.score}</span>
                            </td>
                            <td className="py-5 px-6">
                              <div className="w-full max-w-[280px] h-2.5 bg-[#F4F4F5] rounded-full overflow-hidden border border-[#E4E4E7]">
                                <div
                                  className="h-full rounded-full bg-[#FF5A1F] transition-all duration-700 ease-out"
                                  style={{ width: `${bm.value}%` }}
                                />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Literature Card */}
            {relatedPapers && relatedPapers.length > 0 && (
              <div className="bg-white rounded-[24px] border border-[#E4E4E7] shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden">
                <div className="p-8 border-b border-[#F4F4F5] flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#F3E8FF] text-[#8B5CF6] flex items-center justify-center shrink-0">
                      <BookOpen size={24} strokeWidth={2.5} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-extrabold text-[#18181B] tracking-tight mb-1">Indexed Academic Citations</h2>
                      <p className="text-[#71717A] text-[15px]">Peer-reviewed literature citing, evaluating, or comparing {model.name}</p>
                    </div>
                  </div>
                </div>

                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedPapers.map((paper: any, i: number) => (
                    <div key={i} className="bg-white rounded-[20px] border border-[#E4E4E7] p-6 hover:shadow-lg hover:border-[#D4D4D8] transition-all duration-300 group cursor-pointer flex flex-col h-full relative" onClick={() => window.open(`/papers/${paper.slug}`, '_self')}>
                      <div className="flex-1">
                        <h3 className="text-[18px] font-serif font-medium text-[#18181B] leading-[1.4] mb-3 group-hover:text-[#8B5CF6] transition-colors line-clamp-3">
                          {paper.title}
                        </h3>
                        <p className="text-[14px] text-[#52525B] leading-[1.6] line-clamp-3 mb-6">
                          {paper.abstract || paper.description}
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-5 border-t border-[#F4F4F5]">
                        <span className="text-[12px] font-bold text-[#A1A1AA] uppercase tracking-wider">{paper.date}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[13px] font-extrabold text-[#18181B] bg-[#FAFAFA] border border-[#F0F0F0] px-2.5 py-1 rounded-md">
                            {paper.citations || paper.citationCount || 0} Citations
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* RIGHT COLUMN (Codesota Style Sidebar) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              
              <div className="bg-white rounded-[24px] border border-[#E4E4E7] shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-8">
                <h3 className="text-[13px] font-extrabold text-[#18181B] uppercase tracking-widest mb-6">Model Information</h3>
                
                <div className="space-y-4">
                  {model.vendor && (
                    <div className="flex flex-col gap-1 py-3 border-b border-[#F4F4F5] last:border-0">
                      <span className="text-[13px] text-[#71717A] flex items-center gap-2">
                        <Activity size={14} className="text-[#A1A1AA]"/> Developer
                      </span>
                      <span className="text-[15px] font-bold text-[#18181B]">{model.vendor}</span>
                    </div>
                  )}
                  {model.category && (
                    <div className="flex flex-col gap-1 py-3 border-b border-[#F4F4F5] last:border-0">
                      <span className="text-[13px] text-[#71717A] flex items-center gap-2">
                        <Layers size={14} className="text-[#A1A1AA]"/> Classification
                      </span>
                      <span className="text-[15px] font-bold text-[#18181B]">{model.category}</span>
                    </div>
                  )}
                  {model.year && (
                    <div className="flex flex-col gap-1 py-3 border-b border-[#F4F4F5] last:border-0">
                      <span className="text-[13px] text-[#71717A] flex items-center gap-2">
                        <Box size={14} className="text-[#A1A1AA]"/> Release Year
                      </span>
                      <span className="text-[15px] font-bold text-[#18181B]">{model.year}</span>
                    </div>
                  )}
                  {(model as any).license && (
                    <div className="flex flex-col gap-1 py-3 border-b border-[#F4F4F5] last:border-0">
                      <span className="text-[13px] text-[#71717A] flex items-center gap-2">
                        <ShieldCheck size={14} className="text-[#A1A1AA]"/> License
                      </span>
                      <span className="text-[15px] font-bold text-[#18181B]">{(model as any).license}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* API Access / Links Card */}
              <div className="bg-white rounded-[24px] border border-[#E4E4E7] shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#FFF7ED] text-[#FF5A1F] flex items-center justify-center">
                    <Terminal size={14} strokeWidth={2.5}/>
                  </div>
                  <h3 className="text-[13px] font-extrabold text-[#18181B] uppercase tracking-widest">API Access</h3>
                </div>
                <p className="text-[14px] text-[#71717A] mb-6 leading-relaxed">
                  Explore the developer endpoints and integrate this model into your applications.
                </p>
                <button className="w-full py-3.5 px-4 bg-white border border-[#E4E4E7] hover:bg-[#F4F4F5] hover:border-[#D4D4D8] text-[#18181B] rounded-[12px] font-bold text-[14px] flex justify-center items-center gap-2 transition-all">
                  View Documentation <ExternalLink size={16} />
                </button>
              </div>

            </div>
          </div>
        </div>

      </main>
    </div>
  );
}