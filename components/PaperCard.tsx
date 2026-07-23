"use client";

import React, { useState, memo, useCallback } from "react";
import {
  ArrowUpRight,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

export const PaperCard = memo(({ paper }: { paper: any }) => {
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
            <div className="flex flex-wrap items-center">
              {visibleAuthors.length > 0 ? (
                visibleAuthors.map((a: any, i: number) => (
                  <span key={a.slug || i}>
                    {i > 0 && <span>, </span>}
                    <span className="hover:text-[#F55036]">
                      {a.name}
                    </span>
                  </span>
                ))
              ) : (
                <span>Unknown Author</span>
              )}
              {remaining > 0 && <span>, +{remaining}</span>}
            </div>
            <span className="text-[#CCCCCC]">·</span>

            <span>{paper.date}</span>

            <span className="text-[#CCCCCC]">·</span>

            <span>{paper.citations || 0} citations</span>
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
          <div className="grid grid-cols-4 md:grid md:grid-cols-4 gap-1 sm:gap-2 md:gap-3 mt-1.5">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open((paper as any).arxivUrl || "https://arxiv.org", "_blank");
              }}
              className="flex-none md:flex-1 flex items-center justify-center lg:justify-between xl:justify-center px-0.5 min-[375px]:px-1 md:px-2 lg:px-4 xl:px-2 h-[24px] md:h-[28px] lg:h-[48px] xl:h-[28px] bg-white text-[#b31b1b] border-[1.5px] border-[#b31b1b]/40 hover:border-[#b31b1b] hover:bg-[#b31b1b]/5 rounded-[6px] transition-all duration-300"
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

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open((paper as any).pdfUrl || "https://arxiv.org/pdf", "_blank");
              }}
              className="flex-none md:flex-1 flex items-center justify-center lg:justify-between xl:justify-center px-0.5 min-[375px]:px-1 md:px-2 lg:px-4 xl:px-2 h-[24px] md:h-[28px] lg:h-[48px] xl:h-[28px] bg-white text-[#E54D59] border-[1.5px] border-[#E54D59]/40 hover:border-[#E54D59] hover:bg-[#E54D59]/5 rounded-[6px] transition-all duration-300"
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

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(githubRepo?.url || "https://github.com", "_blank");
              }}
              className="flex-none md:flex-1 flex items-center justify-center lg:justify-between xl:justify-center px-0.5 min-[375px]:px-1 md:px-2 lg:px-4 xl:px-2 h-[24px] md:h-[28px] lg:h-[48px] xl:h-[28px] bg-white text-[#24292f] border-[1.5px] border-[#24292f]/30 hover:border-[#24292f] hover:bg-[#24292f]/5 rounded-[6px] transition-all duration-300"
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

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(huggingFaceRepo?.url || "https://huggingface.co", "_blank");
              }}
              className="flex-none md:flex-1 flex items-center justify-center lg:justify-between xl:justify-center px-0.5 min-[375px]:px-1 md:px-2 lg:px-4 xl:px-2 h-[24px] md:h-[28px] lg:h-[48px] xl:h-[28px] bg-white text-[#FF9D00] border-[1.5px] border-[#FF9D00]/30 hover:border-[#FF9D00] hover:bg-[#FF9D00]/5 rounded-[6px] transition-all duration-300"
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
          </div>
        </div>
      </div>
    </Link >
  );
});
PaperCard.displayName = "PaperCard";
export default PaperCard;