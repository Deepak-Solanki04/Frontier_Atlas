import React from 'react';
import PaperCard from '../../components/PaperCard';
import { topicData } from '../../data/topicData';
import TopicHero from '../../components/TopicHero';
import HomepageHero from '../../components/HomepageHero';
import Sidebar from '../../components/Sidebar';

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

  // For category / agent pages, render only the dedicated landing section
  if (!isTrending) {
    return (
      <div className="unified-page-wrapper topic-page-wrapper">
        <TopicHero slug={resolvedParams.slug} defaultTitle={data.title} defaultDesc={data.desc} />
      </div>
    );
  }

  // For homepage / trending, render search hero + 2-column feed
  return (
    <div className="unified-page-wrapper">
      {/* ── TOP HERO BANNER (Full Width) ── */}
      <HomepageHero />

      {/* ── 2-COLUMN DISCOVERY FEED ROW ── */}
      <div className="discovery-feed-row">
        <div className="discovery-sidebar-col">
          <Sidebar />
        </div>

        <div className="discovery-main-col">
          {/* Time Filter Tabs */}
          <div className="time-filters" style={{ marginBottom: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '0' }}>
            <button className="time-filter active" style={{ borderBottom: '2px solid var(--brand-orange)', fontWeight: '700', color: 'var(--text-dark)' }}>Today</button>
            <button className="time-filter">This Week</button>
            <button className="time-filter">This Month</button>
            <button className="time-filter">All time</button>
          </div>

          {/* Papers Feed */}
          <div className="paper-list">
            {data.papers.map((paper: any, i: number) => (
              <PaperCard key={i} paper={paper} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


