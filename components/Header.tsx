'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search } from 'lucide-react';

export default function Header() {
  const pathname = usePathname() || '/';
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <nav className="font-sans sticky top-0 h-[56px] xl:h-[52px] w-full bg-[#F8F7F2]/80 backdrop-blur-md border-b border-[#E5E5E0] flex items-center justify-between px-4 md:px-8 xl:px-12 gap-3 xl:gap-4 shrink-0 z-50 transition-all duration-300">
      {/* Left Logo */}
      <div className="flex items-center gap-1 xl:gap-0 xl:w-[240px] shrink-0">
        <Link href="/" className="flex items-center justify-center xl:justify-start cursor-pointer w-[160px] sm:w-[200px] xl:w-[240px] h-12 xl:h-14 no-underline">
          <img
            alt="Frontier Atlas"
            src="/logo.png"
            className="object-contain object-center xl:object-left h-full w-auto max-h-[40px]"
          />
        </Link>
      </div>

      {/* Center Search Input */}
      <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center justify-center w-[240px] xl:w-[400px]">
        <div className="w-full">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim()) {
                window.location.href = `/models?search=${encodeURIComponent(searchQuery.trim())}`;
              }
            }}
            className="relative flex items-center px-3 md:px-4 bg-white border border-[#E5E5E0] focus-within:border-[#DCDCD7] focus-within:shadow-[0_4px_20px_rgb(0,0,0,0.08)] transition-all rounded-[20px] h-9 w-full max-w-[400px]"
          >
            <div className="flex items-center text-[#737373] mr-2 shrink-0">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none flex-1 text-[#111111] placeholder:text-[#737373] min-w-0 pr-4 h-full text-[12.5px] font-medium"
            />
          </form>
        </div>
      </div>

      {/* Right Navigation Links */}
      <div className="hidden lg:flex items-center gap-6 ml-auto">
        <Link
          href="/tasks"
          className={`text-[13px] transition-colors no-underline text-center flex flex-col justify-center ${
            pathname.startsWith('/tasks')
              ? 'text-[#F55036] font-bold'
              : 'text-[#555555] font-medium hover:text-[#F55036]'
          }`}
        >
          Tasks
        </Link>
        <Link
          href="/methods"
          className={`text-[13px] transition-colors no-underline text-center flex flex-col justify-center ${
            pathname.startsWith('/methods')
              ? 'text-[#F55036] font-bold'
              : 'text-[#555555] font-medium hover:text-[#F55036]'
          }`}
        >
          Methods
        </Link>
        <Link
          href="/benchmarks"
          className={`text-[13px] transition-colors no-underline text-center flex flex-col justify-center ${
            pathname.startsWith('/benchmarks')
              ? 'text-[#F55036] font-bold'
              : 'text-[#555555] font-medium hover:text-[#F55036]'
          }`}
        >
          Benchmarks
        </Link>
        <Link
          href="/models"
          className={`text-[13px] transition-colors no-underline text-center flex flex-col justify-center ${
            pathname.startsWith('/models')
              ? 'text-[#F55036] font-bold'
              : 'text-[#555555] font-medium hover:text-[#F55036]'
          }`}
        >
          Models
        </Link>
      </div>

      {/* Profile / Avatar Button */}
      <div className="flex items-center gap-4 border-l border-[#E5E5E0] pl-4 shrink-0">
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
