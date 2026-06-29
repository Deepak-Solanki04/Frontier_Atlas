'use client';

import React from 'react';
import Link from 'next/link';

export default function HomepageHero() {
  return (
    <div className="homepage-hero-banner">
      <h1 className="home-hero-title">
        Discover what&apos;s next in <span className="text-brand-orange">AI research.</span>
      </h1>
      <p className="home-hero-subtitle">
        Search, discover, and track papers, methods, benchmarks, and open-source releases.
      </p>

      {/* Search Input Box */}
      <div className="home-hero-search-box">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="search-icon-gray">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </svg>
        <input 
          type="text" 
          placeholder="Search papers, authors, topics, methods..." 
          className="home-hero-search-input"
        />
        <kbd className="home-hero-kbd">⌘ K</kbd>
      </div>

      {/* Category Pills Row */}
      <div className="home-hero-pills-row">
        <Link href="/agents" className="home-hero-pill">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F55036" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 8V4H8"></path>
            <rect width="16" height="12" x="4" y="8" rx="2"></rect>
            <path d="M2 14h2"></path>
            <path d="M20 14h2"></path>
            <path d="M15 13v2"></path>
            <path d="M9 13v2"></path>
          </svg>
          <span>Agents</span>
        </Link>

        <Link href="/reasoning" className="home-hero-pill">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F55036" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"></path>
            <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"></path>
            <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"></path>
            <path d="M17.599 6.5a3 3 0 0 0 .399-1.375"></path>
            <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"></path>
            <path d="M3.477 10.896a4 4 0 0 1 .585-.396"></path>
            <path d="M19.938 10.5a4 4 0 0 1 .585.396"></path>
            <path d="M6 18a4 4 0 0 1-1.967-.516"></path>
            <path d="M19.967 17.484A4 4 0 0 1 18 18"></path>
          </svg>
          <span>Reasoning</span>
        </Link>

        <Link href="/vision" className="home-hero-pill">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F55036" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          <span>Vision</span>
        </Link>

        <Link href="/coding-agents" className="home-hero-pill">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F55036" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m18 16 4-4-4-4"></path>
            <path d="m6 8-4 4 4 4"></path>
            <path d="m14.5 4-5 16"></path>
          </svg>
          <span>Coding</span>
        </Link>

        <Link href="/robotics" className="home-hero-pill">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F55036" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="16" height="16" x="4" y="4" rx="2"></rect>
            <rect width="6" height="6" x="9" y="9" rx="1"></rect>
            <path d="M15 2v2"></path>
            <path d="M15 20v2"></path>
            <path d="M2 15h2"></path>
            <path d="M2 9h2"></path>
            <path d="M20 15h2"></path>
            <path d="M20 9h2"></path>
            <path d="M9 2v2"></path>
            <path d="M9 20v2"></path>
          </svg>
          <span>Robotics</span>
        </Link>

        <Link href="/trending" className="home-hero-pill">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F55036" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="2"></rect>
            <path d="M3 9h18"></path>
            <path d="M3 15h18"></path>
            <path d="M9 3v18"></path>
            <path d="M15 3v18"></path>
          </svg>
          <span>All Topics</span>
        </Link>
      </div>
    </div>
  );
}
