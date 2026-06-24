import React from 'react';

export default function Trending() {
  return (
    <main className="feed-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Trending <span className="text-red">Papers</span></h1>
          <p className="hero-subtitle">The most discussed and upvoted AI research papers across the community over the last 24 hours.</p>
        </div>
      </div>
      
      <div className="paper-list">
        <div style={{padding: '40px', textAlign: 'center', color: 'var(--text-gray)'}}>
          [Trending papers feed will load here from database]
        </div>
      </div>
    </main>
  );
}
