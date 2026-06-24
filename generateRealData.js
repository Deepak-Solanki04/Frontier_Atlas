const fs = require('fs');

const realPapers = [
  {
    title: "Attention Is All You Need",
    meta: "Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Lukasz Kaiser, Illia Polosukhin • 2017",
    abstract: "We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.",
    tagsRow1: [{ text: "Transformer", color: "blue" }, { text: "Attention", color: "orange" }],
    tagsRow2: ["NLP", "Deep Learning"],
    metrics: [{ icon: "↑", value: "110K", label: "Citations", color: "red" }, { icon: "github", value: "54K", label: "Stars", color: "black" }],
    thumbnail: "/thumbnails/thumb_0.png",
    categories: ['transformer', 'lm']
  },
  {
    title: "BERT: Pre-training of Deep Bidirectional Transformers",
    meta: "Jacob Devlin, Ming-Wei Chang, Kenton Lee, Kristina Toutanova • 2018",
    abstract: "We introduce a new language representation model called BERT, which is designed to pre-train deep bidirectional representations from unlabeled text.",
    tagsRow1: [{ text: "Pre-training", color: "green" }, { text: "Bidirectional", color: "purple" }],
    tagsRow2: ["NLP", "Transformers"],
    metrics: [{ icon: "↑", value: "84K", label: "Citations", color: "red" }, { icon: "github", value: "35K", label: "Stars", color: "black" }],
    thumbnail: "/thumbnails/thumb_1.png",
    categories: ['transformer', 'lm']
  },
  {
    title: "Language Models are Few-Shot Learners",
    meta: "Tom B. Brown, Benjamin Mann, Nick Ryder, Melanie Subbiah, Jared Kaplan, Prafulla Dhariwal • 2020",
    abstract: "We train GPT-3, an autoregressive language model with 175 billion parameters, 10x more than any previous non-sparse language model, and test its performance.",
    tagsRow1: [{ text: "LLM", color: "blue" }, { text: "Few-Shot", color: "orange" }],
    tagsRow2: ["Generative", "Scaling"],
    metrics: [{ icon: "↑", value: "18K", label: "Citations", color: "red" }, { icon: "github", value: "12K", label: "Stars", color: "black" }],
    thumbnail: "/thumbnails/thumb_2.png",
    categories: ['lm', 'text-gen']
  },
  {
    title: "LLaMA: Open and Efficient Foundation Language Models",
    meta: "Hugo Touvron, Thibaut Lavril, Gautier Izacard, Xavier Martinet, Marie-Anne Lachaux • 2023",
    abstract: "We introduce LLaMA, a collection of foundation language models ranging from 7B to 65B parameters. We train our models on trillions of tokens.",
    tagsRow1: [{ text: "Open Source", color: "green" }, { text: "Foundation", color: "purple" }],
    tagsRow2: ["LLM", "Meta"],
    metrics: [{ icon: "↑", value: "5K", label: "Citations", color: "red" }, { icon: "github", value: "50K", label: "Stars", color: "black" }],
    thumbnail: "/thumbnails/thumb_3.png",
    categories: ['lm', 'text-gen']
  },
  {
    title: "LoRA: Low-Rank Adaptation of Large Language Models",
    meta: "Edward J. Hu, Yelong Shen, Phillip Wallis, Zeyuan Allen-Zhu, Yuanzhi Li • 2021",
    abstract: "We propose Low-Rank Adaptation, or LoRA, which freezes the pre-trained model weights and injects trainable rank decomposition matrices into each layer.",
    tagsRow1: [{ text: "PEFT", color: "orange" }, { text: "Finetuning", color: "blue" }],
    tagsRow2: ["Optimization", "LLM"],
    metrics: [{ icon: "↑", value: "4K", label: "Citations", color: "red" }, { icon: "github", value: "18K", label: "Stars", color: "black" }],
    thumbnail: "/thumbnails/thumb_4.png",
    categories: ['lora', 'lm']
  },
  {
    title: "Training language models to follow instructions",
    meta: "Long Ouyang, Jeffrey Wu, Xu Jiang, Diogo Almeida, Carroll Wainwright • 2022",
    abstract: "We show an avenue for aligning language models with user intent on a wide range of tasks by fine-tuning with human feedback.",
    tagsRow1: [{ text: "RLHF", color: "purple" }, { text: "Alignment", color: "green" }],
    tagsRow2: ["InstructGPT", "OpenAI"],
    metrics: [{ icon: "↑", value: "6K", label: "Citations", color: "red" }, { icon: "github", value: "8K", label: "Stars", color: "black" }],
    thumbnail: "/thumbnails/thumb_5.png",
    categories: ['rlhf', 'lm']
  },
  {
    title: "Deep Residual Learning for Image Recognition",
    meta: "Kaiming He, Xiangyu Zhang, Shaoqing Ren, Jian Sun • 2015",
    abstract: "We present a residual learning framework to ease the training of networks that are substantially deeper than those used previously.",
    tagsRow1: [{ text: "ResNet", color: "blue" }, { text: "Computer Vision", color: "orange" }],
    tagsRow2: ["CNN", "Architecture"],
    metrics: [{ icon: "↑", value: "160K", label: "Citations", color: "red" }, { icon: "github", value: "80K", label: "Stars", color: "black" }],
    thumbnail: "/thumbnails/thumb_6.png",
    categories: ['image-gen', 'computer-use']
  },
  {
    title: "An Image is Worth 16x16 Words",
    meta: "Alexey Dosovitskiy, Lucas Beyer, Alexander Kolesnikov, Dirk Weissenborn • 2020",
    abstract: "We show that a pure transformer applied directly to sequences of image patches can perform very well on image classification tasks.",
    tagsRow1: [{ text: "ViT", color: "green" }, { text: "Vision", color: "purple" }],
    tagsRow2: ["Transformers", "Scaling"],
    metrics: [{ icon: "↑", value: "35K", label: "Citations", color: "red" }, { icon: "github", value: "22K", label: "Stars", color: "black" }],
    thumbnail: "/thumbnails/thumb_7.png",
    categories: ['transformer', 'image-gen']
  },
  {
    title: "Direct Preference Optimization",
    meta: "Rafael Rafailov, Archit Sharma, Eric Mitchell, Stefano Ermon, Christopher D. Manning • 2023",
    abstract: "We introduce DPO, a new algorithm for aligning language models to human preferences without requiring a separate reward model.",
    tagsRow1: [{ text: "Alignment", color: "orange" }, { text: "DPO", color: "blue" }],
    tagsRow2: ["RLHF Alternative", "Finetuning"],
    metrics: [{ icon: "↑", value: "1.2K", label: "Citations", color: "red" }, { icon: "github", value: "9K", label: "Stars", color: "black" }],
    thumbnail: "/thumbnails/thumb_8.png",
    categories: ['dpo', 'text-gen']
  },
  {
    title: "Highly accurate protein structure prediction",
    meta: "John Jumper, Richard Evans, Alexander Pritzel, Tim Green, Michael Figurnov • 2021",
    abstract: "We present AlphaFold, a novel machine learning approach that incorporates physical and biological knowledge about protein structure.",
    tagsRow1: [{ text: "Biology", color: "green" }, { text: "AlphaFold", color: "purple" }],
    tagsRow2: ["DeepMind", "Science"],
    metrics: [{ icon: "↑", value: "28K", label: "Citations", color: "red" }, { icon: "github", value: "14K", label: "Stars", color: "black" }],
    thumbnail: "/thumbnails/thumb_9.png",
    categories: ['transformer']
  },
  {
    title: "FlashAttention: Fast and Memory-Efficient Exact Attention",
    meta: "Tri Dao, Daniel Y. Fu, Stefano Ermon, Atri Rudra, Christopher Ré • 2022",
    abstract: "We propose FlashAttention, an IO-aware exact attention algorithm that uses tiling to reduce memory reads/writes.",
    tagsRow1: [{ text: "Optimization", color: "blue" }, { text: "Hardware", color: "orange" }],
    tagsRow2: ["CUDA", "Attention"],
    metrics: [{ icon: "↑", value: "2.5K", label: "Citations", color: "red" }, { icon: "github", value: "16K", label: "Stars", color: "black" }],
    thumbnail: "/thumbnails/thumb_10.png",
    categories: ['transformer', 'coding']
  },
  {
    title: "RT-2: Vision-Language-Action Models",
    meta: "Anthony Brohan, Noah Brown, Justice Carbajal, Yevgen Chebotar • 2023",
    abstract: "We study how vision-language models trained on Internet-scale data can be incorporated directly into end-to-end robotic control.",
    tagsRow1: [{ text: "Robotics", color: "purple" }, { text: "VLA", color: "green" }],
    tagsRow2: ["Embodied AI", "Google DeepMind"],
    metrics: [{ icon: "↑", value: "900", label: "Citations", color: "red" }, { icon: "github", value: "3K", label: "Stars", color: "black" }],
    thumbnail: "/thumbnails/thumb_11.png",
    categories: ['robotics', 'agents']
  },
  {
    title: "Learning Transferable Visual Models From Natural Language",
    meta: "Alec Radford, Jong Wook Kim, Chris Hallacy, Aditya Ramesh, Gabriel Goh • 2021",
    abstract: "We demonstrate that the simple pre-training task of predicting which caption goes with which image is an efficient and scalable way to learn SOTA image representations.",
    tagsRow1: [{ text: "Multimodal", color: "blue" }, { text: "CLIP", color: "orange" }],
    tagsRow2: ["Vision", "Language"],
    metrics: [{ icon: "↑", value: "19K", label: "Citations", color: "red" }, { icon: "github", value: "21K", label: "Stars", color: "black" }],
    thumbnail: "/thumbnails/thumb_12.png",
    categories: ['image-gen', 'text-gen']
  },
  {
    title: "Diffusion Models Beat GANs on Image Synthesis",
    meta: "Prafulla Dhariwal, Alex Nichol • 2021",
    abstract: "We show that diffusion models can achieve image sample quality superior to the current state-of-the-art generative models.",
    tagsRow1: [{ text: "Diffusion", color: "green" }, { text: "Generation", color: "purple" }],
    tagsRow2: ["Synthesis", "OpenAI"],
    metrics: [{ icon: "↑", value: "8K", label: "Citations", color: "red" }, { icon: "github", value: "11K", label: "Stars", color: "black" }],
    thumbnail: "/thumbnails/thumb_13.png",
    categories: ['image-gen']
  },
  {
    title: "QLoRA: Efficient Finetuning of Quantized LLMs",
    meta: "Tim Dettmers, Artidoro Pagnoni, Ari Holtzman, Luke Zettlemoyer • 2023",
    abstract: "We present QLoRA, an efficient finetuning approach that reduces memory usage enough to finetune a 65B parameter model on a single 48GB GPU.",
    tagsRow1: [{ text: "Quantization", color: "orange" }, { text: "PEFT", color: "blue" }],
    tagsRow2: ["Efficiency", "LLM"],
    metrics: [{ icon: "↑", value: "2K", label: "Citations", color: "red" }, { icon: "github", value: "15K", label: "Stars", color: "black" }],
    thumbnail: "/thumbnails/thumb_14.png",
    categories: ['lora', 'lm']
  },
  {
    title: "Chain-of-Thought Prompting Elicits Reasoning",
    meta: "Jason Wei, Xuezhi Wang, Dale Schuurmans, Maarten Bosma, Ed Chi • 2022",
    abstract: "We explore how generating a chain of thought—a series of intermediate reasoning steps—significantly improves the ability of LLMs to perform complex reasoning.",
    tagsRow1: [{ text: "Reasoning", color: "purple" }, { text: "Prompting", color: "green" }],
    tagsRow2: ["CoT", "NLP"],
    metrics: [{ icon: "↑", value: "6.5K", label: "Citations", color: "red" }, { icon: "github", value: "4K", label: "Stars", color: "black" }],
    thumbnail: "/thumbnails/thumb_15.png",
    categories: ['cot', 'reasoning']
  },
  {
    title: "ReAct: Synergizing Reasoning and Acting in Language Models",
    meta: "Shunyu Yao, Jeffrey Zhao, Dian Yu, Nan Du, Izhak Shafran, Karthik Narasimhan • 2022",
    abstract: "We explore the use of LLMs to generate both reasoning traces and task-specific actions in an interleaved manner.",
    tagsRow1: [{ text: "Agents", color: "blue" }, { text: "ReAct", color: "orange" }],
    tagsRow2: ["Tool Use", "Reasoning"],
    metrics: [{ icon: "↑", value: "2.8K", label: "Citations", color: "red" }, { icon: "github", value: "6K", label: "Stars", color: "black" }],
    thumbnail: "/thumbnails/thumb_16.png",
    categories: ['react', 'agents']
  },
  {
    title: "RoBERTa: A Robustly Optimized BERT Pretraining Approach",
    meta: "Yinhan Liu, Myle Ott, Naman Goyal, Jingfei Du, Mandar Joshi • 2019",
    abstract: "We carefully measure the impact of many key hyperparameters and training data size. We find that BERT was significantly undertrained.",
    tagsRow1: [{ text: "Transformers", color: "green" }, { text: "Optimization", color: "purple" }],
    tagsRow2: ["NLP", "Baselines"],
    metrics: [{ icon: "↑", value: "22K", label: "Citations", color: "red" }, { icon: "github", value: "10K", label: "Stars", color: "black" }],
    thumbnail: "/thumbnails/thumb_17.png",
    categories: ['transformer', 'lm']
  },
  {
    title: "Proximal Policy Optimization Algorithms",
    meta: "John Schulman, Filip Wolski, Prafulla Dhariwal, Alec Radford, Oleg Klimov • 2017",
    abstract: "We propose a new family of policy gradient methods for reinforcement learning, which alternate between sampling data and optimizing a surrogate objective.",
    tagsRow1: [{ text: "RL", color: "orange" }, { text: "PPO", color: "blue" }],
    tagsRow2: ["OpenAI", "Algorithms"],
    metrics: [{ icon: "↑", value: "17K", label: "Citations", color: "red" }, { icon: "github", value: "25K", label: "Stars", color: "black" }],
    thumbnail: "/thumbnails/thumb_18.png",
    categories: ['rlhf']
  },
  {
    title: "Segment Anything",
    meta: "Alexander Kirillov, Eric Mintun, Nikhila Ravi, Hanzi Mao, Chloe Rolland • 2023",
    abstract: "We introduce the Segment Anything (SA) project: a new task, model, and dataset for image segmentation. Using our efficient model in a data collection loop.",
    tagsRow1: [{ text: "Segmentation", color: "purple" }, { text: "Vision", color: "green" }],
    tagsRow2: ["Zero-Shot", "Meta"],
    metrics: [{ icon: "↑", value: "4K", label: "Citations", color: "red" }, { icon: "github", value: "45K", label: "Stars", color: "black" }],
    thumbnail: "/thumbnails/thumb_19.png",
    categories: ['computer-use', 'image-gen']
  }
];

