import React from 'react';
import PaperCard from '../../components/PaperCard';
import { topicData } from '../../data/topicData';

const trendingGithub = [
  { repo: 'microsoft/BitNet', stars: '+2.1k' },
  { repo: 'huggingface/transformers', stars: '+1.8k' },
  { repo: 'databricks/dolly', stars: '+1.6k' },
  { repo: 'vim-project/vim', stars: '+1.4k' },
  { repo: 'unslothai/unsloth', stars: '+1.2k' },
];

const trendingX = [
  { handle: 'x.com/levelsio', change: '+2.1k' },
  { handle: 'x.com/EMostaque', change: '+1.8k' },
  { handle: 'x.com/ai_for_success', change: '+1.6k' },
  { handle: 'x.com/deedydas', change: '+1.4k' },
  { handle: 'x.com/rowancheung', change: '+1.2k' },
];

const trendingReddit = [
  { sub: 'r/MachineLearning', change: '+2.1k' },
  { sub: 'r/LocalLLaMA', change: '+1.8k' },
  { sub: 'r/ArtificialIntelligence', change: '+1.6k' },
  { sub: 'r/deeplearning', change: '+1.4k' },
  { sub: 'r/LLMDevs', change: '+1.2k' },
];

const sotaItems = [
  { name: 's1: Simple Test-Time Scaling', bench: '#1 on 8 benchmarks' },
  { name: 'LongRPE 2.0', bench: '#1 on 6 benchmarks' },
  { name: 'V-JEPA 2', bench: '#1 on 4 benchmarks' },
  { name: 'MuJoCo World Model Suite', bench: '#1 on 3 benchmarks' },
];

