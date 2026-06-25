import React from 'react';
import PaperCard from '../../components/PaperCard';
import { topicData } from '../../data/topicData';

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const data = topicData[resolvedParams.slug];

  if (!data) {
    return (
      <main className="feed-container">
        <div style={{padding: '40px', textAlign: 'center'}}>
          <h2>Topic Not Found</h2>
        </div>
      </main>
    );
  }

  return (
    <main className="feed-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Discover <span className="hero-highlight">AI Research</span></h1>
          <p className="hero-subtitle">Explore the latest papers, methods, and breakthroughs<br/>from the world&apos;s AI research community.</p>
        </div>
        <div className="hero-illustration">
          <img src="/hero-illustration.png" alt="AI Research Illustration" />
        </div>
      </div>

      <div className="time-filters">
        <button className="time-filter active">Today</button>
        <button className="time-filter">This Week</button>
        <button className="time-filter">This Month</button>
        <button className="time-filter">All time</button>
      </div>
      
      <div className="paper-list">
        {data.papers.map((paper: any) => (
          <PaperCard key={paper.id} paper={paper} />
        ))}
      </div>
    </main>
  );
}
