"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Trophy, Cpu, Layers, ExternalLink, Code2, Check, Copy, X, ArrowRight, Zap, Calendar, BookOpen, Building2, Brain, Monitor, Globe, FileText, Link as LinkIcon, Volume2, ImageIcon, Video, Bot, Sparkles, TrendingUp, MessageSquare, Plus, Eye, Puzzle, Network, Database, Shield, Terminal, Activity, GitBranch, BarChart3, Radio, Mic, Share2 } from "lucide-react";
import { getModels, type ModelItem } from "@/lib/models";

const TOP_MODELS_BOXES = [
  {
    id: "gpt-5",
    rank: "1", rankBg: "#ffe4e6", rankColor: "#e11d48",
    name: "GPT-5", sub: "OpenAI", domain: "Reasoning", family: "GPT", capability: "Reasoning", collection: "Reasoning Models",
    desc: "Next-generation omni-reasoning flagship model combining breakthrough agentic execution, self-correction, and universal tool mastery.",
    score: "93.8% MMLU-Pro"
  },
  {
    id: "claude-opus-5",
    rank: "2", rankBg: "#f3e8ff", rankColor: "#9333ea",
    name: "Claude Opus 5", sub: "Anthropic", domain: "Agentic AI", family: "Claude", capability: "Agents", collection: "Agent Models",
    desc: "Apex frontier reasoning and constitutional safety model capable of deep academic synthesis, complex proof generation, and long-horizon planning.",
    score: "98.1% MATH-500"
  },
  {
    id: "gemini-2-5-pro",
    rank: "3", rankBg: "#dbeafe", rankColor: "#2563eb",
    name: "Gemini 2.5 Pro", sub: "Google DeepMind", domain: "Multimodal AI", family: "Gemini", capability: "Multimodal", collection: "Multimodal Models",
    desc: "Next-tier multimodal foundation model with native 2M+ token context, real-time video understanding, and multi-agent task planning.",
    score: "100% 2M Needle"
  },
  {
    id: "qwen3",
    rank: "4", rankBg: "#ccfbf1", rankColor: "#0d9488",
    name: "Qwen3", sub: "Qwen", domain: "Code Intelligence", family: "Qwen", capability: "Coding", collection: "Coding Models",
    desc: "Alibaba's next flagship open-weights multilingual and reasoning foundation model family with state-of-the-art coding and math accuracy.",
    score: "84.0% AIME"
  },
  {
    id: "llama-4",
    rank: "5", rankBg: "#ffedd5", rankColor: "#ea580c",
    name: "Llama 4", sub: "Meta AI", domain: "Large Language Models", family: "Llama", capability: "General Purpose", collection: "Open Source Models",
    desc: "Meta's next-generation open foundation model trained across multimodal text, vision, and audio with extreme compute efficiency.",
    score: "90.2% MMLU-Pro"
  },
  {
    id: "deepseek-r1",
    rank: "6", rankBg: "#ecfccb", rankColor: "#65a30d",
    name: "DeepSeek R1", sub: "DeepSeek AI", domain: "Reasoning", family: "DeepSeek", capability: "Reasoning", collection: "Reasoning Models",
    desc: "Breakthrough open reasoning model trained via large-scale RL directly eliciting long reasoning traces.",
    score: "79.8% AIME"
  },
  {
    id: "mistral-large-2",
    rank: "7", rankBg: "#e0e7ff", rankColor: "#4f46e5",
    name: "Mistral Large 2", sub: "Mistral AI", domain: "Agentic AI", family: "Mistral", capability: "Function Calling", collection: "Commercial Models",
    desc: "Advanced frontier model engineered for high-precision function calling and structured json generation.",
    score: "91.2% Berkeley"
  },
  {
    id: "grok-4",
    rank: "8", rankBg: "#fce7f3", rankColor: "#db2777",
    name: "Grok 4", sub: "xAI", domain: "Search & Retrieval", family: "Grok", capability: "Search", collection: "Large Language Models",
    desc: "Massive-scale foundation model integrated with real-time global search, deep mathematical logic, and coding auto-verification.",
    score: "86.5% AIME"
  },
  {
    id: "flux-1-schnell",
    rank: "9", rankBg: "#ede9fe", rankColor: "#7c3aed",
    name: "FLUX.1 [schnell]", sub: "Black Forest Labs", domain: "Computer Vision", family: "FLUX", capability: "Image Generation", collection: "Image Generation Models",
    desc: "Fast rectified flow transformer producing photorealistic images in 1 to 4 inference steps.",
    score: "94.1% Typography"
  },
  {
    id: "sam-2",
    rank: "10", rankBg: "#fee2e2", rankColor: "#b91c1c",
    name: "SAM 2", sub: "Meta AI", domain: "Computer Vision", family: "SAM", capability: "Computer Vision", collection: "Vision Language Models",
    desc: "Unified promptable visual segmentation model tracking objects across video frames and static images in real-time.",
    score: "76.3 J&F SA-V"
  }
];

const BROWSE_BY_CAPABILITY = [
  "General Purpose", "Reasoning", "Coding", "Agents", "Chat", "Instruction Following",
  "Function Calling", "Tool Use", "Embeddings", "Reranking", "Computer Vision",
  "Image Generation", "Video Generation", "Speech", "Audio", "OCR", "Document AI",
  "Multimodal", "Translation", "Search", "Planning", "Robotics", "Healthcare", "Scientific AI"
];

const BROWSE_BY_FAMILY = [
  { name: "GPT", count: 18, org: "OpenAI" },
  { name: "Claude", count: 14, org: "Anthropic" },
  { name: "Gemini", count: 16, org: "Google DeepMind" },
  { name: "Llama", count: 15, org: "Meta AI" },
  { name: "Qwen", count: 22, org: "Alibaba Cloud / Qwen" },
  { name: "DeepSeek", count: 12, org: "DeepSeek AI" },
  { name: "Mistral", count: 14, org: "Mistral AI" },
  { name: "Gemma", count: 10, org: "Google DeepMind" },
  { name: "Phi", count: 8, org: "Microsoft Research" },
  { name: "Falcon", count: 6, org: "TII" },
  { name: "GLM", count: 11, org: "Zhipu AI" },
  { name: "InternLM", count: 7, org: "Shanghai AI Lab" },
  { name: "Molmo", count: 5, org: "Allen Institute for AI" },
  { name: "Whisper", count: 6, org: "OpenAI" },
  { name: "CLIP", count: 8, org: "OpenAI / Community" },
  { name: "SAM", count: 4, org: "Meta AI" },
  { name: "FLUX", count: 6, org: "Black Forest Labs" },
  { name: "Stable Diffusion", count: 14, org: "Stability AI" },
  { name: "Pixtral", count: 4, org: "Mistral AI" },
  { name: "Janus", count: 3, org: "DeepSeek AI" }
];

const BROWSE_BY_ORGANIZATION = [
  { name: "OpenAI", count: 85 },
  { name: "Anthropic", count: 44 },
  { name: "Google DeepMind", count: 71 },
  { name: "Meta AI", count: 35 },
  { name: "Microsoft", count: 24 },
  { name: "NVIDIA", count: 18 },
  { name: "Alibaba", count: 47 },
  { name: "Qwen", count: 32 },
  { name: "DeepSeek", count: 28 },
  { name: "Mistral AI", count: 30 },
  { name: "xAI", count: 14 },
  { name: "Cohere", count: 12 },
  { name: "Amazon", count: 16 },
  { name: "Apple", count: 11 },
  { name: "IBM", count: 9 },
  { name: "ByteDance", count: 15 },
  { name: "Moonshot AI", count: 8 },
  { name: "Zhipu AI", count: 14 },
  { name: "MiniMax", count: 7 },
  { name: "Hugging Face", count: 42 }
];

const BROWSE_BY_RESEARCH_AREA = [
  { name: "Large Language Models", count: 342, leader: "OpenAI / GPT-5" },
  { name: "Reasoning", count: 185, leader: "DeepSeek / R1" },
  { name: "Agentic AI", count: 164, leader: "Anthropic / Claude Opus 5" },
  { name: "Computer Vision", count: 210, leader: "Meta / SAM 2" },
  { name: "Multimodal AI", count: 195, leader: "Google / Gemini 2.5 Pro" },
  { name: "Code Intelligence", count: 178, leader: "Alibaba / Qwen3" },
  { name: "Document AI", count: 92, leader: "Moonshot / Kimi K2" },
  { name: "OCR", count: 84, leader: "Alibaba / Qwen 2 VL" },
  { name: "Speech", count: 115, leader: "OpenAI / Whisper V3" },
  { name: "Audio", count: 96, leader: "Meta / AudioCraft" },
  { name: "Video", count: 88, leader: "OpenAI / Sora" },
  { name: "Embodied AI", count: 64, leader: "Google / RT-2" },
  { name: "Robotics", count: 72, leader: "Google / RT-2" },
  { name: "Scientific AI", count: 82, leader: "Google / AlphaFold 3" },
  { name: "Healthcare AI", count: 75, leader: "Microsoft / Med-PaLM" },
  { name: "Mathematics", count: 110, leader: "DeepSeek / R1" },
  { name: "Search & Retrieval", count: 130, leader: "xAI / Grok 4" },
  { name: "Recommendation Systems", count: 54, leader: "Meta / DLRM" },
  { name: "Graph Learning", count: 42, leader: "DeepMind / GraphCast" },
  { name: "Time Series", count: 48, leader: "Chronos / Amazon" }
];