// Re-generate topicData for all 25 slugs using this exact list of 20 papers.
const topics = [
  'trending', 'latest-papers', 'most-github-stars', 'agents', 'reasoning',
  'language-modeling', 'coding-agents', 'computer-use', 'world-models', 'robotics',
  'transformer', 'chain-of-thought', 'react', 'lora', 'rlhf', 'dpo', 'mcp',
  'text-generation', 'image-generation', 'video-generation', 'audio-generation',
  'organizations', 'collections', 'bookmarks', 'reading-list'
];

let out = `export const topicData: Record<string, { title: string, desc: string, papers: any[] }> = {\n`;

topics.forEach(slug => {
  const title = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  let desc = "Curated list of real AI research papers matching this category.";
  
  let slugPapers = [];
  
  if (slug === 'trending') {
    // Trending gets random selection
    slugPapers = [...realPapers].sort(() => 0.5 - Math.random()).slice(0, 10);
    desc = "The most discussed and trending papers in the AI community right now.";
  } else if (slug === 'latest-papers') {
    // Latest papers - grab papers with 2023 in their meta string or just random fallback
    slugPapers = realPapers.filter(p => p.meta.includes('2023') || p.meta.includes('2022'));
    if (slugPapers.length < 5) slugPapers = [...realPapers].slice(0, 8);
    desc = "The newest cutting-edge research publications released recently.";
  } else if (slug === 'most-github-stars') {
    // Sort by github stars (mock sort: "54K" -> 54000)
    const parseStars = (kStr) => parseFloat(kStr.replace('K', '')) * 1000 || 0;
    slugPapers = [...realPapers].sort((a, b) => parseStars(b.metrics[1].value) - parseStars(a.metrics[1].value)).slice(0, 10);
    desc = "Papers whose official repositories have accrued the most stars on GitHub.";
  } else {
    // Standard category
    slugPapers = realPapers.filter(p => p.categories.includes(slug));
    // If we don't have enough, throw in a couple random ones so the page isn't totally empty
    if (slugPapers.length === 0) {
      slugPapers = [...realPapers].sort(() => 0.5 - Math.random()).slice(0, 3);
    }
  }
  
  const formattedPapers = slugPapers.map((p, idx) => {
    const citationCount = Math.floor(Math.random() * 80) + 10;
    const updatedMetrics = [
      { icon: "↑", value: p.metrics[0].value, label: "Upvotes", color: "red" },
      { icon: "github", value: p.metrics[1].value, label: "Repo", color: "black" },
      { icon: "chat", value: citationCount.toString(), label: "Citations", color: "black" }
    ];

    return {
      ...p,
      metrics: updatedMetrics,
      id: `${slug}-${idx}`,
      sotaHtml: '🏆 <strong style="color: #9a3412;">SOTA</strong>'
    };
  });

  out += `  '${slug}': {\n`;
  out += `    title: ${JSON.stringify(title)},\n`;
  out += `    desc: ${JSON.stringify(desc)},\n`;
  out += `    papers: ${JSON.stringify(formattedPapers, null, 4)}\n`;
  out += `  },\n`;
});

out += `};\n`;

fs.writeFileSync('./data/topicData.ts', out);
console.log('Successfully generated real topicData.ts');
