
export const cardDescriptions: Record<string, string> = {
  // We can keep the existing exact matches here if we want, but the true fix is the algorithmic fallback below.
  "hybrid reasoning": "Pioneering systems that merge neural intuition with symbolic logic, enabling instantaneous responses seamlessly paired with rigorous step-by-step verification.",
  "coding agents": "Autonomous programming entities capable of navigating codebases, writing complex functions, and independently debugging errors without human intervention.",
  "tool use": "Models trained to interact dynamically with external environments by interpreting API schemas, executing web searches, and querying live databases.",
  "multimodal": "Unified foundation models designed from the ground up to simultaneously interpret, synthesize, and generate text, audio, and visual data streams.",
  "reasoning": "Advanced cognitive systems built to execute deep logical deductions, solve intricate mathematical puzzles, and perform long-horizon strategic planning.",
  "realtime audio": "Ultra-low-latency models optimized for instantaneous voice interactions, capable of capturing nuanced tone, emotion, and conversational cadence.",
  "agentic ai": "Goal-oriented foundation models that translate high-level user instructions into concrete multi-step digital actions across diverse digital workflows.",
  "long context": "Memory-intensive models boasting massive token windows, capable of ingesting entire books, code repositories, or hours of video in a single prompt.",
};

const templates = [
  "Advanced methodologies exploring {X} to push the absolute boundaries of modern artificial intelligence and machine learning architectures.",
  "Specialized systems leveraging {X} to deliver unprecedented accuracy, speed, and logical reasoning across complex digital tasks.",
  "Pioneering research in {X}, driving the next generation of generative models and deeply intelligent autonomous software agents.",
  "Cutting-edge implementations of {X} designed to vastly improve computational efficiency and scale neural networks seamlessly.",
  "State-of-the-art frameworks utilizing {X} to bridge the gap between abstract mathematical logic and real-world enterprise applications.",
  "Next-generation ecosystems focused on {X}, unlocking powerful new capabilities in digital automation and data synthesis.",
  "Breakthrough approaches in {X} that redefine how algorithms interpret, generate, and structure vast amounts of unstructured information.",
  "Innovative algorithms applying {X} to solve previously intractable problems in reasoning, coding, and dynamic environmental adaptation.",
  "Robust foundation structures built around {X}, enabling highly responsive, zero-shot capabilities in incredibly demanding scenarios.",
  "Transformative technologies centered on {X}, providing developers with the critical tools needed to scale intelligent systems globally.",
  "Deep neural frameworks mastering {X}, significantly enhancing the precision and contextual awareness of modern generative artificial intelligence.",
  "Highly optimized models capitalizing on {X} to drive sub-second inference speeds without sacrificing deep logical coherence.",
  "Visionary architectures exploring the limits of {X} to create highly adaptable, universally capable artificial reasoning engines.",
  "Complex digital pipelines integrating {X} to achieve state-of-the-art performance benchmarks in reasoning and pattern recognition.",
  "Fundamentally novel approaches to {X}, opening new frontiers in multimodal generation, agentic behavior, and semantic understanding."
];

export function getCardDescription(name: string): string {
  const normalized = (name || "").toLowerCase().trim();
  if (cardDescriptions[normalized]) return cardDescriptions[normalized];
  
  // Deterministic hash based on the name so it always returns the exact same template for the same card
  let hash = 0;
  for (let i = 0; i < normalized.length; i++) {
    hash = normalized.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const templateIndex = Math.abs(hash) % templates.length;
  const template = templates[templateIndex];
  
  // Format the name nicely (capitalize words)
  const formattedName = name.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  
  return template.replace("{X}", formattedName);
}
