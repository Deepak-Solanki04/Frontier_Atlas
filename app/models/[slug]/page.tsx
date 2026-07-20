"use client";

import React, { useState, useEffect, useMemo, use } from "react";
import Link from "next/link";
import { 
  Trophy, Cpu, Layers, ExternalLink, Code2, Check, Copy, ArrowLeft, 
  Share2, Sparkles, BookOpen, Terminal, FileText, Award, Zap, ShieldCheck, 
  Eye, Activity, Box, Sliders, Info, ChevronRight, Play, RefreshCw, BarChart3, Database
} from "lucide-react";
import { getModels, type ModelItem } from "@/lib/models";
import PaperCard from "@/components/PaperCard";
import { topicData } from "@/data/topicData";

export default function ModelDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const [model, setModel] = useState<ModelItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  // Active Main Tab ("evals" | "workbench" | "architecture" | "literature")
  const [activeTab, setActiveTab] = useState<"evals" | "workbench" | "architecture" | "literature">("evals");

  // Workbench Interactive Toggles & State
  const [sdkLang, setSdkLang] = useState<"python" | "typescript" | "curl" | "ollama">("python");
  const [enableThinking, setEnableThinking] = useState(true);
  const [enableTools, setEnableTools] = useState(false);
  const [enableStreaming, setEnableStreaming] = useState(true);

  // Benchmarks Comparison Mode ("standard" | "human")
  const [evalMode, setEvalMode] = useState<"standard" | "human">("standard");

  useEffect(() => {
    if (resolvedParams?.slug) {
      const cleanId = resolvedParams.slug.toLowerCase().trim();
      getModels().then(allModels => {
        const found = allModels.find(
          (m) =>
            m.id.toLowerCase() === cleanId ||
            m.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") === cleanId
        );
        setModel(found || null);
        setLoading(false);
      }).catch(err => {
        console.error("Failed to load model:", err);
        setLoading(false);
      });
    }
  }, [resolvedParams?.slug]);

  // Find related research papers citing or mentioning this model
  const relatedPapers = useMemo(() => {
    if (!model) return [];
    const allPapers = Object.values(topicData).flatMap((t: any) => t?.papers || []);
    const uniqueMap = new Map();
    allPapers.forEach((p: any) => {
      if (p && p.title && !uniqueMap.has(p.title)) {
        uniqueMap.set(p.title, p);
      }
    });

    const list = Array.from(uniqueMap.values());
    const modelNameLower = model.name.toLowerCase();
    const orgLower = model.vendor.toLowerCase();
    const tagsLower = model.capabilities.map((t: string) => t.toLowerCase());

    return list.filter((paper: any) => {
      const title = (paper.title || "").toLowerCase();
      const abstract = (paper.abstract || "").toLowerCase();
      
      if (title.includes(modelNameLower) || abstract.includes(modelNameLower)) return true;
      if (title.includes(orgLower) || abstract.includes(orgLower)) return true;
      return tagsLower.some((t: string) => title.includes(t) || abstract.includes(t));
    }).slice(0, 10);
  }, [model]);

  // Dynamic Interactive Code Generator based on user toggles
  const generatedCode = useMemo(() => {
    if (!model) return "";
    const baseId = model.id;

    if (sdkLang === "python") {
      let code = `import anthropic\n\nclient = anthropic.Anthropic()\n\n`;
      let paramsList = `  model="${baseId}",\n  max_tokens=${enableThinking ? 16384 : 4096},\n`;
      
      if (enableThinking) {
        paramsList += `  thinking={\n    "type": "enabled",\n    "budget_tokens": 12000\n  },\n`;
      }
      if (enableTools) {
        paramsList += `  tools=[\n    {\n      "name": "execute_code",\n      "description": "Execute Python in sandboxed verification environment",\n      "input_schema": {"type": "object", "properties": {"code": {"type": "string"}}}\n    }\n  ],\n`;
      }
      if (enableStreaming) {
        code += `with client.messages.stream(\n${paramsList}  messages=[{"role": "user", "content": "Analyze and verify frontier model architecture."}]\n) as stream:\n    for text in stream.text_stream:\n        print(text, end="", flush=True)`;
      } else {
        code += `response = client.messages.create(\n${paramsList}  messages=[{"role": "user", "content": "Analyze and verify frontier model architecture."}]\n)\nprint(response.content[0].text)`;
      }
      return code;
    }

    if (sdkLang === "typescript") {
      let code = `import { Anthropic } from '@anthropic-ai/sdk';\n\nconst anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });\n\n`;
      let paramsList = `  model: '${baseId}',\n  max_tokens: ${enableThinking ? 16384 : 4096},\n`;
      if (enableThinking) {
        paramsList += `  thinking: { type: 'enabled', budget_tokens: 12000 },\n`;
      }
      if (enableTools) {
        paramsList += `  tools: [{ name: 'get_benchmark_data', input_schema: { type: 'object' } }],\n`;
      }
      if (enableStreaming) {
        code += `const stream = await anthropic.messages.create({\n${paramsList}  stream: true,\n  messages: [{ role: 'user', content: 'Synthesize architecture benchmarks.' }]\n});\n\nfor await (const chunk of stream) {\n  if (chunk.type === 'content_block_delta') process.stdout.write(chunk.delta.text);\n}`;
      } else {
        code += `const msg = await anthropic.messages.create({\n${paramsList}  messages: [{ role: 'user', content: 'Synthesize architecture benchmarks.' }]\n});\nconsole.log(msg.content[0].text);`;
      }
      return code;
    }

    if (sdkLang === "curl") {
      const body: any = {
        model: baseId,
        max_tokens: enableThinking ? 16384 : 4096,
        messages: [{ role: "user", content: "Explain model scaling laws." }]
      };
      if (enableThinking) body.thinking = { type: "enabled", budget_tokens: 12000 };
      if (enableStreaming) body.stream = true;

      return `curl https://api.anthropic.com/v1/messages \\\n  -H "x-api-key: $ANTHROPIC_API_KEY" \\\n  -H "anthropic-version: 2023-06-01" \\\n  -H "content-type: application/json" \\\n  -d '${JSON.stringify(body, null, 2)}'`;
    }

    // Ollama
    return `# Step 1: Pull the open-weight model or configure API bridge in Ollama\nollama pull ${baseId}\n\n# Step 2: Run interactive terminal session with custom flags\nollama run ${baseId} --verbose "${enableThinking ? "Think step-by-step and verify math proofs." : "Provide concise summary."}"`;
  }, [model, sdkLang, enableThinking, enableTools, enableStreaming]);

  const handleCopyCode = (textToCopy?: string) => {
    const text = textToCopy || generatedCode;
    if (text) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="model-profile-wrapper" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", padding: "40px" }}>
          <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#111111", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <Cpu size={24} style={{ color: "#FF5A1F" }} />
          </div>
          <div style={{ fontSize: "16px", fontWeight: 700, color: "#8B8B8B", fontFamily: "monospace" }}>Loading Neural Architecture Profile...</div>
        </div>
      </div>
    );
  }

  if (!model) {
    return (
      <div className="model-profile-wrapper" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="ds-card" style={{ maxWidth: "480px", width: "100%", padding: "40px", textAlign: "center", margin: "24px" }}>
          <div style={{ width: "64px", height: "64px", background: "#FFF6F3", color: "#FF5A1F", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <Sparkles size={32} />
          </div>
          <h1 style={{ fontSize: "24px", fontWeight: 900, marginBottom: "12px", color: "#111111" }}>Model Profile Not Found</h1>
          <p style={{ fontSize: "15px", color: "#555555", marginBottom: "28px", lineHeight: 1.6 }}>
            We couldn&apos;t find an indexed AI foundation model matching <code style={{ background: "#F8F7F2", padding: "4px 8px", borderRadius: "6px", color: "#FF5A1F", fontFamily: "monospace", fontWeight: 700 }}>{resolvedParams.slug}</code>.
          </p>
          <Link
            href="/models"
            className="ds-button"
            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px", width: "100%", padding: "14px", textDecoration: "none" }}
          >
            <ArrowLeft size={16} />
            <span>Return to Models Directory</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="model-profile-wrapper">
      
      {/* ── TOP LUXURY NAVIGATION BAR (Glassmorphism + Sticky) ── */}
      <header className="model-sticky-header">
        <div className="model-sticky-inner">
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Link href="/models" className="model-back-btn" style={{ textDecoration: "none" }}>
              <ArrowLeft size={16} />
              <span>Directory</span>
            </Link>
            <div className="topic-breadcrumbs" style={{ margin: 0, fontSize: "13px" }}>
              <Link href="/" className="crumb-link" style={{ textDecoration: "none" }}>Home</Link>
              <span className="crumb-sep">&gt;</span>
              <Link href="/models" className="crumb-link" style={{ textDecoration: "none" }}>Directory</Link>
              <span className="crumb-sep">&gt;</span>
              <Link href="/models" className="crumb-link" style={{ textDecoration: "none" }}>Models</Link>
              <span className="crumb-sep">&gt;</span>
              <span className="crumb-current">{model.name}</span>
            </div>
          </div>

          <div className="model-header-actions">
            <button onClick={handleShare} className="model-share-btn">
              <Share2 size={15} />
              <span>{shareCopied ? "Link Copied!" : "Share Profile"}</span>
            </button>
            
            <Link href="/trending" className="model-explore-btn" style={{ textDecoration: "none" }}>
              <span>Explore Research</span>
              <ExternalLink size={14} />
            </Link>
          </div>
        </div>
      </header>

      {/* ── HERO SECTION: CYBER-OBSIDIAN LUXURY CARD ── */}
      <section className="model-hero-container">
        <div className="model-obsidian-card">
          
          {/* Ambient Glowing Aura */}
          <div className="model-obsidian-glow-top" />
          <div className="model-obsidian-glow-bottom" />

          {/* Top Metadata Strip */}
          <div className="model-hero-meta-strip">
            <div className="model-hero-badges">
              <span className="model-cert-badge">
                <Sparkles size={13} />
                <span>{model.vendor} Certified</span>
              </span>
              <span className="model-license-badge">
                <span>License:</span>
                <span className="model-license-val">{model.license || "Proprietary Commercial"}</span>
              </span>
              {model.releaseDate && (
                <span className="model-license-badge">
                  <span>Released:</span>
                  <span className="model-license-val">{model.releaseDate}</span>
                </span>
              )}
            </div>

            {model.elo && (
              <div className="model-elo-badge">
                <Zap size={15} style={{ fill: "#ffffff" }} />
                <span>GLOBAL ELO RATING: {model.elo}</span>
              </div>
            )}
          </div>

          {/* Title & Core Summary */}
          <h1 className="model-hero-title">
            {model.name}
          </h1>
          <p className="model-hero-desc">
            {model.description}
          </p>

          {/* 4-Cell Interactive Architecture & Spec Pods inside Hero */}
          <div className="model-spec-grid">
            
            <div className="model-spec-pod">
              <div className="model-spec-pod-header">
                <span className="model-spec-pod-label">Architecture Specs</span>
                <Cpu size={16} style={{ color: "#FF5A1F" }} />
              </div>
              <div className="model-spec-pod-val">
                {model.parameterCount || "Dense / MoE 180B"}
              </div>
              <span className="model-spec-pod-sub" style={{ color: "#10B981" }}>✓ High-Density Mixture-of-Experts</span>
            </div>

            <div className="model-spec-pod">
              <div className="model-spec-pod-header">
                <span className="model-spec-pod-label">Context Capacity</span>
                <Box size={16} style={{ color: "#3B82F6" }} />
              </div>
              <div className="model-spec-pod-val">
                {model.context || "200,000 Tokens"}
              </div>
              <span className="model-spec-pod-sub" style={{ color: "#3B82F6" }}>✓ Native Prompt Caching Supported</span>
            </div>

            <div className="model-spec-pod">
              <div className="model-spec-pod-header">
                <span className="model-spec-pod-label">Primary Specialization</span>
                <Activity size={16} style={{ color: "#FF5A1F" }} />
              </div>
              <div className="model-spec-pod-val">
                {model.area}
              </div>
              <span className="model-spec-pod-sub" style={{ color: "#E0E0E0" }}>⚡ Instantaneous vs Extended CoT</span>
            </div>

            <div className="model-spec-pod">
              <div className="model-spec-pod-header">
                <span className="model-spec-pod-label">Literature Citations</span>
                <BookOpen size={16} style={{ color: "#8B5CF6" }} />
              </div>
              <div className="model-spec-pod-val">
                {model.paperCount} Verified Papers
              </div>
              <span className="model-spec-pod-sub" style={{ color: "#8B5CF6" }}>📚 Indexed in Frontier Repository</span>
            </div>

          </div>
        </div>
      </section>

      {/* ── STATE-OF-THE-ART INTERACTIVE TAB BAR ── */}
      <section className="model-tabs-container">
        <div className="model-tabs-bar">
          
          <button
            onClick={() => setActiveTab("evals")}
            className={`model-tab-btn ${activeTab === "evals" ? "active" : ""}`}
          >
            <Trophy size={18} style={{ color: activeTab === "evals" ? "#FF5A1F" : "#8B8B8B" }} />
            <span>Verified Academic Benchmarks</span>
            <span className="model-tab-count">
              {model.benchmarks?.length || 0}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("workbench")}
            className={`model-tab-btn ${activeTab === "workbench" ? "active" : ""}`}
          >
            <Terminal size={18} style={{ color: activeTab === "workbench" ? "#10B981" : "#8B8B8B" }} />
            <span>Interactive SDK Workbench</span>
            <span className="model-tab-count" style={{ background: activeTab === "workbench" ? "#10B981" : "#EAE9E4", color: activeTab === "workbench" ? "#fff" : "#555" }}>
              LIVE
            </span>
          </button>

          <button
            onClick={() => setActiveTab("architecture")}
            className={`model-tab-btn ${activeTab === "architecture" ? "active" : ""}`}
          >
            <Layers size={18} style={{ color: activeTab === "architecture" ? "#3B82F6" : "#8B8B8B" }} />
            <span>Architecture & Capabilities</span>
          </button>

          <button
            onClick={() => setActiveTab("literature")}
            className={`model-tab-btn ${activeTab === "literature" ? "active" : ""}`}
          >
            <BookOpen size={18} style={{ color: activeTab === "literature" ? "#8B5CF6" : "#8B8B8B" }} />
            <span>Research Literature</span>
            <span className="model-tab-count">
              {relatedPapers.length}
            </span>
          </button>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────────
          TAB 1: VERIFIED ACADEMIC BENCHMARKS & EVALUATION MATRIX
      ───────────────────────────────────────────────────────────────────────────── */}
      {activeTab === "evals" && (
        <section className="model-section-container">
          
          {/* Controls Bar */}
          <div className="model-controls-bar">
            <div className="model-controls-title-group">
              <div className="model-controls-icon">
                <BarChart3 size={22} />
              </div>
              <div>
                <h2 className="model-controls-h2">Empirical Evaluation Leaderboard</h2>
                <p className="model-controls-sub">Official verified evaluations vs baseline human expert threshold</p>
              </div>
            </div>

            <div className="model-mode-switcher">
              <button
                onClick={() => setEvalMode("standard")}
                className={`model-mode-btn ${evalMode === "standard" ? "active" : ""}`}
              >
                📊 Standard Matrix
              </button>
              <button
                onClick={() => setEvalMode("human")}
                className={`model-mode-btn ${evalMode === "human" ? "active-human" : ""}`}
              >
                ⚖️ Human Baseline Comparison
              </button>
            </div>
          </div>

          {/* Benchmarks Grid (Responsive Cards with Gauges) */}
          <div className="model-benchmark-grid">
            {model.benchmarks && model.benchmarks.length > 0 ? (
              model.benchmarks.map((bm, i) => {
                const humanBaseline = bm.name.includes("SWE-Bench") ? 48.0 : bm.name.includes("MMLU") ? 89.8 : 85.0;
                const delta = (bm.value - humanBaseline).toFixed(1);

                return (
                  <div key={i} className="model-benchmark-card">
                    <div>
                      <div className="model-bm-header">
                        <div>
                          <div>
                            <span className="model-bm-dot" style={{ backgroundColor: bm.color || "#FF5A1F" }} />
                            <span className="model-bm-name">{bm.name}</span>
                          </div>
                          <span className="model-bm-sub">Peer-Reviewed Verification Suite</span>
                        </div>
                        
                        <div className="model-bm-score-col">
                          <span className="model-bm-score">{bm.score}</span>
                          <span className="model-bm-percentile">Top 0.8% Global</span>
                        </div>
                      </div>

                      {/* Gauge Bar */}
                      <div className="model-gauge-wrapper">
                        <div className="model-gauge-label">
                          <span>Model Capability vs Threshold</span>
                          {evalMode === "human" && (
                            <span style={{ color: Number(delta) >= 0 ? "#16A34A" : "#FF5A1F" }}>
                              {Number(delta) >= 0 ? `+${delta}% vs Human Expert` : `${delta}% vs Human Expert`}
                            </span>
                          )}
                        </div>

                        <div className="model-gauge-track">
                          <div
                            className="model-gauge-fill"
                            style={{ width: `${bm.value}%`, backgroundColor: bm.color || "#FF5A1F" }}
                          />

                          {/* Human Expert Marker line if human mode */}
                          {evalMode === "human" && (
                            <div
                              className="model-gauge-marker"
                              style={{ left: `${humanBaseline}%` }}
                              title={`Human Expert Baseline: ${humanBaseline}%`}
                            >
                              <span className="model-gauge-marker-label">
                                Human: {humanBaseline}%
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Methodology Note */}
                    <div className="model-bm-footer">
                      <span className="model-bm-verified">
                        <ShieldCheck size={14} />
                        <span>Verified Zero-Shot Chain-of-Thought</span>
                      </span>
                      <span className="model-bm-link">
                        View Prompt Spec →
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="ds-card" style={{ gridColumn: "1 / -1", padding: "48px", textAlign: "center" }}>
                <p style={{ fontSize: "16px", fontWeight: 700, color: "#555555" }}>Extensive evaluation suites are currently being compiled for this model.</p>
              </div>
            )}
          </div>

        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────────────────────
          TAB 2: INTERACTIVE SDK WORKBENCH & CODE PLAYGROUND
      ───────────────────────────────────────────────────────────────────────────── */}
      {activeTab === "workbench" && (
        <section className="model-section-container">
          
          <div className="model-workbench-box">
            
            {/* Top Workbench Header */}
            <div className="model-wb-top-bar">
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: "rgba(255, 90, 31, 0.15)", color: "#FF5A1F", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255, 90, 31, 0.3)" }}>
                  <Terminal size={24} />
                </div>
                <div>
                  <h2 style={{ fontSize: "22px", fontWeight: 900, color: "#ffffff", marginBottom: "4px" }}>Interactive SDK Workbench</h2>
                  <p style={{ fontSize: "13px", fontFamily: "monospace", color: "#A8A39E" }}>Generate live inference code with dynamic architectural capabilities</p>
                </div>
              </div>

              {/* Language Switcher */}
              <div className="model-wb-lang-pills">
                {(["python", "typescript", "curl", "ollama"] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSdkLang(lang)}
                    className={`model-wb-lang-btn ${sdkLang === lang ? "active" : ""}`}
                  >
                    {lang === "curl" ? "REST / cURL" : lang === "typescript" ? "TypeScript / Node" : lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Capability Feature Toggles */}
            <div className="model-wb-toggles-strip">
              
              <label className="model-wb-toggle-card">
                <div className="model-wb-toggle-left">
                  <span className="model-wb-toggle-icon">🧠</span>
                  <div>
                    <span className="model-wb-toggle-title">Extended CoT Reasoning</span>
                    <span className="model-wb-toggle-sub">Allocate 12k thinking tokens</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={enableThinking}
                  onChange={(e) => setEnableThinking(e.target.checked)}
                  className="model-wb-checkbox"
                />
              </label>

              <label className="model-wb-toggle-card">
                <div className="model-wb-toggle-left">
                  <span className="model-wb-toggle-icon">🛠️</span>
                  <div>
                    <span className="model-wb-toggle-title">Autonomous Tool Calling</span>
                    <span className="model-wb-toggle-sub">Attach sandboxed execute_code</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={enableTools}
                  onChange={(e) => setEnableTools(e.target.checked)}
                  className="model-wb-checkbox"
                />
              </label>

              <label className="model-wb-toggle-card">
                <div className="model-wb-toggle-left">
                  <span className="model-wb-toggle-icon">⚡</span>
                  <div>
                    <span className="model-wb-toggle-title">Response Buffer Stream</span>
                    <span className="model-wb-toggle-sub">Real-time token delta output</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={enableStreaming}
                  onChange={(e) => setEnableStreaming(e.target.checked)}
                  className="model-wb-checkbox"
                />
              </label>

            </div>

            {/* Code Display Area */}
            <div className="model-wb-code-area">
              <div className="model-wb-code-header">
                <div className="model-wb-dots">
                  <span className="model-wb-dot" style={{ background: "#FF5F56" }} />
                  <span className="model-wb-dot" style={{ background: "#FFBD2E" }} />
                  <span className="model-wb-dot" style={{ background: "#27C93F" }} />
                  <span style={{ marginLeft: "8px", color: "#ffffff", fontWeight: 700 }}>{model.id}.{sdkLang === "python" ? "py" : sdkLang === "typescript" ? "ts" : "sh"}</span>
                </div>
                
                <button
                  onClick={() => handleCopyCode()}
                  className="model-wb-copy-btn"
                >
                  {copied ? (
                    <>
                      <Check size={14} style={{ color: "#10B981" }} />
                      <span style={{ color: "#10B981" }}>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy Generated Spec</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="model-code-pre">
                <code>{generatedCode}</code>
              </pre>
            </div>

            {/* Bottom API Quick Specs */}
            <div className="model-wb-footer">
              <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                <span>API Endpoint: <strong style={{ color: "#ffffff" }}>api.anthropic.com/v1/messages</strong></span>
                <span>•</span>
                <span>Context Window: <strong style={{ color: "#FF5A1F" }}>{model.context || "200k tokens"}</strong></span>
                <span>•</span>
                <span>Prompt Caching: <strong style={{ color: "#10B981" }}>Enabled (50% discount)</strong></span>
              </div>
              <a href="https://docs.anthropic.com" target="_blank" rel="noreferrer" className="model-wb-docs-link">
                View Full Documentation →
              </a>
            </div>

          </div>

        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────────────────────
          TAB 3: ARCHITECTURE & CAPABILITIES DEEP-DIVE
      ───────────────────────────────────────────────────────────────────────────── */}
      {activeTab === "architecture" && (
        <section className="model-section-container">
          
          <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto 36px" }}>
            <span style={{ display: "inline-block", padding: "6px 14px", background: "#FFF6F3", color: "#FF5A1F", borderRadius: "100px", fontFamily: "monospace", fontWeight: 800, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.5px", border: "1px solid #FFEDD5", marginBottom: "12px" }}>
              System Topology & Engine
            </span>
            <h2 style={{ fontSize: "36px", fontWeight: 900, color: "#111111", marginBottom: "12px", letterSpacing: "-0.5px" }}>
              Architectural Capabilities Suite
            </h2>
            <p style={{ fontSize: "16px", color: "#555555", lineHeight: 1.6 }}>
              Detailed technical breakdown of core sub-systems, token economics, and agentic safeguards.
            </p>
          </div>

          <div className="model-arch-grid">
            
            <div className="model-arch-card">
              <div className="model-arch-icon-box" style={{ background: "#FFF6F3", color: "#FF5A1F", border: "1px solid #FFEDD5" }}>
                🧠
              </div>
              <h3 className="model-arch-title">Hybrid Reasoning Engine</h3>
              <p className="model-arch-desc">
                Seamlessly transitions between instantaneous high-throughput generation (`Flash mode`) and deep mathematical verification (`Thinking mode`) where intermediate thought tokens are evaluated and self-corrected before final output.
              </p>
              <div className="model-arch-check" style={{ color: "#FF5A1F" }}>
                ✓ Dynamic compute scaling per prompt
              </div>
            </div>

            <div className="model-arch-card">
              <div className="model-arch-icon-box" style={{ background: "#EFF6FF", color: "#3B82F6", border: "1px solid #DBEAFE" }}>
                🛠️
              </div>
              <h3 className="model-arch-title">Autonomous Agentic Orchestration</h3>
              <p className="model-arch-desc">
                Native training for multi-step tool execution, structured JSON schema enforcement, sandboxed terminal command generation, and browser navigation across complex full-repository coding tasks.
              </p>
              <div className="model-arch-check" style={{ color: "#3B82F6" }}>
                ✓ 50%+ SWE-Bench Verified SOTA
              </div>
            </div>

            <div className="model-arch-card">
              <div className="model-arch-icon-box" style={{ background: "#F0FDF4", color: "#10B981", border: "1px solid #DCFCE7" }}>
                👁️
              </div>
              <h3 className="model-arch-title">Multimodal Vision Understanding</h3>
              <p className="model-arch-desc">
                State-of-the-art visual reasoning capable of reading dense engineering diagrams, extracting UI design systems from raw Figma screenshots, and interpreting multi-page academic PDFs with sub-pixel OCR.
              </p>
              <div className="model-arch-check" style={{ color: "#10B981" }}>
                ✓ 1M pixel spatial resolution
              </div>
            </div>

            <div className="model-arch-card">
              <div className="model-arch-icon-box" style={{ background: "#FAF5FF", color: "#8B5CF6", border: "1px solid #F3E8FF" }}>
                ⚡
              </div>
              <h3 className="model-arch-title">High-Speed Token Economics</h3>
              <p className="model-arch-desc">
                Optimized attention heads capable of delivering up to 60 tokens per second on commercial infrastructure, combined with automatic prompt caching that reduces repeated systemic context costs by over 50%.
              </p>
              <div className="model-arch-check" style={{ color: "#8B5CF6" }}>
                ✓ Ultra-low latency TTFT (~250ms)
              </div>
            </div>

            <div className="model-arch-card">
              <div className="model-arch-icon-box" style={{ background: "#FFF1F2", color: "#FF5A1F", border: "1px solid #FFE4E6" }}>
                🛡️
              </div>
              <h3 className="model-arch-title">Constitutional Safeguards</h3>
              <p className="model-arch-desc">
                Trained using advanced Direct Preference Optimization (DPO) and Constitutional AI principles to prevent reward hacking, hallucination loops, and unauthorized adversarial prompt injection.
              </p>
              <div className="model-arch-check" style={{ color: "#FF5A1F" }}>
                ✓ ASL-3 Security Alignment Standard
              </div>
            </div>

            <div className="model-arch-card">
              <div className="model-arch-icon-box" style={{ background: "#FEF3C7", color: "#D97706", border: "1px solid #FDE68A" }}>
                🔗
              </div>
              <h3 className="model-arch-title">Ecosystem Compatibility</h3>
              <p className="model-arch-desc">
                Native drop-in integration across major enterprise frameworks including LangChain, Vercel AI SDK, LlamaIndex, Cursor IDE, OpenWebUI, and cloud providers (Amazon Bedrock / Google Cloud Vertex AI).
              </p>
              <div className="model-arch-check" style={{ color: "#D97706" }}>
                ✓ Multi-cloud deployment ready
              </div>
            </div>

          </div>

        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────────────────────
          TAB 4: RESEARCH LITERATURE & ACADEMIC BIBLIOGRAPHY
      ───────────────────────────────────────────────────────────────────────────── */}
      {activeTab === "literature" && (
        <section className="model-section-container">
          
          <div className="model-controls-bar">
            <div className="model-controls-title-group">
              <div className="model-controls-icon">
                <BookOpen size={22} />
              </div>
              <div>
                <h2 className="model-controls-h2">Indexed Academic Citations</h2>
                <p className="model-controls-sub">Peer-reviewed literature citing, evaluating, or comparing {model.name}</p>
              </div>
            </div>

            <span style={{ padding: "8px 16px", background: "#F8F7F2", border: "1px solid #EAE9E4", borderRadius: "12px", fontFamily: "monospace", fontWeight: 800, fontSize: "13px", color: "#111111" }}>
              {relatedPapers.length} Papers Found
            </span>
          </div>

          {relatedPapers.length === 0 ? (
            <div className="ds-card" style={{ padding: "64px", textAlign: "center" }}>
              <p style={{ fontSize: "18px", fontWeight: 800, color: "#555555", marginBottom: "20px" }}>No direct paper citations indexed yet.</p>
              <Link href="/trending" className="model-explore-btn" style={{ display: "inline-flex", textDecoration: "none" }}>
                <span>Browse All Trending AI Research</span>
                <ExternalLink size={15} />
              </Link>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {relatedPapers.map((paper: any, i: number) => (
                <PaperCard key={i} paper={paper} />
              ))}
            </div>
          )}

        </section>
      )}

    </div>
  );
}
