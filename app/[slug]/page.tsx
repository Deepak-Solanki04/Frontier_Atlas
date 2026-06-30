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

  // Collect all unique papers across topicData
  const allPapers = Object.values(topicData).flatMap(t => t?.papers || []);
  const uniquePapersMap = new Map();
  allPapers.forEach((p: any) => {
    if (p && p.title && !uniquePapersMap.has(p.title)) {
      uniquePapersMap.set(p.title, p);
    }
  });

  // Filter papers specifically for this topic/slug
  const topicPapers = Array.from(uniquePapersMap.values()).filter((paper: any) => {
    if (resolvedParams.slug === 'agents') {
      const hasCategory = paper.categories?.some((c: string) => c?.toLowerCase().includes('agent'));
      const hasTagRow1 = paper.tagsRow1?.some((t: any) => (typeof t === 'string' ? t : t.text)?.toLowerCase().includes('agent'));
      const hasTagRow2 = paper.tagsRow2?.some((t: any) => (typeof t === 'string' ? t : t.text)?.toLowerCase().includes('agent'));
      const inTitleOrAbstract = paper.title?.toLowerCase().includes('agent') || paper.abstract?.toLowerCase().includes('agent');
      return hasCategory || hasTagRow1 || hasTagRow2 || inTitleOrAbstract;
    }
    return paper.categories?.includes(resolvedParams.slug) || data.papers.includes(paper);
  });

  // For category / agent pages, render the dedicated landing section (100vh hero) followed by the papers feed
  if (!isTrending) {
    return (
      <div className="unified-page-wrapper topic-page-wrapper">
        <TopicHero slug={resolvedParams.slug} defaultTitle={data.title} defaultDesc={data.desc} />

        {/* ── 2-COLUMN DISCOVERY FEED ROW BELOW HERO ── */}
        <div className="discovery-feed-row" style={{ marginTop: '24px', paddingBottom: '60px' }}>
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
              {topicPapers.map((paper: any, i: number) => (
                <PaperCard key={i} paper={paper} />
              ))}
            </div>
          </div>
        </div>
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


