import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingBag, Menu, X, Sparkles } from "./Icons";

function Navbar() {
  const { cart, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Top Banner */}
      <div className="announcement-bar">
        <span>🌿 100% Pure Chemical-Free Skincare • Free 25g Rice Powder on Orders Over ₹150!</span>
      </div>

      <header className="site-header">
        <div className="header-container container">
          {/* Mobile Hamburger Toggle */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>

          {/* Brand Logo */}
          <Link to="/" className="brand-logo">
            <span className="brand-icon">🌿</span>
            <div className="brand-text">
              <span className="brand-title">Akshaya Glow</span>
              <span className="brand-subtitle">NATURALS</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="desktop-nav">
            <NavLink to="/" end className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
              Home
            </NavLink>
            <NavLink to="/products" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
              All Products
            </NavLink>
            <NavLink to="/combo" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
              Special Combos
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
              Our Philosophy
            </NavLink>
          </nav>

          {/* Cart Bag Icon CTA Button */}
          <div className="header-actions">
            <button className="cart-trigger-btn" onClick={openCart} aria-label="Open Shopping Bag">
              <ShoppingBag />
              <span className="cart-btn-text">Bag</span>
              {totalItemCount > 0 && <span className="cart-badge">{totalItemCount}</span>}
            </button>
          </div>
        </div>

        {/* Mobile Flyout Menu */}
        {mobileMenuOpen && (
          <div className="mobile-dropdown-menu">
            <NavLink to="/" end onClick={() => setMobileMenuOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/products" onClick={() => setMobileMenuOpen(false)}>
              All Botanical Products
            </NavLink>
            <NavLink to="/combo" onClick={() => setMobileMenuOpen(false)}>
              Special Value Combos
            </NavLink>
            <NavLink to="/about" onClick={() => setMobileMenuOpen(false)}>
              Our Pure Ingredients
            </NavLink>
            <NavLink to="/admin" onClick={() => setMobileMenuOpen(false)} className="owner-menu-link">
              🔐 Owner Admin Portal
            </NavLink>
          </div>
        )}
      </header>
    </>
  );
}

export default Navbar;
