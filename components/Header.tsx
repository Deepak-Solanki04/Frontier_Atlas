'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

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
    <nav className="font-sans sticky top-0 h-[56px] w-full bg-[#F8F7F2]/90 backdrop-blur-md border-b border-[#E5E5E0] flex items-center justify-between px-4 md:px-8 xl:px-12 gap-4 shrink-0 z-50 transition-all duration-200">
      {/* Left Logo Container */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          aria-label="Open menu"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-md hover:bg-[#EBEBE6] transition-colors cursor-pointer"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" strokeLinecap="round">
            <line x1="4" y1="6" x2="20" y2="6"></line>
            <line x1="4" y1="12" x2="20" y2="12"></line>
            <line x1="4" y1="18" x2="20" y2="18"></line>
          </svg>
        </button>
        <Link
          href="/"
          className="relative block w-[170px] sm:w-[190px] h-10 cursor-pointer no-underline"
        >
          <Image
            alt="Frontier Atlas"
            src="/logo.png"
            fill
            className="object-contain object-left"
            sizes="190px"
            priority
          />
        </Link>
      </div>

      {/* Center Search Bar ALWAYS VISIBLE */}
      <div className="hidden lg:flex flex-1 max-w-[420px] mx-6 items-center justify-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (searchQuery.trim()) {
              window.location.href = `/models?search=${encodeURIComponent(searchQuery.trim())}`;
            }
          }}
          className="w-full relative flex items-center px-4 bg-white border border-[#E5E5E0] focus-within:border-gray-400 focus-within:shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all rounded-full h-9 shadow-sm"
        >
          <div className="flex items-center text-gray-400 mr-2 shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none flex-1 text-gray-800 placeholder:text-gray-400 min-w-0 pr-6 text-[13px] font-medium"
            aria-label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      {/* Exact Right Navigation Links from tasks_full.html */}
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

      {/* Exact Right Circular Icon / Profile Button */}
      <div className="hidden xl:flex items-center gap-4 border-l border-[#E5E5E0] pl-4 shrink-0">
        <div className="w-8 h-8 rounded-full bg-[#F55036] flex items-center justify-center cursor-pointer hover:bg-[#E0462D] transition-colors shadow-sm hover:shadow-[0_0_0_3px_rgba(245,80,54,0.20)] hover:-translate-y-px active:scale-95">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
      </div>

      {/* Mobile Icon Button */}
      <div className="flex xl:hidden items-center shrink-0">
        <div className="w-8 h-8 rounded-full bg-[#F55036] flex items-center justify-center cursor-pointer hover:bg-[#E0462D] transition-colors shadow-sm hover:shadow-[0_0_0_3px_rgba(245,80,54,0.20)] hover:-translate-y-px active:scale-95">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
      </div>
    </nav>
  );
}
