import { fetchApi } from './api';

export interface BenchmarkScore {
  name: string;
  score: string;
  value: number;
  max: number;
  color?: string;
}

export interface ModelItem {
  id: string;
  name: string;
  slug?: string;
  vendor: string;
  vendorLogoUrl?: string | null;
  benchmarks?: any[];
  area?: string;
  elo?: number;
  org?: string;
  context?: string;
  description: string;
  parameterCount?: string;
  contextWindow?: string;
  releaseDate?: string;
  createdAt?: string;
  license?: string;
  trendingScore?: number;
  capabilities: string[];
  researchAreas?: string[];
  paperCount: number;
  benchmarkScore?: Record<string, number>;
  quickstart?: string;
  modelFamily?: string;
  architecture?: string;
  category?: string;
}

export interface LineageNode {
  name: string;
  year?: number;
  isSota?: boolean;
}

export interface LineageItem {
  id: string;
  name: string;
  vendor: string;
  description: string;
  color: string;
  bgStyle: string;
  nodes: LineageNode[];
  latestModel: string;
  timeline: string;
}

const mockModels: ModelItem[] = [
  {
    id: "claude-3-7-sonnet",
    name: "Claude 3.7 Sonnet",
    vendor: "Anthropic",
    description: "First hybrid reasoning frontier model enabling instantaneous responses or extended chain-of-thought verification for complex agentic coding workflows.",
    parameterCount: "Dense / MoE",
    contextWindow: "200k tokens",
    releaseDate: "February 2025",
    license: "Proprietary",
    trendingScore: 1385,
    capabilities: ["Hybrid Reasoning", "Coding Agents", "Tool Use"],
    researchAreas: ["Agentic Coding"],
    paperCount: 452,
    benchmarks: [
      { name: "SWE-bench Verified", score: "62.3%", value: 62.3, max: 100, color: "#FF5A1F" },
      { name: "MMLU-Pro", score: "89.4%", value: 89.4, max: 100, color: "#10B981" },
      { name: "MATH-500", score: "96.2%", value: 96.2, max: 100, color: "#3B82F6" },
    ],
    quickstart: `import anthropic\n\nclient = anthropic.Anthropic()\nmsg = client.messages.create(\n  model="claude-3-7-sonnet-20250219",\n  max_tokens=1024,\n  messages=[{"role": "user", "content": "Analyze this codebase architecture."}]\n)`
  },
  {
    id: "gpt-4o",
    name: "GPT-4o",
    vendor: "OpenAI",
    description: "Flagship omni multimodal foundation model reasoning seamlessly across native audio, vision, and text streams in real-time.",
    parameterCount: "Dense / MoE",
    contextWindow: "128k tokens",
    releaseDate: "May 2024",
    license: "Proprietary",
    trendingScore: 1362,
    capabilities: ["Multimodal", "Reasoning", "Realtime Audio"],
    researchAreas: ["Multimodal"],
    paperCount: 412,
    benchmarks: [
      { name: "MMLU", score: "88.7%", value: 88.7, max: 100, color: "#10B981" },
      { name: "MMMU (Vision)", score: "69.1%", value: 69.1, max: 100, color: "#8B5CF6" },
      { name: "HumanEval", score: "90.2%", value: 90.2, max: 100, color: "#3B82F6" },
    ],
    quickstart: `from openai import OpenAI\n\nclient = OpenAI()\nresponse = client.chat.completions.create(\n  model="gpt-4o",\n  messages=[{"role": "user", "content": "Explain quantum error correction."}]\n)`
  },
  {
    id: "deepseek-r1",
    name: "DeepSeek R1",
    vendor: "DeepSeek AI",
    description: "Breakthrough open reasoning foundation model trained via large-scale reinforcement learning directly eliciting long Chain-of-Thought traces.",
    parameterCount: "671B MoE (37B active)",
    contextWindow: "128k tokens",
    releaseDate: "January 2025",
    license: "MIT Open",
    trendingScore: 1378,
    capabilities: ["Reinforcement Learning", "Reasoning", "Math"],
    researchAreas: ["Reasoning"],
    paperCount: 390,
    benchmarks: [
      { name: "AIME 2024 Math", score: "79.8%", value: 79.8, max: 100, color: "#FF5A1F" },
      { name: "Codeforces Elo", score: "2029", value: 82, max: 100, color: "#3B82F6" },
      { name: "GPQA Diamond", score: "71.5%", value: 71.5, max: 100, color: "#10B981" },
    ],
    quickstart: `# Run locally with Ollama\nollama run deepseek-r1:671b\n\n# Or API call\ncurl -X POST https://api.deepseek.com/v1/chat/completions \\\n  -H "Authorization: Bearer $API_KEY" \\\n  -d '{"model": "deepseek-reasoner", "messages": [{"role": "user", "content": "Solve P vs NP intuition."}]}'`
  },
  {
    id: "gemini-2-0-flash",
    name: "Gemini 2.0 Flash",
    vendor: "Google DeepMind",
    description: "Next-generation agentic foundation model delivering 2x speedup, native tool orchestration, and multi-modal live API interactions.",
    parameterCount: "Dense / MoE",
    contextWindow: "1M tokens",
    releaseDate: "December 2024",
    license: "Proprietary",
    trendingScore: 1358,
    capabilities: ["Agentic AI", "Long Context", "Multimodal"],
    researchAreas: ["Multimodal"],
    paperCount: 365,
    benchmarks: [
      { name: "Long-Context Needle", score: "99.8%", value: 99.8, max: 100, color: "#10B981" },
      { name: "MMMU (Vision)", score: "68.3%", value: 68.3, max: 100, color: "#8B5CF6" },
      { name: "ToolBench", score: "84.5%", value: 84.5, max: 100, color: "#FF5A1F" },
    ],
    quickstart: `import google.generativeai as genai\n\ngenai.configure(api_key="YOUR_API_KEY")\nmodel = genai.GenerativeModel('gemini-2.0-flash')\nresponse = model.generate_content("Summarize 100 research papers.")`
  },
  {
    id: "llama-3-3-70b",
    name: "Llama 3.3 70B",
    vendor: "Meta AI",
    description: "Open-weight instruction-tuned model matching Llama 3.1 405B performance on reasoning, code, and multilingual tasks at a fraction of compute.",
    parameterCount: "70B dense",
    contextWindow: "128k tokens",
    releaseDate: "December 2024",
    license: "Llama 3.3 Community",
    trendingScore: 1344,
    capabilities: ["Open Weight", "Language Modeling", "Distillation"],
    researchAreas: ["Reasoning"],
    paperCount: 480,
    benchmarks: [
      { name: "MMLU", score: "86.0%", value: 86.0, max: 100, color: "#10B981" },
      { name: "GSM8K Math", score: "93.8%", value: 93.8, max: 100, color: "#3B82F6" },
      { name: "HumanEval Code", score: "81.7%", value: 81.7, max: 100, color: "#FF5A1F" },
    ],
    quickstart: `# Using vLLM high-throughput server\npython -m vllm.entrypoints.openai.api_server \\\n  --model meta-llama/Llama-3.3-70B-Instruct \\\n  --tensor-parallel-size 4`
  },
  {
    id: "qwen-2-5-max",
    name: "Qwen 2.5 Max",
    vendor: "Alibaba Cloud",
    description: "Large-scale flagship MoE model surpassing top commercial APIs across math, coding benchmarks, and Chinese/English bilingual comprehension.",
    parameterCount: "MoE Scale",
    contextWindow: "128k tokens",
    releaseDate: "January 2025",
    license: "Proprietary",
    trendingScore: 1370,
    capabilities: ["MoE", "Math & Code", "Bilingual"],
    researchAreas: ["Reasoning"],
    paperCount: 245,
    benchmarks: [
      { name: "MATH Benchmark", score: "94.5%", value: 94.5, max: 100, color: "#3B82F6" },
      { name: "LiveCodeBench", score: "54.2%", value: 54.2, max: 100, color: "#FF5A1F" },
      { name: "Arena Hard", score: "85.8%", value: 85.8, max: 100, color: "#10B981" },
    ],
    quickstart: `from openai import OpenAI\n\nclient = OpenAI(api_key="YOUR_DASHSCOPE_KEY", base_url="https://dashscope.aliyuncs.com/compatible-mode/v1")\nres = client.chat.completions.create(model="qwen-max", messages=[{"role": "user", "content": "Design an autonomous agent framework."}])`
  },
  {
    id: "grok-3",
    name: "Grok 3",
    vendor: "xAI",
    description: "Massive-scale foundation model trained on Colossus supercluster featuring deep reasoning capabilities and live real-time knowledge indexing.",
    parameterCount: "High-scale MoE",
    contextWindow: "128k tokens",
    releaseDate: "February 2025",
    license: "Proprietary",
    trendingScore: 1375,
    capabilities: ["Reasoning", "Realtime Search", "Large Scale"],
    researchAreas: ["Reasoning"],
    paperCount: 180,
    benchmarks: [
      { name: "AIME 2024 Math", score: "81.2%", value: 81.2, max: 100, color: "#FF5A1F" },
      { name: "GPQA Diamond", score: "73.4%", value: 73.4, max: 100, color: "#10B981" },
      { name: "SWE-bench Verified", score: "58.1%", value: 58.1, max: 100, color: "#3B82F6" },
    ],
    quickstart: `curl https://api.x.ai/v1/chat/completions \\\n  -H "Authorization: Bearer $XAI_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{"model": "grok-3", "messages": [{"role": "user", "content": "Simulate orbital mechanics."}]}'`
  },
  {
    id: "rt-2",
    name: "RT-2 (Robotics Transformer 2)",
    vendor: "Google DeepMind",
    description: "Vision-Language-Action (VLA) model trained on internet-scale data directly controlling robotic end-effectors in novel open-world environments.",
    parameterCount: "55B / 5B",
    contextWindow: "32k tokens",
    releaseDate: "July 2023",
    license: "Research Only",
    trendingScore: 1290,
    capabilities: ["Robotics", "Embodied AI", "VLA"],
    researchAreas: ["Robotics & VLA"],
    paperCount: 215,
    benchmarks: [
      { name: "Unseen Object Pick", score: "88.0%", value: 88.0, max: 100, color: "#10B981" },
      { name: "CALVIN Manipulation", score: "92.4%", value: 92.4, max: 100, color: "#3B82F6" },
      { name: "Sim-to-Real Generalization", score: "74.5%", value: 74.5, max: 100, color: "#FF5A1F" },
    ],
    quickstart: `# Robotics inference loop setup\nfrom rt2_control import VLAController\n\nrobot = VLAController(checkpoint="rt2-55b-jax")\naction = robot.step(image_stream, instruction="Pick up the yellow screwdriver")`
  },
  {
    id: "qwen-2-5-coder-32b",
    name: "Qwen 2.5 Coder 32B",
    vendor: "Alibaba Cloud",
    description: "State-of-the-art open coding model achieving 50%+ on SWE-Bench Verified, rivaling closed-weight coding specialists.",
    parameterCount: "32B dense",
    contextWindow: "128k tokens",
    releaseDate: "November 2024",
    license: "Apache 2.0",
    trendingScore: 1335,
    capabilities: ["Coding Agents", "SWE-bench", "Open Weight"],
    researchAreas: ["Agentic Coding"],
    paperCount: 210,
    benchmarks: [
      { name: "SWE-bench Verified", score: "51.4%", value: 51.4, max: 100, color: "#FF5A1F" },
      { name: "EvalPlus (HumanEval)", score: "92.7%", value: 92.7, max: 100, color: "#10B981" },
      { name: "LiveCodeBench Pass@1", score: "48.2%", value: 48.2, max: 100, color: "#3B82F6" },
    ],
    quickstart: `from transformers import AutoModelForCausalLM, AutoTokenizer\n\nmodel = AutoModelForCausalLM.from_pretrained("Qwen/Qwen2.5-Coder-32B-Instruct", device_map="auto")`
  },
  {
    id: "mistral-large-2",
    name: "Mistral Large 2",
    vendor: "Mistral AI",
    description: "Advanced frontier model engineered for high-precision function calling, structured json generation, and complex reasoning.",
    parameterCount: "123B dense",
    contextWindow: "128k tokens",
    releaseDate: "July 2024",
    license: "Mistral Research",
    trendingScore: 1330,
    capabilities: ["Function Calling", "Multilingual", "Code Generation"],
    researchAreas: ["Agentic Coding"],
    paperCount: 190,
    benchmarks: [
      { name: "Berkeley Function Calling", score: "91.2%", value: 91.2, max: 100, color: "#10B981" },
      { name: "MMLU", score: "84.0%", value: 84.0, max: 100, color: "#3B82F6" },
      { name: "Multilingual MMLU", score: "82.8%", value: 82.8, max: 100, color: "#8B5CF6" },
    ],
    quickstart: `from mistralai import Mistral\n\nclient = Mistral(api_key="YOUR_API_KEY")\nres = client.chat.complete(model="mistral-large-latest", messages=[{"role": "user", "content": "Parse this PDF schema."}])`
  },
  {
    id: "phi-4",
    name: "Phi-4",
    vendor: "Microsoft Research",
    description: "Small language model (SLM) trained exclusively on high-quality synthetic data and filtered textbook reasoning step traces.",
    parameterCount: "14B dense",
    contextWindow: "16k tokens",
    releaseDate: "December 2024",
    license: "MIT Open",
    trendingScore: 1305,
    capabilities: ["Small Language Model", "Synthetic Data", "Reasoning"],
    researchAreas: ["Reasoning"],
    paperCount: 155,
    benchmarks: [
      { name: "GSM8K Math", score: "90.4%", value: 90.4, max: 100, color: "#3B82F6" },
      { name: "GPQA Reasoning", score: "56.2%", value: 56.2, max: 100, color: "#10B981" },
      { name: "HumanEval", score: "80.3%", value: 80.3, max: 100, color: "#FF5A1F" },
    ],
    quickstart: `# Run directly on laptop GPU or Apple Silicon\nollama run phi4:14b`
  },
  {
    id: "flux-1-schnell",
    name: "FLUX.1 [schnell]",
    vendor: "Black Forest Labs",
    description: "Fast rectified flow transformer producing photorealistic images in 1 to 4 steps with unmatched prompt adherence and typography accuracy.",
    parameterCount: "12B parameters",
    contextWindow: "Image Gen",
    releaseDate: "August 2024",
    license: "Apache 2.0",
    trendingScore: 1320,
    capabilities: ["Image Generation", "Flow Matching", "Diffusion"],
    researchAreas: ["Vision & Generation"],
    paperCount: 142,
    benchmarks: [
      { name: "GenAI Benchmark Typography", score: "94.1%", value: 94.1, max: 100, color: "#10B981" },
      { name: "Inference Latency (4 steps)", score: "180ms", value: 95, max: 100, color: "#FF5A1F" },
      { name: "Photorealism Elo", score: "1240", value: 85, max: 100, color: "#8B5CF6" },
    ],
    quickstart: `import diffusers\nfrom diffusers import FluxPipeline\n\npipe = FluxPipeline.from_pretrained("black-forest-labs/FLUX.1-schnell")\nimage = pipe("A cyberpunk robotic cat typing code on a holographic keyboard", num_inference_steps=4).images[0]`
  },
  {
    id: "sam-2",
    name: "Segment Anything Model 2 (SAM 2)",
    vendor: "Meta AI",
    description: "Unified promptable visual segmentation model tracking objects across video frames and static images in real-time.",
    parameterCount: "Hierarchical ViT",
    contextWindow: "Video / Image",
    releaseDate: "July 2024",
    license: "Apache 2.0",
    trendingScore: 1315,
    capabilities: ["Computer Vision", "Video Tracking", "Segmentation"],
    researchAreas: ["Vision & Generation"],
    paperCount: 298,
    benchmarks: [
      { name: "SA-V Video Segmentation", score: "76.3 J&F", value: 76.3, max: 100, color: "#10B981" },
      { name: "Zero-Shot COCO mIoU", score: "82.1%", value: 82.1, max: 100, color: "#3B82F6" },
      { name: "Real-Time Tracking FPS", score: "44 FPS", value: 88, max: 100, color: "#FF5A1F" },
    ],
    quickstart: `from sam2.build_sam import build_sam2_video_predictor\n\npredictor = build_sam2_video_predictor("sam2_hiera_large.yaml", "sam2_hiera_large.pt")`
  },
  {
    id: "whisper-v3",
    name: "Whisper V3",
    vendor: "OpenAI",
    description: "Robust universal speech recognition and translation transformer trained on over 5 million hours of diverse multilingual audio.",
    parameterCount: "1.5B parameters",
    contextWindow: "Audio Stream",
    releaseDate: "November 2023",
    license: "MIT Open",
    trendingScore: 1295,
    capabilities: ["Speech-to-Text", "Audio Recognition", "Multilingual"],
    researchAreas: ["Audio & Speech"],
    paperCount: 275,
    benchmarks: [
      { name: "Common Voice WER", score: "4.2%", value: 95.8, max: 100, color: "#10B981" },
      { name: "FLEURS Multilingual WER", score: "7.8%", value: 92.2, max: 100, color: "#3B82F6" },
      { name: "Accented English Accuracy", score: "93.1%", value: 93.1, max: 100, color: "#FF5A1F" },
    ],
    quickstart: `import whisper\n\nmodel = whisper.load_model("large-v3")\nresult = model.transcribe("audio_sample.wav")\nprint(result["text"])`
  },
  {
    id: "deepseek-v3",
    name: "DeepSeek V3",
    vendor: "DeepSeek AI",
    description: "High-efficiency Mixture-of-Experts architecture featuring Multi-head Latent Attention and FP8 mixed precision training.",
    parameterCount: "671B MoE (37B active)",
    contextWindow: "128k tokens",
    releaseDate: "December 2024",
    license: "MIT Open",
    trendingScore: 1368,
    capabilities: ["MoE", "Efficient Attention", "Language Modeling"],
    researchAreas: ["Reasoning"],
    paperCount: 284,
    benchmarks: [
      { name: "MMLU", score: "88.5%", value: 88.5, max: 100, color: "#10B981" },
      { name: "HumanEval Code", score: "89.1%", value: 89.1, max: 100, color: "#3B82F6" },
      { name: "MATH-500", score: "90.2%", value: 90.2, max: 100, color: "#FF5A1F" },
    ],
    quickstart: `from openai import OpenAI\n\nclient = OpenAI(api_key="YOUR_KEY", base_url="https://api.deepseek.com")\nres = client.chat.completions.create(model="deepseek-chat", messages=[{"role": "user", "content": "Explain Multi-Head Latent Attention."}])`
  },
  {
    id: "sd-3-5-large",
    name: "Stable Diffusion 3.5 Large",
    vendor: "Stability AI",
    description: "MMDiT multimodal diffusion transformer generating high-fidelity artwork and accurate text rendering across diverse aspect ratios.",
    parameterCount: "8B parameters",
    contextWindow: "Image Gen",
    releaseDate: "October 2024",
    license: "Stability Community",
    trendingScore: 1310,
    capabilities: ["MMDiT", "Diffusion", "Image Generation"],
    researchAreas: ["Vision & Generation"],
    paperCount: 168,
    benchmarks: [
      { name: "Prompt Adherence Score", score: "88.4%", value: 88.4, max: 100, color: "#10B981" },
      { name: "Visual Aesthetics Preference", score: "81.9%", value: 81.9, max: 100, color: "#8B5CF6" },
      { name: "Typography Rendering", score: "84.2%", value: 84.2, max: 100, color: "#FF5A1F" },
    ],
    quickstart: `import torch\nfrom diffusers import StableDiffusion3Pipeline\n\npipe = StableDiffusion3Pipeline.from_pretrained("stabilityai/stable-diffusion-3.5-large", torch_dtype=torch.bfloat16)`
  },
  {
    id: "o3-mini",
    name: "o3-mini",
    vendor: "OpenAI",
    description: "Optimized reasoning model delivering high-velocity STEM problem solving, advanced coding verification, and customizable reasoning effort tiers.",
    parameterCount: "Dense / MoE",
    contextWindow: "200k tokens",
    releaseDate: "January 2025",
    license: "Proprietary",
    trendingScore: 1370,
    capabilities: ["Reasoning", "Agentic Coding", "STEM"],
    researchAreas: ["Reasoning"],
    paperCount: 310,
    benchmarks: [
      { name: "AIME 2024 Math", score: "87.5%", value: 87.5, max: 100, color: "#FF5A1F" },
      { name: "SWE-bench Verified", score: "49.2%", value: 49.2, max: 100, color: "#3B82F6" },
      { name: "GPQA Diamond", score: "79.8%", value: 79.8, max: 100, color: "#10B981" },
    ],
    quickstart: `from openai import OpenAI\n\nclient = OpenAI()\nres = client.chat.completions.create(\n  model="o3-mini",\n  reasoning_effort="high",\n  messages=[{"role": "user", "content": "Solve this differential equation step by step."}]\n)`
  },
  {
    id: "o1",
    name: "o1",
    vendor: "OpenAI",
    description: "Full-scale frontier reasoning model trained with reinforcement learning to perform deep internal chain-of-thought verification across physics and code.",
    parameterCount: "Dense / MoE",
    contextWindow: "128k tokens",
    releaseDate: "December 2024",
    license: "Proprietary",
    trendingScore: 1375,
    capabilities: ["Chain of Thought", "RL", "Advanced Coding"],
    researchAreas: ["Reasoning"],
    paperCount: 385,
    benchmarks: [
      { name: "Codeforces Rating", score: "89th Percentile", value: 89, max: 100, color: "#FF5A1F" },
      { name: "GPQA Diamond", score: "78.3%", value: 78.3, max: 100, color: "#10B981" },
      { name: "MATH-500", score: "96.4%", value: 96.4, max: 100, color: "#3B82F6" },
    ],
    quickstart: `from openai import OpenAI\n\nclient = OpenAI()\nres = client.chat.completions.create(\n  model="o1",\n  messages=[{"role": "user", "content": "Prove this mathematical conjecture."}]\n)`
  },
  {
    id: "gpt-4-5-preview",
    name: "GPT-4.5 Preview",
    vendor: "OpenAI",
    description: "Largest and most nuanced conversational foundation model with expanded world knowledge, emotional intelligence, and natural instruction adherence.",
    parameterCount: "Large MoE",
    contextWindow: "128k tokens",
    releaseDate: "February 2025",
    license: "Proprietary",
    trendingScore: 1378,
    capabilities: ["World Knowledge", "Nuanced Reasoning", "Conversation"],
    researchAreas: ["Agentic Coding"],
    paperCount: 290,
    benchmarks: [
      { name: "MMLU-Pro", score: "89.1%", value: 89.1, max: 100, color: "#10B981" },
      { name: "HumanEval Code", score: "92.4%", value: 92.4, max: 100, color: "#3B82F6" },
      { name: "IFEval Instruction", score: "88.7%", value: 88.7, max: 100, color: "#FF5A1F" },
    ],
    quickstart: `from openai import OpenAI\n\nclient = OpenAI()\nres = client.chat.completions.create(\n  model="gpt-4.5-preview",\n  messages=[{"role": "user", "content": "Analyze the geopolitical implications of clean energy transitions."}]\n)`
  },
  {
    id: "gpt-4-turbo",
    name: "GPT-4 Turbo",
    vendor: "OpenAI",
    description: "Workhorse foundation multimodal model optimized for enterprise tool execution, structured JSON output, and 128k context windows.",
    parameterCount: "Dense / MoE",
    contextWindow: "128k tokens",
    releaseDate: "April 2024",
    license: "Proprietary",
    trendingScore: 1340,
    capabilities: ["Enterprise", "JSON Mode", "128k Context"],
    researchAreas: ["Agentic Coding"],
    paperCount: 520,
    benchmarks: [
      { name: "MMLU", score: "86.5%", value: 86.5, max: 100, color: "#10B981" },
      { name: "HumanEval", score: "88.2%", value: 88.2, max: 100, color: "#3B82F6" },
      { name: "DROP Reading", score: "83.4%", value: 83.4, max: 100, color: "#FF5A1F" },
    ],
    quickstart: `from openai import OpenAI\n\nclient = OpenAI()\nres = client.chat.completions.create(model="gpt-4-turbo", response_format={"type": "json_object"}, messages=[{"role": "user", "content": "Return summary as JSON."}])`
  },
  {
    id: "gpt-4o-mini",
    name: "GPT-4o mini",
    vendor: "OpenAI",
    description: "Ultra-fast, cost-effective multimodal foundation model designed for high-frequency agentic tasks, function calling, and real-time vision.",
    parameterCount: "Efficient MoE",
    contextWindow: "128k tokens",
    releaseDate: "July 2024",
    license: "Proprietary",
    trendingScore: 1315,
    capabilities: ["Fast", "Cost Effective", "Vision"],
    researchAreas: ["Multimodal"],
    paperCount: 240,
    benchmarks: [
      { name: "MMLU", score: "82.0%", value: 82.0, max: 100, color: "#10B981" },
      { name: "MGSM Math", score: "87.0%", value: 87.0, max: 100, color: "#3B82F6" },
      { name: "MMMU Multimodal", score: "59.4%", value: 59.4, max: 100, color: "#FF5A1F" },
    ],
    quickstart: `from openai import OpenAI\n\nclient = OpenAI()\nres = client.chat.completions.create(model="gpt-4o-mini", messages=[{"role": "user", "content": "Extract items from this receipt image."}])`
  },
  {
    id: "o1-preview",
    name: "o1-preview",
    vendor: "OpenAI",
    description: "Early preview of deep reinforcement learning chain-of-thought models, setting initial breakthroughs in high-tier competitive mathematics.",
    parameterCount: "Dense / MoE",
    contextWindow: "128k tokens",
    releaseDate: "September 2024",
    license: "Proprietary",
    trendingScore: 1350,
    capabilities: ["Preview", "Chain of Thought", "Math"],
    researchAreas: ["Reasoning"],
    paperCount: 180,
    benchmarks: [
      { name: "AIME 2024", score: "83.3%", value: 83.3, max: 100, color: "#FF5A1F" },
      { name: "GPQA Diamond", score: "77.3%", value: 77.3, max: 100, color: "#10B981" },
    ],
    quickstart: `from openai import OpenAI\n\nclient = OpenAI()\nres = client.chat.completions.create(model="o1-preview", messages=[{"role": "user", "content": "Solve this olympiad geometry problem."}])`
  },
  {
    id: "claude-3-5-sonnet-v2",
    name: "Claude 3.5 Sonnet (New)",
    vendor: "Anthropic",
    description: "Industry-standard agentic coding frontier model dominating autonomous software engineering benchmarks and browser tool usage.",
    parameterCount: "Dense / MoE",
    contextWindow: "200k tokens",
    releaseDate: "October 2024",
    license: "Proprietary",
    trendingScore: 1372,
    capabilities: ["SWE-bench", "Computer Use", "Coding Leader"],
    researchAreas: ["Agentic Coding"],
    paperCount: 410,
    benchmarks: [
      { name: "SWE-bench Verified", score: "49.0%", value: 49.0, max: 100, color: "#FF5A1F" },
      { name: "TAU-bench Retail", score: "69.2%", value: 69.2, max: 100, color: "#10B981" },
      { name: "GPQA Diamond", score: "65.0%", value: 65.0, max: 100, color: "#3B82F6" },
    ],
    quickstart: `import anthropic\n\nclient = anthropic.Anthropic()\nres = client.messages.create(model="claude-3-5-sonnet-20241022", max_tokens=1024, messages=[{"role": "user", "content": "Refactor this React module."}])`
  },
  {
    id: "claude-3-5-haiku",
    name: "Claude 3.5 Haiku",
    vendor: "Anthropic",
    description: "High-speed intelligence model exceeding Claude 3 Opus capabilities across coding and reasoning at sub-second latency.",
    parameterCount: "Dense",
    contextWindow: "200k tokens",
    releaseDate: "November 2024",
    license: "Proprietary",
    trendingScore: 1320,
    capabilities: ["High Velocity", "Sub-second", "Coding"],
    researchAreas: ["Agentic Coding"],
    paperCount: 165,
    benchmarks: [
      { name: "SWE-bench Verified", score: "40.6%", value: 40.6, max: 100, color: "#3B82F6" },
      { name: "HumanEval", score: "88.1%", value: 88.1, max: 100, color: "#10B981" },
    ],
    quickstart: `import anthropic\n\nclient = anthropic.Anthropic()\nres = client.messages.create(model="claude-3-5-haiku-20241022", max_tokens=1024, messages=[{"role": "user", "content": "Classify these customer support tickets."}])`
  },
  {
    id: "gemini-2-0-flash-thinking",
    name: "Gemini 2.0 Flash Thinking",
    vendor: "Google DeepMind",
    description: "Experimental multimodal reasoning model combining flash-speed inference with deep internal thought traces and 1M token context.",
    parameterCount: "MoE",
    contextWindow: "1M tokens",
    releaseDate: "December 2024",
    license: "Proprietary",
    trendingScore: 1365,
    capabilities: ["Multimodal Reasoning", "1M Context", "Flash Speed"],
    researchAreas: ["Reasoning"],
    paperCount: 215,
    benchmarks: [
      { name: "AIME 2024 Math", score: "79.4%", value: 79.4, max: 100, color: "#FF5A1F" },
      { name: "MATH-500", score: "93.8%", value: 93.8, max: 100, color: "#10B981" },
    ],
    quickstart: `from google import genai\n\nclient = genai.Client()\nresponse = client.models.generate_content(model="gemini-2.0-flash-thinking-exp", contents="Explain Fermat's Last Theorem intuition.")`
  },
  {
    id: "gemini-1-5-pro",
    name: "Gemini 1.5 Pro",
    vendor: "Google DeepMind",
    description: "First enterprise foundation model featuring an ultra-long 2 million token context window capable of ingesting entire codebases and hours of video.",
    parameterCount: "Dense / MoE",
    contextWindow: "2M tokens",
    releaseDate: "May 2024",
    license: "Proprietary",
    trendingScore: 1345,
    capabilities: ["2M Context", "Video Understanding", "Enterprise"],
    researchAreas: ["Multimodal"],
    paperCount: 340,
    benchmarks: [
      { name: "Needle In A Haystack 2M", score: "99.8%", value: 99.8, max: 100, color: "#10B981" },
      { name: "Video-MME", score: "75.0%", value: 75.0, max: 100, color: "#3B82F6" },
    ],
    quickstart: `from google import genai\n\nclient = genai.Client()\nresponse = client.models.generate_content(model="gemini-1.5-pro", contents="Summarize this 500-page PDF specification.")`
  },
  {
    id: "qwen-2-vl-72b",
    name: "Qwen 2 VL 72B",
    vendor: "Qwen",
    description: "Open-weights vision-language foundation model achieving state-of-the-art document parsing, video timestamp QA, and chart reasoning.",
    parameterCount: "72B Dense",
    contextWindow: "128k tokens",
    releaseDate: "August 2024",
    license: "Apache 2.0",
    trendingScore: 1348,
    capabilities: ["Vision-Language", "Document OCR", "Open Weights"],
    researchAreas: ["Multimodal"],
    paperCount: 195,
    benchmarks: [
      { name: "DocVQA", score: "96.5%", value: 96.5, max: 100, color: "#10B981" },
      { name: "MathVista", score: "68.2%", value: 68.2, max: 100, color: "#3B82F6" },
    ],
    quickstart: `from transformers import Qwen2VLForConditionalGeneration, AutoProcessor\n\nmodel = Qwen2VLForConditionalGeneration.from_pretrained("Qwen/Qwen2-VL-72B-Instruct", device_map="auto")`
  },
  {
    id: "grok-2-1212",
    name: "Grok 2 (1212)",
    vendor: "xAI",
    description: "High-performance frontier foundation model trained on real-time global knowledge streams with strong coding and mathematical logic.",
    parameterCount: "MoE",
    contextWindow: "128k tokens",
    releaseDate: "December 2024",
    license: "Proprietary",
    trendingScore: 1355,
    capabilities: ["Real-time Knowledge", "Coding", "Mathematics"],
    researchAreas: ["Agentic Coding"],
    paperCount: 140,
    benchmarks: [
      { name: "MATH-500", score: "89.0%", value: 89.0, max: 100, color: "#3B82F6" },
      { name: "MMLU-Pro", score: "86.2%", value: 86.2, max: 100, color: "#10B981" },
    ],
    quickstart: `from openai import OpenAI\n\nclient = OpenAI(api_key="YOUR_KEY", base_url="https://api.x.ai/v1")\nres = client.chat.completions.create(model="grok-2-1212", messages=[{"role": "user", "content": "Write a Rust web server."}])`
  },
  {
    id: "gpt-5",
    name: "GPT-5",
    vendor: "OpenAI",
    description: "Next-generation omni-reasoning flagship model combining breakthrough agentic execution, self-correction, and universal tool mastery.",
    parameterCount: "MoE Ultra Scale",
    contextWindow: "500k tokens",
    releaseDate: "Expected 2025",
    license: "Proprietary",
    trendingScore: 1410,
    capabilities: ["General Purpose", "Reasoning", "Agents"],
    researchAreas: ["Reasoning"],
    paperCount: 510,
    benchmarks: [
      { name: "MMLU-Pro", score: "93.8%", value: 93.8, max: 100, color: "#10B981" },
      { name: "SWE-bench Verified", score: "68.5%", value: 68.5, max: 100, color: "#FF5A1F" }
    ],
    quickstart: `from openai import OpenAI\n\nclient = OpenAI()\nres = client.chat.completions.create(model="gpt-5", messages=[{"role": "user", "content": "Architect a distributed consensus engine."}])`,
    modelFamily: "GPT",
    category: "General Purpose"
  },
  {
    id: "claude-opus-5",
    name: "Claude Opus 5",
    vendor: "Anthropic",
    description: "Apex frontier reasoning and constitutional safety model capable of deep academic synthesis, complex proof generation, and long-horizon planning.",
    parameterCount: "Dense / MoE Scale",
    contextWindow: "500k tokens",
    releaseDate: "Expected 2025",
    license: "Proprietary",
    trendingScore: 1405,
    capabilities: ["Reasoning", "Agents", "Long Context"],
    researchAreas: ["Reasoning"],
    paperCount: 480,
    benchmarks: [
      { name: "GPQA Diamond", score: "84.2%", value: 84.2, max: 100, color: "#10B981" },
      { name: "MATH-500", score: "98.1%", value: 98.1, max: 100, color: "#3B82F6" }
    ],
    quickstart: `import anthropic\n\nclient = anthropic.Anthropic()\nres = client.messages.create(model="claude-5-opus-2025", max_tokens=4096, messages=[{"role": "user", "content": "Synthesize a formal mathematical proof."}])`,
    modelFamily: "Claude",
    category: "Reasoning"
  },
  {
    id: "claude-sonnet-5",
    name: "Claude Sonnet 5",
    vendor: "Anthropic",
    description: "High-throughput agentic workhorse model optimized for autonomous coding workflows, browser computer use, and rapid iterative development.",
    parameterCount: "Dense / MoE",
    contextWindow: "200k tokens",
    releaseDate: "Expected 2025",
    license: "Proprietary",
    trendingScore: 1395,
    capabilities: ["Coding", "Agents", "Tool Use"],
    researchAreas: ["Agentic Coding"],
    paperCount: 440,
    benchmarks: [
      { name: "SWE-bench Verified", score: "65.4%", value: 65.4, max: 100, color: "#FF5A1F" },
      { name: "MMLU", score: "91.0%", value: 91.0, max: 100, color: "#10B981" }
    ],
    quickstart: `import anthropic\n\nclient = anthropic.Anthropic()\nres = client.messages.create(model="claude-5-sonnet-2025", max_tokens=2048, messages=[{"role": "user", "content": "Refactor and verify unit tests."}])`,
    modelFamily: "Claude",
    category: "Coding"
  },
  {
    id: "gemini-2-5-pro",
    name: "Gemini 2.5 Pro",
    vendor: "Google DeepMind",
    description: "Next-tier multimodal foundation model with native 2M+ token context, real-time video understanding, and multi-agent task planning.",
    parameterCount: "Dense / MoE Scale",
    contextWindow: "2M tokens",
    releaseDate: "Expected 2025",
    license: "Proprietary",
    trendingScore: 1390,
    capabilities: ["Multimodal", "Long Context", "Video"],
    researchAreas: ["Multimodal AI"],
    paperCount: 420,
    benchmarks: [
      { name: "MMMU (Vision)", score: "74.8%", value: 74.8, max: 100, color: "#8B5CF6" },
      { name: "Needle In A Haystack 2M", score: "100%", value: 100, max: 100, color: "#10B981" }
    ],
    quickstart: `from google import genai\n\nclient = genai.Client()\nres = client.models.generate_content(model="gemini-2.5-pro", contents="Analyze this multi-hour video stream.")`,
    modelFamily: "Gemini",
    category: "Multimodal"
  },
  {
    id: "gemini-2-5-flash",
    name: "Gemini 2.5 Flash",
    vendor: "Google DeepMind",
    description: "Ultra-low-latency multimodal workhorse designed for instantaneous tool calling, streaming voice interactions, and embedded agentic deployment.",
    parameterCount: "Efficient MoE",
    contextWindow: "1M tokens",
    releaseDate: "Expected 2025",
    license: "Proprietary",
    trendingScore: 1375,
    capabilities: ["Fast", "Multimodal", "Tool Use"],
    researchAreas: ["Multimodal AI"],
    paperCount: 390,
    benchmarks: [
      { name: "MMLU", score: "88.9%", value: 88.9, max: 100, color: "#10B981" }
    ],
    quickstart: `from google import genai\n\nclient = genai.Client()\nres = client.models.generate_content(model="gemini-2.5-flash", contents="Execute fast function call orchestration.")`,
    modelFamily: "Gemini",
    category: "General Purpose"
  },
  {
    id: "qwen3",
    name: "Qwen3",
    vendor: "Qwen",
    description: "Alibaba's next flagship open-weights multilingual and reasoning foundation model family with state-of-the-art coding and math accuracy.",
    parameterCount: "Dense & MoE Scale",
    contextWindow: "256k tokens",
    releaseDate: "Expected 2025",
    license: "Apache 2.0",
    trendingScore: 1385,
    capabilities: ["Open Source", "Reasoning", "Multilingual"],
    researchAreas: ["Reasoning"],
    paperCount: 350,
    benchmarks: [
      { name: "AIME Math", score: "84.0%", value: 84.0, max: 100, color: "#3B82F6" }
    ],
    quickstart: `from transformers import AutoModelForCausalLM\nmodel = AutoModelForCausalLM.from_pretrained("Qwen/Qwen3-72B-Instruct", device_map="auto")`,
    modelFamily: "Qwen",
    category: "Reasoning"
  },
  {
    id: "llama-4",
    name: "Llama 4",
    vendor: "Meta AI",
    description: "Meta's next-generation open foundation model trained across multimodal text, vision, and audio with extreme compute efficiency.",
    parameterCount: "400B+ MoE",
    contextWindow: "256k tokens",
    releaseDate: "Expected 2025",
    license: "Llama Community",
    trendingScore: 1388,
    capabilities: ["Open Source", "Multimodal", "General Purpose"],
    researchAreas: ["Large Language Models"],
    paperCount: 460,
    benchmarks: [
      { name: "MMLU-Pro", score: "90.2%", value: 90.2, max: 100, color: "#10B981" }
    ],
    quickstart: `# Run locally with vLLM\npython -m vllm.entrypoints.openai.api_server --model meta-llama/Llama-4-Instruct`,
    modelFamily: "Llama",
    category: "General Purpose"
  },
  {
    id: "kimi-k2",
    name: "Kimi K2",
    vendor: "Moonshot AI",
    description: "Long-context specialist model from Moonshot AI offering deep document understanding across 2M+ Chinese and English tokens.",
    parameterCount: "MoE Scale",
    contextWindow: "2M tokens",
    releaseDate: "2025",
    license: "Proprietary",
    trendingScore: 1360,
    capabilities: ["Long Context", "Document AI", "Search"],
    researchAreas: ["Document AI"],
    paperCount: 210,
    benchmarks: [
      { name: "Long-Context Needle", score: "99.9%", value: 99.9, max: 100, color: "#10B981" }
    ],
    quickstart: `from openai import OpenAI\nclient = OpenAI(base_url="https://api.moonshot.cn/v1", api_key="YOUR_KEY")\nres = client.chat.completions.create(model="kimi-k2", messages=[{"role": "user", "content": "Analyze document stack."}])`,
    modelFamily: "Moonshot",
    category: "Document AI"
  },
  {
    id: "glm-4-5",
    name: "GLM-4.5",
    vendor: "Zhipu AI",
    description: "Flagship bilingual reasoning and agentic model excelling in complex tool orchestration, coding, and mathematical reasoning.",
    parameterCount: "Large MoE",
    contextWindow: "128k tokens",
    releaseDate: "2025",
    license: "Proprietary",
    trendingScore: 1365,
    capabilities: ["Function Calling", "Reasoning", "Agents"],
    researchAreas: ["Agentic AI"],
    paperCount: 220,
    benchmarks: [
      { name: "MATH-500", score: "92.4%", value: 92.4, max: 100, color: "#3B82F6" }
    ],
    quickstart: `from zhipuai import ZhipuAI\nclient = ZhipuAI(api_key="YOUR_KEY")\nres = client.chat.completions.create(model="glm-4.5", messages=[{"role": "user", "content": "Solve optimization problem."}])`,
    modelFamily: "GLM",
    category: "Agents"
  },
  {
    id: "mistral-medium-2",
    name: "Mistral Medium",
    vendor: "Mistral AI",
    description: "Balanced enterprise model delivering fast instruction following, structured data extraction, and multilingual generation.",
    parameterCount: "Dense",
    contextWindow: "128k tokens",
    releaseDate: "2024",
    license: "Commercial",
    trendingScore: 1340,
    capabilities: ["General Purpose", "Instruction Following", "Fast"],
    researchAreas: ["Large Language Models"],
    paperCount: 180,
    benchmarks: [
      { name: "MMLU", score: "86.1%", value: 86.1, max: 100, color: "#10B981" }
    ],
    quickstart: `from mistralai import Mistral\nclient = Mistral(api_key="YOUR_KEY")\nres = client.chat.complete(model="mistral-medium-latest", messages=[{"role": "user", "content": "Summarize brief."}])`,
    modelFamily: "Mistral",
    category: "Instruction Following"
  },
  {
    id: "grok-4",
    name: "Grok 4",
    vendor: "xAI",
    description: "Massive-scale foundation model integrated with real-time global search, deep mathematical logic, and coding auto-verification.",
    parameterCount: "High-scale MoE",
    contextWindow: "256k tokens",
    releaseDate: "Expected 2025",
    license: "Proprietary",
    trendingScore: 1395,
    capabilities: ["Reasoning", "Search", "Coding"],
    researchAreas: ["Reasoning"],
    paperCount: 260,
    benchmarks: [
      { name: "AIME Math", score: "86.5%", value: 86.5, max: 100, color: "#FF5A1F" }
    ],
    quickstart: `curl -X POST https://api.x.ai/v1/chat/completions -H "Authorization: Bearer $KEY" -d '{"model": "grok-4", "messages": [{"role": "user", "content": "Simulate quantum circuit."}]}'`,
    modelFamily: "Grok",
    category: "Reasoning"
  },
  {
    id: "gemma-3",
    name: "Gemma 3",
    vendor: "Google DeepMind",
    description: "Lightweight state-of-the-art open models built from Gemini research, delivering unmatched single-GPU reasoning and instruction following.",
    parameterCount: "27B / 9B / 2B",
    contextWindow: "128k tokens",
    releaseDate: "2025",
    license: "Gemma Terms",
    trendingScore: 1342,
    capabilities: ["Open Source", "Small Language Models", "General Purpose"],
    researchAreas: ["Large Language Models"],
    paperCount: 310,
    benchmarks: [
      { name: "MMLU", score: "85.2%", value: 85.2, max: 100, color: "#10B981" }
    ],
    quickstart: `from transformers import AutoModelForCausalLM\nmodel = AutoModelForCausalLM.from_pretrained("google/gemma-3-27b-it", device_map="auto")`,
    modelFamily: "Gemma",
    category: "General Purpose"
  },
  {
    id: "molmo",
    name: "Molmo",
    vendor: "Allen Institute for AI",
    description: "Open-weight vision-language model trained purely on open curated datasets, matching proprietary vision-language leaders on zero-shot VQA.",
    parameterCount: "72B / 7B",
    contextWindow: "Vision / Text",
    releaseDate: "September 2024",
    license: "Apache 2.0",
    trendingScore: 1338,
    capabilities: ["Computer Vision", "Multimodal", "Open Source"],
    researchAreas: ["Computer Vision"],
    paperCount: 195,
    benchmarks: [
      { name: "PixMo VQA", score: "84.5%", value: 84.5, max: 100, color: "#8B5CF6" }
    ],
    quickstart: `from transformers import AutoModelForCausalLM\nmodel = AutoModelForCausalLM.from_pretrained("allenai/Molmo-72B-0924", trust_remote_code=True, device_map="auto")`,
    modelFamily: "Molmo",
    category: "Computer Vision"
  }
];

