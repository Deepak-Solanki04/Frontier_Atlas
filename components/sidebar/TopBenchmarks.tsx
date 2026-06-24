import Link from 'next/link';

export default function TopBenchmarks() {
  const benchmarks = [
    { name: "MMLU", topModel: "GPT-4o", score: "88.7%" },
    { name: "HumanEval", topModel: "Claude 3.5 Sonnet", score: "92.0%" },
    { name: "SWE-bench", topModel: "Devin", score: "13.8%" },
  ];

  return (
    <div className="widget">
        <h3>Top Benchmarks</h3>
        <div className="model-list">
            {benchmarks.map((bench, idx) => (
                <div key={idx} className="model-item">
                    <div className="model-info">
                        <Link href={`/benchmark/${bench.name.toLowerCase()}`} className="model-name">{bench.name}</Link>
                        <span className="model-org">SOTA: {bench.topModel}</span>
                    </div>
                    <span className="model-downloads" style={{background: 'rgba(16, 185, 129, 0.1)', color: '#059669'}}>
                        {bench.score}
                    </span>
                </div>
            ))}
        </div>
    </div>
  );
}
