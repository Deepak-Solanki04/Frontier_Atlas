import Link from 'next/link';

export default function TrendingModels() {
  const models = [
    { name: "Llama-3-70B-Instruct", org: "Meta AI", downloads: "1.2M" },
    { name: "Mistral-Large-Instruct", org: "Mistral AI", downloads: "890k" },
    { name: "Qwen1.5-72B-Chat", org: "Alibaba Cloud", downloads: "450k" },
  ];

  return (
    <div className="widget">
        <h3>Trending Models</h3>
        <div className="model-list">
            {models.map((model, idx) => (
                <div key={idx} className="model-item">
                    <div className="model-info">
                        <Link href={`/model/${model.name.toLowerCase()}`} className="model-name">{model.name}</Link>
                        <span className="model-org">{model.org}</span>
                    </div>
                    <span className="model-downloads">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                        {model.downloads}
                    </span>
                </div>
            ))}
        </div>
    </div>
  );
}
