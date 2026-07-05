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
  org: string;
  desc: string;
  params?: string;
  context?: string;
  releaseDate?: string;
  license?: string;
  elo?: number;
  tags: string[];
  area: string;
  paperCount: number;
  benchmarks: BenchmarkScore[];
  quickstart?: string;
}

const mockModels: ModelItem[] = [
  {
    id: "claude-3-7-sonnet",
    name: "Claude 3.7 Sonnet",
    org: "Anthropic",
    desc: "First hybrid reasoning frontier model enabling instantaneous responses or extended chain-of-thought verification for complex agentic coding workflows.",
    params: "Dense / MoE",
    context: "200k tokens",
    releaseDate: "February 2025",
    license: "Proprietary",
    elo: 1385,
    tags: ["Hybrid Reasoning", "Coding Agents", "Tool Use"],
    area: "Agentic Coding",
    paperCount: 452,
    benchmarks: [
      { name: "SWE-bench Verified", score: "62.3%", value: 62.3, max: 100, color: "#F55036" },
      { name: "MMLU-Pro", score: "89.4%", value: 89.4, max: 100, color: "#10B981" },
      { name: "MATH-500", score: "96.2%", value: 96.2, max: 100, color: "#3B82F6" },
    ],
    quickstart: `import anthropic\n\nclient = anthropic.Anthropic()\nmsg = client.messages.create(\n  model="claude-3-7-sonnet-20250219",\n  max_tokens=1024,\n  messages=[{"role": "user", "content": "Analyze this codebase architecture."}]\n)`
  },
  {
    id: "gpt-4o",
    name: "GPT-4o",
    org: "OpenAI",
    desc: "Flagship omni multimodal foundation model reasoning seamlessly across native audio, vision, and text streams in real-time.",
    params: "Dense / MoE",
    context: "128k tokens",
    releaseDate: "May 2024",
    license: "Proprietary",
    elo: 1362,
    tags: ["Multimodal", "Reasoning", "Realtime Audio"],
    area: "Multimodal",
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
    org: "DeepSeek AI",
    desc: "Breakthrough open reasoning foundation model trained via large-scale reinforcement learning directly eliciting long Chain-of-Thought traces.",
    params: "671B MoE (37B active)",
    context: "128k tokens",
    releaseDate: "January 2025",
    license: "MIT Open",
    elo: 1378,
    tags: ["Reinforcement Learning", "Reasoning", "Math"],
    area: "Reasoning",
    paperCount: 390,
    benchmarks: [
      { name: "AIME 2024 Math", score: "79.8%", value: 79.8, max: 100, color: "#F55036" },
      { name: "Codeforces Elo", score: "2029", value: 82, max: 100, color: "#3B82F6" },
      { name: "GPQA Diamond", score: "71.5%", value: 71.5, max: 100, color: "#10B981" },
    ],
    quickstart: `# Run locally with Ollama\nollama run deepseek-r1:671b\n\n# Or API call\ncurl -X POST https://api.deepseek.com/v1/chat/completions \\\n  -H "Authorization: Bearer $API_KEY" \\\n  -d '{"model": "deepseek-reasoner", "messages": [{"role": "user", "content": "Solve P vs NP intuition."}]}'`
  },
  {
    id: "gemini-2-0-flash",
    name: "Gemini 2.0 Flash",
    org: "Google DeepMind",
    desc: "Next-generation agentic foundation model delivering 2x speedup, native tool orchestration, and multi-modal live API interactions.",
    params: "Dense / MoE",
    context: "1M tokens",
    releaseDate: "December 2024",
    license: "Proprietary",
    elo: 1358,
    tags: ["Agentic AI", "Long Context", "Multimodal"],
    area: "Multimodal",
    paperCount: 365,
    benchmarks: [
      { name: "Long-Context Needle", score: "99.8%", value: 99.8, max: 100, color: "#10B981" },
      { name: "MMMU (Vision)", score: "68.3%", value: 68.3, max: 100, color: "#8B5CF6" },
      { name: "ToolBench", score: "84.5%", value: 84.5, max: 100, color: "#F55036" },
    ],
    quickstart: `import google.generativeai as genai\n\ngenai.configure(api_key="YOUR_API_KEY")\nmodel = genai.GenerativeModel('gemini-2.0-flash')\nresponse = model.generate_content("Summarize 100 research papers.")`
  },
  {
    id: "llama-3-3-70b",
    name: "Llama 3.3 70B",
    org: "Meta AI",
    desc: "Open-weight instruction-tuned model matching Llama 3.1 405B performance on reasoning, code, and multilingual tasks at a fraction of compute.",
    params: "70B dense",
    context: "128k tokens",
    releaseDate: "December 2024",
    license: "Llama 3.3 Community",
    elo: 1344,
    tags: ["Open Weight", "Language Modeling", "Distillation"],
    area: "Reasoning",
    paperCount: 480,
    benchmarks: [
      { name: "MMLU", score: "86.0%", value: 86.0, max: 100, color: "#10B981" },
      { name: "GSM8K Math", score: "93.8%", value: 93.8, max: 100, color: "#3B82F6" },
      { name: "HumanEval Code", score: "81.7%", value: 81.7, max: 100, color: "#F55036" },
    ],
    quickstart: `# Using vLLM high-throughput server\npython -m vllm.entrypoints.openai.api_server \\\n  --model meta-llama/Llama-3.3-70B-Instruct \\\n  --tensor-parallel-size 4`
  },
  {
    id: "qwen-2-5-max",
    name: "Qwen 2.5 Max",
    org: "Alibaba Cloud",
    desc: "Large-scale flagship MoE model surpassing top commercial APIs across math, coding benchmarks, and Chinese/English bilingual comprehension.",
    params: "MoE Scale",
    context: "128k tokens",
    releaseDate: "January 2025",
    license: "Proprietary",
    elo: 1370,
    tags: ["MoE", "Math & Code", "Bilingual"],
    area: "Reasoning",
    paperCount: 245,
    benchmarks: [
      { name: "MATH Benchmark", score: "94.5%", value: 94.5, max: 100, color: "#3B82F6" },
      { name: "LiveCodeBench", score: "54.2%", value: 54.2, max: 100, color: "#F55036" },
      { name: "Arena Hard", score: "85.8%", value: 85.8, max: 100, color: "#10B981" },
    ],
    quickstart: `from openai import OpenAI\n\nclient = OpenAI(api_key="YOUR_DASHSCOPE_KEY", base_url="https://dashscope.aliyuncs.com/compatible-mode/v1")\nres = client.chat.completions.create(model="qwen-max", messages=[{"role": "user", "content": "Design an autonomous agent framework."}])`
  },
  {
    id: "grok-3",
    name: "Grok 3",
    org: "xAI",
    desc: "Massive-scale foundation model trained on Colossus supercluster featuring deep reasoning capabilities and live real-time knowledge indexing.",
    params: "High-scale MoE",
    context: "128k tokens",
    releaseDate: "February 2025",
    license: "Proprietary",
    elo: 1375,
    tags: ["Reasoning", "Realtime Search", "Large Scale"],
    area: "Reasoning",
    paperCount: 180,
    benchmarks: [
      { name: "AIME 2024 Math", score: "81.2%", value: 81.2, max: 100, color: "#F55036" },
      { name: "GPQA Diamond", score: "73.4%", value: 73.4, max: 100, color: "#10B981" },
      { name: "SWE-bench Verified", score: "58.1%", value: 58.1, max: 100, color: "#3B82F6" },
    ],
    quickstart: `curl https://api.x.ai/v1/chat/completions \\\n  -H "Authorization: Bearer $XAI_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{"model": "grok-3", "messages": [{"role": "user", "content": "Simulate orbital mechanics."}]}'`
  },
  {
    id: "rt-2",
    name: "RT-2 (Robotics Transformer 2)",
    org: "Google DeepMind",
    desc: "Vision-Language-Action (VLA) model trained on internet-scale data directly controlling robotic end-effectors in novel open-world environments.",
    params: "55B / 5B",
    context: "32k tokens",
    releaseDate: "July 2023",
    license: "Research Only",
    elo: 1290,
    tags: ["Robotics", "Embodied AI", "VLA"],
    area: "Robotics & VLA",
    paperCount: 215,
    benchmarks: [
      { name: "Unseen Object Pick", score: "88.0%", value: 88.0, max: 100, color: "#10B981" },
      { name: "CALVIN Manipulation", score: "92.4%", value: 92.4, max: 100, color: "#3B82F6" },
      { name: "Sim-to-Real Generalization", score: "74.5%", value: 74.5, max: 100, color: "#F55036" },
    ],
    quickstart: `# Robotics inference loop setup\nfrom rt2_control import VLAController\n\nrobot = VLAController(checkpoint="rt2-55b-jax")\naction = robot.step(image_stream, instruction="Pick up the yellow screwdriver")`
  },
  {
    id: "qwen-2-5-coder-32b",
    name: "Qwen 2.5 Coder 32B",
    org: "Alibaba Cloud",
    desc: "State-of-the-art open coding model achieving 50%+ on SWE-Bench Verified, rivaling closed-weight coding specialists.",
    params: "32B dense",
    context: "128k tokens",
    releaseDate: "November 2024",
    license: "Apache 2.0",
    elo: 1335,
    tags: ["Coding Agents", "SWE-bench", "Open Weight"],
    area: "Agentic Coding",
    paperCount: 210,
    benchmarks: [
      { name: "SWE-bench Verified", score: "51.4%", value: 51.4, max: 100, color: "#F55036" },
      { name: "EvalPlus (HumanEval)", score: "92.7%", value: 92.7, max: 100, color: "#10B981" },
      { name: "LiveCodeBench Pass@1", score: "48.2%", value: 48.2, max: 100, color: "#3B82F6" },
    ],
    quickstart: `from transformers import AutoModelForCausalLM, AutoTokenizer\n\nmodel = AutoModelForCausalLM.from_pretrained("Qwen/Qwen2.5-Coder-32B-Instruct", device_map="auto")`
  },
  {
    id: "mistral-large-2",
    name: "Mistral Large 2",
    org: "Mistral AI",
    desc: "Advanced frontier model engineered for high-precision function calling, structured json generation, and complex reasoning.",
    params: "123B dense",
    context: "128k tokens",
    releaseDate: "July 2024",
    license: "Mistral Research",
    elo: 1330,
    tags: ["Function Calling", "Multilingual", "Code Generation"],
    area: "Agentic Coding",
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
    org: "Microsoft Research",
    desc: "Small language model (SLM) trained exclusively on high-quality synthetic data and filtered textbook reasoning step traces.",
    params: "14B dense",
    context: "16k tokens",
    releaseDate: "December 2024",
    license: "MIT Open",
    elo: 1305,
    tags: ["Small Language Model", "Synthetic Data", "Reasoning"],
    area: "Reasoning",
    paperCount: 155,
    benchmarks: [
      { name: "GSM8K Math", score: "90.4%", value: 90.4, max: 100, color: "#3B82F6" },
      { name: "GPQA Reasoning", score: "56.2%", value: 56.2, max: 100, color: "#10B981" },
      { name: "HumanEval", score: "80.3%", value: 80.3, max: 100, color: "#F55036" },
    ],
    quickstart: `# Run directly on laptop GPU or Apple Silicon\nollama run phi4:14b`
  },
  {
    id: "flux-1-schnell",
    name: "FLUX.1 [schnell]",
    org: "Black Forest Labs",
    desc: "Fast rectified flow transformer producing photorealistic images in 1 to 4 steps with unmatched prompt adherence and typography accuracy.",
    params: "12B parameters",
    context: "Image Gen",
    releaseDate: "August 2024",
    license: "Apache 2.0",
    elo: 1320,
    tags: ["Image Generation", "Flow Matching", "Diffusion"],
    area: "Vision & Generation",
    paperCount: 142,
    benchmarks: [
      { name: "GenAI Benchmark Typography", score: "94.1%", value: 94.1, max: 100, color: "#10B981" },
      { name: "Inference Latency (4 steps)", score: "180ms", value: 95, max: 100, color: "#F55036" },
      { name: "Photorealism Elo", score: "1240", value: 85, max: 100, color: "#8B5CF6" },
    ],
    quickstart: `import diffusers\nfrom diffusers import FluxPipeline\n\npipe = FluxPipeline.from_pretrained("black-forest-labs/FLUX.1-schnell")\nimage = pipe("A cyberpunk robotic cat typing code on a holographic keyboard", num_inference_steps=4).images[0]`
  },
  {
    id: "sam-2",
    name: "Segment Anything Model 2 (SAM 2)",
    org: "Meta AI",
    desc: "Unified promptable visual segmentation model tracking objects across video frames and static images in real-time.",
    params: "Hierarchical ViT",
    context: "Video / Image",
    releaseDate: "July 2024",
    license: "Apache 2.0",
    elo: 1315,
    tags: ["Computer Vision", "Video Tracking", "Segmentation"],
    area: "Vision & Generation",
    paperCount: 298,
    benchmarks: [
      { name: "SA-V Video Segmentation", score: "76.3 J&F", value: 76.3, max: 100, color: "#10B981" },
      { name: "Zero-Shot COCO mIoU", score: "82.1%", value: 82.1, max: 100, color: "#3B82F6" },
      { name: "Real-Time Tracking FPS", score: "44 FPS", value: 88, max: 100, color: "#F55036" },
    ],
    quickstart: `from sam2.build_sam import build_sam2_video_predictor\n\npredictor = build_sam2_video_predictor("sam2_hiera_large.yaml", "sam2_hiera_large.pt")`
  },
  {
    id: "whisper-v3",
    name: "Whisper V3",
    org: "OpenAI",
    desc: "Robust universal speech recognition and translation transformer trained on over 5 million hours of diverse multilingual audio.",
    params: "1.5B parameters",
    context: "Audio Stream",
    releaseDate: "November 2023",
    license: "MIT Open",
    elo: 1295,
    tags: ["Speech-to-Text", "Audio Recognition", "Multilingual"],
    area: "Audio & Speech",
    paperCount: 275,
    benchmarks: [
      { name: "Common Voice WER", score: "4.2%", value: 95.8, max: 100, color: "#10B981" },
      { name: "FLEURS Multilingual WER", score: "7.8%", value: 92.2, max: 100, color: "#3B82F6" },
      { name: "Accented English Accuracy", score: "93.1%", value: 93.1, max: 100, color: "#F55036" },
    ],
    quickstart: `import whisper\n\nmodel = whisper.load_model("large-v3")\nresult = model.transcribe("audio_sample.wav")\nprint(result["text"])`
  },
  {
    id: "deepseek-v3",
    name: "DeepSeek V3",
    org: "DeepSeek AI",
    desc: "High-efficiency Mixture-of-Experts architecture featuring Multi-head Latent Attention and FP8 mixed precision training.",
    params: "671B MoE (37B active)",
    context: "128k tokens",
    releaseDate: "December 2024",
    license: "MIT Open",
    elo: 1368,
    tags: ["MoE", "Efficient Attention", "Language Modeling"],
    area: "Reasoning",
    paperCount: 284,
    benchmarks: [
      { name: "MMLU", score: "88.5%", value: 88.5, max: 100, color: "#10B981" },
      { name: "HumanEval Code", score: "89.1%", value: 89.1, max: 100, color: "#3B82F6" },
      { name: "MATH-500", score: "90.2%", value: 90.2, max: 100, color: "#F55036" },
    ],
    quickstart: `from openai import OpenAI\n\nclient = OpenAI(api_key="YOUR_KEY", base_url="https://api.deepseek.com")\nres = client.chat.completions.create(model="deepseek-chat", messages=[{"role": "user", "content": "Explain Multi-Head Latent Attention."}])`
  },
  {
    id: "sd-3-5-large",
    name: "Stable Diffusion 3.5 Large",
    org: "Stability AI",
    desc: "MMDiT multimodal diffusion transformer generating high-fidelity artwork and accurate text rendering across diverse aspect ratios.",
    params: "8B parameters",
    context: "Image Gen",
    releaseDate: "October 2024",
    license: "Stability Community",
    elo: 1310,
    tags: ["MMDiT", "Diffusion", "Image Generation"],
    area: "Vision & Generation",
    paperCount: 168,
    benchmarks: [
      { name: "Prompt Adherence Score", score: "88.4%", value: 88.4, max: 100, color: "#10B981" },
      { name: "Visual Aesthetics Preference", score: "81.9%", value: 81.9, max: 100, color: "#8B5CF6" },
      { name: "Typography Rendering", score: "84.2%", value: 84.2, max: 100, color: "#F55036" },
    ],
    quickstart: `import torch\nfrom diffusers import StableDiffusion3Pipeline\n\npipe = StableDiffusion3Pipeline.from_pretrained("stabilityai/stable-diffusion-3.5-large", torch_dtype=torch.bfloat16)`
  }
];

export async function getModels(): Promise<ModelItem[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockModels), 100);
  });
}

export function getAllModelIds(): string[] {
  return mockModels.map((m) => m.id);
}

export function getModelById(id: string): ModelItem | undefined {
  const cleanId = id.toLowerCase().trim();
  return mockModels.find(
    (m) =>
      m.id.toLowerCase() === cleanId ||
      m.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") === cleanId
  );
}
