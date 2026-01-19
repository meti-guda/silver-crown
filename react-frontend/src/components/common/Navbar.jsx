import React, { useState } from "react";
import { useActiveLink } from "../../hooks/useActiveLink";
import { FaShoppingBag } from "react-icons/fa";

const Navbar = ({ onCartClick, cartCount = 0 }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { isActive } = useActiveLink();

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

          <div className="nav-main-actions">
            <ul className="nav-links">
              <li>
                <a href="/" className={isActive("/") ? "active" : ""}>
                  Home
                </a>
              </li>
              <li>
                <a href="/menu" className={isActive("/menu") ? "active" : ""}>
                  Menu
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className={isActive("/contact") ? "active" : ""}
                >
                  Contact
                </a>
              </li>
            </ul>

            <button
              type="button"
              className="navbar-cart-btn"
              aria-label="Open shopping cart"
              onClick={onCartClick}
            >
              <FaShoppingBag />
              <span className="cart-badge">{cartCount}</span>
            </button>
          </div>

          <button
            type="button"
            className={`nav-toggle-btn ${isDrawerOpen ? "open" : ""}`}
            aria-label="Toggle navigation menu"
            onClick={handleToggle}
          >
            <span></span>
          </button>

          <div className={`nav-drawer ${isDrawerOpen ? "open" : ""}`}>
            <a
              href="/"
              className={isActive("/") ? "active" : ""}
              onClick={handleDrawerLinkClick}
            >
              Home
            </a>
            <a
              href="/menu"
              className={isActive("/menu") ? "active" : ""}
              onClick={handleDrawerLinkClick}
            >
              Menu
            </a>
            <a
              href="/contact"
              className={isActive("/contact") ? "active" : ""}
              onClick={handleDrawerLinkClick}
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
