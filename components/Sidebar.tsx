"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  
  const isActive = (path: string) => pathname === path ? 'active' : '';

  return (
    <aside className="sidebar-full">
      <Link href="/" className="sidebar-logo">Frontier Atlas</Link>

      <div className="sidebar-nav">
        <div className="nav-section">
          <div className="nav-title">DISCOVER</div>
          <Link href="/trending" className={`nav-item ${isActive('/trending')}`}>
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#f97316'}}><path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z" clipRule="evenodd" /></svg>
            Trending Papers
          </Link>
          <Link href="/latest-papers" className={`nav-item ${isActive('/latest-papers')}`}>
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#3b82f6'}}><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
            Latest Papers
          </Link>
          <Link href="/most-github-stars" className={`nav-item ${isActive('/most-github-stars')}`}>
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#eab308'}}><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
            Most GitHub Stars
          </Link>
        </div>

        <div className="nav-section">
          <div className="nav-title">TASKS</div>
          <Link href="/agents" className={`nav-item ${isActive('/agents')}`}>
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#3b82f6'}}><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1v2h-1v1a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1H1v-2h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2zM9 10a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H9z"/></svg>
            Agents
          </Link>
          <Link href="/reasoning" className={`nav-item ${isActive('/reasoning')}`}>
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#f97316'}}><path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L3.1 19.49a1 1 0 0 0 1.41 1.41l1.88-1.88A8.963 8.963 0 0 0 12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z"/></svg>
            Reasoning
          </Link>
          <Link href="/language-modeling" className={`nav-item ${isActive('/language-modeling')}`}>
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#10b981'}}><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
            Language Modeling
          </Link>
          <Link href="/coding-agents" className={`nav-item ${isActive('/coding-agents')}`}>
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#3b82f6'}}><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>
            Coding Agents
          </Link>
          <Link href="/computer-use" className={`nav-item ${isActive('/computer-use')}`}>
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#8b5cf6'}}><path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v2H8v2h8v-2h-2v-2h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H3V4h18v12z"/></svg>
            Computer Use
          </Link>
          <Link href="/world-models" className={`nav-item ${isActive('/world-models')}`}>
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#0ea5e9'}}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
            World Models
          </Link>
          <Link href="/robotics" className={`nav-item ${isActive('/robotics')}`}>
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#8b5cf6'}}><path d="M19 8h-2V6c0-1.1-.9-2-2-2h-2V2h-2v2H9C7.9 4 7 4.9 7 6v2H5c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h2v2c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2v-2h2c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2zM9 6h6v2H9V6zm10 10H5v-4h14v4z"/></svg>
            Robotics
          </Link>
        </div>

        <div className="nav-section">
          <div className="nav-title">METHODS</div>
          <Link href="/transformer" className={`nav-item ${isActive('/transformer')}`}>
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#3b82f6'}}><circle cx="9" cy="12" r="6" fillOpacity="0.4"/><circle cx="15" cy="12" r="6" fillOpacity="0.4"/></svg>
            Transformer
          </Link>
          <Link href="/chain-of-thought" className={`nav-item ${isActive('/chain-of-thought')}`}>
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#a855f7'}}><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>
            Chain of Thought
          </Link>
          <Link href="/react" className={`nav-item ${isActive('/react')}`}>
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#6b7280'}}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/><circle cx="12" cy="12" r="3"/></svg>
            ReAct
          </Link>
          <Link href="/lora" className={`nav-item ${isActive('/lora')}`}>
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#f97316'}}><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>
            LoRA
          </Link>
          <Link href="/rlhf" className={`nav-item ${isActive('/rlhf')}`}>
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#10b981'}}><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
            RLHF
          </Link>
          <Link href="/dpo" className={`nav-item ${isActive('/dpo')}`}>
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#ef4444'}}><path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z"/></svg>
            DPO
          </Link>
          <Link href="/mcp" className={`nav-item ${isActive('/mcp')}`}>
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#8b5cf6'}}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z"/><circle cx="12" cy="12" r="2"/></svg>
            MCP
          </Link>
        </div>

        <div className="nav-section">
          <div className="nav-title">GENERATION</div>
          <Link href="/text-generation" className={`nav-item ${isActive('/text-generation')}`}>
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#3b82f6'}}><path d="M5 4v3h5.5v12h3V7H19V4z"/></svg>
            Text Generation
          </Link>
          <Link href="/image-generation" className={`nav-item ${isActive('/image-generation')}`}>
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#10b981'}}><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>
            Image Generation
          </Link>
          <Link href="/video-generation" className={`nav-item ${isActive('/video-generation')}`}>
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#8b5cf6'}}><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg>
            Video Generation
          </Link>
          <Link href="/audio-generation" className={`nav-item ${isActive('/audio-generation')}`}>
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#ec4899'}}><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
            Audio Generation
          </Link>
        </div>

        <div className="nav-section">
          <div className="nav-title">LIBRARY</div>
          <Link href="/organizations" className={`nav-item ${isActive('/organizations')}`}>
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#3b82f6'}}><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>
            Organizations
          </Link>
          <Link href="/collections" className={`nav-item ${isActive('/collections')}`}>
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#eab308'}}><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0-2-.9-2-2V4c0-1.1-.9-2-2-2zm0 10l-2.5-1.5L15 12V4h5v8z"/></svg>
            Collections
          </Link>
        </div>

        <div className="nav-section">
          <div className="nav-title">PERSONAL</div>
          <Link href="/bookmarks" className={`nav-item ${isActive('/bookmarks')}`}>
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#3b82f6'}}><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg>
            Bookmarks
          </Link>
          <Link href="/reading-list" className={`nav-item ${isActive('/reading-list')}`}>
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#8b5cf6'}}><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/></svg>
            Reading List
          </Link>
        </div>
      </div>

      <div className="sidebar-footer">
        <button className="btn-submit-paper">
          + Submit a Paper
        </button>
      </div>
    </aside>
  );
}
