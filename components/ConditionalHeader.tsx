'use client';

import React from 'react';
import Header from './Header';
import { usePathname } from 'next/navigation';

export default function ConditionalHeader() {
  const pathname = usePathname() || '/';
  // Render Header globally for all pages to ensure consistency
  return <Header />;
}
