"use client";
import React from 'react';
import Link from 'next/link';

interface TopicHeroProps {
  slug: string;
  defaultTitle: string;
  defaultDesc: string;
}

export default function TopicHero({ slug, defaultTitle, defaultDesc }: TopicHeroProps) {
  const isAgents = slug === 'agents';

  const title = isAgents ? 'Agents' : defaultTitle;
  const desc = isAgents 
    ? 'AI agents are autonomous systems that perceive their environment, reason, and take actions to achieve goals across diverse real-world tasks.'
    : defaultDesc;

  const category = 'TASK';
  const breadcrumbs = ['Home', 'Tasks', title];

  const stats = isAgents ? [
    { count: '1,182', label: 'Papers', orange: true },
    { count: '152', label: 'Benchmarks', orange: false },
    { count: '84', label: 'Methods', orange: false },
    { count: '23', label: 'Datasets', orange: false },
  ] : [
    { count: '428', label: 'Papers', orange: true },
    { count: '36', label: 'Benchmarks', orange: false },
    { count: '18', label: 'Methods', orange: false },
    { count: '8', label: 'Datasets', orange: false },
  ];

  const relatedTasks = isAgents ? [
    'Robotics', 'Embodied AI', 'Planning', 'Multi Agent Systems', 'Tool Use', '+6'
  ] : [
    'Agents', 'Language Modeling', 'Reasoning', 'Evaluation', 'Finetuning', '+4'
  ];

  const benchmarksCount = isAgents ? '152' : '36';

  const benchmarks = isAgents ? [
    {
      rank: '1', rankBg: '#ffe4e6', rankColor: '#FF5A1F',
      iconBg: '#ff4d00',
      iconSvg: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
      ),
      name: 'BrowseComp', sub: 'Browser Use',
      desc: 'Evaluates web browsing agents on real-world information-seeking tasks.',
      score: '89.4'
    },
    {
      rank: '2', rankBg: '#f3e8ff', rankColor: '#9333ea',
      iconBg: '#a855f7',
      iconSvg: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>
      ),
      name: 'GAIA', sub: 'General AI Assistants',
      desc: 'Measures general AI assistant capabilities across diverse scenarios.',
      score: '87.1'
    },
    {
      rank: '3', rankBg: '#ecfccb', rankColor: '#65a30d',
      iconBg: '#84cc16',
      iconSvg: (
        <span style={{ fontFamily: 'monospace', fontWeight: 900, fontSize: '16px' }}>&gt;_</span>
      ),
      name: 'τ²-Bench', sub: 'Tool Use',
      desc: 'Benchmarks agents on effective tool selection and execution in real tasks.',
      score: '83.6'
    },
    {
      rank: '4', rankBg: '#dbeafe', rankColor: '#2563eb',
      iconBg: '#3b82f6',
      iconSvg: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
      ),
      name: 'BFCL V3', sub: 'Function Calling',
      desc: 'Tests function calling accuracy and parameter generation in agents.',
      score: '82.3'
    },
    {
      rank: '5', rankBg: '#ffedd5', rankColor: '#ea580c',
      iconBg: '#f97316',
      iconSvg: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
      ),
      name: 'DefuEval', sub: 'Defense Evaluation',
      desc: 'Evaluates robustness of agents against adversarial attacks and jailbreaks.',
      score: '80.2'
    },
    {
      rank: '6', rankBg: '#ccfbf1', rankColor: '#0d9488',
      iconBg: '#14b8a6',
      iconSvg: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
      ),
      name: 'MINT', sub: 'Multi Agent',
      desc: 'Evaluates cooperation and coordination in multi-agent collaborative tasks.',
      score: '79.3'
    },
    {
      rank: '7', rankBg: '#fce7f3', rankColor: '#db2777',
      iconBg: '#f43f5e',
      iconSvg: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.54Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.54Z"/></svg>
      ),
      name: 'AgentBench', sub: 'General',
      desc: 'General benchmark for assessing agent reasoning and planning abilities.',
      score: '78.6'
    },
    {
      rank: '8', rankBg: '#ffedd5', rankColor: '#ea580c',
      iconBg: '#ff6b00',
      iconSvg: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
      ),
      name: 'ToolBench', sub: 'Tool Use',
      desc: 'Evaluates tool usage capabilities across a wide range of tools.',
      score: '76.9'
    },
    {
      rank: '9', rankBg: '#e0e7ff', rankColor: '#4f46e5',
      iconBg: '#6366f1',
      iconSvg: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      ),
      name: 'ConvBench', sub: 'Conversational',
      desc: 'Tests conversational agents on context, consistency, and helpfulness.',
      score: '75.4'
    },
    {
      rank: '10', rankBg: '#ede9fe', rankColor: '#7c3aed',
      iconBg: '#8b5cf6',
      iconSvg: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
      ),
      name: 'SafeBench', sub: 'Safety',
      desc: 'Assesses safety alignment and policy adherence in agent responses.',
      score: '74.1'
    }
  ] : [
    {
      rank: '1', rankBg: '#ffe4e6', rankColor: '#FF5A1F',
      iconBg: '#ff4d00',
      iconSvg: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="m10 15 5-3-5-3v6Z"/></svg>,
      name: `${title}Eval`, sub: 'Core Benchmark',
      desc: `Primary evaluation suite for assessing core state-of-the-art capabilities in ${title.toLowerCase()}.`,
      score: '88.5'
    },
    {
      rank: '2', rankBg: '#f3e8ff', rankColor: '#9333ea',
      iconBg: '#a855f7',
      iconSvg: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
      name: `${title}Bench`, sub: 'Standard Benchmark',
      desc: `Comprehensive benchmark covering multi-turn interaction and robustness testing.`,
      score: '85.2'
    },
    {
      rank: '3', rankBg: '#ecfccb', rankColor: '#65a30d',
      iconBg: '#84cc16',
      iconSvg: <span style={{ fontFamily: 'monospace', fontWeight: 900, fontSize: '16px' }}>&gt;_</span>,
      name: `${title}Test`, sub: 'Real-world Suite',
      desc: `Measures efficiency, accuracy, and scaling across diverse real-world tasks.`,
      score: '81.9'
    }
  ];

  return (
    <div className="topic-hero-container">
      {/* Breadcrumbs */}
      <div className="topic-breadcrumbs">
        {breadcrumbs.map((b, idx) => (
          <React.Fragment key={idx}>
            {idx > 0 && <span className="crumb-sep">&gt;</span>}
            <span className={idx === breadcrumbs.length - 1 ? 'crumb-current' : 'crumb-link'}>{b}</span>
          </React.Fragment>
        ))}
      </div>

      {/* Badge Header */}
      <div className="topic-badge-row">
        <span className="topic-task-icon">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        </span>
        <span className="topic-badge-label">{category}</span>
      </div>

      {/* Title */}
      <h1 className="topic-hero-title">{title}</h1>

      {/* Description */}
      <p className="topic-hero-desc">{desc}</p>

      {/* Stats Row */}
      <div className="topic-stats-row">
        {stats.map((s, i) => (
          <div key={i} className="topic-stat-item">
            <span className={`topic-stat-count ${s.orange ? 'stat-orange' : ''}`}>{s.count}</span>
            <span className="topic-stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <hr className="topic-hero-divider" />

      {/* Related Tasks */}
      <div className="topic-related-row">
        <span className="topic-related-label">RELATED TASKS</span>
        <div className="topic-related-chips">
          {relatedTasks.map((t, i) => (
            <Link key={i} href={t.startsWith('+') ? '#' : `/${t.toLowerCase().replace(/\s+/g, '-')}`} className="topic-related-chip">
              {t}
            </Link>
          ))}
        </div>
      </div>

      {/* Benchmarks Header */}
      <div className="topic-benchmarks-header">
        <h2 className="topic-benchmarks-title">Benchmarks</h2>
        <span className="topic-benchmarks-badge">{benchmarksCount}</span>
      </div>

      {/* Benchmarks Grid */}
      <div className="topic-benchmarks-grid">
        {benchmarks.map((card, i) => (
          <div key={i} className="benchmark-card">
            <div>
              <div className="bench-rank-pill" style={{ background: card.rankBg, color: card.rankColor }}>
                {card.rank}
              </div>
              <div className="bench-card-header">
                <div className="bench-icon-box" style={{ background: card.iconBg }}>
                  {card.iconSvg}
                </div>
                <div className="bench-title-col">
                  <div className="bench-name">{card.name}</div>
                  <div className="bench-sub">{card.sub}</div>
                </div>
              </div>
              <p className="bench-desc">{card.desc}</p>
            </div>
            <div className="bench-footer">
              <span className="bench-sota-label">SOTA</span>
              <span className="bench-sota-score">{card.score}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Explore All Button */}
      <div className="topic-explore-container">
        <button className="topic-explore-btn">
          Explore all {benchmarksCount} benchmarks <span style={{ marginLeft: '4px', fontSize: '14px' }}>→</span>
        </button>
      </div>
    </div>
  );
}
