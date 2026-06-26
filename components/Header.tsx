import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="header-top">
      {/* Logo */}
      <Link href="/" className="header-logo">
        <span className="logo-icon-chip">
          <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="#ff4d00"/>
            <path d="M11 3v4M16 3v4M21 3v4M11 25v4M16 25v4M21 25v4M3 11h4M3 16h4M3 21h4M25 11h4M25 16h4M25 21h4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <rect x="7" y="7" width="18" height="18" rx="4" stroke="white" strokeWidth="2" fill="none"/>
            <text x="16" y="20.2" textAnchor="middle" fill="white" fontSize="11.5" fontWeight="800" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="-0.5px">FA</text>
          </svg>
        </span>
        <span className="logo-text-fa" style={{ fontFamily: "'Comfortaa', 'Fredoka', 'Righteous', 'Quicksand', 'Outfit', system-ui, sans-serif", fontWeight: 700, fontSize: '23px', color: '#ff4d00', letterSpacing: '-0.5px' }}>FrontierAtlas</span>
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
