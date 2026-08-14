import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import { Sparkles, ArrowRight } from "./Icons";

function ComboOfferBanner() {
  const { comboOffers } = useProducts();
  const { addToCart, openCart } = useCart();

  // Find owner's active combo offer
  const activeCombo = comboOffers.find((c) => c.active) || comboOffers[0];

  if (!activeCombo) {
    return null; // Don't render banner if owner hasn't created a combo deal yet
  }

  const savings = activeCombo.originalPrice && activeCombo.originalPrice > activeCombo.dealPrice
    ? activeCombo.originalPrice - activeCombo.dealPrice
    : 0;

  const handleAddComboToCart = () => {
    const comboProductItem = {
      id: activeCombo.id || Date.now(),
      name: activeCombo.title,
      numericPrice: activeCombo.dealPrice,
      price: `₹${activeCombo.dealPrice}`,
      size: "Combo Pack",
      image: activeCombo.image || "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80",
    };
    addToCart(comboProductItem, 1);
    openCart();
  };

  return (
    <section className="combo-banner-section container">
      <div className="combo-banner-card">
        <div className="combo-banner-content">
          <span className="eyebrow"><Sparkles /> Limited Small Batch Deal</span>
          <h2>{activeCombo.title}</h2>
          <p>{activeCombo.description}</p>

          <div className="combo-price-row">
            {activeCombo.originalPrice > 0 && (
              <span className="combo-original-price">₹{activeCombo.originalPrice}</span>
            )}
            <span className="combo-deal-price">₹{activeCombo.dealPrice}</span>
            {savings > 0 && (
              <span className="combo-save-badge">Save ₹{savings} {activeCombo.includesFreeGift ? "+ FREE GIFT" : ""}</span>
            )}
          </div>

          <button onClick={handleAddComboToCart} className="btn btn-primary btn-lg">
            Shop {activeCombo.title} <ArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
}

export default ComboOfferBanner;
