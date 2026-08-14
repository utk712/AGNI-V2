import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import ProductCard from "./ProductCard";
import { ArrowRight } from "./Icons";

function BestSellers() {
  const { products } = useProducts();

  // Filter ONLY products marked as bestSeller === true by owner
  const featured = products.filter((p) => p.bestSeller === true);

  if (products.length === 0) return null;
  if (featured.length === 0) return null;

  return (
    <section className="best-sellers container">
      <div className="section-intro">
        <span className="eyebrow">Small Batch Favorites</span>
        <h2 className="section-heading">Our Best Sellers</h2>
      </div>

      <div className="products-grid">
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="best-sellers-cta">
        <Link to="/products" className="btn btn-outline">
          View All Products <ArrowRight />
        </Link>
      </div>
    </section>
  );
}

export default BestSellers;
