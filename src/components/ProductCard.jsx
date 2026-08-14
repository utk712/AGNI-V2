import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingBag, Check } from "./Icons";

function ProductCard({ product }) {
  const { addToCart, openCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 2000);
  };

  const isFreeGift = product.numericPrice === 0;

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-card-media-link">
        <div className="product-card-img-box">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="product-card-photo"
              loading="lazy"
            />
          ) : (
            <div className="placeholder-stamp">🌿</div>
          )}
          {product.bestSeller && (
            <span className="product-badge badge-bestseller">BESTSELLER</span>
          )}
          {isFreeGift && (
            <span className="product-badge badge-free">FREE GIFT</span>
          )}
        </div>
      </Link>

      <div className="product-card-body">
        <span className="product-card-category">{product.categoryLabel || "Pure Skincare"}</span>
        <h3 className="product-card-title">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <p className="product-card-tagline">{product.tagline}</p>

        <div className="product-card-footer">
          <div className="product-card-price-box">
            <span className="product-card-price">{product.price}</span>
            <span className="product-card-size">({product.size})</span>
          </div>

          {!isFreeGift ? (
            <button
              className={`btn btn-sm ${added ? "btn-success" : "btn-primary"}`}
              onClick={handleAdd}
              aria-label={`Add ${product.name} to bag`}
            >
              {added ? (
                <>
                  <Check /> Added
                </>
              ) : (
                <>
                  <ShoppingBag /> Add
                </>
              )}
            </button>
          ) : (
            <span className="free-tag">Free on ₹150+ Order</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
