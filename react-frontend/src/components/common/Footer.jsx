// src/components/common/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer id="footer" className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="logo">
              <span className="logo-icon">
                <img src="/images/logo.png" alt="Silver Crown logo" />
              </span>
              <span className="logo-text">Silver Crown</span>
            </div>
            <p>Coffee. House-made pastries. Warm hospitality.</p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/menu">Menu</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <img src="/images/instagram-logo.png" alt="Instagram" />
                Instagram
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <img src="/images/facebook-logo.png" alt="Facebook" />
                Facebook
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>@ 2025 Silver Crown Cafe. Handcrafted with ❤️ | Built for community.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