const TRENDING_MODELS = [
  { name: "GPT-5", org: "OpenAI", family: "GPT", elo: "1410", desc: "Omni-reasoning flagship model combining agentic execution and self-correction." },
  { name: "Claude Opus 5", org: "Anthropic", family: "Claude", elo: "1405", desc: "Apex constitutional reasoning model for academic synthesis and complex proofs." },
  { name: "Claude Sonnet 5", org: "Anthropic", family: "Claude", elo: "1395", desc: "High-throughput workhorse model optimized for autonomous coding and browser control." },
  { name: "Gemini 2.5 Pro", org: "Google DeepMind", family: "Gemini", elo: "1390", desc: "Native 2M+ token multimodal model with real-time video and multi-agent planning." },
  { name: "Gemini 2.5 Flash", org: "Google DeepMind", family: "Gemini", elo: "1375", desc: "Ultra-low-latency multimodal model for instantaneous streaming and tool orchestration." },
  { name: "DeepSeek R1", org: "DeepSeek AI", family: "DeepSeek", elo: "1378", desc: "Breakthrough open reasoning model via large-scale RL directly eliciting long CoT." },
  { name: "Qwen3", org: "Qwen", family: "Qwen", elo: "1385", desc: "Next flagship open-weights multilingual and reasoning foundation model family." },
  { name: "Llama 4", org: "Meta AI", family: "Llama", elo: "1388", desc: "Open multimodal foundation model with extreme compute efficiency and 400B+ MoE scale." },
  { name: "Kimi K2", org: "Moonshot AI", family: "Moonshot", elo: "1360", desc: "Long-context specialist offering deep comprehension across 2M+ bilingual tokens." },
  { name: "GLM-4.5", org: "Zhipu AI", family: "GLM", elo: "1365", desc: "Flagship bilingual reasoning model excelling in complex function calling and math." },
  { name: "Mistral Medium", org: "Mistral AI", family: "Mistral", elo: "1340", desc: "Balanced enterprise model delivering fast instruction following and JSON output." },
  { name: "Grok 4", org: "xAI", family: "Grok", elo: "1395", desc: "Massive-scale model integrated with real-time global search and mathematical logic." },
  { name: "Phi-4", org: "Microsoft Research", family: "Phi", elo: "1305", desc: "14B small language model trained exclusively on synthetic reasoning step traces." },
  { name: "Gemma 3", org: "Google DeepMind", family: "Gemma", elo: "1342", desc: "State-of-the-art open weights model delivering unmatched single-GPU reasoning." },
  { name: "Molmo", org: "Allen Institute for AI", family: "Molmo", elo: "1338", desc: "Open vision-language model matching proprietary leaders on zero-shot VQA." }
];

const RECENTLY_RELEASED = [
  { name: "GPT-5", org: "OpenAI", date: "February 2025", family: "GPT", desc: "Next-generation omni-reasoning flagship foundation model." },
  { name: "Claude Opus 5", org: "Anthropic", date: "February 2025", family: "Claude", desc: "Apex constitutional reasoning and complex planning model." },
  { name: "Grok 4", org: "xAI", date: "February 2025", family: "Grok", desc: "Real-time global search model with deep mathematical verification." },
  { name: "Qwen3", org: "Qwen", date: "January 2025", family: "Qwen", desc: "Alibaba's flagship open-weights reasoning and multilingual model." },
  { name: "Gemini 2.5 Pro", org: "Google DeepMind", date: "January 2025", family: "Gemini", desc: "Multimodal frontier model with native 2M token context windows." },
  { name: "Llama 4", org: "Meta AI", date: "January 2025", family: "Llama", desc: "Multimodal open MoE architecture engineered for efficiency." },
  { name: "DeepSeek V3", org: "DeepSeek AI", date: "December 2024", family: "DeepSeek", desc: "High-efficiency 671B MoE with Multi-Head Latent Attention." },
  { name: "Claude 3.7 Sonnet", org: "Anthropic", date: "February 2025", family: "Claude", desc: "First hybrid reasoning frontier model for agentic workflows." }
];

const POPULAR_COLLECTIONS = [
  { name: "Reasoning Models", count: "84 Models", icon: <Brain size={20} /> },
  { name: "Coding Models", count: "62 Models", icon: <Code2 size={20} /> },
  { name: "Vision Language Models", count: "75 Models", icon: <Monitor size={20} /> },
  { name: "Open Source Models", count: "210 Models", icon: <Globe size={20} /> },
  { name: "Commercial Models", count: "145 Models", icon: <Building2 size={20} /> },
  { name: "Long Context Models", count: "58 Models", icon: <FileText size={20} /> },
  { name: "Small Language Models", count: "46 Models", icon: <Zap size={20} /> },
  { name: "Large Language Models", count: "340 Models", icon: <Layers size={20} /> },
  { name: "Multimodal Models", count: "115 Models", icon: <Cpu size={20} /> },
  { name: "Embedding Models", count: "38 Models", icon: <LinkIcon size={20} /> },
  { name: "Speech Models", count: "42 Models", icon: <Volume2 size={20} /> },
  { name: "OCR Models", count: "34 Models", icon: <BookOpen size={20} /> },
  { name: "Image Generation Models", count: "55 Models", icon: <ImageIcon size={20} /> },
  { name: "Video Generation Models", count: "28 Models", icon: <Video size={20} /> },
  { name: "Agent Models", count: "68 Models", icon: <Bot size={20} /> }
];

