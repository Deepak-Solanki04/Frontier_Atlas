import React from 'react';

export default function PaperCard({ paper }: { paper: any }) {
  return (
    <article className="paper-card">
      
      <div className="card-thumb">
        <img src={paper.thumbnail} alt={`Thumbnail for ${paper.title}`} />
      </div>

      <div className="card-body">
        <h2 className="card-title">{paper.title}</h2>
        <div className="card-meta">{paper.meta}</div>
        <div className="card-abstract">{paper.abstract}</div>
        
        <div className="card-sota">
          <span dangerouslySetInnerHTML={{__html: paper.sotaHtml}}></span>
        </div>
        
        <div className="card-tags">
          <div className="tag-row">
            {paper.tagsRow1.map((tag: any, i: number) => (
              <span key={i} className={`tag-pill ${tag.color}`}>
                {tag.text}
              </span>
            ))}
          </div>
          <div className="tag-row">
            {paper.tagsRow2.map((tag: string, i: number) => (
              <span key={i} className="tag-outline">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="card-metrics">
        {paper.metrics.map((metric: any, i: number) => (
          <div className="metric-item" key={i}>
            <div className={`metric-icon ${metric.color}`}>
              {metric.icon === '↑' ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
              ) : metric.icon === 'github' ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              ) : metric.icon === 'bookmark' ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
              ) : (
                <span>{metric.icon}</span>
              )}
            </div>
            <div className="metric-data">
              <span className="metric-val">{metric.value}</span>
              <span className="metric-lbl">{metric.label}</span>
            </div>
          </div>
        ))}
      </div>

    </article>
  );
}
