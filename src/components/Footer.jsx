import { Link } from "react-router-dom";
import { business, whatsappLink } from "../data/business";
import { WhatsApp } from "./Icons";

function Footer() {
  const directMessageUrl = whatsappLink("Hello Akshaya Glow Naturals! I have a question about your natural skincare products.");

  return (
    <footer className="site-footer">
      <div className="footer-container container">
        {/* Col 1: Brand Info */}
        <div className="footer-col footer-brand-col">
          <div className="footer-logo">
            <span className="brand-icon">🌿</span>
            <span className="footer-title">{business.name}</span>
          </div>
          <p className="footer-desc">
            Handcrafted in small kitchen batches with 100% pure Indian roses, organic beetroot, and traditional ayurvedic herbs. Zero chemicals, zero artificial fragrances.
          </p>
          <a href={directMessageUrl} target="_blank" rel="noreferrer" className="btn btn-whatsapp btn-sm">
            <WhatsApp /> Chat on WhatsApp
          </a>
        </div>

        {/* Col 2: Quick Links */}
        <div className="footer-col">
          <h4 className="footer-heading">Explore</h4>
          <ul className="footer-links">
            <li><Link to="/products">All Products</Link></li>
            <li><Link to="/combo">Value Combos</Link></li>
            <li><Link to="/about">Our Pure Story</Link></li>
            <li><Link to="/admin">Owner Portal</Link></li>
          </ul>
        </div>

        {/* Col 3: Customer Care */}
        <div className="footer-col">
          <h4 className="footer-heading">Customer Care</h4>
          <ul className="footer-contact-info">
            <li>📱 WhatsApp: <strong>{business.phone}</strong></li>
            <li>📍 Made with Love in India</li>
            <li>🚚 Free Express Delivery over ₹150</li>
            <li>🎁 Free 25g Rice Powder Gift with orders</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-flex">
          <p>&copy; {new Date().getFullYear()} Akshaya Glow Naturals (AGNI). All rights reserved.</p>
          <Link to="/admin" className="owner-portal-subtle-link">
            🔒 Owner Access Studio
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
