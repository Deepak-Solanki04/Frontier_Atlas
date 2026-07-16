export interface SearchResult {
  id: string;
  type: "papers" | "authors" | "methods" | "tasks" | "models" | "datasets";
  slug: string;
  title: string;
  subtitle?: string;
}

const RESEARCH_TASKS: SearchResult[] = [
  { id: "task-vlm", type: "tasks", slug: "vision-language-models", title: "Vision-Language Models", subtitle: "Foundation Models • Multimodal Understanding" },
  { id: "task-multimodal", type: "tasks", slug: "multimodal-models", title: "Multimodal Models", subtitle: "Foundation Models • Text, Image, Audio & Video" },
  { id: "task-omni", type: "tasks", slug: "omni-models", title: "Omni Models", subtitle: "Foundation Models • Unified Native Architecture" },
  { id: "task-agents", type: "tasks", slug: "agentic-reasoning-and-planning", title: "Agentic Reasoning & Planning", subtitle: "AI Agents • Multi-step Execution & Tool Calling" },
  { id: "task-web-agents", type: "tasks", slug: "autonomous-web-and-terminal-agents", title: "Autonomous Web & Terminal Agents", subtitle: "AI Agents • Browser & Developer Environment Control" },
  { id: "task-multi-agent", type: "tasks", slug: "multi-agent-orchestration", title: "Multi-Agent Orchestration", subtitle: "AI Agents • Collaborative Consensus & Distributed Task Execution" },
  { id: "task-coding", type: "tasks", slug: "coding-agents", title: "Coding Agents & Code Generation", subtitle: "AI Agents • Automated Software Engineering" },
  { id: "task-obj-det", type: "tasks", slug: "object-detection-and-segmentation", title: "Object Detection & Segmentation", subtitle: "Vision • Pixel-Level Scene & Object Recognition" },
  { id: "task-vqa", type: "tasks", slug: "visual-question-answering", title: "Visual Question Answering (VQA)", subtitle: "Vision • Reasoning Over Images, Charts & Diagrams" },
  { id: "task-ocr", type: "tasks", slug: "optical-character-recognition", title: "Optical Character Recognition (OCR)", subtitle: "Vision • Document Understanding & Layout Extraction" },
  { id: "task-img-gen", type: "tasks", slug: "image-generation", title: "Image Generation & Synthesis", subtitle: "Generative AI • Diffusion & Autoregressive Visual Models" },
  { id: "task-vid-gen", type: "tasks", slug: "video-generation", title: "Video Generation & Simulation", subtitle: "Generative AI • World Models & Temporal Consistency" },
  { id: "task-reasoning", type: "tasks", slug: "mathematical-and-logical-reasoning", title: "Mathematical & Logical Reasoning", subtitle: "Reasoning • Olympiad Math, Code Verification & Theorem Proving" },
  { id: "task-long-ctx", type: "tasks", slug: "long-context-understanding", title: "Long-Context & Needle-in-a-Haystack", subtitle: "Language Modeling • 1M+ Token Retrieval & Processing" },
  { id: "task-robotics", type: "tasks", slug: "robotics-and-embodied-ai", title: "Robotics & Embodied AI", subtitle: "Robotics • Vision-Language-Action (VLA) & Control Policies" },
  { id: "task-audio", type: "tasks", slug: "speech-and-audio-understanding", title: "Speech & Audio Understanding", subtitle: "Audio • Realtime Speech-to-Speech & Acoustic Modeling" },
  { id: "task-eval", type: "tasks", slug: "llm-evaluation-and-benchmarking", title: "LLM Evaluation & Benchmarking", subtitle: "Evaluation • Automated Safety & Capabilities Assessment" },
  { id: "task-rag", type: "tasks", slug: "retrieval-augmented-generation", title: "Retrieval-Augmented Generation (RAG)", subtitle: "Information Retrieval • Hybrid Neural & Vector Search" },
];

