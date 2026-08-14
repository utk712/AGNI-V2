import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { Sparkles, ArrowRight } from "./Icons";

function ComboOfferBanner() {
  const { comboOffers } = useProducts();

  // Find owner's active combo offer
  const activeCombo = comboOffers.find((c) => c.active) || comboOffers[0];

  if (!activeCombo) {
    return null; // Don't render banner if owner hasn't created a combo deal
  }

  const savings =
    activeCombo.originalPrice && activeCombo.originalPrice > activeCombo.dealPrice
      ? activeCombo.originalPrice - activeCombo.dealPrice
      : 0;

  return (
    <section className="combo-banner-section container">
      <div className="combo-banner-card">
        <div className="combo-banner-content">
          <span className="eyebrow">
            <Sparkles /> Special Limited Time Deal
          </span>
          <h2>{activeCombo.title}</h2>
          <p>{activeCombo.description}</p>

          <div className="combo-price-row">
            {activeCombo.originalPrice > 0 && (
              <span className="combo-original-price">₹{activeCombo.originalPrice}</span>
            )}
            <span className="combo-deal-price">₹{activeCombo.dealPrice}</span>
            {savings > 0 && <span className="combo-save-badge">Save ₹{savings}</span>}
          </div>

          <Link to="/combo" className="btn btn-primary btn-lg">
            View Special Combos <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ComboOfferBanner;
