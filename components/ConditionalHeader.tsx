'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';

export default function ConditionalHeader() {
  const pathname = usePathname();

  // Hide the top header on topic pages (like /agents, /robotics, etc.) to give full vertical space
  if (pathname && pathname !== '/' && pathname !== '/trending') {
    return null;
  }

  return <Header />;
}
