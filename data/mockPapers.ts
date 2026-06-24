export const mockPapers = [
  {
    id: "glm-5-2",
    title: "GLM-5.2: Built for Long-Horizon Tasks",
    meta: "Jun 16, 2026",
    abstract: "GLM-5.2 is Z.ai's latest flagship open-weight model for long-horizon agentic engineering. The release extends GLM-5.1 with a solid 1M-token context, IndexShare sparse-attention efficiency, improved MTP speculative decoding, and flexible thinking-effort controls...",
    sotaHtml: '🏆 <strong style="color: #9a3412;">SOTA</strong> on <a href="#">AIME 2026</a>, <a href="#">HMMT Feb 2026</a>, <a href="#">PostTrainBench</a> <span style="margin: 0 8px; color: #cbd5e1;">|</span> <strong style="color: #9a3412;">#3</strong> on <a href="#">FrontierSWE</a>, <a href="#">MCPAtlas</a>, <a href="#">NL2Repo</a> <span class="tag-more">+2 more</span>',
    tagsRow1: [
      { text: "Agents", color: "green" },
      { text: "Coding Agents", color: "blue" },
      { text: "Language Modeling", color: "purple" },
      { text: "Math", color: "orange" },
      { text: "+2 more", color: "none" }
    ],
    tagsRow2: ["DeepSeek Sparse Attention", "MCP", "MoE", "Transformer"],
    metrics: [
      { icon: "↑", value: "1.2K", label: "Upvotes", color: "red" },
      { icon: "github", value: "1", label: "Repo", color: "black" },
      { icon: "bookmark", value: "30", label: "Citations", color: "black" }
    ],
    thumbnail: "/paper_pdf_1.png"
  },
  {
    id: "resnet",
    title: "Deep Residual Learning for Image Recognition",
    meta: "Kaiming He, Xiangyu Zhang, Shaoqing Ren, +1 authors • Dec 10, 2015",
    abstract: "Deeper neural networks are more difficult to train. We present a residual learning framework to ease the training of networks that are substantially deeper... We explicitly reformulate the layers as learning residual functions with reference to the layer inputs...",
    sotaHtml: '🏆 <strong style="color: #9a3412;">SOTA</strong> on <a href="#">ImageNet (ILSVRC 2015)</a>, <a href="#">COCO 2015</a> <span style="margin: 0 8px; color: #cbd5e1;">|</span> <strong style="color: #9a3412;">#1</strong> on <a href="#">PapersWithCode</a>, <a href="#">SemEval-2015</a> <span class="tag-more">+1 more</span>',
    tagsRow1: [
      { text: "Image Classification", color: "orange" },
      { text: "Image Segmentation", color: "green" },
      { text: "Object Detection", color: "blue" },
      { text: "+1 more", color: "none" }
    ],
    tagsRow2: ["Batch Normalization", "Convolution", "Dropout", "Global Avg Pooling", "+2 more"],
    metrics: [
      { icon: "↑", value: "99.1K", label: "Upvotes", color: "red" },
      { icon: "github", value: "231.2K", label: "Repo", color: "black" },
      { icon: "bookmark", value: "231.2K", label: "Citations", color: "black" }
    ],
    thumbnail: "/paper_pdf_2.png"
  },
  {
    id: "transformer",
    title: "Attention Is All You Need",
    meta: "Ashish Vaswani, Noam Shazeer, Niki Parmar, +5 authors • Jun 12, 2017",
    abstract: "The dominant sequence transduction models are based on complex recurrent or convolutional neural networks. We propose a new simple network architecture, the Transformer, based solely on attention...",
    sotaHtml: '🏆 <strong style="color: #9a3412;">SOTA</strong> on <a href="#">WMT 2014 En-Fr</a>, <a href="#">WMT 2014 En-De</a> <span style="margin: 0 8px; color: #cbd5e1;">|</span> <strong style="color: #9a3412;">#1</strong> on <a href="#">ACL Anthology</a>, <a href="#">Papers With Code</a> <span class="tag-more">+3 more</span>',
    tagsRow1: [
      { text: "Language Modeling", color: "blue" },
      { text: "Machine Translation", color: "orange" },
      { text: "Adam", color: "purple" },
      { text: "+3 more", color: "none" }
    ],
    tagsRow2: ["Multi-Head Attention", "Layer Normalization", "Positional Encoding", "+2 more"],
    metrics: [
      { icon: "↑", value: "78.3K", label: "Upvotes", color: "red" },
      { icon: "github", value: "180.9K", label: "Repo", color: "black" },
      { icon: "bookmark", value: "180.9K", label: "Citations", color: "black" }
    ],
    thumbnail: "/paper_pdf_3.png"
  }
];