const risingFast = [
  { name: 'VoxCPM-1.5', stars: '+540' },
  { name: 'DeepSeek-R1.1', stars: '+412' },
  { name: 'LongRPE 2.0', stars: '+398' },
];

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const data = topicData[resolvedParams.slug];

  if (!data) {
    return (
      <main className="feed-container">
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <h2>Topic Not Found</h2>
        </div>
      </main>
    );
  }

  const isTrending = resolvedParams.slug === 'trending';

  return (
    <div className="page-layout">
      <div className="content-area">
        {/* Hero cards row — only on trending */}
        {isTrending && (
          <div className="hero-cards-row">
            {/* Breakthrough Today */}
            <div className="hero-card hero-card-dark">
              <div className="hero-card-top">
                <span className="badge-breakthrough">🔥 BREAKTHROUGH TODAY</span>
                <span className="badge-release">Official Release</span>
              </div>
              <h2 className="hero-card-title">OpenAI releases GPT-4.5 Turbo</h2>
              <p className="hero-card-desc">First-party model in the GPT-4.5 series, now available in OpenAI Studio.</p>
              <div className="hero-card-openai-logo">
                <svg viewBox="0 0 24 24" fill="white" width="48" height="48"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.896zm16.597 3.855l-5.833-3.387 2.019-1.168a.076.076 0 0 1 .071 0l4.83 2.786a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.411-.658zm2.011-3.043l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.208V6.876a.072.072 0 0 1 .029-.06l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08-4.778 2.758a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/></svg>
              </div>
              <ul className="hero-card-bullets">
                <li>🌟 Beats Gemini 1.5 Pro on 7 benchmarks</li>
                <li>🌟 256K context length</li>
                <li>🌟 Lower latency, higher accuracy</li>
              </ul>
              <a href="#" className="hero-card-link">View paper →</a>
            </div>

            {/* Rising Fast */}
            <div className="hero-card hero-card-light">
              <div className="hero-card-label">📈 RISING FAST</div>
              <div className="hero-rising-number">+540</div>
              <div className="hero-rising-sub">GitHub stars<br/>in the last 8 hours</div>
              <div className="hero-rising-list">
                {risingFast.map((item, i) => (
                  <div key={i} className="hero-rising-item">
                    <span className="hero-rising-rank">{i + 1}</span>
                    <span className="hero-rising-name">{item.name}</span>
                    <span className="hero-rising-stars">{item.stars} ⭐</span>
                  </div>
                ))}
              </div>
              <a href="#" className="hero-card-link-gray">View all rising →</a>
            </div>

            {/* New SOTA Today */}
            <div className="hero-card hero-card-light">
              <div className="hero-card-label-sota">
                <span>🏆 NEW SOTA TODAY</span>
                <a href="#" className="sota-view-all">View all →</a>
              </div>
              <div className="sota-list">
                {sotaItems.map((item, i) => (
                  <div key={i} className="sota-item">
                    <span className="sota-badge">SOTA</span>
                    <div>
                      <div className="sota-name">{item.name}</div>
                      <div className="sota-bench">{item.bench}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Time filter tabs */}
        <div className="time-filters">
          <button className="time-filter active">Today</button>
          <button className="time-filter">This Week</button>
          <button className="time-filter">This Month</button>
          <button className="time-filter">All time</button>
        </div>

        {/* Papers + Right sidebar */}
        <div className="papers-and-sidebar">
          <div className="paper-list">
            {data.papers.map((paper: any, i: number) => (
              <PaperCard key={i} paper={paper} />
            ))}
          </div>

          {/* Right sidebar */}
          <div className="right-sidebar">
            {/* Trending on GitHub */}
            <div className="trending-panel trending-panel-dark">
              <div className="trending-panel-header">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                <span>TRENDING ON GITHUB</span>
              </div>
              {trendingGithub.map((item, i) => (
                <div key={i} className="trending-row">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="white" opacity="0.5"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                  <span className="trending-name">{item.repo}</span>
                  <span className="trending-stat">{item.stars}</span>
                  <span className="trending-star">⭐</span>
                </div>
              ))}
              <a href="#" className="trending-view-all">View all trending repos →</a>
            </div>

            {/* Trending on X */}
            <div className="trending-panel trending-panel-dark">
              <div className="trending-panel-header">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                <span>TRENDING ON X</span>
              </div>
              {trendingX.map((item, i) => (
                <div key={i} className="trending-row">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="white" opacity="0.5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  <span className="trending-name">{item.handle}</span>
                  <span className="trending-stat">{item.change}</span>
                  <span className="trending-star">⭐</span>
                </div>
              ))}
              <a href="#" className="trending-view-all">View all trending posts →</a>
            </div>

            {/* Trending on Reddit */}
            <div className="trending-panel trending-panel-dark">
              <div className="trending-panel-header">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#ff4500"><circle cx="12" cy="12" r="12" fill="#ff4500"/><path d="M19.99 12c0-.78-.63-1.41-1.41-1.41-.38 0-.72.15-.97.39C16.4 10.07 14.84 9.5 13.1 9.38l.76-3.59 2.47.52c.04.62.55 1.12 1.18 1.12.65 0 1.18-.53 1.18-1.18S18.16 5.07 17.51 5.07c-.47 0-.88.28-1.08.68l-2.76-.58c-.08-.02-.15 0-.21.04a.27.27 0 00-.12.18l-.85 4.01c-1.77.08-3.36.65-4.54 1.57-.25-.24-.6-.39-.97-.39-.78 0-1.41.63-1.41 1.41 0 .57.34 1.06.83 1.28-.04.2-.07.4-.07.61 0 3.11 3.62 5.64 8.08 5.64s8.08-2.53 8.08-5.64c0-.21-.02-.41-.07-.61.49-.22.83-.71.83-1.28zm-11.99 1c0-.65.53-1.18 1.18-1.18.65 0 1.18.53 1.18 1.18 0 .65-.53 1.18-1.18 1.18-.65 0-1.18-.53-1.18-1.18zm6.62 3.12c-.81.81-2.37.87-2.82.87s-2.01-.06-2.82-.87a.394.394 0 010-.56.394.394 0 01.56 0c.51.51 1.58.69 2.26.69.68 0 1.75-.18 2.26-.69a.394.394 0 01.56 0 .394.394 0 010 .56zm-.16-1.94c-.65 0-1.18-.53-1.18-1.18 0-.65.53-1.18 1.18-1.18.65 0 1.18.53 1.18 1.18 0 .65-.53 1.18-1.18 1.18z" fill="white"/></svg>
                <span>TRENDING ON REDDIT</span>
              </div>
              {trendingReddit.map((item, i) => (
                <div key={i} className="trending-row">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="white" opacity="0.5"><circle cx="12" cy="12" r="11"/></svg>
                  <span className="trending-name">{item.sub}</span>
                  <span className="trending-stat">{item.change}</span>
                  <span className="trending-star">⭐</span>
                </div>
              ))}
              <a href="#" className="trending-view-all">View all trending discussions →</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
