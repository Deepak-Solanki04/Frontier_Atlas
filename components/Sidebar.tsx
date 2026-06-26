"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  const isActive = (path: string) =>
    pathname === path || (path === '/trending' && (pathname === '/' || pathname === '/trending')) ? 'active' : '';

  return (
    <aside className="sidebar-full">
      <div className="sidebar-nav">

        <div className="nav-section">
          <div className="nav-title">DISCOVER</div>
          <Link href="/trending" className={`nav-item ${isActive('/trending')}`}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/></svg>
            Trending Papers
          </Link>
          <Link href="/latest-papers" className={`nav-item ${isActive('/latest-papers')}`}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
            Latest Papers
          </Link>
          <Link href="/most-github-stars" className={`nav-item ${isActive('/most-github-stars')}`}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
            Most GitHub Stars
          </Link>
        </div>

        <div className="nav-section">
          <div className="nav-title">TASKS</div>
          <Link href="/agents" className={`nav-item ${isActive('/agents')}`}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 017 7h1v2h-1v1a2 2 0 01-2 2H4a2 2 0 01-2-2v-1H1v-2h1a7 7 0 017-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 012-2zM9 10a2 2 0 00-2 2v2a2 2 0 002 2h6a2 2 0 002-2v-2a2 2 0 00-2-2H9z"/></svg>
            Agents
          </Link>
          <Link href="/reasoning" className={`nav-item ${isActive('/reasoning')}`}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M11.5 2C6.81 2 3 5.81 3 10.5S6.81 19 11.5 19h.5v3c4.86-2.34 8-7 8-11.5C20 5.81 16.19 2 11.5 2zm1 14.5h-2v-2h2v2zm0-4h-2c0-3.25 3-3 3-5 0-1.1-.9-2-2-2s-2 .9-2 2h-2c0-2.21 1.79-4 4-4s4 1.79 4 4c0 2.5-3 2.75-3 5z"/></svg>
            Reasoning
          </Link>
          <Link href="/language-modeling" className={`nav-item ${isActive('/language-modeling')}`}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
            Language Modeling
          </Link>
          <Link href="/coding-agents" className={`nav-item ${isActive('/coding-agents')}`}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>
            Coding Agents
          </Link>
          <Link href="/computer-use" className={`nav-item ${isActive('/computer-use')}`}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v2H8v2h8v-2h-2v-2h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H3V4h18v12z"/></svg>
            Computer Use
          </Link>
          <Link href="/world-models" className={`nav-item ${isActive('/world-models')}`}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
            World Models
          </Link>
          <Link href="/robotics" className={`nav-item ${isActive('/robotics')}`}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"/></svg>
            Robotics
          </Link>
        </div>

        <div className="nav-section">
          <div className="nav-title">METHODS</div>
          <Link href="/transformer" className={`nav-item ${isActive('/transformer')}`}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/></svg>
            Transformer
          </Link>
          <Link href="/chain-of-thought" className={`nav-item ${isActive('/chain-of-thought')}`}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.103 0-2 .897-2 2v18l5.333-4H20c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm-9 9H7V9h4v2zm6 0h-4V9h4v2z"/></svg>
            Chain of Thought
          </Link>
          <Link href="/react" className={`nav-item ${isActive('/react')}`}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>
            ReAct
          </Link>
          <Link href="/lora" className={`nav-item ${isActive('/lora')}`}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67z"/></svg>
            LoRA
          </Link>
          <Link href="/rlhf" className={`nav-item ${isActive('/rlhf')}`}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>
            RLHF
          </Link>
          <Link href="/dpo" className={`nav-item ${isActive('/dpo')}`}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/><path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/><circle cx="12" cy="12" r="2"/></svg>
            DPO
          </Link>
          <Link href="/mcp" className={`nav-item ${isActive('/mcp')}`}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17 12h-4V8h-2v4H7l5 5 5-5zm-5-10C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
            MCP
          </Link>
        </div>

        <div className="nav-section">
          <div className="nav-title">GENERATION</div>
          <Link href="/text-generation" className={`nav-item ${isActive('/text-generation')}`}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
            Text Generation
          </Link>
          <Link href="/image-generation" className={`nav-item ${isActive('/image-generation')}`}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>
            Image Generation
          </Link>
          <Link href="/video-generation" className={`nav-item ${isActive('/video-generation')}`}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/></svg>
            Video Generation
          </Link>
          <Link href="/audio-generation" className={`nav-item ${isActive('/audio-generation')}`}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
            Audio Generation
          </Link>
        </div>

        <div className="nav-section">
          <div className="nav-title">LIBRARY</div>
          <Link href="/organizations" className={`nav-item ${isActive('/organizations')}`}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>
            Organizations
          </Link>
          <Link href="/collections" className={`nav-item ${isActive('/collections')}`}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z"/></svg>
            Collections
          </Link>
        </div>

        <div className="nav-section">
          <div className="nav-title">PERSONAL</div>
          <Link href="/bookmarks" className={`nav-item ${isActive('/bookmarks')}`}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg>
            Bookmarks
          </Link>
          <Link href="/reading-list" className={`nav-item ${isActive('/reading-list')}`}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/></svg>
            Reading List
          </Link>
        </div>

      </div>
    </aside>
  );
}
