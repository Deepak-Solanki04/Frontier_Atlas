import Link from 'next/link';

export default function Header() {
  return (
    <header className="header">
        <div className="container">
            <div className="header-left">
                <Link href="/" className="logo">
                    <div className="logo-icon"></div>
                    The AI Signal
                </Link>
            </div>
            
            <nav className="nav-links">
                <Link href="/" className="active">Feed</Link>
                <Link href="/sota">State of the Art</Link>
                <Link href="/models">Models</Link>
                <Link href="/datasets">Datasets</Link>
            </nav>
            
            <div className="header-right">
                <div className="search-box">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <input type="text" placeholder="Search papers, code..." />
                </div>
                <button className="btn-primary">Sign In</button>
            </div>
        </div>
    </header>
  );
}
