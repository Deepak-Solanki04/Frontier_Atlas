import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="header-top">
      {/* Logo */}
      <Link href="/" className="header-logo">
        <span className="logo-icon">&lt;/&gt;</span>
        <span className="logo-text">Frontier Atlas</span>
      </Link>

      {/* Search */}
      <div className="search-bar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input type="text" placeholder="Search papers, authors, topics..." />
        <span className="search-kbd">⌘K</span>
      </div>

      {/* Actions */}
      <div className="header-actions">
        <button className="btn-submit-header">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          Submit
        </button>
        <div className="user-profile">
          <div className="user-avatar">
            <img src="https://i.pravatar.cc/150?img=47" alt="User" />
          </div>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
      </div>
    </header>
  );
}