const FEATURED_INTEGRATIONS = [
  { name: "BigQuery Wrapper", org: "Google Cloud", date: "Official Wrapper", family: "Data Platform", desc: "Query Google BigQuery data warehouses from Postgres with full read and write support.", url: "https://otqhrpbxhxkrhrnjqbba.supabase.co/storage/v1/object/public/images/listings/bigquery-wrapper/bigquery-icon.svg", link: "https://supabase.com/partners/integrations/bigquery-wrapper" },
  { name: "ClickHouse Wrapper", org: "ClickHouse", date: "Official Wrapper", family: "Analytics", desc: "Query and write to ClickHouse analytics tables from Postgres.", url: "https://otqhrpbxhxkrhrnjqbba.supabase.co/storage/v1/object/public/images/listings/clickhouse-wrapper/clickhouse-icon.svg", link: "https://supabase.com/partners/integrations/clickhouse-wrapper" },
  { name: "Cloudflare Workers", org: "Cloudflare", date: "Edge Compute", family: "DevTools", desc: "Using Supabase from your Cloudflare Workers just got even easier.", url: "https://otqhrpbxhxkrhrnjqbba.supabase.co/storage/v1/object/public/images/listings/cloudflare-workers/logo.png", link: "https://supabase.com/partners/integrations/cloudflare-workers" },
  { name: "Dreambase", org: "Dreambase", date: "AI Dashboards", family: "AI", desc: "AI-native dashboards and analytics for Supabase. Connect, query, and visualize in minutes.", url: "https://otqhrpbxhxkrhrnjqbba.supabase.co/storage/v1/object/public/images/listings/dreambase/logo.svg", link: "https://supabase.com/partners/integrations/dreambase" },
  { name: "Firebase Wrapper", org: "Google Firebase", date: "Official Wrapper", family: "Auth & Store", desc: "Query Firebase Auth users and Firestore documents as Postgres tables.", url: "https://otqhrpbxhxkrhrnjqbba.supabase.co/storage/v1/object/public/images/listings/firebase-wrapper/firebase-icon.svg", link: "https://supabase.com/partners/integrations/firebase-wrapper" },
  { name: "PowerSync", org: "Journey Mobile", date: "Offline Sync", family: "Offline-First", desc: "PowerSync is a drop-in sync layer for making apps built on Supabase work offline-first.", url: "https://otqhrpbxhxkrhrnjqbba.supabase.co/storage/v1/object/public/images/listings/powersync/logo.png", link: "https://supabase.com/partners/integrations/powersync" },
  { name: "React-admin", org: "Marmelab", date: "Frontend UI", family: "App Templates", desc: "A frontend Framework for building B2B applications.", url: "https://otqhrpbxhxkrhrnjqbba.supabase.co/storage/v1/object/public/images/listings/react-admin/logo.jpeg", link: "https://supabase.com/partners/integrations/react-admin" },
  { name: "Resend", org: "Resend", date: "Email API", family: "Messaging", desc: "Email for developers to reach humans instead of spam folders. Build, test, and deliver transactional emails at scale.", url: "https://otqhrpbxhxkrhrnjqbba.supabase.co/storage/v1/object/public/images/listings/resend/logo.webp", link: "https://supabase.com/partners/integrations/resend" },
  { name: "Stripe Wrapper", org: "Stripe", date: "Billing API", family: "Data Platform", desc: "Query and write to Stripe customers, subscriptions, invoices, and billing data from Postgres.", url: "https://otqhrpbxhxkrhrnjqbba.supabase.co/storage/v1/object/public/images/listings/stripe-wrapper/stripe-icon.svg", link: "https://supabase.com/partners/integrations/stripe-wrapper" },
  { name: "Trigger.dev", org: "Trigger.dev", date: "Background Jobs", family: "DevTools", desc: "Open source background jobs with no timeouts.", url: "https://otqhrpbxhxkrhrnjqbba.supabase.co/storage/v1/object/public/images/listings/trigger-dev/logo.jpg", link: "https://supabase.com/partners/integrations/trigger-dev" },
  { name: "Vercel", org: "Vercel Inc.", date: "Cloud Deployment", family: "DevTools", desc: "Easily add the power of Supabase to your Vercel projects with our Vercel integration.", url: "https://otqhrpbxhxkrhrnjqbba.supabase.co/storage/v1/object/public/images/listings/vercel/logo.jpeg", link: "https://supabase.com/partners/integrations/vercel" },
  { name: "Windmill", org: "Windmill Labs", date: "Internal UIs", family: "Low-Code", desc: "Open-source platform to turn minimal scripts into internal UIs and workflows.", url: "https://otqhrpbxhxkrhrnjqbba.supabase.co/storage/v1/object/public/images/listings/windmill/logo.jpeg", link: "https://supabase.com/partners/integrations/windmill" },
  { name: "Prisma", org: "Prisma", date: "ORM Tool", family: "ORM", desc: "Next-generation Node.js and TypeScript ORM for Supabase Postgres tables.", url: "https://otqhrpbxhxkrhrnjqbba.supabase.co/storage/v1/object/public/images/listings/prisma/logo.png", link: "https://supabase.com/partners/integrations/prisma" },
  { name: "Drizzle ORM", org: "Drizzle Team", date: "TypeScript ORM", family: "ORM", desc: "Headless TypeScript ORM engineered with zero dependencies and maximum query speed.", url: "https://otqhrpbxhxkrhrnjqbba.supabase.co/storage/v1/object/public/images/listings/drizzle/logo.png", link: "https://supabase.com/partners/integrations/drizzle" },
  { name: "LangChain", org: "LangChain", date: "AI Framework", family: "AI & Agents", desc: "Build context-aware, reasoning LLM applications powered by Supabase pgvector.", url: "https://otqhrpbxhxkrhrnjqbba.supabase.co/storage/v1/object/public/images/listings/langchain/logo.png", link: "https://supabase.com/partners/integrations/langchain" },
  { name: "LlamaIndex", org: "LlamaIndex", date: "Data Framework", family: "AI & Agents", desc: "Data framework for connecting custom data pipelines and embeddings to LLMs.", url: "https://otqhrpbxhxkrhrnjqbba.supabase.co/storage/v1/object/public/images/listings/llamaindex/logo.png", link: "https://supabase.com/partners/integrations/llamaindex" },
  { name: "Auth0", org: "Okta / Auth0", date: "Identity API", family: "Authentication", desc: "Secure and scalable identity management seamlessly integrating with Supabase JWTs.", url: "https://otqhrpbxhxkrhrnjqbba.supabase.co/storage/v1/object/public/images/listings/auth0/logo.png", link: "https://supabase.com/partners/integrations/auth0" },
  { name: "Clerk", org: "Clerk Inc.", date: "User Auth", family: "Authentication", desc: "Complete user management and authentication suite built for modern React applications.", url: "https://otqhrpbxhxkrhrnjqbba.supabase.co/storage/v1/object/public/images/listings/clerk/logo.png", link: "https://supabase.com/partners/integrations/clerk" },
  { name: "Retool", org: "Retool", date: "Internal Tools", family: "Low-Code", desc: "Build internal operational tools remarkably fast directly on top of your Postgres data.", url: "https://otqhrpbxhxkrhrnjqbba.supabase.co/storage/v1/object/public/images/listings/retool/logo.jpeg", link: "https://supabase.com/partners/integrations/retool" },
  { name: "Appsmith", org: "Appsmith", date: "Admin Panels", family: "Internal UIs", desc: "Build support dashboards and admin panels by connecting Supabase to Appsmith.", url: "https://otqhrpbxhxkrhrnjqbba.supabase.co/storage/v1/object/public/images/listings/appsmith/logo.png", link: "https://supabase.com/partners/integrations/appsmith" },
  { name: "FlutterFlow", org: "FlutterFlow", date: "Mobile App UI", family: "Low-Code", desc: "Create beautiful native mobile UI and generate clean code with 1-click backend sync.", url: "https://otqhrpbxhxkrhrnjqbba.supabase.co/storage/v1/object/public/images/listings/flutterflow/logo.jpeg", link: "https://supabase.com/partners/integrations/flutterflow" },
  { name: "Plasmic", org: "Plasmic", date: "Visual Builder", family: "Visual Builder", desc: "Create stunning visual content and React pages seamlessly integrated into your codebase.", url: "https://otqhrpbxhxkrhrnjqbba.supabase.co/storage/v1/object/public/images/listings/plasmic/logo.png", link: "https://supabase.com/partners/integrations/plasmic" },
  { name: "Snowflake Wrapper", org: "Snowflake", date: "Foreign Data", family: "Data Platform", desc: "Query Snowflake data warehouses from Postgres with real-time foreign data tables.", url: "https://otqhrpbxhxkrhrnjqbba.supabase.co/storage/v1/object/public/images/listings/snowflake-wrapper/snowflake-icon.svg", link: "https://supabase.com/partners/integrations/snowflake-wrapper" },
  { name: "AWS S3 Wrapper", org: "Amazon Web Services", date: "Data Wrapper", family: "Storage", desc: "Query CSV, Parquet, and JSON files stored in AWS S3 buckets directly from Postgres.", url: "https://otqhrpbxhxkrhrnjqbba.supabase.co/storage/v1/object/public/images/listings/s3-wrapper/s3-icon.svg", link: "https://supabase.com/partners/integrations/s3-wrapper" },
  { name: "Loops", org: "Loops", date: "Transactional Email", family: "Messaging", desc: "Configure your Supabase account to send modern SaaS authentication and onboarding emails.", url: "https://otqhrpbxhxkrhrnjqbba.supabase.co/storage/v1/object/public/images/listings/loops/logo.png", link: "https://supabase.com/partners/integrations/loops" },
  { name: "OneSignal", org: "OneSignal", date: "Push & Messaging", family: "Messaging", desc: "Push notifications, email, SMS & in-app messaging to drive engaged and loyal customers.", url: "https://otqhrpbxhxkrhrnjqbba.supabase.co/storage/v1/object/public/images/listings/onesignal/logo.png", link: "https://supabase.com/partners/integrations/onesignal" },
  { name: "Forest Admin", org: "Forest Admin", date: "Admin UIs", family: "Internal UIs", desc: "One comprehensive internal tool builder for all your data tables and operations.", url: "https://otqhrpbxhxkrhrnjqbba.supabase.co/storage/v1/object/public/images/listings/forest-admin/logo.png", link: "https://supabase.com/partners/integrations/forest-admin" },
  { name: "ILLA Cloud", org: "ILLA", date: "Low-Code Tool", family: "Low-Code", desc: "An open-source low-code platform for developers to build internal tools in minutes.", url: "https://otqhrpbxhxkrhrnjqbba.supabase.co/storage/v1/object/public/images/listings/illa/logo.png", link: "https://supabase.com/partners/integrations/illa" },
  { name: "Draftbit", org: "Draftbit", date: "Mobile Builder", family: "Mobile Apps", desc: "Visually build native mobile applications connected directly to Supabase via REST API.", url: "https://otqhrpbxhxkrhrnjqbba.supabase.co/storage/v1/object/public/images/listings/draftbit/logo.png", link: "https://supabase.com/partners/integrations/draftbit" },
  { name: "WeWeb", org: "WeWeb", date: "Frontend UI", family: "App Templates", desc: "No-code frontend builder designed specifically for high-performance relational databases.", url: "https://otqhrpbxhxkrhrnjqbba.supabase.co/storage/v1/object/public/images/listings/weweb/logo.jpeg", link: "https://supabase.com/partners/integrations/weweb" },
  { name: "Internal.io", org: "Internal", date: "Workflow UIs", family: "Internal UIs", desc: "Build custom internal apps and operational workflows incredibly fast on top of Supabase.", url: "https://otqhrpbxhxkrhrnjqbba.supabase.co/storage/v1/object/public/images/listings/internalio/logo.png", link: "https://supabase.com/partners/integrations/internalio" },
  { name: "CipherStash", org: "CipherStash", date: "Data Encryption", family: "Security", desc: "Searchable, application-level encryption for your Supabase Postgres database.", url: "https://otqhrpbxhxkrhrnjqbba.supabase.co/storage/v1/object/public/images/listings/cipherstash/logo.svg", link: "https://supabase.com/partners/integrations/cipherstash" },
  { name: "YepCode", org: "YepCode", date: "Automation API", family: "Automation", desc: "The all-in-one integration & automation platform that loves developer source code.", url: "https://otqhrpbxhxkrhrnjqbba.supabase.co/storage/v1/object/public/images/listings/yepcode/logo.png", link: "https://supabase.com/partners/integrations/yepcode" },
  { name: "Zavu", org: "Zavu", date: "AI Messaging", family: "AI & Messaging", desc: "Build native AI assistants and customer messaging tools powered by your database.", url: "https://otqhrpbxhxkrhrnjqbba.supabase.co/storage/v1/object/public/images/listings/zavu/logo.svg", link: "https://supabase.com/partners/integrations/zavu" }
];

