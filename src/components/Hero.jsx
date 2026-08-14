import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, WhatsApp } from "./Icons";
import { whatsappLink } from "../data/business";

function Hero() {
  const directConsultation = whatsappLink("Hello Akshaya Glow Naturals! I'd like a custom skin recommendation for my skin type.");

  return (
    <section className="hero-section container">
      <div className="hero-grid">
        <div className="hero-content">
          <span className="eyebrow">
            <Sparkles /> 100% Handcrafted Botanical Skincare
          </span>
          <h1 className="hero-title">
            Pure Plants.<br />Natural Radiance.
          </h1>
          <p className="hero-description">
            Experience freshly distilled Damask Rose Water, antioxidant-rich organic Beetroot Powder, and nourishing lip mists. Small-batch ayurvedic formulas made with zero synthetic chemicals.
          </p>

          <div className="hero-actions">
            <Link to="/products" className="btn btn-primary btn-lg">
              Explore Botanical Range <ArrowRight />
            </Link>
            <a href={directConsultation} target="_blank" rel="noreferrer" className="btn btn-whatsapp btn-lg">
              <WhatsApp /> Consult on WhatsApp
            </a>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-value">100%</span>
              <span className="stat-label">Chemical Free</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">Small Batch</span>
              <span className="stat-label">Kitchen Fresh</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">Direct</span>
              <span className="stat-label">WhatsApp Delivery</span>
            </div>
          </div>
        </div>

        <div className="hero-media-box">
          <img
            src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80"
            alt="Pure Rose Water Distillation"
            className="hero-main-photo"
          />
          <div className="hero-floating-card">
            <span className="gift-badge">🎁 Special Offer</span>
            <h4>Free 25g Rice Powder</h4>
            <p>Automatically added on orders over ₹150!</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
