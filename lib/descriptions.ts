export function getCardDescription(section: string, name: string): string {
  const normalized = (name || "").toLowerCase().trim();
  
  if (section === "capabilities") {
    if (normalized.includes("multimodal") || normalized.includes("vision")) {
      return \`\${name} models have revolutionized the way AI interacts with the physical world by seamlessly processing both text and visual inputs. They can analyze complex images, read charts, interpret handwriting, and provide deep contextual understanding that goes far beyond traditional text-only natural language processing capabilities.\`;
    }
    if (normalized.includes("reasoning")) {
      return \`\${name} represents the frontier of advanced cognitive processing in artificial intelligence. These specialized models excel at solving complex logic puzzles, tackling multi-step mathematical problems, writing intricate code, and executing sophisticated chain-of-thought reasoning that mimics deep human analytical thinking and strategic planning across various domains.\`;
    }
    if (normalized.includes("code") || normalized.includes("programming")) {
      return \`\${name} capabilities empower developers by automating boilerplate generation, detecting nuanced bugs, and optimizing complex algorithms. These models act as tireless pair programmers, deeply understanding various programming languages, frameworks, and architectures to dramatically accelerate software development life cycles and improve overall code maintainability.\`;
    }
    if (normalized.includes("agent")) {
      return \`\${name} capabilities allow foundation models to autonomously execute complex workflows, interact with external APIs, and manage multi-step environments. By bridging the gap between passive text generation and active digital execution, these systems can reliably perform tasks ranging from automated web research to complex software operations.\`;
    }
    // Fallback for Capabilities
    return \`Discover the cutting-edge \${name} capabilities that are redefining what is possible in the modern AI ecosystem. These highly optimized foundation models have been rigorously trained to excel in this specific modality, offering unparalleled performance, remarkable efficiency, and innovative solutions for complex, real-world enterprise applications.\`;
  }
  
  if (section === "families") {
    if (normalized.includes("gpt") || normalized.includes("o1") || normalized.includes("o3")) {
      return \`The \${name} family by OpenAI continues to set industry benchmarks for general-purpose intelligence, nuanced language understanding, and robust reasoning. From creative writing to advanced logical deduction, these models consistently push the boundaries of what generative AI can achieve in both consumer and enterprise environments.\`;
    }
    if (normalized.includes("claude")) {
      return \`Anthropic's \${name} family is renowned for its exceptional focus on safety, steerability, and massive context window processing. These models excel at synthesizing vast amounts of information, maintaining nuanced nuance over long conversations, and providing highly reliable, helpful, and honest assistance across complex professional workflows.\`;
    }
    if (normalized.includes("llama")) {
      return \`Meta's \${name} family represents the vanguard of the open-weights movement, democratizing access to state-of-the-art artificial intelligence. These highly efficient models empower researchers and developers worldwide to build, fine-tune, and deploy powerful applications locally, fostering a vibrant ecosystem of community-driven AI innovation and discovery.\`;
    }
    if (normalized.includes("mistral")) {
      return \`The \${name} family delivers exceptional performance relative to its parameter count, pioneering highly efficient architectures like Mixture of Experts (MoE). Known for their speed, open accessibility, and strong reasoning capabilities, these models provide a compelling alternative for developers seeking powerful, cost-effective, and deployable AI solutions.\`;
    }
    // Fallback for Families
    return \`The \${name} family of models represents a significant architectural milestone in the rapidly evolving landscape of generative artificial intelligence. By leveraging novel training methodologies and optimized neural network designs, these models deliver exceptional performance, reliability, and versatility for a wide array of demanding digital tasks.\`;
  }
  
  if (section === "vendors") {
    if (normalized.includes("openai")) {
      return \`\${name} is a leading artificial intelligence research laboratory dedicated to ensuring that artificial general intelligence benefits all of humanity. Their flagship models have consistently redefined state-of-the-art performance across reasoning, coding, and multimodal tasks, driving widespread enterprise adoption and shaping the future of global technology.\`;
    }
    if (normalized.includes("anthropic")) {
      return \`\${name} is an AI safety and research company focused on building reliable, interpretable, and steerable AI systems. Their Constitutional AI approach ensures models remain helpful and harmless, making them the preferred choice for enterprises handling sensitive data and requiring strict compliance and alignment guardrails.\`;
    }
    if (normalized.includes("meta")) {
      return \`\${name} AI has aggressively championed the open-source software movement by releasing powerful foundation models to the global research community. Their commitment to open weights has catalyzed unprecedented innovation, allowing developers to build specialized tools while radically lowering the barrier to entry for advanced generative AI.\`;
    }
    if (normalized.includes("google") || normalized.includes("deepmind")) {
      return \`\${name} brings decades of pioneering research in machine learning, neural networks, and reinforcement learning to the generative AI frontier. Their models seamlessly integrate across massive ecosystems, offering unparalleled native multimodal capabilities, vast context processing, and deep integration with enterprise cloud infrastructure and productivity suites.\`;
    }
    if (normalized.includes("mistral")) {
      return \`\${name} is a European AI powerhouse known for creating incredibly efficient and powerful open-weights models. By pioneering innovative architectures and focusing on computational efficiency, they have quickly become a dominant force, empowering developers with models that rival proprietary systems while running on accessible hardware.\`;
    }
    // Fallback for Vendors
    return \`\${name} is an innovative organization pushing the boundaries of what is possible in the field of artificial intelligence. Through rigorous research, massive computational investment, and unique architectural approaches, they are contributing powerful new foundation models to the rapidly expanding global ecosystem of machine learning tools.\`;
  }
  
  if (section === "domains") {
    if (normalized.includes("finance")) {
      return \`\${name} models are heavily optimized for complex quantitative analysis, regulatory compliance, and market trend prediction. These highly specialized AI systems can rapidly digest dense financial reports, identify subtle anomalies in massive datasets, and assist analysts in making data-driven decisions in high-stakes economic environments.\`;
    }
    if (normalized.includes("healthcare") || normalized.includes("medical")) {
      return \`\${name} models represent a massive leap forward in clinical decision support and biological research. By synthesizing vast amounts of peer-reviewed medical literature, interpreting diagnostic imaging, and assisting with complex protein folding, these systems are fundamentally accelerating the pace of modern medical discovery and patient care.\`;
    }
    if (normalized.includes("code") || normalized.includes("programming")) {
      return \`\${name} models are specialized coding assistants trained on vast repositories of source code across dozens of programming languages. They excel at writing boilerplate, identifying security vulnerabilities, optimizing algorithmic complexity, and helping software engineering teams maintain high velocity without sacrificing overall code quality or robustness.\`;
    }
    // Fallback for Domains
    return \`Models specializing in the \${name} domain are uniquely fine-tuned to handle the specific jargon, logical structures, and regulatory requirements of this field. By leveraging domain-specific training data, these systems provide incredibly accurate, context-aware assistance that vastly outperforms general-purpose models in specialized professional workflows.\`;
  }
  
  if (section === "trending") {
    return \`\${name} is currently experiencing a massive surge in popularity across the AI community due to its exceptional performance characteristics. Whether it's setting new state-of-the-art benchmark records, introducing novel architectural efficiencies, or providing unprecedented value, this model has rapidly captured the attention of top developers and researchers worldwide.\`;
  }

  // Generic ultimate fallback
  return \`Explore the unique capabilities of \${name}, a powerful entry in the rapidly expanding artificial intelligence ecosystem. This sophisticated entity has been engineered to deliver high-quality outputs, robust reliability, and seamless integration, making it an excellent choice for developers looking to build next-generation applications.\`;
}
