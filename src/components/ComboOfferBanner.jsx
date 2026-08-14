import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "./Icons";

function ComboOfferBanner() {
  return (
    <section className="combo-banner-section container">
      <div className="combo-banner-card">
        <div className="combo-banner-content">
          <span className="eyebrow"><Sparkles /> Limited Small Batch Deal</span>
          <h2>Glow Radiance Combo Pack</h2>
          <p>
            Get Rose Water Spray (100ml) + Beetroot Glow Powder (50g) + Beetroot Tinted Lip Balm (20g) + <strong>FREE Rice Powder (25g)</strong>!
          </p>
          <div className="combo-price-row">
            <span className="combo-original-price">₹190</span>
            <span className="combo-deal-price">₹150</span>
            <span className="combo-save-badge">Save ₹40 + FREE GIFT</span>
          </div>
          <Link to="/products" className="btn btn-primary btn-lg">
            Shop Glow Combo Now <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ComboOfferBanner;
