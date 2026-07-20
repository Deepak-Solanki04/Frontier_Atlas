
export const cardDescriptions: Record<string, string> = {
  "hybrid reasoning": "Methods for combining neural networks with symbolic logic.",
  "coding agents": "Autonomous entities designed to navigate and write code.",
  "tool use": "Models capable of interacting dynamically with external APIs.",
  "multimodal": "Models combining text, images, audio, and video inputs.",
  "reasoning": "Advanced architectures built for deep logical deductions.",
  "realtime audio": "Low-latency models optimized for instantaneous voice interactions.",
  "agentic ai": "Goal-oriented systems that execute complex digital workflows.",
  "long context": "Memory-intensive models capable of ingesting massive datasets.",
};

const templates = [
  "Advanced methods for {X} and intelligent decision-making.",
  "Specialized systems leveraging {X} for improved accuracy.",
  "Techniques utilizing {X} to enhance generative models.",
  "Optimized implementations of {X} for efficient scaling.",
  "Core frameworks applying {X} to real-world applications.",
  "Next-generation ecosystems focused entirely on {X}.",
  "Breakthrough approaches in {X} for structuring information.",
  "Innovative algorithms applying {X} to complex reasoning.",
  "Robust architectures built around {X} capabilities.",
  "Transformative tools centered on {X} development.",
  "Deep neural frameworks specialized in {X}.",
  "Models capitalizing on {X} for faster inference speeds.",
  "Architectures exploring the limits of {X}.",
  "Digital pipelines integrating {X} for peak performance.",
  "Novel approaches advancing {X} and multimodal synthesis."
];

export function getCardDescription(name: string): string {
  const normalized = (name || "").toLowerCase().trim();
  if (cardDescriptions[normalized]) return cardDescriptions[normalized];
  
  let hash = 0;
  for (let i = 0; i < normalized.length; i++) {
    hash = normalized.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const templateIndex = Math.abs(hash) % templates.length;
  const template = templates[templateIndex];
  
  const formattedName = name.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return template.replace("{X}", formattedName.toLowerCase());
}
