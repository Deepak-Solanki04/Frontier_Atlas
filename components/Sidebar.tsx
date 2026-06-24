"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  
  const isActive = (path: string) => pathname === path ? 'active' : '';

  return (
    <aside className="sidebar-full">
      <div className="sidebar-logo">Frontier Atlas</div>

      <div className="sidebar-nav">
        <div className="nav-section">
          <div className="nav-title">DISCOVER</div>
          <Link href="/" className={`nav-item ${isActive('/')}`}>
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#ef4444'}}><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></svg>
            Home
          </Link>
          <Link href="/trending" className={`nav-item ${isActive('/trending')}`}>
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#f97316'}}><path d="M12 2c0 0-4 4-4 9 0 2.21 1.79 4 4 4s4-1.79 4-4c0-5-4-9-4-9zm0 11c-1.1 0-2-.9-2-2 0-1.66 2-4 2-4s2 2.34 2 4c0 1.1-.9 2-2 2z"/></svg>
            Trending Papers
          </Link>
          <div className="nav-item">
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#3b82f6'}}><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
            Latest Papers
          </div>
          <div className="nav-item">
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#eab308'}}><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
            Most GitHub Stars
          </div>
        </div>

        <div className="nav-section">
          <div className="nav-title">TASKS</div>
          <Link href="/agents" className={`nav-item ${isActive('/agents')}`}>
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#3b82f6'}}><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1v2h-1v1a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1H1v-2h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2zM9 10a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H9z"/></svg>
            Agents
          </Link>
          <div className="nav-item">
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#f97316'}}><path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L3.1 19.49a1 1 0 0 0 1.41 1.41l1.88-1.88A8.963 8.963 0 0 0 12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z"/></svg>
            Reasoning
          </div>
          <div className="nav-item">
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#10b981'}}><path d="M4 4h16v12H4z"/><path d="M6 6h12v2H6z"/><path d="M6 10h8v2H6z"/></svg>
            Language Modeling
          </div>
          <div className="nav-item">
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#8b5cf6'}}><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>
            Coding Agents
          </div>
          <div className="nav-item">
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#6366f1'}}><path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v2H8v2h8v-2h-2v-2h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H3V4h18v12z"/></svg>
            Computer Use
          </div>
          <div className="nav-item">
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#0ea5e9'}}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
            World Models
          </div>
          <div className="nav-item">
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#ec4899'}}><path d="M19 8h-2V6c0-1.1-.9-2-2-2h-2V2h-2v2H9C7.9 4 7 4.9 7 6v2H5c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h2v2c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2v-2h2c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2zM9 6h6v2H9V6zm10 10H5v-4h14v4z"/></svg>
            Robotics
          </div>
        </div>

        <div className="nav-section">
          <div className="nav-title">METHODS</div>
          <div className="nav-item">
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#8b5cf6'}}><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 9c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm4 6H8v-1.2c0-1.6 3.2-2.4 4-2.4s4 .8 4 2.4V18z"/></svg>
            Transformer
          </div>
          <div className="nav-item">
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#3b82f6'}}><path d="M17 11V8c0-2.21-1.79-4-4-4S9 5.79 9 8v3H8c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-6c0-1.1-.9-2-2-2h-1zm-5 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>
            Chain of Thought
          </div>
          <div className="nav-item">
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#f97316'}}><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>
            ReAct
          </div>
          <div className="nav-item">
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#10b981'}}><path d="M17 3H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7V5h10v14z"/></svg>
            LoRA
          </div>
          <div className="nav-item">
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#ef4444'}}><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
            RLHF
          </div>
          <div className="nav-item">
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#ec4899'}}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/></svg>
            DPO
          </div>
          <div className="nav-item">
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#06b6d4'}}><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>
            MCP
          </div>
        </div>

        <div className="nav-section">
          <div className="nav-title">GENERATION</div>
          <div className="nav-item">
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#0ea5e9'}}><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
            Text Generation
          </div>
          <div className="nav-item">
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#10b981'}}><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>
            Image Generation
          </div>
          <div className="nav-item">
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#8b5cf6'}}><path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/></svg>
            Video Generation
          </div>
          <div className="nav-item">
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#f59e0b'}}><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
            Audio Generation
          </div>
        </div>

        <div className="nav-section">
          <div className="nav-title">LIBRARY</div>
          <div className="nav-item"><svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#3b82f6'}}><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg> Organizations</div>
          <div className="nav-item"><svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#f59e0b'}}><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg> Collections</div>
        </div>
        
        <div className="nav-section">
          <div className="nav-title">PERSONAL</div>
          <div className="nav-item"><svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#8b5cf6'}}><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg> Bookmarks</div>
          <div className="nav-item"><svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#10b981'}}><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 9c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm4 6H8v-1.2c0-1.6 3.2-2.4 4-2.4s4 .8 4 2.4V18z"/></svg> Reading List</div>
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
