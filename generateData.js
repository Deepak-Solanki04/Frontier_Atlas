const fs = require('fs');

const topics = {
  'trending': { title: 'Trending Papers', desc: 'The most discussed AI research papers across the community over the last 24 hours.' },
  'latest-papers': { title: 'Latest Papers', desc: 'The absolute newest papers hitting arXiv and major conferences.' },
  'most-github-stars': { title: 'Most GitHub Stars', desc: 'Papers and models with the highest velocity of GitHub stars this week.' },
  'agents': { title: 'Agents', desc: 'Research on autonomous, goal-directed AI systems and tool-use.' },
  'reasoning': { title: 'Reasoning', desc: 'Breakthroughs in logical deduction, math reasoning, and planning algorithms.' },
  'language-modeling': { title: 'Language Modeling', desc: 'Advancements in LLM architectures, context scaling, and pre-training.' },
  'coding-agents': { title: 'Coding Agents', desc: 'Models designed specifically for software engineering and codebase navigation.' },
  'computer-use': { title: 'Computer Use', desc: 'Agents that can interact directly with GUIs and desktop environments.' },
  'world-models': { title: 'World Models', desc: 'AI systems that simulate physical environments and learn physical laws.' },
  'robotics': { title: 'Robotics', desc: 'Vision-Language-Action (VLA) models and embodied AI research.' },
  'transformer': { title: 'Transformer', desc: 'Core architectural improvements to the Transformer model.' },
  'chain-of-thought': { title: 'Chain of Thought', desc: 'Prompting and fine-tuning techniques to elicit step-by-step reasoning.' },
  'react': { title: 'ReAct', desc: 'Synergizing reasoning and acting in language models.' },
  'lora': { title: 'LoRA', desc: 'Low-Rank Adaptation and parameter-efficient fine-tuning methods.' },
  'rlhf': { title: 'RLHF', desc: 'Reinforcement Learning from Human Feedback and alignment techniques.' },
  'dpo': { title: 'DPO', desc: 'Direct Preference Optimization: Aligning models without reward models.' },
  'mcp': { title: 'MCP', desc: 'Model Context Protocol and standardized tool-use interfaces.' },
  'text-generation': { title: 'Text Generation', desc: 'State-of-the-art text generation models and decoding strategies.' },
  'image-generation': { title: 'Image Generation', desc: 'Diffusion models, latent generation, and visual consistency.' },
  'video-generation': { title: 'Video Generation', desc: 'Sora-like architectures, temporal consistency, and physics in video.' },
  'audio-generation': { title: 'Audio Generation', desc: 'Voice cloning, music generation, and text-to-audio models.' },
  'organizations': { title: 'Organizations', desc: 'Top research labs including DeepMind, OpenAI, Anthropic, and FAIR.' },
  'collections': { title: 'Collections', desc: 'Curated lists of essential papers for various AI domains.' },
  'bookmarks': { title: 'Bookmarks', desc: 'Your personal saved papers and datasets.' },
  'reading-list': { title: 'Reading List', desc: 'Papers you have queued up to read later.' }
};

const basePapers = [
  {
    title: "Understanding X: A Deep Dive",
    meta: "Jane Doe, John Smith • 2026",
    abstract: "This paper introduces a novel approach to X, demonstrating significant improvements over previous baselines...",
    tagsRow1: [{ text: "Evaluation", color: "blue" }, { text: "Metrics", color: "orange" }],
    tagsRow2: ["Deep Learning", "Optimization"],
    metrics: [{ icon: "↑", value: "842", label: "Upvotes", color: "red" }, { icon: "github", value: "2", label: "Repo", color: "black" }, { icon: "bookmark", value: "14", label: "Citations", color: "black" }],
    thumbnail: "/paper_pdf_1.png"
  },
  {
    title: "Scaling Laws for Y Architectures",
    meta: "Alan Turing Research Group • 2025",
    abstract: "We investigate the scaling properties of Y, revealing that parameter count alone does not dictate emergent capabilities...",
    tagsRow1: [{ text: "Scaling", color: "green" }, { text: "Emergence", color: "purple" }],
    tagsRow2: ["Architecture", "Compute"],
    metrics: [{ icon: "↑", value: "2.1K", label: "Upvotes", color: "red" }, { icon: "github", value: "12", label: "Repo", color: "black" }, { icon: "bookmark", value: "400", label: "Citations", color: "black" }],
    thumbnail: "/paper_pdf_2.png"
  }
];

let out = `export const topicData: Record<string, { title: string, desc: string, papers: any[] }> = {\n`;

Object.keys(topics).forEach((slug, idx) => {
  const t = topics[slug];
  // Customize the dummy papers slightly for flavor
  const p1 = JSON.parse(JSON.stringify(basePapers[0]));
  p1.id = slug + "-1";
  p1.title = `${t.title}: A New Paradigm`;
  p1.sotaHtml = '🏆 <strong style="color: #9a3412;">SOTA</strong> on <a href="#">Eval 2026</a>';

  const p2 = JSON.parse(JSON.stringify(basePapers[1]));
  p2.id = slug + "-2";
  p2.title = `Efficient ${t.title} at Scale`;
  p2.sotaHtml = '🏆 <strong style="color: #9a3412;">#1</strong> on <a href="#">PapersWithCode</a>';

  // Specific overrides for flavor
  if (slug === 'robotics') {
    p1.title = "RT-X: General Purpose Vision-Language-Action Models";
    p2.title = "Embodied AI in Unstructured Environments";
  } else if (slug === 'lora') {
    p1.title = "QLoRA: Efficient Finetuning of Quantized LLMs";
    p2.title = "DoRA: Weight-Decomposed Low-Rank Adaptation";
  }

  out += `  '${slug}': {\n`;
  out += `    title: ${JSON.stringify(t.title)},\n`;
  out += `    desc: ${JSON.stringify(t.desc)},\n`;
  out += `    papers: ${JSON.stringify([p1, p2], null, 4)}\n`;
  out += `  },\n`;
});

out += `};\n`;

fs.writeFileSync('./data/topicData.ts', out);
console.log('Successfully generated data/topicData.ts');
