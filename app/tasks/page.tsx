"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Brain,
  Eye,
  Layers,
  Puzzle,
  Cpu,
  Code2,
  TrendingUp,
  MessageSquare,
  Plus,
  X,
  Zap,
  Network,
  Database,
  Shield,
  Terminal,
  Activity,
  FileText,
  Globe,
  Bot,
  GitBranch,
  BarChart3,
  Radio,
  Video,
  Mic,
  Share2,
  Sparkles
} from "lucide-react";

interface TaskItem {
  name: string;
  desc: string;
  icon: any;
  color: string;
  domain: string;
}

const ALL_TASKS_DATA: TaskItem[] = [
  // Foundation Models & Agents
  { name: "Vision-Language Models", desc: "Models that understand and generate across vision and language modalities simultaneously.", icon: Eye, color: "#16a34a", domain: "Foundation Models" },
  { name: "Multimodal Models", desc: "Models processing multiple data modalities simultaneously across text, image, video, and audio.", icon: Layers, color: "#d97706", domain: "Foundation Models" },
  { name: "Omni Models", desc: "Unified frontier models natively handling vision, text, audio, and sensor data in single neural architectures.", icon: Puzzle, color: "#9333ea", domain: "Foundation Models" },
  { name: "General Purpose Foundation", desc: "Core flagship base models trained on web-scale text and reasoning data for broad adaptation.", icon: Brain, color: "#e11d48", domain: "Foundation Models" },
  { name: "Agentic Reasoning & Planning", desc: "Models designed for multi-step execution, tool calling, memory persistence, and goal decomposition.", icon: Bot, color: "#0284c7", domain: "AI Agents" },
  { name: "Autonomous Web & Terminal Agents", desc: "SOTA agents specialized in operating browsers, shell commands, and local developer environments.", icon: Terminal, color: "#2563eb", domain: "AI Agents" },
  { name: "Multi-Agent Orchestration", desc: "Frameworks and models built for collaborative consensus, debate, and distributed task execution.", icon: Network, color: "#059669", domain: "AI Agents" },
  
  // Vision & Video
  { name: "Object Detection & Segmentation", desc: "Models that identify, bound, and segment objects down to pixel accuracy across visual scenes.", icon: Eye, color: "#0891b2", domain: "Vision" },
  { name: "Visual Question Answering (VQA)", desc: "Vision-language systems that reason over images, charts, diagrams, and physical environments.", icon: Sparkles, color: "#FF5A1F", domain: "Vision" },
  { name: "Optical Character Recognition (OCR)", desc: "High-precision document understanding and layout extraction from complex PDFs and scans.", icon: FileText, color: "#16a34a", domain: "Vision" },
  { name: "Text-to-Video & Image-to-Video", desc: "SOTA generative video models producing temporally consistent cinematic footage with physics awareness.", icon: Video, color: "#4f46e5", domain: "Video" },
  { name: "Video Understanding & Tracking", desc: "Long-context models capable of analyzing hour-long video streams and tracking spatial entities.", icon: Activity, color: "#db2777", domain: "Video" },
  
  // Language & Code
  { name: "Code Generation & Editing", desc: "Specialized models trained on repository-level codebases for autocomplete, refactoring, and bug fixing.", icon: Code2, color: "#0891b2", domain: "Language & NLP" },
  { name: "Mathematical Proof & Verifiers", desc: "Models trained via reinforcement learning for formal verification, theorem proving, and olympiad math.", icon: Brain, color: "#e11d48", domain: "Language & NLP" },
  { name: "Cross-Lingual Translation", desc: "High-accuracy multilingual translation and cultural adaptation across 200+ global languages.", icon: Globe, color: "#0284c7", domain: "Language & NLP" },
  
  // Audio & Robotics
  { name: "Automatic Speech Recognition (ASR)", desc: "Robust speech-to-text transcription models resilient to noise, accents, and specialized terminology.", icon: Mic, color: "#ea580c", domain: "Audio & Speech" },
  { name: "Real-Time Speech Synthesis (TTS)", desc: "Ultra-low latency conversational voice generation with emotive prosody and speaker cloning.", icon: Radio, color: "#9333ea", domain: "Audio & Speech" },
  { name: "Embodied AI & Manipulation", desc: "Vision-language-action (VLA) models controlling physical robot arms and mobile manipulation.", icon: Cpu, color: "#d97706", domain: "Robotics & Embodied AI" },
  { name: "Robot Navigation & Planning", desc: "Spatial reasoning and trajectory generation in complex, dynamic human environments.", icon: GitBranch, color: "#16a34a", domain: "Robotics & Embodied AI" },
  
  // Scientific & Structured Data
  { name: "Protein Folding & Biomolecules", desc: "AI models predicting 3D molecular structures, drug interactions, and genomic sequences.", icon: Activity, color: "#db2777", domain: "Scientific AI" },
  { name: "Materials Discovery & Simulation", desc: "Machine learning potentials accelerating quantum chemistry and novel crystal discovery.", icon: Sparkles, color: "#059669", domain: "Scientific AI" },
  { name: "Tabular Data & SQL Generation", desc: "Text-to-SQL and relational database reasoning over complex enterprise data warehouses.", icon: Database, color: "#ea580c", domain: "Structured Data & Decision AI" },
  { name: "Time-Series & Financial Forecasting", desc: "Foundation models specialized in economic modeling, anomaly detection, and quantitative forecasting.", icon: BarChart3, color: "#0284c7", domain: "Structured Data & Decision AI" },
  
  // Systems & Safety
  { name: "Constitutional AI & Alignment", desc: "Techniques and models enforcing safety guardrails, harmlessness, and ethical reasoning.", icon: Shield, color: "#7c3aed", domain: "AI Systems, Safety & Evaluation" },
  { name: "Red Teaming & Jailbreak Evaluation", desc: "Automated adversarial probing and robustness verification against prompt injection attacks.", icon: AlertShieldIcon, color: "#e11d48", domain: "AI Systems, Safety & Evaluation" }
];