const RESEARCH_METHODS: SearchResult[] = [
  { id: "method-lora", type: "methods", slug: "lora", title: "LoRA: Low-Rank Adaptation", subtitle: "PEFT • Efficient Fine-Tuning with Frozen Backbone" },
  { id: "method-sparse-attn", type: "methods", slug: "sparse-attention", title: "DeepSeek Sparse Attention (MLA / IndexShare)", subtitle: "Architecture • Multi-Head Latent & Sparse Attention" },
  { id: "method-flash-attn", type: "methods", slug: "flash-attention", title: "FlashAttention-3 / IO-Aware Attention", subtitle: "Optimization • Exact & Fast Memory-Bounded Attention" },
  { id: "method-speculative", type: "methods", slug: "speculative-decoding", title: "Speculative & Multi-Token Prediction (MTP)", subtitle: "Inference • Accelerated Autoregressive Generation" },
  { id: "method-cot", type: "methods", slug: "chain-of-thought", title: "Chain-of-Thought (CoT) & System 2 Reasoning", subtitle: "Prompting & Test-Time • Intermediate Reasoning Steps" },
  { id: "method-dpo", type: "methods", slug: "direct-preference-optimization", title: "Direct Preference Optimization (DPO & KTO)", subtitle: "Alignment • Reward-Free Preference Fine-Tuning" },
  { id: "method-rlhf", type: "methods", slug: "reinforcement-learning-with-human-feedback", title: "Reinforcement Learning with Human & AI Feedback (RLHF / RLAIF)", subtitle: "Alignment • PPO & GRPO Optimization" },
  { id: "method-moe", type: "methods", slug: "mixture-of-experts", title: "Mixture of Experts (MoE)", subtitle: "Architecture • Sparse Gated Expert Routing" },
  { id: "method-ssm", type: "methods", slug: "state-space-models-mamba", title: "State Space Models (SSM / Mamba)", subtitle: "Architecture • Sub-Quadratic Sequence Modeling" },
  { id: "method-diffusion", type: "methods", slug: "diffusion-models", title: "Diffusion & Flow Matching Models", subtitle: "Generative Architecture • Continuous Normalizing Flows" },
  { id: "method-gqa", type: "methods", slug: "grouped-query-attention", title: "Grouped Query Attention (GQA)", subtitle: "Architecture • KV-Cache Compression & Latency Reduction" },
  { id: "method-quant", type: "methods", slug: "quantization-fp8-int4", title: "FP8, AWQ & GGUF Quantization", subtitle: "Compression • Low-Bit Post-Training Quantization" },
  { id: "method-rag-method", type: "methods", slug: "graph-rag-hybrid-retrieval", title: "GraphRAG & Hybrid Vector Retrieval", subtitle: "Retrieval • Structured Knowledge Graph Generation" },
  { id: "method-resnet", type: "methods", slug: "deep-residual-learning", title: "Deep Residual Learning (ResNet)", subtitle: "Architecture • Identity Shortcut Connections" },
];

const OTHER_RESULTS: SearchResult[] = [
  { id: "model-glm", type: "models", slug: "glm-5-2", title: "GLM-5.2", subtitle: "Z.ai Flagship • 1M Context & Long-Horizon Agents" },
  { id: "model-gemini", type: "models", slug: "gemini-2-5-pro", title: "Gemini 2.5 Pro", subtitle: "Google DeepMind • Multimodal Reasoning & Search" },
  { id: "model-claude", type: "models", slug: "claude-3-7-sonnet", title: "Claude 3.7 Sonnet", subtitle: "Anthropic • Hybrid Fast & Deep Reasoning" },
  { id: "model-deepseek", type: "models", slug: "deepseek-r1", title: "DeepSeek R1", subtitle: "DeepSeek • Open Reasoning via Large-Scale GRPO" },
  { id: "paper-attn", type: "papers", slug: "attention-is-all-you-need", title: "Attention Is All You Need", subtitle: "Ashish Vaswani et al. • Transformer Architecture" },
  { id: "paper-resnet", type: "papers", slug: "deep-residual-learning", title: "Deep Residual Learning for Image Recognition", subtitle: "Kaiming He et al. • ILSVRC 2015 SOTA" },
  { id: "dataset-aime", type: "datasets", slug: "aime-2026-benchmark", title: "AIME 2026 Mathematics Benchmark", subtitle: "Evaluation Dataset • American Invitational Mathematics Exam" },
  { id: "author-kaiming", type: "authors", slug: "kaiming-he", title: "Kaiming He", subtitle: "Author • ResNet, Mask R-CNN, MAE" },
];

export async function searchSuggestions(query: string, limit: number = 20): Promise<SearchResult[]> {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const all = [...RESEARCH_TASKS, ...RESEARCH_METHODS, ...OTHER_RESULTS];

  // First score exact matches or prefix matches in title, then subtitle/slug
  const matches = all.filter((item) => {
    return (
      item.title.toLowerCase().includes(q) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
      item.slug.toLowerCase().includes(q)
    );
  });

  // Sort: prefix matches first, then tasks and methods
  matches.sort((a, b) => {
    const aTitleStarts = a.title.toLowerCase().startsWith(q) ? 1 : 0;
    const bTitleStarts = b.title.toLowerCase().startsWith(q) ? 1 : 0;
    if (aTitleStarts !== bTitleStarts) return bTitleStarts - aTitleStarts;
    return 0;
  });

  return matches.slice(0, limit);
}
