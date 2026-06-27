import React from 'react';
import PaperCard from '../../components/PaperCard';
import { topicData } from '../../data/topicData';

const githubRepos = [
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
  { handle: 'x.com/deedydxias', change: '+1.4k' },
  { handle: 'x.com/rowancheung', change: '+1.2k' },
];

const trendingReddit = [
  { sub: 'r/MachineLearning', change: '+2.1k' },
  { sub: 'r/LocalLLaMA', change: '+1.8k' },
  { sub: 'r/ArtificialIntelligence', change: '+1.6k' },
  { sub: 'r/DeepLearning', change: '+1.4k' },
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
      <main style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Topic Not Found</h2>
      </main>
    );
  }

  const isTrending = resolvedParams.slug === 'trending';

  return (
    <div className="page-layout">

      {/* ── TOP HERO ROW: 4 CARDS (Identical Stretch Height) ── */}
      {isTrending && (
        <div className="hero-row">

          {/* Card 1 — BREAKTHROUGH TODAY */}
          <div className="hcard hcard-breakthrough">
            <div className="hcard-badges">
              <span className="badge-bt">🔥 BREAKTHROUGH TODAY</span>
              <span className="badge-official-release">Official Release</span>
            </div>
            <div className="hcard-bt-body">
              <div className="hcard-bt-text">
                <h2 className="hcard-title">OpenAI releases<br/>GPT-4.5 Turbo</h2>
                <p className="hcard-desc">First-party model in the GPT-4.5 series, now available in OpenAI Studio.</p>
                <ul className="hcard-bullets">
                  <li><span className="star-orange">★</span> Beats Gemini 1.5 Pro on 7 benchmarks</li>
                  <li><span className="star-orange">★</span> 256K context length</li>
                  <li><span className="star-orange">★</span> Lower latency, higher accuracy</li>
                </ul>
                <a href="#" className="hcard-link-orange">View paper →</a>
              </div>
              <div className="hcard-logo-box">
                <svg viewBox="0 0 24 24" fill="white" width="46" height="46">
                  <path d="M22.282 9.821a5.985 5.985 0 00-.516-4.91 6.046 6.046 0 00-6.51-2.9A6.065 6.065 0 004.981 4.18a5.985 5.985 0 00-3.998 2.9 6.046 6.046 0 00.743 7.097 5.98 5.98 0 00.51 4.911 6.051 6.051 0 006.515 2.9A5.985 5.985 0 0013.26 24a6.056 6.056 0 005.772-4.206 5.99 5.99 0 003.997-2.9 6.056 6.056 0 00-.747-7.073zM13.26 22.43a4.476 4.476 0 01-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 00.392-.681v-6.737l2.02 1.168a.071.071 0 01.038.052v5.583a4.504 4.504 0 01-4.494 4.494zM3.6 18.304a4.47 4.47 0 01-.535-3.014l.142.085 4.783 2.759a.771.771 0 00.78 0l5.843-3.369v2.332a.08.08 0 01-.033.062L9.74 19.95a4.5 4.5 0 01-6.14-1.646zM2.34 7.896a4.485 4.485 0 012.366-1.973V11.6a.766.766 0 00.388.676l5.815 3.355-2.02 1.168a.076.076 0 01-.071 0l-4.83-2.786A4.504 4.504 0 012.34 7.896zm16.597 3.855l-5.833-3.387 2.019-1.168a.076.076 0 01.071 0l4.83 2.786a4.494 4.494 0 01-.676 8.105v-5.678a.79.79 0 00-.411-.658zm2.011-3.043l-.141-.085-4.774-2.782a.776.776 0 00-.785 0L9.409 9.208V6.876a.072.072 0 01.029-.06l4.83-2.787a4.5 4.5 0 016.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 01-.038-.057V6.075a4.5 4.5 0 017.375-3.453l-.142.08-4.778 2.758a.795.795 0 00-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Card 2 — RISING FAST */}
          <div className="hcard hcard-pale">
            <div className="hcard-label"><span className="hero-icon-inline"><svg width="14" height="14" viewBox="0 0 24 24"><defs><linearGradient id="rise-grad" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#ff7a00"/><stop offset="100%" stopColor="#ff3d00"/></linearGradient></defs><path fill="url(#rise-grad)" d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg></span>RISING FAST</div>
            <div className="rising-number">+540</div>
            <div className="rising-sub">GitHub stars<br/>in the last 8 hours</div>
            <div className="rising-list">
              {risingFast.map((item, i) => (
                <div key={i} className="rising-item">
                  <span className="rising-rank-pill">{i + 1}</span>
                  <span className="rising-name">{item.name}</span>
                  <span className="rising-stars-orange">{item.stars} ★</span>
                </div>
              ))}
            </div>
            <a href="#" className="hcard-link-orange">View all rising →</a>
          </div>

          {/* Card 3 — NEW SOTA TODAY */}
          <div className="hcard hcard-light">
            <div className="sota-header">
              <span className="hcard-label hcard-label-orange"><span className="hero-icon-inline"><svg width="16" height="16" viewBox="0 0 24 24" fill="#ff4d00"><path d="M19 5h-2V3a1 1 0 00-1-1H8a1 1 0 00-1 1v2H5a3 3 0 00-3 3v1c0 2.55 1.92 4.63 4.42 4.94A6.01 6.01 0 0011 18v2H8a1 1 0 000 2h8a1 1 0 000-2h-3v-2a6.01 6.01 0 004.58-4.06C20.08 13.63 22 11.55 22 9V8a3 3 0 00-3-3zm-2 0h-2v4c0 .34-.04.67-.1 1h2.1a1 1 0 001-1V8a1 1 0 00-1-1zM5 9V8a1 1 0 011-1h2.1c-.06.33-.1.66-.1 1v2c0 .34.04.67.1 1H6a1 1 0 01-1-1z"/></svg></span>NEW SOTA TODAY</span>
              <a href="#" className="hcard-link-orange">View all →</a>
            </div>
            <div className="sota-list">
              {sotaItems.map((item, i) => (
                <div key={i} className="sota-item">
                  <span className="sota-pill-orange">SOTA</span>
                  <div>
                    <div className="sota-name">{item.name}</div>
                    <div className="sota-bench">{item.bench}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 4 — TRENDING ON GITHUB */}
          <div className="hcard hcard-light gh-panel">
            <div className="gh-header-light">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="#111827"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
              <span className="gh-title-light">TRENDING ON GITHUB</span>
            </div>
            {githubRepos.map((item, i) => (
              <div key={i} className="gh-row-light">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#6b7280"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                <span className="gh-repo-light">{item.repo}</span>
                <span className="gh-stars-light">{item.stars} ★</span>
              </div>
            ))}
            <a href="#" className="gh-view-all-light">View all trending repos →</a>
          </div>

        </div>
      )}

      {/* ── LOWER DASHBOARD: PAPERS (LEFT) vs X & REDDIT (RIGHT) ── */}
      <div className="dashboard-lower-grid">
        <div className="papers-column-flex">
          {/* Time Filter Tabs */}
          <div className="time-filters">
            <button className="time-filter active">Today</button>
            <button className="time-filter">This Week</button>
            <button className="time-filter">This Month</button>
            <button className="time-filter">All time</button>
          </div>

          {/* Papers Feed (independent scroll) */}
          <div className="paper-list">
            {data.papers.map((paper: any, i: number) => (
              <PaperCard key={i} paper={paper} />
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: X & Reddit trending */}
        <div className="sidebar-lower-col">
          <div className="trending-panel">
            <div className="tp-header">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              <span>TRENDING ON X</span>
            </div>
            {trendingX.map((item, i) => (
              <div key={i} className="tp-row">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="rgba(255,255,255,0.4)"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                <span className="tp-name">{item.handle}</span>
                <span className="tp-stat">{item.change} ★</span>
              </div>
            ))}
            <a href="#" className="tp-all">View all trending posts →</a>
          </div>

          <div className="trending-panel trending-panel-reddit">
            <div className="tp-header">
              <span className="reddit-clean-logo">
                <svg width="17" height="17" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#ff4500"/><path fill="white" d="M16.67 10A1.46 1.46 0 0015.2 8.54a1.46 1.46 0 00-1.01.41 7.42 7.42 0 00-4.37-1.49l.86-4.04 2.8.59a1.07 1.07 0 10.13-.52l-3.13-.66a.35.35 0 00-.41.27l-.95 4.46a7.42 7.42 0 00-4.43 1.48 1.46 1.46 0 00-1.01-.41A1.46 1.46 0 002.2 10a1.46 1.46 0 00.99 1.38 5.75 5.75 0 00-.07.82c0 3.24 3.73 5.86 8.33 5.86s8.33-2.62 8.33-5.86a5.75 5.75 0 00-.07-.82A1.46 1.46 0 0016.67 10zm-9.35 3.32a1.04 1.04 0 112.08 0 1.04 1.04 0 01-2.08 0zm6.81 2.83c-.76.76-2.23.82-2.68.82s-1.92-.06-2.68-.82a.37.37 0 01.53-.53c.48.48 1.49.61 2.15.61.66 0 1.67-.13 2.15-.61a.37.37 0 01.53.53zm-.33-1.79a1.04 1.04 0 112.08 0 1.04 1.04 0 01-2.08 0z"/></svg>
              </span>
              <span>TRENDING ON REDDIT</span>
            </div>
            {trendingReddit.map((item, i) => (
              <div key={i} className="tp-row">
                <span className="reddit-dot" />
                <span className="tp-name">{item.sub}</span>
                <span className="tp-stat">{item.change} ★</span>
              </div>
            ))}
            <a href="#" className="tp-all">View all trending discussions →</a>
          </div>
        </div>
      </div>

    </div>
  );
}