function enrichModelItem(m: ModelItem): ModelItem {
  let fam = m.modelFamily;
  if (!fam) {
    const n = m.name.toLowerCase();
    if (n.includes("gpt") || n.includes("o1") || n.includes("o3")) fam = "GPT";
    else if (n.includes("claude")) fam = "Claude";
    else if (n.includes("gemini") || n.includes("rt-")) fam = "Gemini";
    else if (n.includes("llama")) fam = "Llama";
    else if (n.includes("qwen")) fam = "Qwen";
    else if (n.includes("deepseek")) fam = "DeepSeek";
    else if (n.includes("mistral") || n.includes("mixtral") || n.includes("pixtral")) fam = "Mistral";
    else if (n.includes("gemma")) fam = "Gemma";
    else if (n.includes("phi")) fam = "Phi";
    else if (n.includes("grok")) fam = "Grok";
    else if (n.includes("flux")) fam = "FLUX";
    else if (n.includes("whisper")) fam = "Whisper";
    else if (n.includes("sam")) fam = "SAM";
    else if (n.includes("molmo")) fam = "Molmo";
    else if (n.includes("glm")) fam = "GLM";
    else fam = "Foundation";
  }

  let cat = m.category;
  if (!cat) {
    const n = m.name.toLowerCase();
    const a = ((m.researchAreas && m.researchAreas[0]) || "").toLowerCase();
    const t = m.capabilities.join(" ").toLowerCase();
    if (t.includes("vision") || a.includes("vision") || n.includes("sam") || n.includes("flux") || n.includes("diffusion") || n.includes("molmo")) {
      if (t.includes("image gen") || n.includes("flux") || n.includes("diffusion")) cat = "Image Generation";
      else cat = "Computer Vision";
    } else if (a.includes("audio") || t.includes("speech") || n.includes("whisper")) {
      cat = "Speech";
    } else if (a.includes("coding") || t.includes("coding") || n.includes("coder")) {
      cat = "Coding";
    } else if (a.includes("reasoning") || t.includes("reasoning") || n.includes("r1") || n.includes("o1") || n.includes("o3")) {
      cat = "Reasoning";
    } else if (a.includes("multimodal") || t.includes("multimodal")) {
      cat = "Multimodal";
    } else if (t.includes("agents") || a.includes("agent")) {
      cat = "Agents";
    } else if (t.includes("small language")) {
      cat = "General Purpose";
    } else {
      cat = "General Purpose";
    }
  }

  return { ...m, modelFamily: fam, category: cat };
}

