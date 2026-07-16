'use client';

import React from 'react';
import Header from './Header';
import { usePathname } from 'next/navigation';

export default function ConditionalHeader() {
  const pathname = usePathname() || '/';
  if (pathname.startsWith('/models')) {
    return null;
  }
  return <Header />;
}
