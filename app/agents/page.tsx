import React from 'react';

export default function Agents() {
  return (
    <main className="feed-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Task: <span className="text-red">Agents</span></h1>
          <p className="hero-subtitle">Research papers, benchmarks, and models focused on autonomous AI agents and tool use.</p>
        </div>
      </div>
      
      <div className="paper-list">
        <div style={{padding: '40px', textAlign: 'center', color: 'var(--text-gray)'}}>
          [Agent research feed will load here from database]
        </div>
      </div>
    </main>
  );
}