export async function getModels(): Promise<ModelItem[]> {
  try {
    const response = await fetchApi<any>("/api/v1/models");
    const rawItems = Array.isArray(response) ? response : (Array.isArray(response?.data) ? response.data : (Array.isArray(response?.data?.models) ? response.data.models : null));
    
    if (rawItems && rawItems.length > 0) {
      const dbModels: ModelItem[] = rawItems.map((item: any, idx: number) => {
        return enrichModelItem({
          id: item.id || item.slug || `db-model-${idx}`,
          slug: item.slug,
          name: item.name || item.title || "Foundation Model",
          vendor: item.vendor || item.organization || item.platform || "Open Weights / Research",
          vendorLogoUrl: item.vendorLogoUrl,
          description: item.desc || item.description || item.source || "Advanced neural foundation model evaluated across frontier cognitive benchmarks.",
          parameterCount: item.params || item.parameters || "MoE / Dense",
          contextWindow: item.context || item.contextWindow || "128k tokens",
          releaseDate: item.releaseDate || item.time || "2024-2025",
          license: item.license || "Proprietary",
          trendingScore: typeof item.elo === "number" ? item.elo : (typeof item.likes === "number" ? item.likes : 1350),
          capabilities: Array.isArray(item.capabilities) ? item.capabilities : ["General Purpose", "Reasoning"],
          area: (item.researchAreas && item.researchAreas[0]) || item.category || "General Purpose",
          paperCount: typeof item.paperCount === "number" ? item.paperCount : (typeof item.comments === "number" ? item.comments : 120),
          benchmarks: Array.isArray(item.benchmarks) ? item.benchmarks : [
            { name: "MMLU-Pro", score: "88.5%", value: 88.5, max: 100, color: "#10B981" }
          ],
          quickstart: item.quickstart || `from transformers import AutoModelForCausalLM\n\nmodel = AutoModelForCausalLM.from_pretrained("${item.slug || item.name || "frontier/model"}")`
        });
      });

      const catalogEnriched = mockModels.map(enrichModelItem);
      const dbNames = new Set(dbModels.map(m => m.name.toLowerCase()));
      const combined = [
        ...dbModels,
        ...catalogEnriched.filter(m => !dbNames.has(m.name.toLowerCase()))
      ];
      return combined;
    }
    // Silently fall back to catalog if API endpoint is unreachable or loading
  } catch (err) {
    // Silently fall back to catalog if API endpoint is unreachable or loading
  }

  return mockModels.map(enrichModelItem);
}



