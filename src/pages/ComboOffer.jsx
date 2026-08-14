import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import Footer from "../components/Footer";
import { Sparkles, ArrowRight, ShoppingBag } from "../components/Icons";

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
      image: combo.image || null,
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
          <div
            className="combo-offers-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "28px",
              marginTop: "40px",
            }}
          >
            {/* Render Owner-Created Combo Offers */}
            {comboOffers.map((combo) => {
              const savings =
                combo.originalPrice && combo.originalPrice > combo.dealPrice
                  ? combo.originalPrice - combo.dealPrice
                  : 0;

              const hasImage = Boolean(combo.image && combo.image.trim() !== "");

              return (
                <div
                  key={combo.id}
                  className="combo-deal-card"
                  style={{
                    background: "var(--white)",
                    border: combo.active ? "2px solid var(--rosewood)" : "1px solid var(--line)",
                    borderRadius: "var(--radius-md)",
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    boxShadow: "var(--shadow-soft)",
                    position: "relative",
                  }}
                >
                  {combo.active && (
                    <span
                      className="product-badge badge-bestseller"
                      style={{ position: "absolute", top: "16px", right: "16px", left: "auto" }}
                    >
                      ★ FEATURED DEAL
                    </span>
                  )}

                  {/* Render Photo ONLY IF Owner Uploaded/Provided Photo */}
                  {hasImage && (
                    <div
                      className="combo-card-img-box"
                      style={{
                        width: "100%",
                        height: "220px",
                        borderRadius: "var(--radius-sm)",
                        overflow: "hidden",
                        marginBottom: "18px",
                        background: "var(--ivory-soft)",
                      }}
                    >
                      <img
                        src={combo.image}
                        alt={combo.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>
                  )}

                  <div className="combo-card-content" style={{ flex: 1 }}>
                    <span className="product-card-category" style={{ display: "block", marginBottom: "6px" }}>
                      VALUE BUNDLE
                    </span>
                    <h3
                      className="product-card-title"
                      style={{ fontSize: "22px", margin: "6px 0 10px", lineHeight: "1.3" }}
                    >
                      {combo.title}
                    </h3>
                    <p
                      className="product-card-tagline"
                      style={{ fontSize: "14.5px", color: "var(--ink-soft)", lineHeight: "1.6", marginBottom: "20px" }}
                    >
                      {combo.description}
                    </p>
                  </div>

                  <div
                    className="combo-card-footer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingTop: "16px",
                      borderTop: "1px dashed var(--line)",
                      marginTop: "auto",
                    }}
                  >
                    <div className="product-card-price-box">
                      <span className="product-card-price" style={{ fontSize: "24px" }}>
                        ₹{combo.dealPrice}
                      </span>
                      {combo.originalPrice > 0 && (
                        <strike style={{ color: "var(--ink-soft)", fontSize: "14px", marginLeft: "8px" }}>
                          ₹{combo.originalPrice}
                        </strike>
                      )}
                      {savings > 0 && (
                        <span
                          style={{
                            display: "block",
                            fontSize: "12px",
                            color: "var(--moss)",
                            fontWeight: "800",
                            marginTop: "2px",
                          }}
                        >
                          Save ₹{savings}
                        </span>
                      )}
                    </div>

                    <button
                      className="btn btn-primary"
                      onClick={() => handleAddComboToCart(combo)}
                    >
                      <ShoppingBag /> Add Combo to Bag
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Render Catalog Products Categorized under Value Combo */}
            {catalogCombos.map((prod) => {
              const hasImage = Boolean(prod.image && prod.image.trim() !== "");

              return (
                <div
                  key={prod.id}
                  className="combo-deal-card"
                  style={{
                    background: "var(--white)",
                    border: "1px solid var(--line)",
                    borderRadius: "var(--radius-md)",
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    boxShadow: "var(--shadow-soft)",
                  }}
                >
                  {hasImage && (
                    <div
                      className="combo-card-img-box"
                      style={{
                        width: "100%",
                        height: "220px",
                        borderRadius: "var(--radius-sm)",
                        overflow: "hidden",
                        marginBottom: "18px",
                        background: "var(--ivory-soft)",
                      }}
                    >
                      <img
                        src={prod.image}
                        alt={prod.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>
                  )}

                  <div className="combo-card-content" style={{ flex: 1 }}>
                    <span className="product-card-category" style={{ display: "block", marginBottom: "6px" }}>
                      VALUE COMBO
                    </span>
                    <h3 className="product-card-title" style={{ fontSize: "22px", margin: "6px 0 10px" }}>
                      {prod.name}
                    </h3>
                    <p className="product-card-tagline" style={{ fontSize: "14.5px", color: "var(--ink-soft)", marginBottom: "20px" }}>
                      {prod.tagline || prod.description}
                    </p>
                  </div>

                  <div
                    className="combo-card-footer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingTop: "16px",
                      borderTop: "1px dashed var(--line)",
                      marginTop: "auto",
                    }}
                  >
                    <div className="product-card-price-box">
                      <span className="product-card-price" style={{ fontSize: "24px" }}>
                        {prod.price}
                      </span>
                      <span className="product-card-size" style={{ marginLeft: "6px" }}>
                        ({prod.size})
                      </span>
                    </div>

                    <button
                      className="btn btn-primary"
                      onClick={() => handleAddComboToCart(prod)}
                    >
                      <ShoppingBag /> Add Combo to Bag
                    </button>
                  </div>
                </div>
              );
            })}
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
