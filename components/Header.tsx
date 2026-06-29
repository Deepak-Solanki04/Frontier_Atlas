import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="header-top" style={{ display: 'flex', justifyContent: 'space-between', padding: '0 24px', height: '52px', background: '#F8F7F2', borderBottom: '1px solid #E5E5E0' }}>
      {/* Logo */}
      <Link href="/" className="header-logo" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
        <img src="/logo.png" alt="Frontier Atlas" style={{ height: '44px', width: 'auto', objectFit: 'contain' }} />
      </Link>

      {/* Actions */}
      <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <button style={{
          background: '#F55036',
          color: 'white',
          fontSize: '12px',
          fontWeight: '800',
          padding: '6px 16px',
          borderRadius: '6px',
          border: 'none',
          cursor: 'pointer',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          Submit
        </button>
        <div className="user-profile" style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#EBEBE6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src="https://i.pravatar.cc/150?img=47" alt="User" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
        </div>
      </div>
    </header>
  );
}