export async function getLineages(): Promise<LineageItem[]> {
  try {
    // 1. Fetch papers categorized as 'lineage'
    const listResponse = await fetchApi<any>("/api/v1/research-papers?task=lineage&limit=20");
    const lineagePapers = Array.isArray(listResponse) ? listResponse : (Array.isArray(listResponse?.data) ? listResponse.data : (Array.isArray(listResponse?.data?.papers) ? listResponse.data.papers : []));

    if (lineagePapers.length === 0) {
      console.warn("No lineages found with task=lineage. Trying fallback to known lineage slugs...");
      // Fallback: If the backend hasn't tagged them with task=lineage yet,
      // we try fetching known lineage slugs as a backup.
      const fallbackSlugs = ["gpt-lineage", "llama-lineage", "claude-lineage", "gemini-lineage", "gpt", "llama", "claude"];
      lineagePapers.push(...fallbackSlugs.map(slug => ({ slug })));
    }

    // 2. Fetch full details for each lineage paper to get its associated models
    const detailedPapers = await Promise.all(
      lineagePapers.map((paper: any) => 
        fetchApi<any>(`/api/v1/research-papers/${paper.slug}`).catch(() => null)
      )
    );

    // Filter out failed fetches
    const validPapers = detailedPapers.filter(Boolean).map(p => p.data || p);

    // 3. Transform into LineageItem format
    const lineages = validPapers
      .filter((paper: any) => paper.models && paper.models.length > 0)
      .map((paper: any, idx: number) => {
        
        // Sort models by release date to form a timeline
        const sortedModels = [...paper.models].sort((a, b) => {
          const dateA = a.model?.releaseDate ? new Date(a.model.releaseDate).getTime() : 0;
          const dateB = b.model?.releaseDate ? new Date(b.model.releaseDate).getTime() : 0;
          return dateA - dateB;
        });

        const nodes: LineageNode[] = sortedModels.map((m: any, i: number) => ({
          name: m.model?.name || "Unknown Model",
          year: m.model?.releaseDate ? new Date(m.model.releaseDate).getFullYear() : undefined,
          isSota: i === sortedModels.length - 1 // Assume last model is latest/SOTA
        }));

        const latestModelName = nodes.length > 0 ? nodes[nodes.length - 1].name : "N/A";
        
        // Dynamic colors based on index
        const colors = [
          { color: "#10B981", bg: "bg-emerald-50 border-emerald-200 text-emerald-600" },
          { color: "#3B82F6", bg: "bg-blue-50 border-blue-200 text-blue-600" },
          { color: "#FF5A1F", bg: "bg-orange-50 border-orange-200 text-orange-600" },
          { color: "#8B5CF6", bg: "bg-purple-50 border-purple-200 text-purple-600" },
        ];
        const theme = colors[idx % colors.length];

        return {
          id: paper.slug || `lineage-${idx}`,
          name: paper.title || "Model Lineage",
          vendor: sortedModels[0]?.model?.vendor || "Research Lab",
          description: paper.abstract || "Evolutionary tree of this foundation model family.",
          color: theme.color,
          bgStyle: theme.bg,
          nodes: nodes,
          latestModel: latestModelName,
          timeline: nodes.length > 0 ? `${nodes[0].year || "Early"} - Present` : "Present"
        };
      });

    return lineages;
  } catch (err) {
    console.error("Failed to fetch lineages:", err);
    return [];
  }
}

