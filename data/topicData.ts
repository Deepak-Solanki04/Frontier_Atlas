export const topicData: Record<string, { title: string, desc: string, papers: any[] }> = {
  'trending': {
    title: "Trending",
    desc: "The most discussed and trending papers in the AI community right now.",
    papers: [
    {
        "title": "LoRA: Low-Rank Adaptation of Large Language Models",
        "meta": "Edward J. Hu, Yelong Shen, Phillip Wallis, Zeyuan Allen-Zhu, Yuanzhi Li • 2021",
        "abstract": "We propose Low-Rank Adaptation, or LoRA, which freezes the pre-trained model weights and injects trainable rank decomposition matrices into each layer.",
        "tagsRow1": [
            {
                "text": "PEFT",
                "color": "orange"
            },
            {
                "text": "Finetuning",
                "color": "blue"
            }
        ],
        "tagsRow2": [
            "Optimization",
            "LLM"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "4K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "18K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "81",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_4.png",
        "categories": [
            "lora",
            "lm"
        ],
        "id": "trending-0",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "Deep Residual Learning for Image Recognition",
        "meta": "Kaiming He, Xiangyu Zhang, Shaoqing Ren, Jian Sun • 2015",
        "abstract": "We present a residual learning framework to ease the training of networks that are substantially deeper than those used previously.",
        "tagsRow1": [
            {
                "text": "ResNet",
                "color": "blue"
            },
            {
                "text": "Computer Vision",
                "color": "orange"
            }
        ],
        "tagsRow2": [
            "CNN",
            "Architecture"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "160K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "80K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "37",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_6.png",
        "categories": [
            "image-gen",
            "computer-use"
        ],
        "id": "trending-1",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "Chain-of-Thought Prompting Elicits Reasoning",
        "meta": "Jason Wei, Xuezhi Wang, Dale Schuurmans, Maarten Bosma, Ed Chi • 2022",
        "abstract": "We explore how generating a chain of thought—a series of intermediate reasoning steps—significantly improves the ability of LLMs to perform complex reasoning.",
        "tagsRow1": [
            {
                "text": "Reasoning",
                "color": "purple"
            },
            {
                "text": "Prompting",
                "color": "green"
            }
        ],
        "tagsRow2": [
            "CoT",
            "NLP"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "6.5K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "4K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "18",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_15.png",
        "categories": [
            "cot",
            "reasoning"
        ],
        "id": "trending-2",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "Proximal Policy Optimization Algorithms",
        "meta": "John Schulman, Filip Wolski, Prafulla Dhariwal, Alec Radford, Oleg Klimov • 2017",
        "abstract": "We propose a new family of policy gradient methods for reinforcement learning, which alternate between sampling data and optimizing a surrogate objective.",
        "tagsRow1": [
            {
                "text": "RL",
                "color": "orange"
            },
            {
                "text": "PPO",
                "color": "blue"
            }
        ],
        "tagsRow2": [
            "OpenAI",
            "Algorithms"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "17K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "25K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "15",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_18.png",
        "categories": [
            "rlhf"
        ],
        "id": "trending-3",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "Learning Transferable Visual Models From Natural Language",
        "meta": "Alec Radford, Jong Wook Kim, Chris Hallacy, Aditya Ramesh, Gabriel Goh • 2021",
        "abstract": "We demonstrate that the simple pre-training task of predicting which caption goes with which image is an efficient and scalable way to learn SOTA image representations.",
        "tagsRow1": [
            {
                "text": "Multimodal",
                "color": "blue"
            },
            {
                "text": "CLIP",
                "color": "orange"
            }
        ],
        "tagsRow2": [
            "Vision",
            "Language"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "19K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "21K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "15",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_12.png",
        "categories": [
            "image-gen",
            "text-gen"
        ],
        "id": "trending-4",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "RT-2: Vision-Language-Action Models",
        "meta": "Anthony Brohan, Noah Brown, Justice Carbajal, Yevgen Chebotar • 2023",
        "abstract": "We study how vision-language models trained on Internet-scale data can be incorporated directly into end-to-end robotic control.",
        "tagsRow1": [
            {
                "text": "Robotics",
                "color": "purple"
            },
            {
                "text": "VLA",
                "color": "green"
            }
        ],
        "tagsRow2": [
            "Embodied AI",
            "Google DeepMind"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "900",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "3K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "76",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_11.png",
        "categories": [
            "robotics",
            "agents"
        ],
        "id": "trending-5",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "BERT: Pre-training of Deep Bidirectional Transformers",
        "meta": "Jacob Devlin, Ming-Wei Chang, Kenton Lee, Kristina Toutanova • 2018",
        "abstract": "We introduce a new language representation model called BERT, which is designed to pre-train deep bidirectional representations from unlabeled text.",
        "tagsRow1": [
            {
                "text": "Pre-training",
                "color": "green"
            },
            {
                "text": "Bidirectional",
                "color": "purple"
            }
        ],
        "tagsRow2": [
            "NLP",
            "Transformers"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "84K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "35K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "13",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_1.png",
        "categories": [
            "transformer",
            "lm"
        ],
        "id": "trending-6",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "Highly accurate protein structure prediction",
        "meta": "John Jumper, Richard Evans, Alexander Pritzel, Tim Green, Michael Figurnov • 2021",
        "abstract": "We present AlphaFold, a novel machine learning approach that incorporates physical and biological knowledge about protein structure.",
        "tagsRow1": [
            {
                "text": "Biology",
                "color": "green"
            },
            {
                "text": "AlphaFold",
                "color": "purple"
            }
        ],
        "tagsRow2": [
            "DeepMind",
            "Science"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "28K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "14K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "35",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_9.png",
        "categories": [
            "transformer"
        ],
        "id": "trending-7",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "Language Models are Few-Shot Learners",
        "meta": "Tom B. Brown, Benjamin Mann, Nick Ryder, Melanie Subbiah, Jared Kaplan, Prafulla Dhariwal • 2020",
        "abstract": "We train GPT-3, an autoregressive language model with 175 billion parameters, 10x more than any previous non-sparse language model, and test its performance.",
        "tagsRow1": [
            {
                "text": "LLM",
                "color": "blue"
            },
            {
                "text": "Few-Shot",
                "color": "orange"
            }
        ],
        "tagsRow2": [
            "Generative",
            "Scaling"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "18K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "12K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "20",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_2.png",
        "categories": [
            "lm",
            "text-gen"
        ],
        "id": "trending-8",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "Training language models to follow instructions",
        "meta": "Long Ouyang, Jeffrey Wu, Xu Jiang, Diogo Almeida, Carroll Wainwright • 2022",
        "abstract": "We show an avenue for aligning language models with user intent on a wide range of tasks by fine-tuning with human feedback.",
        "tagsRow1": [
            {
                "text": "RLHF",
                "color": "purple"
            },
            {
                "text": "Alignment",
                "color": "green"
            }
        ],
        "tagsRow2": [
            "InstructGPT",
            "OpenAI"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "6K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "8K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "14",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_5.png",
        "categories": [
            "rlhf",
            "lm"
        ],
        "id": "trending-9",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    }
]
  },
  'latest-papers': {
    title: "Latest Papers",
    desc: "The newest cutting-edge research publications released recently.",
    papers: [
    {
        "title": "LLaMA: Open and Efficient Foundation Language Models",
        "meta": "Hugo Touvron, Thibaut Lavril, Gautier Izacard, Xavier Martinet, Marie-Anne Lachaux • 2023",
        "abstract": "We introduce LLaMA, a collection of foundation language models ranging from 7B to 65B parameters. We train our models on trillions of tokens.",
        "tagsRow1": [
            {
                "text": "Open Source",
                "color": "green"
            },
            {
                "text": "Foundation",
                "color": "purple"
            }
        ],
        "tagsRow2": [
            "LLM",
            "Meta"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "5K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "50K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "28",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_3.png",
        "categories": [
            "lm",
            "text-gen"
        ],
        "id": "latest-papers-0",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "Training language models to follow instructions",
        "meta": "Long Ouyang, Jeffrey Wu, Xu Jiang, Diogo Almeida, Carroll Wainwright • 2022",
        "abstract": "We show an avenue for aligning language models with user intent on a wide range of tasks by fine-tuning with human feedback.",
        "tagsRow1": [
            {
                "text": "RLHF",
                "color": "purple"
            },
            {
                "text": "Alignment",
                "color": "green"
            }
        ],
        "tagsRow2": [
            "InstructGPT",
            "OpenAI"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "6K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "8K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "54",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_5.png",
        "categories": [
            "rlhf",
            "lm"
        ],
        "id": "latest-papers-1",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "Direct Preference Optimization",
        "meta": "Rafael Rafailov, Archit Sharma, Eric Mitchell, Stefano Ermon, Christopher D. Manning • 2023",
        "abstract": "We introduce DPO, a new algorithm for aligning language models to human preferences without requiring a separate reward model.",
        "tagsRow1": [
            {
                "text": "Alignment",
                "color": "orange"
            },
            {
                "text": "DPO",
                "color": "blue"
            }
        ],
        "tagsRow2": [
            "RLHF Alternative",
            "Finetuning"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "1.2K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "9K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "32",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_8.png",
        "categories": [
            "dpo",
            "text-gen"
        ],
        "id": "latest-papers-2",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "FlashAttention: Fast and Memory-Efficient Exact Attention",
        "meta": "Tri Dao, Daniel Y. Fu, Stefano Ermon, Atri Rudra, Christopher Ré • 2022",
        "abstract": "We propose FlashAttention, an IO-aware exact attention algorithm that uses tiling to reduce memory reads/writes.",
        "tagsRow1": [
            {
                "text": "Optimization",
                "color": "blue"
            },
            {
                "text": "Hardware",
                "color": "orange"
            }
        ],
        "tagsRow2": [
            "CUDA",
            "Attention"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "2.5K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "16K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "29",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_10.png",
        "categories": [
            "transformer",
            "coding"
        ],
        "id": "latest-papers-3",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "RT-2: Vision-Language-Action Models",
        "meta": "Anthony Brohan, Noah Brown, Justice Carbajal, Yevgen Chebotar • 2023",
        "abstract": "We study how vision-language models trained on Internet-scale data can be incorporated directly into end-to-end robotic control.",
        "tagsRow1": [
            {
                "text": "Robotics",
                "color": "purple"
            },
            {
                "text": "VLA",
                "color": "green"
            }
        ],
        "tagsRow2": [
            "Embodied AI",
            "Google DeepMind"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "900",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "3K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "68",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_11.png",
        "categories": [
            "robotics",
            "agents"
        ],
        "id": "latest-papers-4",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "QLoRA: Efficient Finetuning of Quantized LLMs",
        "meta": "Tim Dettmers, Artidoro Pagnoni, Ari Holtzman, Luke Zettlemoyer • 2023",
        "abstract": "We present QLoRA, an efficient finetuning approach that reduces memory usage enough to finetune a 65B parameter model on a single 48GB GPU.",
        "tagsRow1": [
            {
                "text": "Quantization",
                "color": "orange"
            },
            {
                "text": "PEFT",
                "color": "blue"
            }
        ],
        "tagsRow2": [
            "Efficiency",
            "LLM"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "2K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "15K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "48",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_14.png",
        "categories": [
            "lora",
            "lm"
        ],
        "id": "latest-papers-5",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "Chain-of-Thought Prompting Elicits Reasoning",
        "meta": "Jason Wei, Xuezhi Wang, Dale Schuurmans, Maarten Bosma, Ed Chi • 2022",
        "abstract": "We explore how generating a chain of thought—a series of intermediate reasoning steps—significantly improves the ability of LLMs to perform complex reasoning.",
        "tagsRow1": [
            {
                "text": "Reasoning",
                "color": "purple"
            },
            {
                "text": "Prompting",
                "color": "green"
            }
        ],
        "tagsRow2": [
            "CoT",
            "NLP"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "6.5K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "4K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "26",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_15.png",
        "categories": [
            "cot",
            "reasoning"
        ],
        "id": "latest-papers-6",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "ReAct: Synergizing Reasoning and Acting in Language Models",
        "meta": "Shunyu Yao, Jeffrey Zhao, Dian Yu, Nan Du, Izhak Shafran, Karthik Narasimhan • 2022",
        "abstract": "We explore the use of LLMs to generate both reasoning traces and task-specific actions in an interleaved manner.",
        "tagsRow1": [
            {
                "text": "Agents",
                "color": "blue"
            },
            {
                "text": "ReAct",
                "color": "orange"
            }
        ],
        "tagsRow2": [
            "Tool Use",
            "Reasoning"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "2.8K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "6K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "88",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_16.png",
        "categories": [
            "react",
            "agents"
        ],
        "id": "latest-papers-7",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "Segment Anything",
        "meta": "Alexander Kirillov, Eric Mintun, Nikhila Ravi, Hanzi Mao, Chloe Rolland • 2023",
        "abstract": "We introduce the Segment Anything (SA) project: a new task, model, and dataset for image segmentation. Using our efficient model in a data collection loop.",
        "tagsRow1": [
            {
                "text": "Segmentation",
                "color": "purple"
            },
            {
                "text": "Vision",
                "color": "green"
            }
        ],
        "tagsRow2": [
            "Zero-Shot",
            "Meta"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "4K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "45K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "70",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_19.png",
        "categories": [
            "computer-use",
            "image-gen"
        ],
        "id": "latest-papers-8",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    }
]
  },
  'most-github-stars': {
    title: "Most Github Stars",
    desc: "Papers whose official repositories have accrued the most stars on GitHub.",
    papers: [
    {
        "title": "Deep Residual Learning for Image Recognition",
        "meta": "Kaiming He, Xiangyu Zhang, Shaoqing Ren, Jian Sun • 2015",
        "abstract": "We present a residual learning framework to ease the training of networks that are substantially deeper than those used previously.",
        "tagsRow1": [
            {
                "text": "ResNet",
                "color": "blue"
            },
            {
                "text": "Computer Vision",
                "color": "orange"
            }
        ],
        "tagsRow2": [
            "CNN",
            "Architecture"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "160K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "80K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "19",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_6.png",
        "categories": [
            "image-gen",
            "computer-use"
        ],
        "id": "most-github-stars-0",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "Attention Is All You Need",
        "meta": "Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Lukasz Kaiser, Illia Polosukhin • 2017",
        "abstract": "We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.",
        "tagsRow1": [
            {
                "text": "Transformer",
                "color": "blue"
            },
            {
                "text": "Attention",
                "color": "orange"
            }
        ],
        "tagsRow2": [
            "NLP",
            "Deep Learning"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "110K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "54K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "59",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_0.png",
        "categories": [
            "transformer",
            "lm"
        ],
        "id": "most-github-stars-1",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "LLaMA: Open and Efficient Foundation Language Models",
        "meta": "Hugo Touvron, Thibaut Lavril, Gautier Izacard, Xavier Martinet, Marie-Anne Lachaux • 2023",
        "abstract": "We introduce LLaMA, a collection of foundation language models ranging from 7B to 65B parameters. We train our models on trillions of tokens.",
        "tagsRow1": [
            {
                "text": "Open Source",
                "color": "green"
            },
            {
                "text": "Foundation",
                "color": "purple"
            }
        ],
        "tagsRow2": [
            "LLM",
            "Meta"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "5K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "50K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "87",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_3.png",
        "categories": [
            "lm",
            "text-gen"
        ],
        "id": "most-github-stars-2",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "Segment Anything",
        "meta": "Alexander Kirillov, Eric Mintun, Nikhila Ravi, Hanzi Mao, Chloe Rolland • 2023",
        "abstract": "We introduce the Segment Anything (SA) project: a new task, model, and dataset for image segmentation. Using our efficient model in a data collection loop.",
        "tagsRow1": [
            {
                "text": "Segmentation",
                "color": "purple"
            },
            {
                "text": "Vision",
                "color": "green"
            }
        ],
        "tagsRow2": [
            "Zero-Shot",
            "Meta"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "4K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "45K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "12",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_19.png",
        "categories": [
            "computer-use",
            "image-gen"
        ],
        "id": "most-github-stars-3",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "BERT: Pre-training of Deep Bidirectional Transformers",
        "meta": "Jacob Devlin, Ming-Wei Chang, Kenton Lee, Kristina Toutanova • 2018",
        "abstract": "We introduce a new language representation model called BERT, which is designed to pre-train deep bidirectional representations from unlabeled text.",
        "tagsRow1": [
            {
                "text": "Pre-training",
                "color": "green"
            },
            {
                "text": "Bidirectional",
                "color": "purple"
            }
        ],
        "tagsRow2": [
            "NLP",
            "Transformers"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "84K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "35K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "21",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_1.png",
        "categories": [
            "transformer",
            "lm"
        ],
        "id": "most-github-stars-4",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "Proximal Policy Optimization Algorithms",
        "meta": "John Schulman, Filip Wolski, Prafulla Dhariwal, Alec Radford, Oleg Klimov • 2017",
        "abstract": "We propose a new family of policy gradient methods for reinforcement learning, which alternate between sampling data and optimizing a surrogate objective.",
        "tagsRow1": [
            {
                "text": "RL",
                "color": "orange"
            },
            {
                "text": "PPO",
                "color": "blue"
            }
        ],
        "tagsRow2": [
            "OpenAI",
            "Algorithms"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "17K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "25K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "19",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_18.png",
        "categories": [
            "rlhf"
        ],
        "id": "most-github-stars-5",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "An Image is Worth 16x16 Words",
        "meta": "Alexey Dosovitskiy, Lucas Beyer, Alexander Kolesnikov, Dirk Weissenborn • 2020",
        "abstract": "We show that a pure transformer applied directly to sequences of image patches can perform very well on image classification tasks.",
        "tagsRow1": [
            {
                "text": "ViT",
                "color": "green"
            },
            {
                "text": "Vision",
                "color": "purple"
            }
        ],
        "tagsRow2": [
            "Transformers",
            "Scaling"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "35K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "22K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "24",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_7.png",
        "categories": [
            "transformer",
            "image-gen"
        ],
        "id": "most-github-stars-6",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "Learning Transferable Visual Models From Natural Language",
        "meta": "Alec Radford, Jong Wook Kim, Chris Hallacy, Aditya Ramesh, Gabriel Goh • 2021",
        "abstract": "We demonstrate that the simple pre-training task of predicting which caption goes with which image is an efficient and scalable way to learn SOTA image representations.",
        "tagsRow1": [
            {
                "text": "Multimodal",
                "color": "blue"
            },
            {
                "text": "CLIP",
                "color": "orange"
            }
        ],
        "tagsRow2": [
            "Vision",
            "Language"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "19K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "21K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "69",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_12.png",
        "categories": [
            "image-gen",
            "text-gen"
        ],
        "id": "most-github-stars-7",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "LoRA: Low-Rank Adaptation of Large Language Models",
        "meta": "Edward J. Hu, Yelong Shen, Phillip Wallis, Zeyuan Allen-Zhu, Yuanzhi Li • 2021",
        "abstract": "We propose Low-Rank Adaptation, or LoRA, which freezes the pre-trained model weights and injects trainable rank decomposition matrices into each layer.",
        "tagsRow1": [
            {
                "text": "PEFT",
                "color": "orange"
            },
            {
                "text": "Finetuning",
                "color": "blue"
            }
        ],
        "tagsRow2": [
            "Optimization",
            "LLM"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "4K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "18K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "52",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_4.png",
        "categories": [
            "lora",
            "lm"
        ],
        "id": "most-github-stars-8",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "FlashAttention: Fast and Memory-Efficient Exact Attention",
        "meta": "Tri Dao, Daniel Y. Fu, Stefano Ermon, Atri Rudra, Christopher Ré • 2022",
        "abstract": "We propose FlashAttention, an IO-aware exact attention algorithm that uses tiling to reduce memory reads/writes.",
        "tagsRow1": [
            {
                "text": "Optimization",
                "color": "blue"
            },
            {
                "text": "Hardware",
                "color": "orange"
            }
        ],
        "tagsRow2": [
            "CUDA",
            "Attention"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "2.5K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "16K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "89",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_10.png",
        "categories": [
            "transformer",
            "coding"
        ],
        "id": "most-github-stars-9",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    }
]
  },
  'agents': {
    title: "Agents",
    desc: "Curated list of real AI research papers matching this category.",
    papers: [
    {
        "title": "RT-2: Vision-Language-Action Models",
        "meta": "Anthony Brohan, Noah Brown, Justice Carbajal, Yevgen Chebotar • 2023",
        "abstract": "We study how vision-language models trained on Internet-scale data can be incorporated directly into end-to-end robotic control.",
        "tagsRow1": [
            {
                "text": "Robotics",
                "color": "purple"
            },
            {
                "text": "VLA",
                "color": "green"
            }
        ],
        "tagsRow2": [
            "Embodied AI",
            "Google DeepMind"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "900",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "3K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "36",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_11.png",
        "categories": [
            "robotics",
            "agents"
        ],
        "id": "agents-0",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "ReAct: Synergizing Reasoning and Acting in Language Models",
        "meta": "Shunyu Yao, Jeffrey Zhao, Dian Yu, Nan Du, Izhak Shafran, Karthik Narasimhan • 2022",
        "abstract": "We explore the use of LLMs to generate both reasoning traces and task-specific actions in an interleaved manner.",
        "tagsRow1": [
            {
                "text": "Agents",
                "color": "blue"
            },
            {
                "text": "ReAct",
                "color": "orange"
            }
        ],
        "tagsRow2": [
            "Tool Use",
            "Reasoning"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "2.8K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "6K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "73",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_16.png",
        "categories": [
            "react",
            "agents"
        ],
        "id": "agents-1",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    }
]
  },
  'reasoning': {
    title: "Reasoning",
    desc: "Curated list of real AI research papers matching this category.",
    papers: [
    {
        "title": "Chain-of-Thought Prompting Elicits Reasoning",
        "meta": "Jason Wei, Xuezhi Wang, Dale Schuurmans, Maarten Bosma, Ed Chi • 2022",
        "abstract": "We explore how generating a chain of thought—a series of intermediate reasoning steps—significantly improves the ability of LLMs to perform complex reasoning.",
        "tagsRow1": [
            {
                "text": "Reasoning",
                "color": "purple"
            },
            {
                "text": "Prompting",
                "color": "green"
            }
        ],
        "tagsRow2": [
            "CoT",
            "NLP"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "6.5K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "4K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "28",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_15.png",
        "categories": [
            "cot",
            "reasoning"
        ],
        "id": "reasoning-0",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    }
]
  },
  'language-modeling': {
    title: "Language Modeling",
    desc: "Curated list of real AI research papers matching this category.",
    papers: [
    {
        "title": "FlashAttention: Fast and Memory-Efficient Exact Attention",
        "meta": "Tri Dao, Daniel Y. Fu, Stefano Ermon, Atri Rudra, Christopher Ré • 2022",
        "abstract": "We propose FlashAttention, an IO-aware exact attention algorithm that uses tiling to reduce memory reads/writes.",
        "tagsRow1": [
            {
                "text": "Optimization",
                "color": "blue"
            },
            {
                "text": "Hardware",
                "color": "orange"
            }
        ],
        "tagsRow2": [
            "CUDA",
            "Attention"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "2.5K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "16K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "16",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_10.png",
        "categories": [
            "transformer",
            "coding"
        ],
        "id": "language-modeling-0",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "Language Models are Few-Shot Learners",
        "meta": "Tom B. Brown, Benjamin Mann, Nick Ryder, Melanie Subbiah, Jared Kaplan, Prafulla Dhariwal • 2020",
        "abstract": "We train GPT-3, an autoregressive language model with 175 billion parameters, 10x more than any previous non-sparse language model, and test its performance.",
        "tagsRow1": [
            {
                "text": "LLM",
                "color": "blue"
            },
            {
                "text": "Few-Shot",
                "color": "orange"
            }
        ],
        "tagsRow2": [
            "Generative",
            "Scaling"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "18K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "12K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "74",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_2.png",
        "categories": [
            "lm",
            "text-gen"
        ],
        "id": "language-modeling-1",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "LLaMA: Open and Efficient Foundation Language Models",
        "meta": "Hugo Touvron, Thibaut Lavril, Gautier Izacard, Xavier Martinet, Marie-Anne Lachaux • 2023",
        "abstract": "We introduce LLaMA, a collection of foundation language models ranging from 7B to 65B parameters. We train our models on trillions of tokens.",
        "tagsRow1": [
            {
                "text": "Open Source",
                "color": "green"
            },
            {
                "text": "Foundation",
                "color": "purple"
            }
        ],
        "tagsRow2": [
            "LLM",
            "Meta"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "5K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "50K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "15",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_3.png",
        "categories": [
            "lm",
            "text-gen"
        ],
        "id": "language-modeling-2",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    }
]
  },
  'coding-agents': {
    title: "Coding Agents",
    desc: "Curated list of real AI research papers matching this category.",
    papers: [
    {
        "title": "Language Models are Few-Shot Learners",
        "meta": "Tom B. Brown, Benjamin Mann, Nick Ryder, Melanie Subbiah, Jared Kaplan, Prafulla Dhariwal • 2020",
        "abstract": "We train GPT-3, an autoregressive language model with 175 billion parameters, 10x more than any previous non-sparse language model, and test its performance.",
        "tagsRow1": [
            {
                "text": "LLM",
                "color": "blue"
            },
            {
                "text": "Few-Shot",
                "color": "orange"
            }
        ],
        "tagsRow2": [
            "Generative",
            "Scaling"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "18K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "12K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "84",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_2.png",
        "categories": [
            "lm",
            "text-gen"
        ],
        "id": "coding-agents-0",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "Diffusion Models Beat GANs on Image Synthesis",
        "meta": "Prafulla Dhariwal, Alex Nichol • 2021",
        "abstract": "We show that diffusion models can achieve image sample quality superior to the current state-of-the-art generative models.",
        "tagsRow1": [
            {
                "text": "Diffusion",
                "color": "green"
            },
            {
                "text": "Generation",
                "color": "purple"
            }
        ],
        "tagsRow2": [
            "Synthesis",
            "OpenAI"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "8K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "11K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "89",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_13.png",
        "categories": [
            "image-gen"
        ],
        "id": "coding-agents-1",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "An Image is Worth 16x16 Words",
        "meta": "Alexey Dosovitskiy, Lucas Beyer, Alexander Kolesnikov, Dirk Weissenborn • 2020",
        "abstract": "We show that a pure transformer applied directly to sequences of image patches can perform very well on image classification tasks.",
        "tagsRow1": [
            {
                "text": "ViT",
                "color": "green"
            },
            {
                "text": "Vision",
                "color": "purple"
            }
        ],
        "tagsRow2": [
            "Transformers",
            "Scaling"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "35K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "22K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "22",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_7.png",
        "categories": [
            "transformer",
            "image-gen"
        ],
        "id": "coding-agents-2",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    }
]
  },
  'computer-use': {
    title: "Computer Use",
    desc: "Curated list of real AI research papers matching this category.",
    papers: [
    {
        "title": "Deep Residual Learning for Image Recognition",
        "meta": "Kaiming He, Xiangyu Zhang, Shaoqing Ren, Jian Sun • 2015",
        "abstract": "We present a residual learning framework to ease the training of networks that are substantially deeper than those used previously.",
        "tagsRow1": [
            {
                "text": "ResNet",
                "color": "blue"
            },
            {
                "text": "Computer Vision",
                "color": "orange"
            }
        ],
        "tagsRow2": [
            "CNN",
            "Architecture"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "160K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "80K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "44",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_6.png",
        "categories": [
            "image-gen",
            "computer-use"
        ],
        "id": "computer-use-0",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "Segment Anything",
        "meta": "Alexander Kirillov, Eric Mintun, Nikhila Ravi, Hanzi Mao, Chloe Rolland • 2023",
        "abstract": "We introduce the Segment Anything (SA) project: a new task, model, and dataset for image segmentation. Using our efficient model in a data collection loop.",
        "tagsRow1": [
            {
                "text": "Segmentation",
                "color": "purple"
            },
            {
                "text": "Vision",
                "color": "green"
            }
        ],
        "tagsRow2": [
            "Zero-Shot",
            "Meta"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "4K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "45K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "34",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_19.png",
        "categories": [
            "computer-use",
            "image-gen"
        ],
        "id": "computer-use-1",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    }
]
  },
  'world-models': {
    title: "World Models",
    desc: "Curated list of real AI research papers matching this category.",
    papers: [
    {
        "title": "An Image is Worth 16x16 Words",
        "meta": "Alexey Dosovitskiy, Lucas Beyer, Alexander Kolesnikov, Dirk Weissenborn • 2020",
        "abstract": "We show that a pure transformer applied directly to sequences of image patches can perform very well on image classification tasks.",
        "tagsRow1": [
            {
                "text": "ViT",
                "color": "green"
            },
            {
                "text": "Vision",
                "color": "purple"
            }
        ],
        "tagsRow2": [
            "Transformers",
            "Scaling"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "35K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "22K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "30",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_7.png",
        "categories": [
            "transformer",
            "image-gen"
        ],
        "id": "world-models-0",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "Chain-of-Thought Prompting Elicits Reasoning",
        "meta": "Jason Wei, Xuezhi Wang, Dale Schuurmans, Maarten Bosma, Ed Chi • 2022",
        "abstract": "We explore how generating a chain of thought—a series of intermediate reasoning steps—significantly improves the ability of LLMs to perform complex reasoning.",
        "tagsRow1": [
            {
                "text": "Reasoning",
                "color": "purple"
            },
            {
                "text": "Prompting",
                "color": "green"
            }
        ],
        "tagsRow2": [
            "CoT",
            "NLP"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "6.5K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "4K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "41",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_15.png",
        "categories": [
            "cot",
            "reasoning"
        ],
        "id": "world-models-1",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "RT-2: Vision-Language-Action Models",
        "meta": "Anthony Brohan, Noah Brown, Justice Carbajal, Yevgen Chebotar • 2023",
        "abstract": "We study how vision-language models trained on Internet-scale data can be incorporated directly into end-to-end robotic control.",
        "tagsRow1": [
            {
                "text": "Robotics",
                "color": "purple"
            },
            {
                "text": "VLA",
                "color": "green"
            }
        ],
        "tagsRow2": [
            "Embodied AI",
            "Google DeepMind"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "900",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "3K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "51",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_11.png",
        "categories": [
            "robotics",
            "agents"
        ],
        "id": "world-models-2",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    }
]
  },
  'robotics': {
    title: "Robotics",
    desc: "Curated list of real AI research papers matching this category.",
    papers: [
    {
        "title": "RT-2: Vision-Language-Action Models",
        "meta": "Anthony Brohan, Noah Brown, Justice Carbajal, Yevgen Chebotar • 2023",
        "abstract": "We study how vision-language models trained on Internet-scale data can be incorporated directly into end-to-end robotic control.",
        "tagsRow1": [
            {
                "text": "Robotics",
                "color": "purple"
            },
            {
                "text": "VLA",
                "color": "green"
            }
        ],
        "tagsRow2": [
            "Embodied AI",
            "Google DeepMind"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "900",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "3K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "47",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_11.png",
        "categories": [
            "robotics",
            "agents"
        ],
        "id": "robotics-0",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    }
]
  },
  'transformer': {
    title: "Transformer",
    desc: "Curated list of real AI research papers matching this category.",
    papers: [
    {
        "title": "Attention Is All You Need",
        "meta": "Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Lukasz Kaiser, Illia Polosukhin • 2017",
        "abstract": "We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.",
        "tagsRow1": [
            {
                "text": "Transformer",
                "color": "blue"
            },
            {
                "text": "Attention",
                "color": "orange"
            }
        ],
        "tagsRow2": [
            "NLP",
            "Deep Learning"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "110K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "54K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "13",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_0.png",
        "categories": [
            "transformer",
            "lm"
        ],
        "id": "transformer-0",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "BERT: Pre-training of Deep Bidirectional Transformers",
        "meta": "Jacob Devlin, Ming-Wei Chang, Kenton Lee, Kristina Toutanova • 2018",
        "abstract": "We introduce a new language representation model called BERT, which is designed to pre-train deep bidirectional representations from unlabeled text.",
        "tagsRow1": [
            {
                "text": "Pre-training",
                "color": "green"
            },
            {
                "text": "Bidirectional",
                "color": "purple"
            }
        ],
        "tagsRow2": [
            "NLP",
            "Transformers"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "84K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "35K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "77",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_1.png",
        "categories": [
            "transformer",
            "lm"
        ],
        "id": "transformer-1",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "An Image is Worth 16x16 Words",
        "meta": "Alexey Dosovitskiy, Lucas Beyer, Alexander Kolesnikov, Dirk Weissenborn • 2020",
        "abstract": "We show that a pure transformer applied directly to sequences of image patches can perform very well on image classification tasks.",
        "tagsRow1": [
            {
                "text": "ViT",
                "color": "green"
            },
            {
                "text": "Vision",
                "color": "purple"
            }
        ],
        "tagsRow2": [
            "Transformers",
            "Scaling"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "35K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "22K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "63",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_7.png",
        "categories": [
            "transformer",
            "image-gen"
        ],
        "id": "transformer-2",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "Highly accurate protein structure prediction",
        "meta": "John Jumper, Richard Evans, Alexander Pritzel, Tim Green, Michael Figurnov • 2021",
        "abstract": "We present AlphaFold, a novel machine learning approach that incorporates physical and biological knowledge about protein structure.",
        "tagsRow1": [
            {
                "text": "Biology",
                "color": "green"
            },
            {
                "text": "AlphaFold",
                "color": "purple"
            }
        ],
        "tagsRow2": [
            "DeepMind",
            "Science"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "28K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "14K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "37",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_9.png",
        "categories": [
            "transformer"
        ],
        "id": "transformer-3",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "FlashAttention: Fast and Memory-Efficient Exact Attention",
        "meta": "Tri Dao, Daniel Y. Fu, Stefano Ermon, Atri Rudra, Christopher Ré • 2022",
        "abstract": "We propose FlashAttention, an IO-aware exact attention algorithm that uses tiling to reduce memory reads/writes.",
        "tagsRow1": [
            {
                "text": "Optimization",
                "color": "blue"
            },
            {
                "text": "Hardware",
                "color": "orange"
            }
        ],
        "tagsRow2": [
            "CUDA",
            "Attention"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "2.5K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "16K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "53",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_10.png",
        "categories": [
            "transformer",
            "coding"
        ],
        "id": "transformer-4",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "RoBERTa: A Robustly Optimized BERT Pretraining Approach",
        "meta": "Yinhan Liu, Myle Ott, Naman Goyal, Jingfei Du, Mandar Joshi • 2019",
        "abstract": "We carefully measure the impact of many key hyperparameters and training data size. We find that BERT was significantly undertrained.",
        "tagsRow1": [
            {
                "text": "Transformers",
                "color": "green"
            },
            {
                "text": "Optimization",
                "color": "purple"
            }
        ],
        "tagsRow2": [
            "NLP",
            "Baselines"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "22K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "10K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "61",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_17.png",
        "categories": [
            "transformer",
            "lm"
        ],
        "id": "transformer-5",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    }
]
  },
  'chain-of-thought': {
    title: "Chain Of Thought",
    desc: "Curated list of real AI research papers matching this category.",
    papers: [
    {
        "title": "Learning Transferable Visual Models From Natural Language",
        "meta": "Alec Radford, Jong Wook Kim, Chris Hallacy, Aditya Ramesh, Gabriel Goh • 2021",
        "abstract": "We demonstrate that the simple pre-training task of predicting which caption goes with which image is an efficient and scalable way to learn SOTA image representations.",
        "tagsRow1": [
            {
                "text": "Multimodal",
                "color": "blue"
            },
            {
                "text": "CLIP",
                "color": "orange"
            }
        ],
        "tagsRow2": [
            "Vision",
            "Language"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "19K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "21K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "50",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_12.png",
        "categories": [
            "image-gen",
            "text-gen"
        ],
        "id": "chain-of-thought-0",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "QLoRA: Efficient Finetuning of Quantized LLMs",
        "meta": "Tim Dettmers, Artidoro Pagnoni, Ari Holtzman, Luke Zettlemoyer • 2023",
        "abstract": "We present QLoRA, an efficient finetuning approach that reduces memory usage enough to finetune a 65B parameter model on a single 48GB GPU.",
        "tagsRow1": [
            {
                "text": "Quantization",
                "color": "orange"
            },
            {
                "text": "PEFT",
                "color": "blue"
            }
        ],
        "tagsRow2": [
            "Efficiency",
            "LLM"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "2K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "15K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "38",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_14.png",
        "categories": [
            "lora",
            "lm"
        ],
        "id": "chain-of-thought-1",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "Training language models to follow instructions",
        "meta": "Long Ouyang, Jeffrey Wu, Xu Jiang, Diogo Almeida, Carroll Wainwright • 2022",
        "abstract": "We show an avenue for aligning language models with user intent on a wide range of tasks by fine-tuning with human feedback.",
        "tagsRow1": [
            {
                "text": "RLHF",
                "color": "purple"
            },
            {
                "text": "Alignment",
                "color": "green"
            }
        ],
        "tagsRow2": [
            "InstructGPT",
            "OpenAI"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "6K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "8K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "45",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_5.png",
        "categories": [
            "rlhf",
            "lm"
        ],
        "id": "chain-of-thought-2",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    }
]
  },
  'react': {
    title: "React",
    desc: "Curated list of real AI research papers matching this category.",
    papers: [
    {
        "title": "ReAct: Synergizing Reasoning and Acting in Language Models",
        "meta": "Shunyu Yao, Jeffrey Zhao, Dian Yu, Nan Du, Izhak Shafran, Karthik Narasimhan • 2022",
        "abstract": "We explore the use of LLMs to generate both reasoning traces and task-specific actions in an interleaved manner.",
        "tagsRow1": [
            {
                "text": "Agents",
                "color": "blue"
            },
            {
                "text": "ReAct",
                "color": "orange"
            }
        ],
        "tagsRow2": [
            "Tool Use",
            "Reasoning"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "2.8K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "6K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "62",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_16.png",
        "categories": [
            "react",
            "agents"
        ],
        "id": "react-0",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    }
]
  },
  'lora': {
    title: "Lora",
    desc: "Curated list of real AI research papers matching this category.",
    papers: [
    {
        "title": "LoRA: Low-Rank Adaptation of Large Language Models",
        "meta": "Edward J. Hu, Yelong Shen, Phillip Wallis, Zeyuan Allen-Zhu, Yuanzhi Li • 2021",
        "abstract": "We propose Low-Rank Adaptation, or LoRA, which freezes the pre-trained model weights and injects trainable rank decomposition matrices into each layer.",
        "tagsRow1": [
            {
                "text": "PEFT",
                "color": "orange"
            },
            {
                "text": "Finetuning",
                "color": "blue"
            }
        ],
        "tagsRow2": [
            "Optimization",
            "LLM"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "4K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "18K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "85",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_4.png",
        "categories": [
            "lora",
            "lm"
        ],
        "id": "lora-0",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "QLoRA: Efficient Finetuning of Quantized LLMs",
        "meta": "Tim Dettmers, Artidoro Pagnoni, Ari Holtzman, Luke Zettlemoyer • 2023",
        "abstract": "We present QLoRA, an efficient finetuning approach that reduces memory usage enough to finetune a 65B parameter model on a single 48GB GPU.",
        "tagsRow1": [
            {
                "text": "Quantization",
                "color": "orange"
            },
            {
                "text": "PEFT",
                "color": "blue"
            }
        ],
        "tagsRow2": [
            "Efficiency",
            "LLM"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "2K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "15K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "30",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_14.png",
        "categories": [
            "lora",
            "lm"
        ],
        "id": "lora-1",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    }
]
  },
  'rlhf': {
    title: "Rlhf",
    desc: "Curated list of real AI research papers matching this category.",
    papers: [
    {
        "title": "Training language models to follow instructions",
        "meta": "Long Ouyang, Jeffrey Wu, Xu Jiang, Diogo Almeida, Carroll Wainwright • 2022",
        "abstract": "We show an avenue for aligning language models with user intent on a wide range of tasks by fine-tuning with human feedback.",
        "tagsRow1": [
            {
                "text": "RLHF",
                "color": "purple"
            },
            {
                "text": "Alignment",
                "color": "green"
            }
        ],
        "tagsRow2": [
            "InstructGPT",
            "OpenAI"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "6K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "8K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "88",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_5.png",
        "categories": [
            "rlhf",
            "lm"
        ],
        "id": "rlhf-0",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "Proximal Policy Optimization Algorithms",
        "meta": "John Schulman, Filip Wolski, Prafulla Dhariwal, Alec Radford, Oleg Klimov • 2017",
        "abstract": "We propose a new family of policy gradient methods for reinforcement learning, which alternate between sampling data and optimizing a surrogate objective.",
        "tagsRow1": [
            {
                "text": "RL",
                "color": "orange"
            },
            {
                "text": "PPO",
                "color": "blue"
            }
        ],
        "tagsRow2": [
            "OpenAI",
            "Algorithms"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "17K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "25K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "18",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_18.png",
        "categories": [
            "rlhf"
        ],
        "id": "rlhf-1",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    }
]
  },
  'dpo': {
    title: "Dpo",
    desc: "Curated list of real AI research papers matching this category.",
    papers: [
    {
        "title": "Direct Preference Optimization",
        "meta": "Rafael Rafailov, Archit Sharma, Eric Mitchell, Stefano Ermon, Christopher D. Manning • 2023",
        "abstract": "We introduce DPO, a new algorithm for aligning language models to human preferences without requiring a separate reward model.",
        "tagsRow1": [
            {
                "text": "Alignment",
                "color": "orange"
            },
            {
                "text": "DPO",
                "color": "blue"
            }
        ],
        "tagsRow2": [
            "RLHF Alternative",
            "Finetuning"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "1.2K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "9K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "85",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_8.png",
        "categories": [
            "dpo",
            "text-gen"
        ],
        "id": "dpo-0",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    }
]
  },
  'mcp': {
    title: "Mcp",
    desc: "Curated list of real AI research papers matching this category.",
    papers: [
    {
        "title": "Attention Is All You Need",
        "meta": "Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Lukasz Kaiser, Illia Polosukhin • 2017",
        "abstract": "We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.",
        "tagsRow1": [
            {
                "text": "Transformer",
                "color": "blue"
            },
            {
                "text": "Attention",
                "color": "orange"
            }
        ],
        "tagsRow2": [
            "NLP",
            "Deep Learning"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "110K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "54K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "74",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_0.png",
        "categories": [
            "transformer",
            "lm"
        ],
        "id": "mcp-0",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "LoRA: Low-Rank Adaptation of Large Language Models",
        "meta": "Edward J. Hu, Yelong Shen, Phillip Wallis, Zeyuan Allen-Zhu, Yuanzhi Li • 2021",
        "abstract": "We propose Low-Rank Adaptation, or LoRA, which freezes the pre-trained model weights and injects trainable rank decomposition matrices into each layer.",
        "tagsRow1": [
            {
                "text": "PEFT",
                "color": "orange"
            },
            {
                "text": "Finetuning",
                "color": "blue"
            }
        ],
        "tagsRow2": [
            "Optimization",
            "LLM"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "4K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "18K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "59",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_4.png",
        "categories": [
            "lora",
            "lm"
        ],
        "id": "mcp-1",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "Segment Anything",
        "meta": "Alexander Kirillov, Eric Mintun, Nikhila Ravi, Hanzi Mao, Chloe Rolland • 2023",
        "abstract": "We introduce the Segment Anything (SA) project: a new task, model, and dataset for image segmentation. Using our efficient model in a data collection loop.",
        "tagsRow1": [
            {
                "text": "Segmentation",
                "color": "purple"
            },
            {
                "text": "Vision",
                "color": "green"
            }
        ],
        "tagsRow2": [
            "Zero-Shot",
            "Meta"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "4K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "45K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "66",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_19.png",
        "categories": [
            "computer-use",
            "image-gen"
        ],
        "id": "mcp-2",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    }
]
  },
  'text-generation': {
    title: "Text Generation",
    desc: "Curated list of real AI research papers matching this category.",
    papers: [
    {
        "title": "Language Models are Few-Shot Learners",
        "meta": "Tom B. Brown, Benjamin Mann, Nick Ryder, Melanie Subbiah, Jared Kaplan, Prafulla Dhariwal • 2020",
        "abstract": "We train GPT-3, an autoregressive language model with 175 billion parameters, 10x more than any previous non-sparse language model, and test its performance.",
        "tagsRow1": [
            {
                "text": "LLM",
                "color": "blue"
            },
            {
                "text": "Few-Shot",
                "color": "orange"
            }
        ],
        "tagsRow2": [
            "Generative",
            "Scaling"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "18K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "12K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "11",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_2.png",
        "categories": [
            "lm",
            "text-gen"
        ],
        "id": "text-generation-0",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "Deep Residual Learning for Image Recognition",
        "meta": "Kaiming He, Xiangyu Zhang, Shaoqing Ren, Jian Sun • 2015",
        "abstract": "We present a residual learning framework to ease the training of networks that are substantially deeper than those used previously.",
        "tagsRow1": [
            {
                "text": "ResNet",
                "color": "blue"
            },
            {
                "text": "Computer Vision",
                "color": "orange"
            }
        ],
        "tagsRow2": [
            "CNN",
            "Architecture"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "160K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "80K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "40",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_6.png",
        "categories": [
            "image-gen",
            "computer-use"
        ],
        "id": "text-generation-1",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "BERT: Pre-training of Deep Bidirectional Transformers",
        "meta": "Jacob Devlin, Ming-Wei Chang, Kenton Lee, Kristina Toutanova • 2018",
        "abstract": "We introduce a new language representation model called BERT, which is designed to pre-train deep bidirectional representations from unlabeled text.",
        "tagsRow1": [
            {
                "text": "Pre-training",
                "color": "green"
            },
            {
                "text": "Bidirectional",
                "color": "purple"
            }
        ],
        "tagsRow2": [
            "NLP",
            "Transformers"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "84K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "35K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "10",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_1.png",
        "categories": [
            "transformer",
            "lm"
        ],
        "id": "text-generation-2",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    }
]
  },
  'image-generation': {
    title: "Image Generation",
    desc: "Curated list of real AI research papers matching this category.",
    papers: [
    {
        "title": "Chain-of-Thought Prompting Elicits Reasoning",
        "meta": "Jason Wei, Xuezhi Wang, Dale Schuurmans, Maarten Bosma, Ed Chi • 2022",
        "abstract": "We explore how generating a chain of thought—a series of intermediate reasoning steps—significantly improves the ability of LLMs to perform complex reasoning.",
        "tagsRow1": [
            {
                "text": "Reasoning",
                "color": "purple"
            },
            {
                "text": "Prompting",
                "color": "green"
            }
        ],
        "tagsRow2": [
            "CoT",
            "NLP"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "6.5K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "4K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "35",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_15.png",
        "categories": [
            "cot",
            "reasoning"
        ],
        "id": "image-generation-0",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "Deep Residual Learning for Image Recognition",
        "meta": "Kaiming He, Xiangyu Zhang, Shaoqing Ren, Jian Sun • 2015",
        "abstract": "We present a residual learning framework to ease the training of networks that are substantially deeper than those used previously.",
        "tagsRow1": [
            {
                "text": "ResNet",
                "color": "blue"
            },
            {
                "text": "Computer Vision",
                "color": "orange"
            }
        ],
        "tagsRow2": [
            "CNN",
            "Architecture"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "160K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "80K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "73",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_6.png",
        "categories": [
            "image-gen",
            "computer-use"
        ],
        "id": "image-generation-1",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "Training language models to follow instructions",
        "meta": "Long Ouyang, Jeffrey Wu, Xu Jiang, Diogo Almeida, Carroll Wainwright • 2022",
        "abstract": "We show an avenue for aligning language models with user intent on a wide range of tasks by fine-tuning with human feedback.",
        "tagsRow1": [
            {
                "text": "RLHF",
                "color": "purple"
            },
            {
                "text": "Alignment",
                "color": "green"
            }
        ],
        "tagsRow2": [
            "InstructGPT",
            "OpenAI"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "6K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "8K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "82",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_5.png",
        "categories": [
            "rlhf",
            "lm"
        ],
        "id": "image-generation-2",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    }
]
  },
  'video-generation': {
    title: "Video Generation",
    desc: "Curated list of real AI research papers matching this category.",
    papers: [
    {
        "title": "Learning Transferable Visual Models From Natural Language",
        "meta": "Alec Radford, Jong Wook Kim, Chris Hallacy, Aditya Ramesh, Gabriel Goh • 2021",
        "abstract": "We demonstrate that the simple pre-training task of predicting which caption goes with which image is an efficient and scalable way to learn SOTA image representations.",
        "tagsRow1": [
            {
                "text": "Multimodal",
                "color": "blue"
            },
            {
                "text": "CLIP",
                "color": "orange"
            }
        ],
        "tagsRow2": [
            "Vision",
            "Language"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "19K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "21K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "13",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_12.png",
        "categories": [
            "image-gen",
            "text-gen"
        ],
        "id": "video-generation-0",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "An Image is Worth 16x16 Words",
        "meta": "Alexey Dosovitskiy, Lucas Beyer, Alexander Kolesnikov, Dirk Weissenborn • 2020",
        "abstract": "We show that a pure transformer applied directly to sequences of image patches can perform very well on image classification tasks.",
        "tagsRow1": [
            {
                "text": "ViT",
                "color": "green"
            },
            {
                "text": "Vision",
                "color": "purple"
            }
        ],
        "tagsRow2": [
            "Transformers",
            "Scaling"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "35K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "22K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "44",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_7.png",
        "categories": [
            "transformer",
            "image-gen"
        ],
        "id": "video-generation-1",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "RoBERTa: A Robustly Optimized BERT Pretraining Approach",
        "meta": "Yinhan Liu, Myle Ott, Naman Goyal, Jingfei Du, Mandar Joshi • 2019",
        "abstract": "We carefully measure the impact of many key hyperparameters and training data size. We find that BERT was significantly undertrained.",
        "tagsRow1": [
            {
                "text": "Transformers",
                "color": "green"
            },
            {
                "text": "Optimization",
                "color": "purple"
            }
        ],
        "tagsRow2": [
            "NLP",
            "Baselines"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "22K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "10K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "83",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_17.png",
        "categories": [
            "transformer",
            "lm"
        ],
        "id": "video-generation-2",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    }
]
  },
  'audio-generation': {
    title: "Audio Generation",
    desc: "Curated list of real AI research papers matching this category.",
    papers: [
    {
        "title": "QLoRA: Efficient Finetuning of Quantized LLMs",
        "meta": "Tim Dettmers, Artidoro Pagnoni, Ari Holtzman, Luke Zettlemoyer • 2023",
        "abstract": "We present QLoRA, an efficient finetuning approach that reduces memory usage enough to finetune a 65B parameter model on a single 48GB GPU.",
        "tagsRow1": [
            {
                "text": "Quantization",
                "color": "orange"
            },
            {
                "text": "PEFT",
                "color": "blue"
            }
        ],
        "tagsRow2": [
            "Efficiency",
            "LLM"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "2K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "15K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "61",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_14.png",
        "categories": [
            "lora",
            "lm"
        ],
        "id": "audio-generation-0",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "BERT: Pre-training of Deep Bidirectional Transformers",
        "meta": "Jacob Devlin, Ming-Wei Chang, Kenton Lee, Kristina Toutanova • 2018",
        "abstract": "We introduce a new language representation model called BERT, which is designed to pre-train deep bidirectional representations from unlabeled text.",
        "tagsRow1": [
            {
                "text": "Pre-training",
                "color": "green"
            },
            {
                "text": "Bidirectional",
                "color": "purple"
            }
        ],
        "tagsRow2": [
            "NLP",
            "Transformers"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "84K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "35K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "21",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_1.png",
        "categories": [
            "transformer",
            "lm"
        ],
        "id": "audio-generation-1",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "Diffusion Models Beat GANs on Image Synthesis",
        "meta": "Prafulla Dhariwal, Alex Nichol • 2021",
        "abstract": "We show that diffusion models can achieve image sample quality superior to the current state-of-the-art generative models.",
        "tagsRow1": [
            {
                "text": "Diffusion",
                "color": "green"
            },
            {
                "text": "Generation",
                "color": "purple"
            }
        ],
        "tagsRow2": [
            "Synthesis",
            "OpenAI"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "8K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "11K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "82",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_13.png",
        "categories": [
            "image-gen"
        ],
        "id": "audio-generation-2",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    }
]
  },
  'organizations': {
    title: "Organizations",
    desc: "Curated list of real AI research papers matching this category.",
    papers: [
    {
        "title": "Highly accurate protein structure prediction",
        "meta": "John Jumper, Richard Evans, Alexander Pritzel, Tim Green, Michael Figurnov • 2021",
        "abstract": "We present AlphaFold, a novel machine learning approach that incorporates physical and biological knowledge about protein structure.",
        "tagsRow1": [
            {
                "text": "Biology",
                "color": "green"
            },
            {
                "text": "AlphaFold",
                "color": "purple"
            }
        ],
        "tagsRow2": [
            "DeepMind",
            "Science"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "28K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "14K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "12",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_9.png",
        "categories": [
            "transformer"
        ],
        "id": "organizations-0",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "LoRA: Low-Rank Adaptation of Large Language Models",
        "meta": "Edward J. Hu, Yelong Shen, Phillip Wallis, Zeyuan Allen-Zhu, Yuanzhi Li • 2021",
        "abstract": "We propose Low-Rank Adaptation, or LoRA, which freezes the pre-trained model weights and injects trainable rank decomposition matrices into each layer.",
        "tagsRow1": [
            {
                "text": "PEFT",
                "color": "orange"
            },
            {
                "text": "Finetuning",
                "color": "blue"
            }
        ],
        "tagsRow2": [
            "Optimization",
            "LLM"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "4K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "18K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "70",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_4.png",
        "categories": [
            "lora",
            "lm"
        ],
        "id": "organizations-1",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "QLoRA: Efficient Finetuning of Quantized LLMs",
        "meta": "Tim Dettmers, Artidoro Pagnoni, Ari Holtzman, Luke Zettlemoyer • 2023",
        "abstract": "We present QLoRA, an efficient finetuning approach that reduces memory usage enough to finetune a 65B parameter model on a single 48GB GPU.",
        "tagsRow1": [
            {
                "text": "Quantization",
                "color": "orange"
            },
            {
                "text": "PEFT",
                "color": "blue"
            }
        ],
        "tagsRow2": [
            "Efficiency",
            "LLM"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "2K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "15K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "77",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_14.png",
        "categories": [
            "lora",
            "lm"
        ],
        "id": "organizations-2",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    }
]
  },
  'collections': {
    title: "Collections",
    desc: "Curated list of real AI research papers matching this category.",
    papers: [
    {
        "title": "Deep Residual Learning for Image Recognition",
        "meta": "Kaiming He, Xiangyu Zhang, Shaoqing Ren, Jian Sun • 2015",
        "abstract": "We present a residual learning framework to ease the training of networks that are substantially deeper than those used previously.",
        "tagsRow1": [
            {
                "text": "ResNet",
                "color": "blue"
            },
            {
                "text": "Computer Vision",
                "color": "orange"
            }
        ],
        "tagsRow2": [
            "CNN",
            "Architecture"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "160K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "80K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "27",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_6.png",
        "categories": [
            "image-gen",
            "computer-use"
        ],
        "id": "collections-0",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "Attention Is All You Need",
        "meta": "Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Lukasz Kaiser, Illia Polosukhin • 2017",
        "abstract": "We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.",
        "tagsRow1": [
            {
                "text": "Transformer",
                "color": "blue"
            },
            {
                "text": "Attention",
                "color": "orange"
            }
        ],
        "tagsRow2": [
            "NLP",
            "Deep Learning"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "110K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "54K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "38",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_0.png",
        "categories": [
            "transformer",
            "lm"
        ],
        "id": "collections-1",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "RoBERTa: A Robustly Optimized BERT Pretraining Approach",
        "meta": "Yinhan Liu, Myle Ott, Naman Goyal, Jingfei Du, Mandar Joshi • 2019",
        "abstract": "We carefully measure the impact of many key hyperparameters and training data size. We find that BERT was significantly undertrained.",
        "tagsRow1": [
            {
                "text": "Transformers",
                "color": "green"
            },
            {
                "text": "Optimization",
                "color": "purple"
            }
        ],
        "tagsRow2": [
            "NLP",
            "Baselines"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "22K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "10K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "41",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_17.png",
        "categories": [
            "transformer",
            "lm"
        ],
        "id": "collections-2",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    }
]
  },
  'bookmarks': {
    title: "Bookmarks",
    desc: "Curated list of real AI research papers matching this category.",
    papers: [
    {
        "title": "Deep Residual Learning for Image Recognition",
        "meta": "Kaiming He, Xiangyu Zhang, Shaoqing Ren, Jian Sun • 2015",
        "abstract": "We present a residual learning framework to ease the training of networks that are substantially deeper than those used previously.",
        "tagsRow1": [
            {
                "text": "ResNet",
                "color": "blue"
            },
            {
                "text": "Computer Vision",
                "color": "orange"
            }
        ],
        "tagsRow2": [
            "CNN",
            "Architecture"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "160K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "80K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "58",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_6.png",
        "categories": [
            "image-gen",
            "computer-use"
        ],
        "id": "bookmarks-0",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "Language Models are Few-Shot Learners",
        "meta": "Tom B. Brown, Benjamin Mann, Nick Ryder, Melanie Subbiah, Jared Kaplan, Prafulla Dhariwal • 2020",
        "abstract": "We train GPT-3, an autoregressive language model with 175 billion parameters, 10x more than any previous non-sparse language model, and test its performance.",
        "tagsRow1": [
            {
                "text": "LLM",
                "color": "blue"
            },
            {
                "text": "Few-Shot",
                "color": "orange"
            }
        ],
        "tagsRow2": [
            "Generative",
            "Scaling"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "18K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "12K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "31",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_2.png",
        "categories": [
            "lm",
            "text-gen"
        ],
        "id": "bookmarks-1",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "BERT: Pre-training of Deep Bidirectional Transformers",
        "meta": "Jacob Devlin, Ming-Wei Chang, Kenton Lee, Kristina Toutanova • 2018",
        "abstract": "We introduce a new language representation model called BERT, which is designed to pre-train deep bidirectional representations from unlabeled text.",
        "tagsRow1": [
            {
                "text": "Pre-training",
                "color": "green"
            },
            {
                "text": "Bidirectional",
                "color": "purple"
            }
        ],
        "tagsRow2": [
            "NLP",
            "Transformers"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "84K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "35K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "27",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_1.png",
        "categories": [
            "transformer",
            "lm"
        ],
        "id": "bookmarks-2",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    }
]
  },
  'reading-list': {
    title: "Reading List",
    desc: "Curated list of real AI research papers matching this category.",
    papers: [
    {
        "title": "LoRA: Low-Rank Adaptation of Large Language Models",
        "meta": "Edward J. Hu, Yelong Shen, Phillip Wallis, Zeyuan Allen-Zhu, Yuanzhi Li • 2021",
        "abstract": "We propose Low-Rank Adaptation, or LoRA, which freezes the pre-trained model weights and injects trainable rank decomposition matrices into each layer.",
        "tagsRow1": [
            {
                "text": "PEFT",
                "color": "orange"
            },
            {
                "text": "Finetuning",
                "color": "blue"
            }
        ],
        "tagsRow2": [
            "Optimization",
            "LLM"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "4K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "18K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "13",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_4.png",
        "categories": [
            "lora",
            "lm"
        ],
        "id": "reading-list-0",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "Highly accurate protein structure prediction",
        "meta": "John Jumper, Richard Evans, Alexander Pritzel, Tim Green, Michael Figurnov • 2021",
        "abstract": "We present AlphaFold, a novel machine learning approach that incorporates physical and biological knowledge about protein structure.",
        "tagsRow1": [
            {
                "text": "Biology",
                "color": "green"
            },
            {
                "text": "AlphaFold",
                "color": "purple"
            }
        ],
        "tagsRow2": [
            "DeepMind",
            "Science"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "28K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "14K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "28",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_9.png",
        "categories": [
            "transformer"
        ],
        "id": "reading-list-1",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    },
    {
        "title": "QLoRA: Efficient Finetuning of Quantized LLMs",
        "meta": "Tim Dettmers, Artidoro Pagnoni, Ari Holtzman, Luke Zettlemoyer • 2023",
        "abstract": "We present QLoRA, an efficient finetuning approach that reduces memory usage enough to finetune a 65B parameter model on a single 48GB GPU.",
        "tagsRow1": [
            {
                "text": "Quantization",
                "color": "orange"
            },
            {
                "text": "PEFT",
                "color": "blue"
            }
        ],
        "tagsRow2": [
            "Efficiency",
            "LLM"
        ],
        "metrics": [
            {
                "icon": "↑",
                "value": "2K",
                "label": "Upvotes",
                "color": "red"
            },
            {
                "icon": "github",
                "value": "15K",
                "label": "Repo",
                "color": "black"
            },
            {
                "icon": "chat",
                "value": "34",
                "label": "Citations",
                "color": "black"
            }
        ],
        "thumbnail": "/thumbnails/thumb_14.png",
        "categories": [
            "lora",
            "lm"
        ],
        "id": "reading-list-2",
        "sotaHtml": "🏆 <strong style=\"color: #9a3412;\">SOTA</strong>"
    }
]
  },
};