function AlertShieldIcon(props: any) {
  return <Shield {...props} />;
}

const DOMAINS_LIST = [
  "All Domains",
  "Foundation Models",
  "AI Agents",
  "Vision",
  "Video",
  "Language & NLP",
  "Audio & Speech",
  "Robotics & Embodied AI",
  "Scientific AI",
  "Structured Data & Decision AI",
  "AI Systems, Safety & Evaluation"
];

export default function TasksPage() {
  const [activeDomain, setActiveDomain] = useState<string>("All Domains");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredTasks = ALL_TASKS_DATA.filter(t => {
    const matchesSearch = !searchQuery || t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDomain = activeDomain === "All Domains" || t.domain === activeDomain;
    return matchesSearch && matchesDomain;
  });

  const domainsToRender = activeDomain === "All Domains" 
    ? DOMAINS_LIST.filter(d => d !== "All Domains")
    : [activeDomain];

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-[#F8F7F2] font-sans text-slate-800 pb-24">
      <main className="flex-1 overflow-y-auto overflow-x-hidden hide-scroll">
        <div className="max-w-7xl mx-auto px-6 py-8 w-full">
          
          {/* ══ 1. HERO SECTION EXACT TO FRONTIERATLAS.CO/TASKS ══ */}
          <div className="relative overflow-hidden mb-10 min-h-[350px] bg-white/60 rounded-2xl border border-gray-200/60 shadow-sm flex">
            <div className="relative z-10 w-full lg:w-[65%] px-6 md:px-8 py-8 md:py-10">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 tracking-tight text-gray-900">
                All Research<br /><span className="text-[#e11d48]">Domains</span>
              </h1>
              <p className="text-gray-600 text-sm md:text-base mb-6 max-w-md leading-relaxed">
                Explore the full spectrum of AI research across tasks, methods, and applications.
              </p>
              <div className="flex flex-wrap items-center gap-5 text-sm">
                <div className="flex items-center gap-5">
                  <div>
                    <div className="text-xl md:text-2xl font-bold text-gray-800">10</div>
                    <div className="text-gray-500 text-xs md:text-sm">Domains</div>
                  </div>
                  <div className="w-px h-8 bg-gray-200"></div>
                </div>
                <div className="flex items-center gap-5">
                  <div>
                    <div className="text-xl md:text-2xl font-bold text-gray-800">105</div>
                    <div className="text-gray-500 text-xs md:text-sm">Tasks</div>
                  </div>
                  <div className="w-px h-8 bg-gray-200"></div>
                </div>
                <div className="flex items-center gap-5">
                  <div>
                    <div className="text-xl md:text-2xl font-bold text-gray-800">100K+</div>
                    <div className="text-gray-500 text-xs md:text-sm">Papers</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 border-2 border-gray-200 rounded-full px-3 py-1 bg-white/80 backdrop-blur-sm ml-2 cursor-pointer hover:shadow-sm">
                  <TrendingUp className="text-emerald-500 h-3.5 w-3.5" />
                  <span className="text-gray-600 font-medium text-xs md:text-sm">Daily updates</span>
                </div>
              </div>
            </div>
          </div>

          {/* ══ 2. EXACT SIDEBAR + MAIN CONTENT GRID LAYOUT ══ */}
          <div className="flex gap-6 items-start">
            
            {/* EXACT LEFT SIDEBAR ALWAYS VISIBLE (`block` instead of `hidden lg:block`) */}
            <aside className="w-64 flex-shrink-0 block backdrop-blur-sm" aria-label="Domain navigation">
              <div className="sticky top-20 flex flex-col h-[calc(100vh-5rem)]">
                <div className="px-1 pt-2 pb-4">
                  <h3 className="text-[15px] font-semibold uppercase text-[#e11d48] mb-3 tracking-wider">Browse Research</h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Filter domains..."
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 bg-white/80 transition-colors"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <nav className="overflow-y-auto px-1 pb-4 flex-1" aria-label="Domains">
                  <ul className="space-y-0.5" role="list">
                    {DOMAINS_LIST.map((domain) => {
                      const isActive = activeDomain === domain;
                      return (
                        <li key={domain}>
                          <button
                            onClick={() => {
                              setActiveDomain(domain);
                              if (domain !== "All Domains") {
                                const el = document.getElementById(`section-${domain}`);
                                if (el) el?.scrollIntoView({ behavior: "smooth" });
                              } else {
                                window.scrollTo({ top: 0, behavior: "smooth" });
                              }
                            }}
                            className={`w-full text-left px-3 py-2 text-sm rounded-xl transition-all duration-200 flex items-center justify-between cursor-pointer ${
                              isActive
                                ? "bg-rose-50 text-[#e11d48] font-semibold"
                                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                            }`}
                          >
                            <span>{domain}</span>
                            {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#e11d48]"></span>}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                <div className="px-1 mt-6">
                  <div className="bg-gradient-to-br from-rose-50 to-white rounded-xl border border-rose-100 p-4 shadow-sm">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-rose-100 rounded-full text-rose-500 shrink-0">
                        <MessageSquare className="h-4 w-4" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-800">Can’t find what you need?</p>
                        <p className="text-xs text-gray-500">Suggest a new domain to improve our taxonomy.</p>
                      </div>
                    </div>
                    <button
                      onClick={() => alert("Thank you! Suggestion recorded.")}
                      className="mt-3 w-full flex items-center justify-center gap-1.5 bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg text-xs font-semibold transition-colors shadow-sm cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" /> Suggest a Domain
                    </button>
                  </div>
                </div>
              </div>
            </aside>

            {/* ══ EXACT RIGHT CONTENT AREA WITH BOX DIMENSIONS OF TASKS_FULL.HTML ══ */}
            <div className="flex-1 min-w-0 space-y-14">
              {domainsToRender.map((domName) => {
                const domainTasks = filteredTasks.filter(t => t.domain === domName);
                if (domainTasks.length === 0 && searchQuery) return null;
                
                return (
                  <section key={domName} id={`section-${domName}`} className="scroll-mt-24">
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-3">
                        <h2 className="text-[26px] md:text-[30px] font-bold text-gray-800">{domName}</h2>
                      </div>
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{domainTasks.length} Tasks</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {domainTasks.map((task) => {
                        const SkeletalIcon = task.icon;
                        return (
                          <Link
                            key={task.name}
                            href={`/models?capability=${encodeURIComponent(task.name)}`}
                            className="bg-white p-5 rounded-xl shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)] border border-gray-100 hover:shadow-md transition-shadow group cursor-pointer no-underline block min-h-[160px] flex flex-col justify-between"
                          >
                            <div className="flex items-center gap-2">
                              <div className="flex-shrink-0 p-2 rounded-lg group-hover:scale-150 transition-transform flex items-center justify-center">
                                <SkeletalIcon size={20} style={{ color: task.color }} />
                              </div>
                              <h3 className="font-semibold text-gray-800 text-[15px] leading-snug mb-0.5 truncate">{task.name}</h3>
                            </div>
                            <p className="text-sm text-gray-500 mt-1.5 ml-11 mr-4 line-clamp-3">
                              {task.desc}
                            </p>
                          </Link>
                        );
                      })}
                    </div>
                  </section>
                );
              })}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