export function getAllModelIds(): string[] {
  return mockModels.map((m) => m.id);
}

export function getModelById(id: string): ModelItem | undefined {
  const cleanId = id.toLowerCase().trim();
  const found = mockModels.find(
    (m) =>
      m.id.toLowerCase() === cleanId ||
      m.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") === cleanId
  );
  return found ? enrichModelItem(found) : undefined;
}

export interface FacetCount {
  name: string;
  count: number;
}

export interface ModelFacets {
  capabilities: FacetCount[];
  modelFamilies: FacetCount[];
  vendors: FacetCount[];
  researchAreas: FacetCount[];
  totalModels: number;
}

export async function getTrendingModels(limit: number = 10): Promise<ModelItem[]> {
  const models = await getModels();
  return models.sort((a, b) => (b.elo || 0) - (a.elo || 0)).slice(0, limit);
}

export async function getModelFacets(): Promise<ModelFacets> {
  const models = await getModels();
  
  const capMap = new Map<string, number>();
  const famMap = new Map<string, number>();
  const vendorMap = new Map<string, number>();
  const areaMap = new Map<string, number>();
  
  models.forEach(m => {
    (m.capabilities || []).forEach(t => capMap.set(t, (capMap.get(t) || 0) + 1));
    if (m.modelFamily) famMap.set(m.modelFamily, (famMap.get(m.modelFamily) || 0) + 1);
    if (m.vendor) vendorMap.set(m.vendor, (vendorMap.get(m.vendor) || 0) + 1);
    if ((m.researchAreas && m.researchAreas[0])) areaMap.set((m.researchAreas && m.researchAreas[0]), (areaMap.get((m.researchAreas && m.researchAreas[0])) || 0) + 1);
  });

  const sortFacets = (map: Map<string, number>) => Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  return {
    capabilities: sortFacets(capMap),
    modelFamilies: sortFacets(famMap),
    vendors: sortFacets(vendorMap),
    researchAreas: sortFacets(areaMap),
    totalModels: models.length
  };
}
