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
        <div className="card-meta">{paper.meta}</div>
        <h2 className="card-title">
          <Link href="#">{paper.title}</Link>
        </h2>
        <p className="card-abstract">{paper.abstract}</p>

        {/* Tags row 1 — colored pills */}
        {paper.tagsRow1?.length > 0 && (
          <div className="card-tags-row">
            {paper.tagsRow1.map((tag: any, i: number) => (
              <span key={i} className={`tag-pill ${tag.color || 'blue'}`}>{tag.text}</span>
            ))}
          </div>
        )}

        {/* Tags row 2 — gray outlined chips */}
        {paper.tagsRow2?.length > 0 && (
          <div className="card-methods-row">
            {paper.tagsRow2.map((tag: string, i: number) => (
              <span key={i} className="method-chip">{tag}</span>
            ))}
          </div>
        )}
      </div>

      {/* Metrics */}
      <div className="card-metrics">
        {paper.metrics?.map((metric: any, i: number) => (
          <div key={i} className="metric-item">
            <div className="metric-icon">
              {metric.icon === '↑' ? (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5"><polyline points="18 15 12 9 6 15"/></svg>
              ) : metric.icon === 'github' ? (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="#374151"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
              ) : metric.icon === 'chat' ? (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="#6b7280"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
              ) : null}
              <span className={`metric-value ${metric.color === 'red' ? 'red' : ''}`}>{metric.value}</span>
            </div>
            <span className="metric-label">{metric.label}</span>
          </div>
        ))}
      </div>

      {/* Bookmark button */}
      <button className="card-bookmark" aria-label="Bookmark">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
        </svg>
      </button>
    </article>
  );
}
