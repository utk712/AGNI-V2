import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import Footer from "../components/Footer";
import { Sparkles, ArrowRight, ShoppingBag, Check } from "../components/Icons";

function ComboOffer() {
  const { comboOffers, products } = useProducts();
  const { addToCart, openCart } = useCart();

  // Value combo category products added in catalog
  const catalogCombos = products.filter(
    (p) => p.categoryLabel === "Value Combo" || p.category === "combo"
  );

  const handleAddComboToCart = (combo) => {
    const comboItem = {
      id: combo.id || Date.now(),
      name: combo.title || combo.name,
      numericPrice: combo.dealPrice || combo.numericPrice,
      price: `₹${combo.dealPrice || combo.numericPrice}`,
      size: combo.size || "Combo Pack",
      image: combo.image || "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80",
    };
    addToCart(comboItem, 1);
    openCart();
  };

  const hasCombos = comboOffers.length > 0 || catalogCombos.length > 0;

  return (
    <>
      <div className="combo-page container" style={{ padding: "60px 20px" }}>
        <div className="products-intro text-center">
          <span className="eyebrow">
            <Sparkles /> Special High Value Bundles
          </span>
          <h1 className="products-title">Exclusive Combo Deals</h1>
          <p className="products-subtitle">
            Get complete botanical skincare routines bundled together at special discounted prices!
          </p>
        </div>

        {!hasCombos ? (
          <div className="no-results-box text-center" style={{ padding: "60px 20px" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎁</div>
            <h2>No Active Combo Deals Currently</h2>
            <p style={{ maxWidth: "500px", margin: "10px auto 20px" }}>
              The store owner has not created any combo deals yet. Check back soon or browse our individual natural products!
            </p>
            <Link to="/products" className="btn btn-primary">
              Browse All Botanical Products <ArrowRight />
            </Link>
          </div>
        ) : (
          <div className="combo-offers-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "28px", marginTop: "40px" }}>
            {/* Render Owner-Created Combo Offers */}
            {comboOffers.map((combo) => {
              const savings =
                combo.originalPrice && combo.originalPrice > combo.dealPrice
                  ? combo.originalPrice - combo.dealPrice
                  : 0;

              return (
                <div
                  key={combo.id}
                  className="product-card"
                  style={{
                    border: combo.active ? "2px solid var(--rosewood)" : "1px solid var(--line)",
                    position: "relative",
                  }}
                >
                  {combo.active && (
                    <span className="product-badge badge-bestseller" style={{ top: "12px", left: "12px" }}>
                      ★ FEATURED DEAL
                    </span>
                  )}

                  <div className="product-card-img-box" style={{ height: "240px" }}>
                    <img
                      src={
                        combo.image ||
                        "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80"
                      }
                      alt={combo.title}
                      className="product-card-photo"
                    />
                  </div>

                  <div className="product-card-body">
                    <span className="product-card-category">VALUE BUNDLE</span>
                    <h3 className="product-card-title">{combo.title}</h3>
                    <p className="product-card-tagline">{combo.description}</p>

                    {combo.includesFreeGift && (
                      <div
                        style={{
                          background: "var(--moss-light)",
                          color: "var(--moss)",
                          fontSize: "12px",
                          fontWeight: "700",
                          padding: "6px 12px",
                          borderRadius: "6px",
                          marginBottom: "16px",
                        }}
                      >
                        🎁 Includes FREE 25g Rice Powder Gift!
                      </div>
                    )}

                    <div className="product-card-footer">
                      <div className="product-card-price-box">
                        <span className="product-card-price">₹{combo.dealPrice}</span>
                        {combo.originalPrice > 0 && (
                          <strike style={{ color: "var(--ink-soft)", fontSize: "14px", marginLeft: "6px" }}>
                            ₹{combo.originalPrice}
                          </strike>
                        )}
                        {savings > 0 && (
                          <span style={{ display: "block", fontSize: "11px", color: "var(--moss)", fontWeight: "800" }}>
                            Save ₹{savings}
                          </span>
                        )}
                      </div>

                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleAddComboToCart(combo)}
                      >
                        <ShoppingBag /> Add Combo to Bag
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Render Catalog Products categorized under Value Combo */}
            {catalogCombos.map((prod) => (
              <div key={prod.id} className="product-card">
                <div className="product-card-img-box" style={{ height: "240px" }}>
                  <img
                    src={prod.image || "https://via.placeholder.com/300"}
                    alt={prod.name}
                    className="product-card-photo"
                  />
                </div>

                <div className="product-card-body">
                  <span className="product-card-category">VALUE COMBO</span>
                  <h3 className="product-card-title">{prod.name}</h3>
                  <p className="product-card-tagline">{prod.tagline}</p>

                  <div className="product-card-footer">
                    <div className="product-card-price-box">
                      <span className="product-card-price">{prod.price}</span>
                      <span className="product-card-size">({prod.size})</span>
                    </div>

                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleAddComboToCart(prod)}
                    >
                      <ShoppingBag /> Add Combo to Bag
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="best-sellers-cta" style={{ marginTop: "50px", textAlign: "center" }}>
          <Link to="/products" className="btn btn-outline">
            Browse All Individual Products <ArrowRight />
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ComboOffer;