function getOrgLogo(orgOrLeader: string): string {
  const lower = (orgOrLeader || "").toLowerCase();
  if (lower.includes("ibm")) {
    return "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg";
  }
  if (lower.includes("anthropic") || lower.includes("claude opus") || lower.includes("claude sonnet")) {
    return "https://avatars.githubusercontent.com/u/76263028?v=4";
  }
  if (lower.includes("claude")) {
    return "https://www.google.com/s2/favicons?domain=claude.ai&sz=128";
  }
  if (lower.includes("qwen") || lower.includes("ocr")) {
    return "https://avatars.githubusercontent.com/u/141221163?v=4";
  }
  if (lower.includes("alibaba")) {
    return "https://avatars.githubusercontent.com/u/19519599?v=4";
  }
  if (lower.includes("openai") || lower.includes("gpt") || lower.includes("whisper") || lower.includes("sora") || lower.includes("clip")) {
    return "https://avatars.githubusercontent.com/u/14957082?v=4";
  }
  if (lower.includes("gemini") || lower.includes("gemma")) {
    return "https://www.gstatic.com/lamda/images/gemini_favicon_f069958c85030456e93de685481c559f160ea06b.png";
  }
  if (lower.includes("google") || lower.includes("deepmind") || lower.includes("alphafold") || lower.includes("rt-2")) {
    return "https://www.google.com/s2/favicons?domain=google.com&sz=128";
  }
  if (lower.includes("meta") || lower.includes("llama") || lower.includes("sam") || lower.includes("audiocraft") || lower.includes("dlrm")) {
    return "https://avatars.githubusercontent.com/u/153379578?v=4";
  }
  if (lower.includes("deepseek") || lower.includes("janus")) {
    return "https://avatars.githubusercontent.com/u/148330874?v=4";
  }
  if (lower.includes("mistral") || lower.includes("pixtral")) {
    return "https://avatars.githubusercontent.com/u/132372032?v=4";
  }
  if (lower.includes("xai") || lower.includes("grok")) {
    return "https://avatars.githubusercontent.com/u/130314967?v=4";
  }
  if (lower.includes("microsoft") || lower.includes("phi") || lower.includes("med-palm")) {
    return "https://www.google.com/s2/favicons?domain=microsoft.com&sz=128";
  }
  if (lower.includes("moonshot") || lower.includes("kimi")) {
    return "https://www.google.com/s2/favicons?domain=moonshot.cn&sz=128";
  }
  if (lower.includes("zhipu") || lower.includes("glm")) {
    return "https://www.google.com/s2/favicons?domain=zhipuai.cn&sz=128";
  }
  if (lower.includes("allen") || lower.includes("molmo")) {
    return "https://www.google.com/s2/favicons?domain=allenai.org&sz=128";
  }
  if (lower.includes("time series") || lower.includes("timeseries") || lower.includes("chronos") || lower.includes("amazon") || lower.includes("nixtla")) {
    return "https://www.google.com/s2/favicons?domain=aws.amazon.com&sz=128";
  }
  if (lower.includes("nvidia")) {
    return "https://www.google.com/s2/favicons?domain=nvidia.com&sz=128";
  }
  if (lower.includes("hugging") || lower.includes("face")) {
    return "https://www.google.com/s2/favicons?domain=huggingface.co&sz=128";
  }
  if (lower.includes("cohere")) {
    return "https://www.google.com/s2/favicons?domain=cohere.com&sz=128";
  }
  if (lower.includes("apple")) {
    return "https://www.google.com/s2/favicons?domain=apple.com&sz=128";
  }
  if (lower.includes("bytedance") || lower.includes("douyin") || lower.includes("tiktok")) {
    return "https://www.google.com/s2/favicons?domain=bytedance.com&sz=128";
  }
  if (lower.includes("minimax")) {
    return "https://www.google.com/s2/favicons?domain=minimaxi.com&sz=128";
  }
  if (lower.includes("tii") || lower.includes("falcon")) {
    return "https://www.google.com/s2/favicons?domain=tii.ae&sz=128";
  }
  if (lower.includes("shanghai") || lower.includes("internlm")) {
    return "https://www.google.com/s2/favicons?domain=internlm.intern-ai.org.cn&sz=128";
  }
  if (lower.includes("black forest") || lower.includes("flux")) {
    return "https://www.google.com/s2/favicons?domain=blackforestlabs.ai&sz=128";
  }
  if (lower.includes("stability") || lower.includes("stable diffusion")) {
    return "https://www.google.com/s2/favicons?domain=stability.ai&sz=128";
  }
  return "https://www.google.com/s2/favicons?domain=ai.com&sz=128";
}

function getSkeletalIcon(index: number, name: string = "") {
  const icons = [
    { Icon: Brain, color: "#e11d48" },
    { Icon: Eye, color: "#0284c7" },
    { Icon: Layers, color: "#16a34a" },
    { Icon: Puzzle, color: "#d97706" },
    { Icon: Cpu, color: "#9333ea" },
    { Icon: Code2, color: "#0891b2" },
    { Icon: Sparkles, color: "#FF5A1F" },
    { Icon: Zap, color: "#4f46e5" },
    { Icon: Network, color: "#059669" },
    { Icon: Database, color: "#ea580c" },
    { Icon: Shield, color: "#7c3aed" },
    { Icon: Terminal, color: "#2563eb" },
    { Icon: Activity, color: "#db2777" },
    { Icon: FileText, color: "#16a34a" },
    { Icon: Globe, color: "#0284c7" },
    { Icon: Bot, color: "#e11d48" },
    { Icon: GitBranch, color: "#d97706" },
    { Icon: BarChart3, color: "#9333ea" },
    { Icon: Radio, color: "#0891b2" },
    { Icon: Video, color: "#4f46e5" },
    { Icon: Mic, color: "#ea580c" },
    { Icon: Share2, color: "#059669" }
  ];
  const lower = name.toLowerCase();
  if (lower.includes("vision") || lower.includes("image") || lower.includes("ocr") || lower.includes("sam")) return { Icon: Eye, color: "#0284c7" };
  if (lower.includes("reasoning") || lower.includes("math") || lower.includes("logic")) return { Icon: Brain, color: "#e11d48" };
  if (lower.includes("code") || lower.includes("coding")) return { Icon: Code2, color: "#0891b2" };
  if (lower.includes("agent") || lower.includes("robot")) return { Icon: Bot, color: "#9333ea" };
  if (lower.includes("audio") || lower.includes("speech") || lower.includes("whisper")) return { Icon: Mic, color: "#ea580c" };
  if (lower.includes("video") || lower.includes("sora")) return { Icon: Video, color: "#4f46e5" };
  if (lower.includes("multimodal") || lower.includes("omni") || lower.includes("gemini")) return { Icon: Layers, color: "#d97706" };
  if (lower.includes("document") || lower.includes("paper") || lower.includes("search")) return { Icon: FileText, color: "#16a34a" };
  if (lower.includes("embed") || lower.includes("rerank") || lower.includes("data") || lower.includes("sql") || lower.includes("postgres")) return { Icon: Database, color: "#059669" };
  if (lower.includes("security") || lower.includes("auth") || lower.includes("cipher")) return { Icon: Shield, color: "#7c3aed" };
  if (lower.includes("workflow") || lower.includes("automation") || lower.includes("tool")) return { Icon: Puzzle, color: "#FF5A1F" };
  return icons[index % icons.length];
}

