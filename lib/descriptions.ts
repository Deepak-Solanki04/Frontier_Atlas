export function getCardDescription(section: string, name: string): string {
  const normalized = (name || "").toLowerCase().trim();
  
  // Specific mappings for Capabilities
  if (section === "capabilities") {
    if (normalized.includes("multimodal") || normalized.includes("vision") || normalized.includes("audio")) {
      return `${name} models seamlessly process diverse inputs like text, images, and audio natively. This unified understanding allows them to analyze complex physical world data and deliver rich, context-aware multimedia interactions.`;
    }
    if (normalized.includes("reasoning") || normalized.includes("logic")) {
      return `${name} represents the frontier of cognitive AI processing. These systems excel at executing complex chain-of-thought deductions, solving multi-step mathematical puzzles, and performing deep strategic planning with high accuracy.`;
    }
    if (normalized.includes("code") || normalized.includes("programming")) {
      return `${name} models act as tireless pair programmers trained on vast repositories. They automatically detect nuanced bugs, generate complex boilerplate, and optimize algorithmic structures to massively accelerate software development velocity.`;
    }
    if (normalized.includes("agent") || normalized.includes("function")) {
      return `${name} capabilities empower models to autonomously interact with external APIs and manage multi-step workflows. This bridges the critical gap between passive text generation and active digital execution across environments.`;
    }
    if (normalized.includes("roleplay") || normalized.includes("conversational")) {
      return `${name} systems are highly optimized for natural, engaging dialogue. They maintain complex personas, remember long context histories, and deliver emotionally intelligent responses that elevate user experiences and interactive storytelling.`;
    }
    return `The ${name} capability demonstrates exceptional proficiency in specialized cognitive tasks. By utilizing highly optimized neural pathways, it offers innovative and efficient solutions tailored specifically for complex, real-world enterprise application workflows.`;
  }
  
  // Specific mappings for Families
  if (section === "families") {
    if (normalized.includes("gpt") || normalized.includes("o1")) {
      return `The ${name} family by OpenAI sets industry benchmarks for general intelligence and reasoning. From creative writing to advanced logical deduction, these versatile models consistently push the boundaries of generative capabilities.`;
    }
    if (normalized.includes("claude")) {
      return `Anthropic's ${name} family is renowned for its exceptional safety, steerability, and massive context windows. They synthesize vast information securely, providing highly reliable assistance for complex, sensitive professional environments.`;
    }
    if (normalized.includes("llama")) {
      return `Meta's ${name} family represents the vanguard of the open-weights movement. These highly efficient models democratize access to advanced AI, empowering global developers to build, fine-tune, and deploy powerful local applications.`;
    }
    if (normalized.includes("mistral")) {
      return `The ${name} family pioneers highly efficient architectures like Mixture of Experts. Known for incredible speed and open accessibility, they provide compelling, cost-effective solutions that rival massive proprietary systems seamlessly.`;
    }
    if (normalized.includes("qwen")) {
      return `Alibaba's ${name} models offer remarkable multilingual proficiency and deep reasoning capabilities. With aggressive open-source releases, this family provides incredibly competitive performance across both text and advanced multimodal benchmarks globally.`;
    }
    if (normalized.includes("gemini") || normalized.includes("gemma")) {
      return `Google's ${name} architecture delivers profound native multimodal understanding from the ground up. It seamlessly integrates across diverse data types, providing vast context processing for unparalleled ecosystem and enterprise integration.`;
    }
    if (normalized.includes("deepseek")) {
      return `The ${name} family introduces groundbreaking advancements in open-source reasoning and coding models. By leveraging highly optimized training pipelines, they deliver top-tier cognitive performance while maintaining remarkable deployment and inference efficiency.`;
    }
    return `The ${name} family represents a significant architectural milestone in generative AI. Leveraging novel training methodologies, these models deliver exceptional performance, reliability, and versatility for a wide array of demanding tasks.`;
  }
  
  // Specific mappings for Vendors
  if (section === "vendors") {
    if (normalized.includes("openai")) {
      return `${name} is a leading research laboratory dedicated to advancing artificial general intelligence safely. Their flagship models consistently redefine state-of-the-art performance across reasoning and multimodal tasks, driving widespread enterprise technological adoption.`;
    }
    if (normalized.includes("anthropic")) {
      return `${name} focuses intensely on building reliable, interpretable, and steerable AI systems. Their Constitutional AI approach ensures models remain helpful and harmless, making them the preferred choice for strict compliance environments.`;
    }
    if (normalized.includes("meta")) {
      return `${name} AI aggressively champions the open-source software movement. By releasing powerful foundation models to the global community, they radically lower the barrier to entry for advanced generative artificial intelligence research.`;
    }
    if (normalized.includes("google") || normalized.includes("deepmind")) {
      return `${name} leverages decades of pioneering research in neural networks and reinforcement learning. Their ecosystem delivers unparalleled native multimodal capabilities and vast context processing tightly integrated with enterprise cloud infrastructure.`;
    }
    if (normalized.includes("mistral")) {
      return `${name} is an innovative European AI powerhouse creating incredibly efficient open-weights models. By pioneering new architectures, they empower developers globally with accessible models that strongly rival massive proprietary AI systems.`;
    }
    if (normalized.includes("alibaba") || normalized.includes("qwen")) {
      return `${name} bridges global AI research with cutting-edge multilingual and multimodal foundation models. Their aggressive commitment to open-sourcing highly capable architectures provides developers with incredibly robust tools for diverse global applications.`;
    }
    if (normalized.includes("xai")) {
      return `${name} pushes the boundaries of unfiltered, real-time reasoning models. With immense computational backing and novel training techniques, they aim to rapidly accelerate our understanding of the universe through advanced AI.`;
    }
    if (normalized.includes("microsoft")) {
      return `${name} seamlessly integrates state-of-the-art AI into universal productivity tools. Through strategic partnerships and their own efficient small language models, they deliver powerful, accessible cognitive capabilities to billions of users globally.`;
    }
    if (normalized.includes("zhipu") || normalized.includes("moonshot") || normalized.includes("deepseek")) {
      return `${name} is rapidly advancing the frontier of artificial intelligence research in Asia. By deploying massive parameter models with exceptional reasoning and context capabilities, they provide uniquely powerful solutions for global challenges.`;
    }
    return `${name} is an innovative organization pushing the boundaries of artificial intelligence. Through rigorous research and unique architectural approaches, they consistently contribute powerful new foundation models to the rapidly expanding tech ecosystem.`;
  }
  
  // Specific mappings for Domains
  if (section === "domains") {
    if (normalized.includes("finance") || normalized.includes("economic")) {
      return `${name} models are heavily optimized for complex quantitative analysis and market trend prediction. They rapidly digest dense financial reports and identify subtle anomalies in massive datasets to assist data-driven economic decisions.`;
    }
    if (normalized.includes("health") || normalized.includes("medical") || normalized.includes("science")) {
      return `${name} models represent a massive leap forward in clinical decision support and scientific research. By synthesizing vast amounts of peer-reviewed literature, these systems fundamentally accelerate the pace of modern biological discovery.`;
    }
    if (normalized.includes("code") || normalized.includes("programming") || normalized.includes("math")) {
      return `${name} models excel at formal logic, algorithmic complexity, and syntax generation. Trained on vast repositories, they help engineering teams maintain high velocity and mathematical accuracy without sacrificing overall structural code robustness.`;
    }
    if (normalized.includes("creative") || normalized.includes("art")) {
      return `${name} models are fine-tuned for unconstrained imagination and lateral thinking. They assist writers, artists, and creators by generating novel ideas, maintaining narrative consistency, and expanding the boundaries of digital multimedia production.`;
    }
    return `Models specializing in the ${name} domain are uniquely fine-tuned to handle specific professional jargon and logical structures. They provide incredibly accurate, context-aware assistance that vastly outperforms generalized models in specialized workflows.`;
  }
  
  // Specific mappings for Trending Models (API-driven dynamic names)
  if (section === "trending") {
    if (normalized.includes("gpt-4") || normalized.includes("o1")) {
      return `The ${name} model continues to dominate trending charts with its unparalleled general intelligence and flawless logic processing. It sets the absolute standard for enterprise integration and complex reasoning tasks globally.`;
    }
    if (normalized.includes("claude 3.5")) {
      return `${name} has surged in popularity due to its blistering speed, unmatched coding proficiency, and massive context window. It has rapidly become the preferred daily driver for developers and researchers tackling complex problems.`;
    }
    if (normalized.includes("llama 3.1")) {
      return `${name} broke all records as the most capable open-weights model ever released. Its massive parameter count and incredible reasoning capabilities finally rival top proprietary systems, running natively on customized local hardware.`;
    }
    return `The ${name} model is currently experiencing a massive surge in popularity across the community. With exceptional performance characteristics and novel architectural efficiencies, it has rapidly captured the attention of top global developers.`;
  }

  // Generic ultimate fallback for absolutely unrecognized cards
  return `Explore the unique capabilities of ${name}, a powerful entry in the rapidly expanding AI ecosystem. Engineered to deliver high-quality outputs and robust reliability, it remains an excellent choice for demanding next-generation applications.`;
}
