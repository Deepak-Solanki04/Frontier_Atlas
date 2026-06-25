"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  
  const isActive = (path: string) => pathname === path ? 'active' : '';

  return (
    <aside className="sidebar-full">
      <div className="sidebar-nav">
        <div className="nav-section">
          <div className="nav-title">DISCOVER</div>
          <Link href="/trending" className={`nav-item ${isActive('/trending')}`}>
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#f97316', width: '18px', height: '18px'}}>
              <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z" clipRule="evenodd" />
            </svg>
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
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#10b981'}}><path d="M4 4h16v12H4z"/><path d="M6 6h12v2H6z"/><path d="M6 10h8v2H6z"/></svg>
            Language Modeling
          </Link>
          <Link href="/coding-agents" className={`nav-item ${isActive('/coding-agents')}`}>
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#8b5cf6'}}><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>
            Coding Agents
          </Link>
          <Link href="/computer-use" className={`nav-item ${isActive('/computer-use')}`}>
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#6366f1'}}><path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v2H8v2h8v-2h-2v-2h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H3V4h18v12z"/></svg>
            Computer Use
          </Link>
          <Link href="/world-models" className={`nav-item ${isActive('/world-models')}`}>
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#0ea5e9'}}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
            World Models
          </Link>
          <Link href="/robotics" className={`nav-item ${isActive('/robotics')}`}>
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#ec4899'}}><path d="M19 8h-2V6c0-1.1-.9-2-2-2h-2V2h-2v2H9C7.9 4 7 4.9 7 6v2H5c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h2v2c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2v-2h2c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2zM9 6h6v2H9V6zm10 10H5v-4h14v4z"/></svg>
            Robotics
          </Link>
        </div>

        <div className="nav-section">
          <div className="nav-title">METHODS</div>
          <Link href="/transformer" className={`nav-item ${isActive('/transformer')}`}>
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#8b5cf6'}}><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 9c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm4 6H8v-1.2c0-1.6 3.2-2.4 4-2.4s4 .8 4 2.4V18z"/></svg>
            Transformer
          </Link>
          <Link href="/chain-of-thought" className={`nav-item ${isActive('/chain-of-thought')}`}>
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#3b82f6'}}><path d="M17 11V8c0-2.21-1.79-4-4-4S9 5.79 9 8v3H8c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-6c0-1.1-.9-2-2-2h-1zm-5 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>
            Chain of Thought
          </Link>
          <Link href="/react" className={`nav-item ${isActive('/react')}`}>
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#f97316'}}><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>
            ReAct
          </Link>
          <Link href="/lora" className={`nav-item ${isActive('/lora')}`}>
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#10b981'}}><path d="M17 3H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7V5h10v14z"/></svg>
            LoRA
          </Link>
          <Link href="/rlhf" className={`nav-item ${isActive('/rlhf')}`}>
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#ef4444'}}><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
            RLHF
          </Link>
          <Link href="/dpo" className={`nav-item ${isActive('/dpo')}`}>
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#ec4899'}}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/></svg>
            DPO
          </Link>
          <Link href="/mcp" className={`nav-item ${isActive('/mcp')}`}>
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#06b6d4'}}><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>
            MCP
          </Link>
        </div>

        <div className="nav-section">
          <div className="nav-title">GENERATION</div>
          <Link href="/text-generation" className={`nav-item ${isActive('/text-generation')}`}>
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#0ea5e9'}}><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
            Text Generation
          </Link>
          <Link href="/image-generation" className={`nav-item ${isActive('/image-generation')}`}>
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#10b981'}}><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>
            Image Generation
          </Link>
          <Link href="/video-generation" className={`nav-item ${isActive('/video-generation')}`}>
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#8b5cf6'}}><path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/></svg>
            Video Generation
          </Link>
          <Link href="/audio-generation" className={`nav-item ${isActive('/audio-generation')}`}>
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{color: '#f59e0b'}}><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
            Audio Generation
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
