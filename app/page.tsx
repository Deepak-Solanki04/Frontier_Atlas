import React from 'react';
import PaperCard from '../components/PaperCard';
import { mockPapers } from '../data/mockPapers';

export default function Home() {
  return (
    <main className="feed-container">
      
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Discover <span className="text-red">AI Research</span></h1>
          <p className="hero-subtitle">Explore the latest papers, methods, and breakthroughs from the world's AI research community.</p>
          
          <div className="segmented-tabs">
            <button className="tab active">Today</button>
            <button className="tab">This Week</button>
            <button className="tab">This Month</button>
            <button className="tab">All time</button>
          </div>
        </div>
        
        <div className="hero-graphic-placeholder">
          <div className="graphic-block b1"></div>
          <div className="graphic-block b2"></div>
          <div className="graphic-block b3"></div>
        </div>
      </div>

      <div className="paper-list">
        {mockPapers.map(paper => (
          <PaperCard key={paper.id} paper={paper} />
        ))}
      </div>
    </main>
  );
}
