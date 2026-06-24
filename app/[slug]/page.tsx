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
          <h1 className="hero-title">{data.title}</h1>
          <p className="hero-subtitle">{data.desc}</p>
        </div>
      </div>
      
      <div className="paper-list">
        {data.papers.map((paper: any) => (
          <PaperCard key={paper.id} paper={paper} />
        ))}
      </div>
    </main>
  );
}
