import React from 'react';
import Link from 'next/link';

export default function PaperCard({ paper }: { paper: any }) {
  return (
    <article className="paper-card">
      {/* Thumbnail */}
      <Link href="#" className="card-thumb">
        {paper.thumbnail ? (
          <img src={paper.thumbnail} alt={paper.title} />
        ) : (
          <div className="card-thumb-placeholder" />
        )}
      </Link>

      {/* Body */}
      <div className="card-body">
        <h2 className="card-title">
          <Link href="#">{paper.title}</Link>
        </h2>
        <div className="card-meta">{paper.meta}</div>
        <p className="card-abstract">{paper.abstract}</p>

        {/* SOTA Ranking */}
        {paper.sotaHtml ? (
          <div className="card-sota-ranking" dangerouslySetInnerHTML={{ __html: paper.sotaHtml }} />
        ) : (
          <div className="card-sota-ranking">
            🏆 <strong>#1</strong> on <strong>Frontier Benchmarks</strong> · <strong>#2</strong> on <strong>EvalBench</strong>
          </div>
        )}

        {/* Domain tags (Orange scheme only) */}
        {(() => {
          const allTags = [
            ...(paper.tagsRow1 || []).map((t: any) => typeof t === 'object' ? t.text : t),
            ...(paper.tagsRow2 || [])
          ].filter((t: string) => t && !t.startsWith('+'));

          return allTags.length > 0 ? (
            <div className="card-tags-row">
              {allTags.map((tagText: string, i: number) => (
                <span key={i} className="tag-pill orange-brand">
                  <span className="tag-dot" />
                  {tagText}
                </span>
              ))}
            </div>
          ) : null;
        })()}
      </div>

      {/* Metrics */}
      <div className="card-metrics">
        {paper.metrics?.map((metric: any, i: number) => {
          const isUpvote = metric.icon === '↑' || metric.label === 'Upvotes';
          return (
            <div key={i} className="metric-item">
              <div className="metric-icon">
                {metric.icon === '↑' ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ff4d00" strokeWidth="2.5"><polyline points="18 15 12 9 6 15"/></svg>
                ) : metric.icon === 'github' ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#374151"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
                ) : metric.icon === 'chat' ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#6b7280"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                ) : null}
                <span className={`metric-value ${isUpvote ? 'orange-brand-text' : ''}`}>{metric.value}</span>
              </div>
              <span className="metric-label">{metric.label}</span>
            </div>
          );
        })}
      </div>

    </article>
  );
}
