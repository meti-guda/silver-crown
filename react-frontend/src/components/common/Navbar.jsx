import React, { useState } from 'react';

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleToggle = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  const handleDrawerLinkClick = () => {
    setIsDrawerOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <div className="logo">
            <span className="logo-icon">
              <img src="/images/logo.png" alt="Silver Crown Logo" />
            </span>
            <span className="logo-text">Silver Crown</span>
          </div>

          <ul className="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/menu">Menu</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>

          <button
            type="button"
            className={`nav-toggle-btn ${isDrawerOpen ? 'open' : ''}`}
            aria-label="Toggle navigation menu"
            onClick={handleToggle}
          >
            <span></span>
          </button>

          <div className={`nav-drawer ${isDrawerOpen ? 'open' : ''}`}>
            <a href="/" onClick={handleDrawerLinkClick}>Home</a>
            <a href="/menu" onClick={handleDrawerLinkClick}>Menu</a>
            <a href="/contact" onClick={handleDrawerLinkClick}>Contact</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
