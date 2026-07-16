'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import SearchBar from './SearchBar';

export default function Header() {
  const pathname = usePathname() || '/';
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const mainEl = document.querySelector('main');
      const scrollTop = mainEl ? mainEl.scrollTop : window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    const mainEl = document.querySelector('main');
    if (mainEl) {
      mainEl.addEventListener('scroll', handleScroll, { passive: true });
    }
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (mainEl) {
        mainEl.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  return (
    <nav className="font-sans sticky top-0 h-[56px] xl:h-[52px] w-full bg-[#F8F7F2]/80 backdrop-blur-md border-b border-[#E5E5E0] flex items-center justify-between px-4 md:px-8 xl:px-12 gap-3 xl:gap-4 shrink-0 z-50 transition-all duration-300">
      <div className="flex items-center gap-1 xl:gap-0 xl:w-[240px] shrink-0">
        <button
          aria-label="Open menu"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden w-10 h-10 flex items-center justify-center rounded-md hover:bg-[#EBEBE6] transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" strokeLinecap="round">
            <line x1="4" y1="6" x2="20" y2="6"></line>
            <line x1="4" y1="12" x2="20" y2="12"></line>
            <line x1="4" y1="18" x2="20" y2="18"></line>
          </svg>
        </button>
        {/* Logo & Profile Icon Enlarged by +20% */}
        <Link
          href="/"
          className="flex items-center justify-center xl:justify-start cursor-pointer absolute left-1/2 -translate-x-1/2 xl:relative xl:left-auto xl:-translate-x-0 w-[200px] sm:w-[240px] xl:w-[290px] h-12 xl:h-14"
        >
          <Image
            alt="Frontier Atlas"
            src="/logo.png"
            fill
            className="object-contain object-center xl:object-left scale-[1.18] xl:scale-[1.23] origin-center xl:origin-left transition-transform"
            sizes="(max-width: 1280px) 240px, 290px"
            priority
          />
        </Link>
      </div>

      <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center justify-center w-[240px] xl:w-[400px]">
        <SearchBar variant="compact" placeholder="Search models, papers, tasks..." />
      </div>

      <div className="hidden lg:flex items-center gap-6 ml-auto">
        <Link
          href="/tasks"
          data-text="Tasks"
          className={`text-[13px] transition-colors no-underline before:content-[attr(data-text)] before:block before:font-bold before:h-0 before:overflow-hidden before:invisible before:select-none text-center flex flex-col justify-center ${
            pathname.startsWith('/tasks')
              ? 'text-[#F55036] font-bold'
              : 'text-[#555555] font-medium hover:text-[#F55036]'
          }`}
        >
          Tasks
        </Link>
        <Link
          href="/methods"
          data-text="Methods"
          className={`text-[13px] transition-colors no-underline before:content-[attr(data-text)] before:block before:font-bold before:h-0 before:overflow-hidden before:invisible before:select-none text-center flex flex-col justify-center ${
            pathname.startsWith('/methods')
              ? 'text-[#F55036] font-bold'
              : 'text-[#555555] font-medium hover:text-[#F55036]'
          }`}
        >
          Methods
        </Link>
        <Link
          href="/benchmarks"
          data-text="Benchmarks"
          className={`text-[13px] transition-colors no-underline before:content-[attr(data-text)] before:block before:font-bold before:h-0 before:overflow-hidden before:invisible before:select-none text-center flex flex-col justify-center ${
            pathname.startsWith('/benchmarks')
              ? 'text-[#F55036] font-bold'
              : 'text-[#555555] font-medium hover:text-[#F55036]'
          }`}
        >
          Benchmarks
        </Link>
        <Link
          href="/models"
          data-text="Models"
          className={`text-[13px] transition-colors no-underline before:content-[attr(data-text)] before:block before:font-bold before:h-0 before:overflow-hidden before:invisible before:select-none text-center flex flex-col justify-center ${
            pathname.startsWith('/models')
              ? 'text-[#F55036] font-bold'
              : 'text-[#555555] font-medium hover:text-[#F55036]'
          }`}
        >
          Models
        </Link>
      </div>

      <div className="hidden xl:flex items-center gap-4 border-l border-[#E5E5E0] pl-4 shrink-0">
        <div className="w-10 h-10 rounded-full bg-[#F55036] flex items-center justify-center cursor-pointer hover:bg-[#E0462D] transition-colors shadow-sm hover:shadow-[0_0_0_3px_rgba(245,80,54,0.20)] hover:-translate-y-px active:scale-95">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
      </div>

      <div className="flex xl:hidden items-center shrink-0">
        <div className="w-10 h-10 rounded-full bg-[#F55036] flex items-center justify-center cursor-pointer hover:bg-[#E0462D] transition-colors shadow-sm hover:shadow-[0_0_0_3px_rgba(245,80,54,0.20)] hover:-translate-y-px active:scale-95">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
      </div>
    </nav>
  );
}