function ModelsContent() {
  const router = useRouter();

  const [allModels, setAllModels] = useState<ModelItem[]>([]);
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [selectedCapability, setSelectedCapability] = useState<string | null>(null);
  const [selectedFamily, setSelectedFamily] = useState<string | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [inspectedModel, setInspectedModel] = useState<ModelItem | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("all");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const sp = new URLSearchParams(window.location.search);
      setSelectedVendor(sp.get("vendor"));
      setSelectedDomain(sp.get("domain"));
      setSelectedCapability(sp.get("capability"));
      setSelectedFamily(sp.get("family"));
      setSelectedCollection(sp.get("collection"));
    }
  }, []);

  useEffect(() => {
    getModels().then((data) => {
      setAllModels(data);
    });
  }, []);

  const clearAllFilters = () => {
    setSelectedVendor(null);
    setSelectedDomain(null);
    setSelectedCapability(null);
    setSelectedFamily(null);
    setSelectedCollection(null);
    setSearchQuery("");
    router.push("/models", { scroll: false });
  };

  const updateURL = (params: { vendor?: string | null; domain?: string | null; capability?: string | null; family?: string | null; collection?: string | null }) => {
    const v = params.vendor !== undefined ? params.vendor : selectedVendor;
    const d = params.domain !== undefined ? params.domain : selectedDomain;
    const c = params.capability !== undefined ? params.capability : selectedCapability;
    const f = params.family !== undefined ? params.family : selectedFamily;
    const col = params.collection !== undefined ? params.collection : selectedCollection;

    const urlParams = new URLSearchParams();
    if (v) urlParams.set("vendor", v);
    if (d) urlParams.set("domain", d);
    if (c) urlParams.set("capability", c);
    if (f) urlParams.set("family", f);
    if (col) urlParams.set("collection", col);

    const queryString = urlParams.toString();
    router.push(queryString ? `/models?${queryString}` : "/models", { scroll: false });

    setTimeout(() => {
      const dirElem = document.getElementById("model-directory");
      if (dirElem) {
        dirElem.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const handleCapabilityClick = (cap: string) => {
    const next = selectedCapability === cap ? null : cap;
    setSelectedCapability(next);
    setSelectedVendor(null); setSelectedDomain(null); setSelectedFamily(null); setSelectedCollection(null);
    updateURL({ capability: next, vendor: null, domain: null, family: null, collection: null });
  };

  const handleFamilyClick = (fam: string) => {
    const next = selectedFamily === fam ? null : fam;
    setSelectedFamily(next);
    setSelectedVendor(null); setSelectedDomain(null); setSelectedCapability(null); setSelectedCollection(null);
    updateURL({ family: next, vendor: null, domain: null, capability: null, collection: null });
  };

  const handleVendorClick = (vName: string) => {
    const next = selectedVendor === vName ? null : vName;
    setSelectedVendor(next);
    setSelectedDomain(null); setSelectedCapability(null); setSelectedFamily(null); setSelectedCollection(null);
    updateURL({ vendor: next, domain: null, capability: null, family: null, collection: null });
  };

  const handleDomainClick = (dName: string) => {
    const next = selectedDomain === dName ? null : dName;
    setSelectedDomain(next);
    setSelectedVendor(null); setSelectedCapability(null); setSelectedFamily(null); setSelectedCollection(null);
    updateURL({ domain: next, vendor: null, capability: null, family: null, collection: null });
  };

  const handleCollectionClick = (col: string) => {
    const next = selectedCollection === col ? null : col;
    setSelectedCollection(next);
    setSelectedVendor(null); setSelectedDomain(null); setSelectedCapability(null); setSelectedFamily(null);
    updateURL({ collection: next, vendor: null, domain: null, capability: null, family: null });
  };

  const activeFilterLabel = selectedVendor || selectedDomain || selectedCapability || selectedFamily || selectedCollection || null;

  const filteredCatalogModels = useMemo(() => {
    return allModels.filter(m => {
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matches = m.name.toLowerCase().includes(q) || m.org.toLowerCase().includes(q) || (m.desc && m.desc.toLowerCase().includes(q)) || (m.tags && m.tags.some(t => t.toLowerCase().includes(q)));
        if (!matches) return false;
      }
      if (selectedVendor) {
        const vLower = selectedVendor.toLowerCase();
        if (!m.org.toLowerCase().includes(vLower) && !vLower.includes(m.org.toLowerCase())) return false;
      }
      if (selectedFamily) {
        const fLower = selectedFamily.toLowerCase();
        if (m.family?.toLowerCase() !== fLower && !m.name.toLowerCase().includes(fLower)) return false;
      }
      if (selectedCapability) {
        const cLower = selectedCapability.toLowerCase();
        if (m.category?.toLowerCase() !== cLower && !m.tags.some(t => t.toLowerCase().includes(cLower)) && !m.area.toLowerCase().includes(cLower)) return false;
      }
      if (selectedDomain) {
        const dLower = selectedDomain.toLowerCase();
        if (!m.area.toLowerCase().includes(dLower) && !m.tags.some(t => t.toLowerCase().includes(dLower)) && !m.desc.toLowerCase().includes(dLower)) return false;
      }
      if (selectedCollection) {
        const colLower = selectedCollection.toLowerCase().replace(" models", "").trim();
        if (!m.tags.some(t => t.toLowerCase().includes(colLower)) && !m.area.toLowerCase().includes(colLower) && m.category?.toLowerCase() !== colLower) return false;
      }
      return true;
    });
  }, [allModels, selectedVendor, selectedDomain, selectedCapability, selectedFamily, selectedCollection, searchQuery]);

  const topModelForSelection = useMemo(() => {
    if (!activeFilterLabel) return null;
    return TOP_MODELS_BOXES.find(card => {
      if (selectedVendor && (card.sub.toLowerCase().includes(selectedVendor.toLowerCase()) || selectedVendor.toLowerCase().includes(card.sub.toLowerCase()))) return true;
      if (selectedFamily && card.family.toLowerCase() === selectedFamily.toLowerCase()) return true;
      if (selectedCapability && card.capability.toLowerCase() === selectedCapability.toLowerCase()) return true;
      if (selectedDomain && (card.domain.toLowerCase().includes(selectedDomain.toLowerCase()) || selectedDomain.toLowerCase().includes(card.domain.toLowerCase()))) return true;
      if (selectedCollection && card.collection.toLowerCase().includes(selectedCollection.toLowerCase())) return true;
      return false;
    }) || TOP_MODELS_BOXES[0];
  }, [selectedVendor, selectedFamily, selectedCapability, selectedDomain, selectedCollection, activeFilterLabel]);

  const handleCopyQuickstart = () => {
    if (inspectedModel?.quickstart) {
      navigator.clipboard.writeText(inspectedModel.quickstart);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-full overflow-hidden bg-[#F8F7F2] font-sans text-slate-800">
      <div className="flex-1 flex overflow-hidden">
        <main className="flex-1 overflow-y-auto overflow-x-hidden hide-scroll">
        <div className="max-w-7xl mx-auto px-6 py-8 w-full">
          
          {/* 1. HERO SECTION (Exact tasks UI reference) */}
          <div className="relative overflow-hidden mb-10 hidden md:flex min-h-[187.5px]">
            <div className="relative z-10 w-[30%] px-6 md:px-8 py-4 md:py-5">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 tracking-tight text-gray-900">
                All Research<br /><span className="text-[#e11d48]">Domains &amp; Models</span>
              </h1>
              <p className="text-gray-600 text-xs md:text-sm mb-4 max-w-md leading-relaxed">
                Explore the full spectrum of AI research across tasks, foundation models, evaluation benchmarks, and applications.
              </p>
              <div className="flex items-center gap-4 whitespace-nowrap text-xs md:text-sm">
                <div className="flex items-center gap-4">
                  <div>
                    <div className="text-lg md:text-xl font-bold text-gray-800">24</div>
                    <div className="text-gray-500 text-[10px] md:text-xs">Capabilities</div>
                  </div>
                  <div className="w-px h-6 bg-gray-200"></div>
                </div>
                <div className="flex items-center gap-4">
                  <div>
                    <div className="text-lg md:text-xl font-bold text-gray-800">120+</div>
                    <div className="text-gray-500 text-[10px] md:text-xs">Model Families</div>
                  </div>
                  <div className="w-px h-6 bg-gray-200"></div>
                </div>
                <div className="flex items-center gap-4">
                  <div>
                    <div className="text-lg md:text-xl font-bold text-gray-800">400+</div>
                    <div className="text-gray-500 text-[10px] md:text-xs">Verified SOTA</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 border-2 border-gray-200 rounded-full px-2.5 py-1 bg-white/50 backdrop-blur-sm ml-1 cursor-pointer hover:shadow-sm">
                  <TrendingUp className="text-emerald-500" size={10} />
                  <span className="text-gray-600 font-medium text-[10px] md:text-xs">Daily updates</span>
                </div>
              </div>
            </div>
            <div className="relative w-[70%] h-[250px] flex justify-center"></div>
          </div>
          <div className="flex gap-6">
            
            {/* LEFT SIDEBAR WITH SEARCH & NAVIGATION OPTIONS EXACT TO reference */}
            <aside className="w-64 flex-shrink-0 hidden lg:block backdrop-blur-sm" aria-label="Domain navigation">
              <div className="sticky top-20 flex flex-col h-[calc(100vh-5rem)]">
                <div className="px-4 pt-6 pb-4">
                  <h3 className="text-[15px] font-semibold uppercase text-[#e11d48] mb-3">Browse Research</h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Filter domains & models..."
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-sm border border-gray-200 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 bg-white/80 transition-colors"
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

                <nav className="overflow-y-auto px-2 pb-4" aria-label="Domains">
                  <ul className="space-y-0.5" role="list">
                    {[
                      { id: "all", label: "All Categories" },
                      { id: "section-capability", label: "Browse by Capability" },
                      { id: "section-family", label: "Browse by Model Family" },
                      { id: "section-organization", label: "Browse by Organization" },
                      { id: "section-research", label: "Browse by Research Area" },
                      { id: "section-trending", label: "Trending Models" },
                      { id: "section-integrations", label: "Ecosystem Integrations" },
                      { id: "section-recently-released", label: "Recently Released" },
                      { id: "section-collections", label: "Popular Collections" },
                      { id: "model-directory", label: "Model Directory Table" }
                    ].map((item) => {
                      const isActive = activeSection === item.id || (item.id === "all" && activeSection === "all");
                      return (
                        <li key={item.id}>
                          <button
                            onClick={() => {
                              setActiveSection(item.id);
                              if (item.id !== "all") {
                                const el = document.getElementById(item.id);
                                if (el) el.scrollIntoView({ behavior: "smooth" });
                              } else {
                                window.scrollTo({ top: 0, behavior: "smooth" });
                              }
                            }}
                            className={`sidebar-nav-btn ${isActive ? "active" : ""}`}
                          >
                            {item.label}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                <div className="px-2 mt-10">
                  <div className="bg-gradient-to-br from-rose-50 to-white rounded-xl border border-rose-100 p-4 shadow-sm">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-rose-100 rounded-full text-rose-500 shrink-0">
                        <MessageSquare className="h-4 w-4" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-800">Can’t find what you need?</p>
                        <p className="text-xs text-gray-500">Suggest a new domain or model to improve our taxonomy.</p>
                      </div>
                    </div>
                    <button
                      onClick={() => alert("Thank you! Suggestion recorded for next taxonomy update.")}
                      className="mt-3 w-full flex items-center justify-center gap-1.5 bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg text-xs font-semibold transition-colors shadow-sm cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" /> Suggest a Domain
                    </button>
                  </div>
                </div>
              </div>
            </aside>

            {/* RIGHT CONTENT AREA CONTAINING ALL SECTIONS & EXACT CARDS */}
            <div className="flex-1 min-w-0">
              
              {/* 2. BROWSE BY CAPABILITY (Exact tasks UI reference cards) */}
              <section id="section-capability" className="mb-12 scroll-mt-24">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <h2 className="text-[30px] font-bold text-gray-800">Browse by Capability</h2>
                  </div>
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">24 Tasks &amp; Modalities</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {BROWSE_BY_CAPABILITY.filter(c => !searchQuery || c.toLowerCase().includes(searchQuery.toLowerCase())).map((cap, idx) => {
                    const { Icon: SkeletalIcon, color: strokeColor } = getSkeletalIcon(idx, cap);
                    const isActive = selectedCapability === cap;
                    return (
                      <div
                        key={cap}
                        onClick={() => handleCapabilityClick(cap)}
                        className={`directory-grid-card group ${
                          isActive ? "active" : ""
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className="flex-shrink-0 p-2 rounded-lg group-hover:scale-150 transition-transform">
                            <SkeletalIcon size={20} style={{ color: strokeColor }} />
                          </div>
                          <h3 className="font-semibold text-gray-800 text-[15px] leading-snug mb-0.5">{cap}</h3>
                        </div>
                        <p className="text-sm text-gray-500 mt-1.5 ml-11 mr-4 line-clamp-3">
                          Models that understand, generate, and execute specialized tasks across {cap}.
                        </p>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* 3. BROWSE BY MODEL FAMILY */}
              <section id="section-family" className="mb-12 scroll-mt-24">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <h2 className="text-[30px] font-bold text-gray-800">Browse by Model Family</h2>
                  </div>
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">20 Model Families</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {BROWSE_BY_FAMILY.filter(f => !searchQuery || f.name.toLowerCase().includes(searchQuery.toLowerCase()) || f.org.toLowerCase().includes(searchQuery.toLowerCase())).map((fam, idx) => {
                    const { Icon: SkeletalIcon, color: strokeColor } = getSkeletalIcon(idx + 3, fam.name);
                    const isActive = selectedFamily === fam.name;
                    return (
                      <div
                        key={fam.name}
                        onClick={() => handleFamilyClick(fam.name)}
                        className={`directory-grid-card group ${
                          isActive ? "active" : ""
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2 min-w-0">
                            <div className="flex-shrink-0 p-2 rounded-lg group-hover:scale-150 transition-transform">
                              <SkeletalIcon size={20} style={{ color: strokeColor }} />
                            </div>
                            <h3 className="font-semibold text-gray-800 text-[15px] leading-snug mb-0.5">{fam.name}</h3>
                          </div>
                          <span className="text-[11px] font-semibold text-gray-400 bg-gray-50 px-2 py-0.5 rounded border border-gray-100 shrink-0">
                            {fam.count} Models
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1.5 ml-11 mr-4 line-clamp-3">
                          Foundation architecture family developed and maintained by {fam.org}.
                        </p>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* 4. BROWSE BY ORGANIZATION */}
              <section id="section-organization" className="mb-12 scroll-mt-24">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <h2 className="text-[30px] font-bold text-gray-800">Browse by Organization</h2>
                  </div>
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">20 Leading Labs</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {BROWSE_BY_ORGANIZATION.filter(o => !searchQuery || o.name.toLowerCase().includes(searchQuery.toLowerCase())).map((v, idx) => {
                    const { Icon: SkeletalIcon, color: strokeColor } = getSkeletalIcon(idx + 7, v.name);
                    const isActive = selectedVendor === v.name;
                    return (
                      <div
                        key={v.name}
                        onClick={() => handleVendorClick(v.name)}
                        className={`directory-grid-card group ${
                          isActive ? "active" : ""
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2 min-w-0">
                            <div className="flex-shrink-0 p-2 rounded-lg group-hover:scale-150 transition-transform">
                              <SkeletalIcon size={20} style={{ color: strokeColor }} />
                            </div>
                            <h3 className="font-semibold text-gray-800 text-[15px] leading-snug mb-0.5">{v.name}</h3>
                          </div>
                          <span className="text-[11px] font-semibold text-gray-400 bg-gray-50 px-2 py-0.5 rounded border border-gray-100 shrink-0">
                            {v.count} Models
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1.5 ml-11 mr-4 line-clamp-3">
                          Explore frontier AI models, weights, and verified APIs published by {v.name}.
                        </p>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* 5. BROWSE BY RESEARCH AREA */}
              <section id="section-research" className="mb-12 scroll-mt-24">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <h2 className="text-[30px] font-bold text-gray-800">Browse by Research Area</h2>
                  </div>
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">20 Modalities &amp; Domains</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {BROWSE_BY_RESEARCH_AREA.filter(r => !searchQuery || r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.leader.toLowerCase().includes(searchQuery.toLowerCase())).map((d, idx) => {
                    const { Icon: SkeletalIcon, color: strokeColor } = getSkeletalIcon(idx + 11, d.name);
                    const isActive = selectedDomain === d.name;
                    return (
                      <div
                        key={d.name}
                        onClick={() => handleDomainClick(d.name)}
                        className={`directory-grid-card group ${
                          isActive ? "active" : ""
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2 min-w-0">
                            <div className="flex-shrink-0 p-2 rounded-lg group-hover:scale-150 transition-transform">
                              <SkeletalIcon size={20} style={{ color: strokeColor }} />
                            </div>
                            <h3 className="font-semibold text-gray-800 text-[15px] leading-snug mb-0.5">{d.name}</h3>
                          </div>
                          <span className="text-[11px] font-semibold text-gray-400 bg-gray-50 px-2 py-0.5 rounded border border-gray-100 shrink-0">
                            {d.count} Models
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1.5 ml-11 mr-4 line-clamp-3">
                          Leading architectural benchmarks and evaluations anchored by {d.leader}.
                        </p>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* 6. TRENDING MODELS */}
              <section id="section-trending" className="mb-12 scroll-mt-24">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <h2 className="text-[30px] font-bold text-gray-800">Trending Models</h2>
                  </div>
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Most Active in 2025</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {TRENDING_MODELS.filter(m => !searchQuery || m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.org.toLowerCase().includes(searchQuery.toLowerCase())).map((m, idx) => {
                    const { Icon: SkeletalIcon, color: strokeColor } = getSkeletalIcon(idx + 15, m.name);
                    return (
                      <div
                        key={m.name}
                        onClick={() => {
                          const match = allModels.find(x => x.name.toLowerCase() === m.name.toLowerCase() || x.name.toLowerCase().includes(m.name.toLowerCase()));
                          if (match) setInspectedModel(match);
                          else {
                            setInspectedModel({
                              id: m.name.toLowerCase().replace(/\s+/g, "-"),
                              name: m.name,
                              org: m.org,
                              desc: m.desc,
                              params: "Dense / MoE Scale",
                              context: "256k tokens",
                              releaseDate: "Expected 2025",
                              license: "Proprietary / Open",
                              elo: Number(m.elo),
                              tags: [m.family, "Trending 2025", "SOTA"],
                              area: "Reasoning & Multimodal",
                              paperCount: 320,
                              benchmarks: [{ name: "Verified SOTA Benchmark", score: `${m.elo} Elo`, value: 92, max: 100, color: "#FF5A1F" }],
                              quickstart: `# Quickstart snippet for ${m.name}\ncurl -X POST https://api.frontier-atlas.ai/v1/chat/completions \\\n  -H "Authorization: Bearer $API_KEY" \\\n  -d '{"model": "${m.name.toLowerCase().replace(/\s+/g, "-")}", "messages": [{"role": "user", "content": "Hello world"}]}'`,
                              family: m.family,
                              category: "Reasoning"
                            });
                          }
                        }}
                        className="directory-grid-card group"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2 min-w-0">
                            <div className="flex-shrink-0 p-2 rounded-lg group-hover:scale-150 transition-transform">
                              <SkeletalIcon size={20} style={{ color: strokeColor }} />
                            </div>
                            <h3 className="font-semibold text-gray-800 text-[15px] leading-snug mb-0.5">{m.name}</h3>
                          </div>
                          
                        </div>
                        <p className="text-xs font-semibold text-gray-400 ml-11 mb-1">{m.org} &middot; {m.family}</p>
                        <p className="text-sm text-gray-500 mt-1 ml-11 mr-4 line-clamp-3" title={m.desc}>{m.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* 6.5. FEATURED MODEL WRAPPERS & ECOSYSTEM INTEGRATIONS */}
              <section id="section-integrations" className="mb-12 scroll-mt-24">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <h2 className="text-[30px] font-bold text-gray-800">Featured Model Wrappers &amp; Ecosystem Integrations</h2>
                  </div>
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Official Partner Integrations</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {FEATURED_INTEGRATIONS.filter(item => !searchQuery || item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.family.toLowerCase().includes(searchQuery.toLowerCase())).map((item, idx) => {
                    const { Icon: SkeletalIcon, color: strokeColor } = getSkeletalIcon(idx, item.name);
                    return (
                      <a
                        key={item.name}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="directory-grid-card group"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <div className="flex-shrink-0 p-2 rounded-lg group-hover:scale-150 transition-transform">
                            <SkeletalIcon size={20} style={{ color: strokeColor }} />
                          </div>
                          <div className="min-w-0">
                            <div className="text-[10px] font-bold text-rose-500 uppercase tracking-wider truncate">{item.family}</div>
                            <h3 className="font-semibold text-gray-800 text-[15px] leading-snug truncate mb-0">{item.name}</h3>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-1.5 ml-11 mr-4 line-clamp-3" title={item.desc}>{item.desc}</p>
                      </a>
                    );
                  })}
                </div>
              </section>

        {/* 7. RECENTLY RELEASED (Page 4) */}
        <div className="models-block-section">
          <div className="models-block-header">
            <h2 className="models-block-title">
              <Calendar size={22} style={{ color: "#FF5A1F" }} />
              <span>Recently Released</span>
            </h2>
            <span className="models-block-count">Latest Foundation Arrivals</span>
          </div>
          <div style={{ background: "#ffffff", border: "1px solid var(--border)", borderRadius: "2px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
            <div style={{ overflowX: "auto" }}>
              <table className="models-data-table" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #111111" }}>
                    <th style={{ padding: "14px 18px", textAlign: "left", fontSize: "11px", fontWeight: 900, textTransform: "uppercase", color: "#666666" }}>Model Name</th>
                    <th style={{ padding: "14px 18px", textAlign: "left", fontSize: "11px", fontWeight: 900, textTransform: "uppercase", color: "#666666" }}>Organization</th>
                    <th style={{ padding: "14px 18px", textAlign: "left", fontSize: "11px", fontWeight: 900, textTransform: "uppercase", color: "#666666" }}>Release Date</th>
                    <th style={{ padding: "14px 18px", textAlign: "left", fontSize: "11px", fontWeight: 900, textTransform: "uppercase", color: "#666666" }}>Model Family</th>
                    <th style={{ padding: "14px 18px", textAlign: "left", fontSize: "11px", fontWeight: 900, textTransform: "uppercase", color: "#666666" }}>Short Description</th>
                  </tr>
                </thead>
                <tbody>
                  {RECENTLY_RELEASED.map((r) => (
                    <tr
                      key={r.name}
                      onClick={() => {
                        const match = allModels.find(x => x.name.toLowerCase() === r.name.toLowerCase() || x.name.toLowerCase().includes(r.name.toLowerCase()));
                        if (match) setInspectedModel(match);
                      }}
                      style={{ borderBottom: "1px solid var(--border)", cursor: "pointer" }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#FFF8F6"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                    >
                      <td style={{ padding: "16px 18px", fontWeight: 900, fontSize: "14.5px", color: "#111111", display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#FF5A1F", display: "inline-block" }}></span>
                        <span>{r.name}</span>
                      </td>
                      <td style={{ padding: "16px 18px", fontWeight: 700, fontSize: "13.5px", color: "#555555" }}>{r.org}</td>
                      <td style={{ padding: "16px 18px", fontFamily: "monospace", fontWeight: 700, fontSize: "13px", color: "#FF5A1F" }}>{r.date}</td>
                      <td style={{ padding: "16px 18px", fontWeight: 800, fontSize: "13px", color: "#111111" }}>
                        <span style={{ padding: "4px 10px", background: "#F8F7F2", borderRadius: "2px", border: "1px solid var(--border)" }}>{r.family}</span>
                      </td>
                      <td style={{ padding: "16px 18px", fontSize: "13.5px", fontWeight: 500, color: "#444444", maxWidth: "480px" }}>{r.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 8. POPULAR MODEL COLLECTIONS (Page 4 & 5) */}
        <div className="models-block-section">
          <div className="models-block-header">
            <h2 className="models-block-title">
              <BookOpen size={22} style={{ color: "#FF5A1F" }} />
              <span>Popular Model Collections</span>
            </h2>
            <span className="models-block-count">15 Curated Tracks</span>
          </div>
          <div className="models-collections-grid">
            {POPULAR_COLLECTIONS.map((col) => {
              const isActive = selectedCollection === col.name;
              return (
                <button
                  key={col.name}
                  onClick={() => handleCollectionClick(col.name)}
                  className={`models-collection-card ${isActive ? "active" : ""}`}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span className="models-collection-icon">{col.icon}</span>
                    <span className="models-family-card-count" style={{ background: isActive ? "#FF5A1F" : "#F8F7F2", color: isActive ? "#ffffff" : "#666666" }}>
                      {col.count}
                    </span>
                  </div>
                  <span style={{ fontWeight: 900, fontSize: "14px", letterSpacing: "-0.2px", lineHeight: "1.3", marginTop: "10px", textAlign: "left" }}>
                    {col.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 9. MODEL DIRECTORY (Page 5 & 6 Table Section) */}
        <div id="model-directory" className="models-catalog-section" style={{ borderRadius: "2px" }}>
          <div className="models-catalog-header">
            <div className="models-catalog-title-box">
              <span style={{ fontSize: "11px", fontFamily: "monospace", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", color: "#FF5A1F", background: "#FFF6F3", padding: "4px 10px", borderRadius: "2px", border: "1px solid #FFEDD5", display: "inline-block", marginBottom: "6px" }}>
                {activeFilterLabel ? `Filtered Directory: ${activeFilterLabel}` : "Unfiltered Registry"}
              </span>
              <h2>Model Directory ({filteredCatalogModels.length} {filteredCatalogModels.length === 1 ? "Model" : "Models"})</h2>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              {activeFilterLabel && (
                <button
                  onClick={clearAllFilters}
                  style={{ padding: "8px 16px", background: "#FFF6F3", color: "#FF5A1F", border: "1px solid #FFEDD5", borderRadius: "2px", fontWeight: 800, fontSize: "12.5px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <X size={14} />
                  <span>Clear Filter ({activeFilterLabel})</span>
                </button>
              )}
              <span style={{ fontSize: "12.5px", fontWeight: 800, color: "#666666" }}>
                Sorted by SOTA Elo Rank &amp; Release Velocity
              </span>
            </div>
          </div>

          {/* Top model highlighted normally at start of directory when filter is active (styled cleanly without bulky box) */}
          {activeFilterLabel && topModelForSelection && (
            <div style={{ marginBottom: "32px", paddingBottom: "24px", borderBottom: "1px solid var(--border)", background: "#F8F7F2", padding: "24px", borderRadius: "2px", border: "1px solid var(--border)", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <span style={{ fontSize: "11px", fontFamily: "monospace", textTransform: "uppercase", padding: "3px 8px", background: "#FFF6F3", color: "#FF5A1F", borderRadius: "2px", border: "1px solid #FFEDD5", fontWeight: 800 }}>
                    ⚡ SOTA Leader &middot; {topModelForSelection.sub} ({activeFilterLabel})
                  </span>
                  <span style={{ fontSize: "12px", fontFamily: "monospace", color: "#666666", fontWeight: 700 }}>
                    Rank #1 verified benchmark leader
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: "14px", flexWrap: "wrap" }}>
                  <h3 style={{ fontSize: "24px", fontWeight: 900, color: "#111111", letterSpacing: "-0.5px" }}>
                    {topModelForSelection.name}
                  </h3>
                  <span style={{ fontSize: "14.5px", fontWeight: 800, color: "#FF5A1F" }}>
                    {topModelForSelection.score}
                  </span>
                </div>
                <p style={{ fontSize: "14px", color: "#555555", fontWeight: 500, marginTop: "6px", maxWidth: "780px", lineHeight: "1.5" }}>
                  {topModelForSelection.desc}
                </p>
              </div>
              <button
                onClick={() => {
                  const match = allModels.find(x => x.name.toLowerCase() === topModelForSelection.name.toLowerCase() || x.name.toLowerCase().includes(topModelForSelection.name.toLowerCase()));
                  if (match) setInspectedModel(match);
                }}
                style={{ padding: "10px 20px", background: "#111111", color: "#ffffff", borderRadius: "2px", fontWeight: 700, fontSize: "13px", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
              >
                <span>Inspect Specs</span>
                <ExternalLink size={14} />
              </button>
            </div>
          )}

          {filteredCatalogModels.length === 0 ? (
            <div style={{ padding: "60px 20px", textAlign: "center", background: "#F8F7F2", borderRadius: "2px", border: "1px dashed var(--border)" }}>
              <p style={{ fontSize: "15px", fontWeight: 700, color: "#555555" }}>No deep evaluation records match your exact filter ({activeFilterLabel || searchQuery}) right now.</p>
              <button
                onClick={clearAllFilters}
                style={{ marginTop: "12px", fontSize: "13px", fontWeight: 800, color: "#FF5A1F", background: "transparent", border: "none", cursor: "pointer", textDecoration: "underline" }}
              >
                Reset All Filters &amp; Browse All Foundation Models &rarr;
              </button>
            </div>
          ) : (
            <div className="models-catalog-table-wrapper">
              <table className="models-data-table">
                <thead>
                  <tr>
                    <th className="col-idx">#</th>
                    <th className="col-name">Model</th>
                    <th className="col-org">Organization</th>
                    <th className="col-family">Model Family</th>
                    <th>Category</th>
                    <th>Parameters</th>
                    <th>Context Window</th>
                    <th>License</th>
                    <th style={{ textAlign: "left" }}>Benchmarks</th>
                    <th>Papers</th>
                    <th>Release Date</th>
                    <th style={{ textAlign: "right" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCatalogModels.map((model, idx) => (
                    <tr key={model.id} onClick={() => setInspectedModel(model)}>
                      <td className="col-idx">{(idx + 1).toString().padStart(3, "0")}</td>
                      <td className="col-name">
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#FF5A1F", display: "inline-block", flexShrink: 0 }}></span>
                          <span>{model.name}</span>
                        </div>
                      </td>
                      <td className="col-org" style={{ fontWeight: 700, color: "#555555" }}>{model.org}</td>
                      <td className="col-family" style={{ fontWeight: 800, color: "#111111", whiteSpace: "nowrap" }}>
                        <span style={{ padding: "3px 8px", background: "#F8F7F2", borderRadius: "2px", border: "1px solid var(--border)", fontSize: "11px", whiteSpace: "nowrap", display: "inline-block" }}>{model.family || "Foundation"}</span>
                      </td>
                      <td style={{ color: "#555555", fontWeight: 700 }}>{model.category || "General Purpose"}</td>
                      <td style={{ fontFamily: "monospace", fontSize: "11px", color: "#333333" }}>{model.params || "Dense / MoE"}</td>
                      <td style={{ fontFamily: "monospace", fontSize: "11px", color: "#111111", fontWeight: 700 }}>{model.context || "128k tokens"}</td>
                      <td style={{ color: "#555555", fontSize: "11px", fontWeight: 600 }}>{model.license || "Proprietary"}</td>
                      <td style={{ textAlign: "left", fontWeight: 900, color: "#FF5A1F", fontFamily: "monospace", fontSize: "11px" }}>
                        {model.elo ? `⚡ ${model.elo} Elo` : `${model.benchmarks?.length || 3} verified`}
                      </td>
                      <td style={{ color: "#555555", fontWeight: 700, fontSize: "11px" }}>{model.paperCount || 150} papers</td>
                      <td style={{ fontFamily: "monospace", fontSize: "11px", color: "#777777" }}>{model.releaseDate || "2024-2025"}</td>
                      <td className="col-action">
                        <button className="models-inspect-btn" style={{ borderRadius: "2px" }}>Inspect &rarr;</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
            </div>
          </div>
        </div>
      </main>
      </div>

      {/* INSPECT MODEL SLIDE-OVER MODAL */}
      {inspectedModel && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "flex-end", background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}>
          <div style={{ background: "#ffffff", width: "100%", maxWidth: "660px", height: "100%", overflowY: "auto", padding: "32px", boxShadow: "-10px 0 30px rgba(0,0,0,0.15)", display: "flex", flexDirection: "column", justifyContent: "space-between", borderLeft: "1px solid var(--border)" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: "16px", borderBottom: "1px solid var(--border)", marginBottom: "24px" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", padding: "4px 10px", background: "#FFF6F3", color: "#FF5A1F", borderRadius: "2px", border: "1px solid #FFEDD5" }}>
                      {inspectedModel.org}
                    </span>
                    {inspectedModel.family && (
                      <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", padding: "4px 10px", background: "#F8F7F2", color: "#333333", borderRadius: "2px", border: "1px solid var(--border)" }}>
                        Family: {inspectedModel.family}
                      </span>
                    )}
                  </div>
                  <h2 style={{ fontSize: "28px", fontWeight: 900, color: "#111111", marginTop: "8px" }}>
                    {inspectedModel.name}
                  </h2>
                </div>
                <button
                  onClick={() => setInspectedModel(null)}
                  style={{ width: "40px", height: "40px", borderRadius: "2px", background: "#F8F7F2", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", color: "#555555", cursor: "pointer" }}
                >
                  <X size={20} />
                </button>
              </div>

              <p style={{ fontSize: "15px", color: "#555555", fontWeight: 500, lineHeight: "1.6", marginBottom: "24px" }}>
                {inspectedModel.desc}
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "24px", background: "#F8F7F2", padding: "16px", borderRadius: "2px", border: "1px solid var(--border)", fontSize: "12px" }}>
                <div>
                  <span style={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", color: "#8B8B8B", display: "block", marginBottom: "4px" }}>Architecture</span>
                  <span style={{ fontWeight: 800, color: "#111111" }}>{inspectedModel.params || "Dense / MoE"}</span>
                </div>
                <div>
                  <span style={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", color: "#8B8B8B", display: "block", marginBottom: "4px" }}>Context</span>
                  <span style={{ fontWeight: 800, color: "#111111" }}>{inspectedModel.context || "128k tokens"}</span>
                </div>
                <div>
                  <span style={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", color: "#8B8B8B", display: "block", marginBottom: "4px" }}>Elo / SOTA</span>
                  <span style={{ fontWeight: 800, color: "#16A34A" }}>{inspectedModel.elo ? `⚡ ${inspectedModel.elo}` : "N/A"}</span>
                </div>
                <div>
                  <span style={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", color: "#8B8B8B", display: "block", marginBottom: "4px" }}>Citations</span>
                  <span style={{ fontWeight: 800, color: "#111111" }}>{inspectedModel.paperCount}</span>
                </div>
              </div>

              {inspectedModel.benchmarks && inspectedModel.benchmarks.length > 0 && (
                <div style={{ marginBottom: "24px" }}>
                  <h3 style={{ fontSize: "14px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.5px", color: "#111111", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                    <Trophy size={16} style={{ color: "#FF5A1F" }} />
                    <span>Verified Academic Benchmarks</span>
                  </h3>
                  <div style={{ background: "#F8F7F2", borderRadius: "2px", padding: "16px", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "14px" }}>
                    {inspectedModel.benchmarks.map((bm, i) => (
                      <div key={i}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "13px", fontWeight: 700, marginBottom: "4px" }}>
                          <span style={{ color: "#333333" }}>{bm.name}</span>
                          <span style={{ color: "#111111", fontWeight: 900 }}>{bm.score}</span>
                        </div>
                        <div style={{ width: "100%", background: "#E5E5E0", height: "8px", borderRadius: "2px", overflow: "hidden" }}>
                          <div
                            style={{ height: "100%", borderRadius: "2px", width: `${bm.value}%`, backgroundColor: bm.color || "#FF5A1F" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {inspectedModel.quickstart && (
                <div style={{ marginBottom: "24px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ fontSize: "13px", fontWeight: 900, color: "#111111", display: "flex", alignItems: "center", gap: "6px" }}>
                      <Code2 size={16} style={{ color: "#FF5A1F" }} />
                      <span>Inference Quickstart</span>
                    </span>
                    <button
                      onClick={handleCopyQuickstart}
                      style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", fontWeight: 700, padding: "4px 10px", background: "#F3F4F6", border: "none", borderRadius: "2px", cursor: "pointer" }}
                    >
                      {copied ? (
                        <>
                          <Check size={13} style={{ color: "#16A34A" }} />
                          <span style={{ color: "#16A34A" }}>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={13} style={{ color: "#555555" }} />
                          <span>Copy Snippet</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre style={{ background: "#111111", color: "#F8F7F2", padding: "16px", borderRadius: "2px", fontSize: "12px", fontFamily: "monospace", overflowX: "auto", border: "1px solid #333333", lineHeight: "1.5" }}>
                    <code>{inspectedModel.quickstart}</code>
                  </pre>
                </div>
              )}
            </div>

            <div style={{ paddingTop: "24px", borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Link
                href={`/models/${inspectedModel.id}`}
                style={{ padding: "10px 20px", background: "#FF5A1F", color: "#ffffff", borderRadius: "2px", fontWeight: 800, fontSize: "13px", textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}
              >
                <span>View Full Model Detail Page</span>
                <ExternalLink size={14} />
              </Link>
              <button
                onClick={() => setInspectedModel(null)}
                style={{ padding: "10px 20px", background: "#F8F7F2", color: "#111111", borderRadius: "2px", fontWeight: 700, fontSize: "13px", border: "1px solid var(--border)", cursor: "pointer" }}
              >
                Close Panel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ModelsPage() {
  return <ModelsContent />;
}
