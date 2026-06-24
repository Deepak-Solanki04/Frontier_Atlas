import React from 'react';

export default function Footer() {
  return (
    <footer className="footer-dark">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-logo">Frontier Atlas</div>
          <p className="footer-desc">The open platform for discovering and advancing frontier AI research.</p>
        </div>
        
        <div className="footer-links">
          <div className="footer-col">
            <h4>Explore</h4>
            <ul>
              <li>Papers</li>
              <li>Methods</li>
              <li>Tasks</li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Community</h4>
            <ul>
              <li>GitHub</li>
              <li>Discord</li>
              <li>X (Twitter)</li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <ul>
              <li>Blog</li>
              <li>Documentation</li>
              <li>API</li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>About</h4>
            <ul>
              <li>About Us</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
        </div>

        <div className="footer-newsletter">
          <h4>Stay updated</h4>
          <p>Subscribe to our newsletter for the latest AI research updates and insights.</p>
          <div className="email-input">
            <input type="email" placeholder="Enter your email" />
            <button>→</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Frontier Atlas. All rights reserved.</p>
      </div>
    </footer>
  );
}
