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

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric", day: "numeric" });
}

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
    if (!model || !Array.isArray((model as any).papers)) return [];
    return (model as any).papers.map((p: any) => p.paper).filter(Boolean).slice(0, 10);
  }, [model]);
  
  const benchmarkArray = useMemo(() => {
    if (!model) return [];
    if ((model as any).benchmarks && Array.isArray((model as any).benchmarks)) {
      return (model as any).benchmarks.map((b: any) => ({
        name: b.name.toUpperCase(),
        score: `Rank #${b.rank}`,
        value: Math.max(0, 100 - (b.rank * 2)),
        color: "#111111"
      }));
    }
    if (model.benchmarkScore) {
      return Object.entries(model.benchmarkScore).map(([key, value]) => ({
        name: key.toUpperCase(),
        score: typeof value === 'number' ? value.toFixed(1) : value,
        value: Number(value) || 0,
        color: "#111111"
      }));
    }
    return [];
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
    <div className="min-h-screen bg-[#FAFAFA] pb-32 font-sans text-[#111111] selection:bg-[#EAEAEA]">
      
      {/* ── TOP NAV (Clean & Refined) ── */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/60 transition-all duration-300">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 h-14 flex items-center justify-between">
          <nav className="flex items-center gap-2 text-[13px] font-medium text-gray-500">
            <Link href="/" className="hover:text-black transition-colors">Frontier</Link>
            <span className="text-gray-300">/</span>
            <Link href="/models" className="hover:text-black transition-colors">Models</Link>
            <span className="text-gray-300">/</span>
            <span className="text-black font-semibold">{model.name}</span>
          </nav>
          
          <Link href="/models" className="flex items-center gap-1.5 text-[13px] font-medium text-gray-500 hover:text-black transition-colors">
            <ArrowLeft size={14} /> Back to Directory
          </Link>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-6 md:px-8 pt-12 md:pt-16 pb-24 relative">
        
        {/* Premium Background Grid MASK */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10 h-[600px] pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16 lg:gap-24">
          
          {/* ── LEFT COLUMN: MAIN CONTENT ── */}
          <div className="space-y-16 lg:space-y-20">
            
            {/* HERO SECTION */}
            <section className="relative">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                {model.vendorLogoUrl && !logoError && (
                  <div className="w-6 h-6 flex items-center justify-center shrink-0">
                    <img 
                      src={model.vendorLogoUrl} 
                      alt={model.vendor || "Vendor"} 
                      onError={() => setLogoError(true)}
                      className="w-full h-full object-contain grayscale opacity-80" 
                    />
                  </div>
                )}
                {model.vendor && (
                  <span className="text-[14px] font-medium text-gray-600">{model.vendor}</span>
                )}
                
                {/* Modality / Category */}
                {((model as any).modality || model.category) && (
                  <>
                    <span className="text-gray-300">•</span>
                    <span className="text-[12px] font-semibold text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">
                      {(model as any).modality || model.category}
                    </span>
                  </>
                )}

                {/* Model Family */}
                {(model as any).modelFamily && (
                  <>
                    <span className="text-gray-300">•</span>
                    <span className="text-[12px] font-semibold text-purple-700 bg-purple-50 border border-purple-100 px-2 py-0.5 rounded-full">
                      {(model as any).modelFamily}
                    </span>
                  </>
                )}
                
                {/* Access Type */}
                {(model as any).accessType && (
                  <>
                    <span className="text-gray-300">•</span>
                    <span className="text-[12px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
                      {(model as any).accessType}
                    </span>
                  </>
                )}
              </div>

              <h1 className="text-4xl md:text-[52px] font-semibold tracking-tighter text-black leading-[1.1] mb-6">
                {model.name}
              </h1>

              {model.description ? (
                <p className="text-[16px] md:text-[18px] text-gray-600 leading-relaxed max-w-[42rem]">
                  {model.description}
                </p>
              ) : (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-50/50 border border-orange-100/50 text-orange-700 text-[13px] font-medium">
                  <Activity size={14} className="animate-pulse" /> Profile data is currently being compiled
                </div>
              )}

              {/* TAGS ROW: Tasks, Methods, Capabilities, Research Areas */}
              <div className="mt-8 flex flex-wrap gap-2 max-w-[42rem]">
                {Array.isArray((model as any).capabilities) && ((model as any).capabilities).map((cap: string, i: number) => (
                  <span key={`cap-${i}`} className="inline-flex items-center px-3 py-1.5 rounded-lg bg-white border border-gray-200 shadow-[0_1px_2px_rgba(0,0,0,0.02)] text-[12px] font-medium text-gray-700 hover:border-gray-300 transition-colors">
                    {cap}
                  </span>
                ))}
                {Array.isArray((model as any).researchAreas) && ((model as any).researchAreas).map((area: string, i: number) => (
                  <span key={`area-${i}`} className="inline-flex items-center px-3 py-1.5 rounded-lg bg-white border border-gray-200 shadow-[0_1px_2px_rgba(0,0,0,0.02)] text-[12px] font-medium text-gray-700 hover:border-gray-300 transition-colors">
                    <Sparkles size={12} className="mr-1.5 text-orange-400" />
                    {area}
                  </span>
                ))}
                {Array.isArray((model as any).tasks) && ((model as any).tasks).slice(0, 4).map((task: any, i: number) => (
                  <span key={`task-${i}`} className="inline-flex items-center px-3 py-1.5 rounded-lg bg-white border border-gray-200 shadow-[0_1px_2px_rgba(0,0,0,0.02)] text-[12px] font-medium text-gray-700 hover:border-gray-300 transition-colors cursor-default" title={task.name}>
                    <div className="w-1.5 h-1.5 rounded-full mr-2" style={{ backgroundColor: task.color || '#3B82F6' }} />
                    {task.name}
                  </span>
                ))}
                {Array.isArray((model as any).methods) && ((model as any).methods).slice(0, 4).map((method: any, i: number) => (
                  <span key={`method-${i}`} className="inline-flex items-center px-3 py-1.5 rounded-lg bg-white border border-gray-200 shadow-[0_1px_2px_rgba(0,0,0,0.02)] text-[12px] font-medium text-gray-700 hover:border-gray-300 transition-colors cursor-default" title={method.category}>
                    <Sliders size={12} className="mr-1.5 text-blue-400" />
                    {method.name}
                  </span>
                ))}
              </div>
            </section>

            {/* DATASETS */}
            {Array.isArray((model as any).datasets) && ((model as any).datasets).length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-6">
                  <Layers size={18} className="text-gray-400" />
                  <h2 className="text-[18px] font-semibold tracking-tight text-black">Training Datasets</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {((model as any).datasets).map((ds: any, i: number) => (
                    <div key={`ds-${i}`} className="inline-flex items-center px-3 py-2 rounded-lg bg-white border border-gray-200/60 shadow-[0_1px_2px_rgba(0,0,0,0.02)] text-[13px] font-medium text-gray-700 hover:border-gray-300 transition-colors cursor-pointer group" onClick={() => window.open(`/datasets/${ds.slug}`, '_self')}>
                      <Box size={14} className="mr-2 text-gray-400 group-hover:text-black transition-colors" />
                      {ds.name}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* BENCHMARKS (Linear-style Table or Empty State) */}
            <section>
              <div className="flex items-center gap-2 mb-6">
                <BarChart3 size={18} className="text-gray-400" />
                <h2 className="text-[18px] font-semibold tracking-tight text-black">Performance Benchmarks</h2>
              </div>
              
              {benchmarkArray && benchmarkArray.length > 0 ? (
                <div className="border border-gray-200/60 rounded-xl overflow-hidden bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                  <table className="w-full text-left border-collapse text-[14px]">
                    <thead>
                      <tr className="bg-gray-50/50 border-b border-gray-200/60">
                        <th className="py-3 px-5 font-medium text-gray-500 w-[50%]">Dataset</th>
                        <th className="py-3 px-5 font-medium text-gray-500 w-[20%] text-right">Score</th>
                        <th className="py-3 px-5 font-medium text-gray-500 w-[30%]">Metric Level</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {benchmarkArray.map((bm, i) => (
                        <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                          <td className="py-3 px-5 font-medium text-gray-900">{bm.name}</td>
                          <td className="py-3 px-5 text-right font-mono text-[13px] text-gray-700">{bm.score}</td>
                          <td className="py-3 px-5">
                            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-black rounded-full transition-all duration-700 ease-out"
                                style={{ width: `${bm.value}%` }}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="border border-gray-200/60 rounded-xl overflow-hidden bg-white/50 border-dashed p-10 flex flex-col items-center justify-center text-center">
                  <div className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center mb-4">
                    <BarChart3 size={16} className="text-gray-400" />
                  </div>
                  <h3 className="text-[14px] font-semibold text-gray-900 mb-1">Evaluations Pending</h3>
                  <p className="text-[13px] text-gray-500 max-w-sm">Benchmark data and empirical evaluations are currently being verified for {model.name}.</p>
                </div>
              )}
            </section>

            {/* LITERATURE */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <BookOpen size={18} className="text-gray-400" />
                  <h2 className="text-[18px] font-semibold tracking-tight text-black">Academic Citations</h2>
                </div>
                {relatedPapers && relatedPapers.length > 0 && (
                  <span className="text-[13px] font-medium text-gray-500">{relatedPapers.length} Papers</span>
                )}
              </div>

              {relatedPapers && relatedPapers.length > 0 ? (
                <div className="grid gap-4">
                  {relatedPapers.map((paper: any, i: number) => (
                    <div 
                      key={i} 
                      className="group bg-white border border-gray-200/60 rounded-xl p-5 hover:border-gray-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.03)] transition-all cursor-pointer flex flex-col md:flex-row gap-5"
                      onClick={() => window.open(`/papers/${paper.slug}`, '_self')}
                    >
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[16px] font-medium text-black leading-snug mb-2 group-hover:text-blue-600 transition-colors truncate">
                          {paper.title}
                        </h3>
                        <p className="text-[14px] text-gray-500 leading-relaxed line-clamp-2 mb-3">
                          {paper.abstract || paper.description}
                        </p>
                        <div className="flex items-center gap-3 text-[13px] text-gray-400 font-medium">
                          <span>{paper.date}</span>
                          <span className="w-1 h-1 rounded-full bg-gray-300" />
                          <span className="flex items-center gap-1"><Activity size={12}/> {paper.citations || paper.citationCount || 0} Citations</span>
                        </div>
                      </div>
                      
                      {/* Action Button */}
                      <div className="hidden md:flex items-center justify-center border border-gray-200 rounded-lg px-3 py-1.5 self-center text-[13px] font-medium text-gray-600 group-hover:bg-gray-50 transition-colors">
                        View Paper <ArrowUpRight size={14} className="ml-1" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border border-gray-200/60 rounded-xl overflow-hidden bg-white/50 border-dashed p-10 flex flex-col items-center justify-center text-center">
                  <div className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center mb-4">
                    <BookOpen size={16} className="text-gray-400" />
                  </div>
                  <h3 className="text-[14px] font-semibold text-gray-900 mb-1">No Indexed Literature</h3>
                  <p className="text-[13px] text-gray-500 max-w-sm">We haven't indexed any peer-reviewed papers or technical reports specifically citing {model.name} yet.</p>
                </div>
              )}
            </section>

          </div>

          {/* ── RIGHT COLUMN: SIDEBAR ── */}
          <aside className="lg:border-l lg:border-gray-200/60 lg:pl-12">
            <div className="sticky top-24 space-y-12">
              
              {/* Specs List */}
              <div>
                <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-5">Specifications</h3>
                <dl className="space-y-3.5 text-[14px]">
                  {model.parameterCount && (
                    <div className="flex justify-between items-center pb-3.5 border-b border-gray-100">
                      <dt className="text-gray-500 flex items-center gap-2"><Cpu size={14}/> Parameters</dt>
                      <dd className="font-semibold text-black">{model.parameterCount}</dd>
                    </div>
                  )}
                  {model.contextWindow && (
                    <div className="flex justify-between items-center pb-3.5 border-b border-gray-100">
                      <dt className="text-gray-500 flex items-center gap-2"><Box size={14}/> Context</dt>
                      <dd className="font-semibold text-black">{model.contextWindow}</dd>
                    </div>
                  )}
                  {(model as any).architecture && (
                    <div className="flex flex-col gap-1.5 pb-3.5 border-b border-gray-100">
                      <dt className="text-gray-500 flex items-center gap-2"><Brain size={14}/> Architecture</dt>
                      <dd className="font-semibold text-black leading-snug">{(model as any).architecture}</dd>
                    </div>
                  )}
                  {model.vendor && (
                    <div className="flex justify-between items-center pb-3.5 border-b border-gray-100">
                      <dt className="text-gray-500 flex items-center gap-2"><Activity size={14}/> Developer</dt>
                      <dd className="font-semibold text-black">{model.vendor}</dd>
                    </div>
                  )}
                  {((model as any).releaseDate || model.year) && (
                    <div className="flex justify-between items-center pb-3.5 border-b border-gray-100">
                      <dt className="text-gray-500 flex items-center gap-2"><Layers size={14}/> Released</dt>
                      <dd className="font-semibold text-black">{formatDate((model as any).releaseDate) || model.year}</dd>
                    </div>
                  )}
                  {(model as any).license && (
                    <div className="flex justify-between items-center pb-3.5 border-b border-gray-100">
                      <dt className="text-gray-500 flex items-center gap-2"><ShieldCheck size={14}/> License</dt>
                      <dd className="font-semibold text-black text-right max-w-[150px] truncate" title={(model as any).license}>{(model as any).license}</dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* Developer Links */}
              <div>
                <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-4">Resources</h3>
                <div className="space-y-2">
                  {(model as any).apiUrl && (
                    <button onClick={() => window.open((model as any).apiUrl, '_blank')} className="w-full text-left px-4 py-2.5 rounded-lg border border-gray-200/60 hover:border-gray-300 hover:shadow-[0_2px_4px_rgba(0,0,0,0.02)] bg-white text-[14px] font-medium text-black flex items-center justify-between group transition-all">
                      <span className="flex items-center gap-2"><Terminal size={14} className="text-gray-400"/> API / Weights</span>
                      <ArrowUpRight size={14} className="text-gray-400 group-hover:text-black transition-colors"/>
                    </button>
                  )}
                  {(model as any).repositoryUrl && (
                    <button onClick={() => window.open((model as any).repositoryUrl, '_blank')} className="w-full text-left px-4 py-2.5 rounded-lg border border-gray-200/60 hover:border-gray-300 hover:shadow-[0_2px_4px_rgba(0,0,0,0.02)] bg-white text-[14px] font-medium text-black flex items-center justify-between group transition-all">
                      <span className="flex items-center gap-2"><svg className="w-[14px] h-[14px] text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/></svg> Repository</span>
                      <ArrowUpRight size={14} className="text-gray-400 group-hover:text-black transition-colors"/>
                    </button>
                  )}
                  {(model as any).paperUrl && (
                    <button onClick={() => window.open((model as any).paperUrl, '_blank')} className="w-full text-left px-4 py-2.5 rounded-lg border border-gray-200/60 hover:border-gray-300 hover:shadow-[0_2px_4px_rgba(0,0,0,0.02)] bg-white text-[14px] font-medium text-black flex items-center justify-between group transition-all">
                      <span className="flex items-center gap-2"><BookOpen size={14} className="text-gray-400"/> Research Paper</span>
                      <ArrowUpRight size={14} className="text-gray-400 group-hover:text-black transition-colors"/>
                    </button>
                  )}
                  {(!((model as any).apiUrl) && !((model as any).repositoryUrl) && !((model as any).paperUrl)) && (
                     <div className="text-[13px] text-gray-500 p-4 bg-gray-50 rounded-lg border border-gray-100 text-center">
                       No external resources linked
                     </div>
                  )}
                </div>
              </div>

              {/* Related Models */}
              {Array.isArray((model as any).relatedModels) && ((model as any).relatedModels).length > 0 && (
                <div className="pt-8 border-t border-gray-200/60">
                  <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-4">Related Models</h3>
                  <div className="flex flex-col gap-2">
                    {((model as any).relatedModels).slice(0, 5).map((rm: any) => (
                       <Link key={rm.id} href={`/models/${rm.slug}`} className="flex items-center justify-between p-3 rounded-lg hover:bg-white hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-transparent hover:border-gray-200/60 transition-all group">
                         <span className="text-[14px] font-medium text-gray-900">{rm.name}</span>
                         <div className="flex items-center text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ArrowUpRight size={14} />
                         </div>
                       </Link>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </aside>

        </div>
      </main>
    </div>
  );
}