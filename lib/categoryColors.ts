export function getCategoryColors(categoryId: string) {
  // A generic fallback map. The actual MethodCard has its own color mapping.
  // This just satisfies CategoryRow's expectation of an accent color.
  const map: Record<string, string> = {
    "core-ai": "#EF4444",
    "neural-architectures": "#2563EB",
    "neural-components": "#7C3AED",
    "training": "#0F766E",
    "alignment": "#4F46E5",
    "prompting-reasoning": "#F97316",
    "agents": "#0891B2",
    "retrieval": "#0284C7",
    "adaptation": "#8B5CF6",
    "optimization": "#F97316",
    "regularization": "#14B8A6",
    "efficiency": "#EAB308",
    "reinforcement-learning": "#2563EB",
    "representation-learning": "#F97316",
    "diffusion": "#EC4899",
    "vision": "#16A34A",
    "language": "#F97316",
    "audio": "#EA580C",
    "video": "#DC2626",
    "robotics": "#2563EB",
    "3d": "#6366F1",
    "mathematics": "#2563EB",
    "evaluation": "#2563EB",
    "interpretability": "#7C3AED",
    "safety": "#EF4444",
    "systems": "#2563EB",
    "hardware": "#16A34A",
    "research-concepts": "#DC2626",
  };

  return {
    accent: map[categoryId] || "#2563EB"
  };
}
