import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { Search, Sparkles } from "../components/Icons";

const categoryFilters = [
  { id: "all", label: "All Items" },
  { id: "Face Care", label: "Face Care" },
  { id: "Herbal Powders", label: "Herbal Powders" },
  { id: "Lip Care", label: "Lip Care" },
  { id: "Value Combo", label: "Combos" },
];

function Products() {
  const { products } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory =
          activeCategory === "all" || p.categoryLabel === activeCategory;
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !query ||
          p.name.toLowerCase().includes(query) ||
          p.tagline.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          (p.ingredients &&
            p.ingredients.some((i) => i.toLowerCase().includes(query)));

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.numericPrice - b.numericPrice;
        if (sortBy === "price-high") return b.numericPrice - a.numericPrice;
        return a.id - b.id;
      });
  }, [products, searchQuery, activeCategory, sortBy]);

  return (
    <>
      <div className="products-page container">
        <div className="products-intro text-center">
          <span className="eyebrow">
            <Sparkles /> Handcrafted Botanical Range
          </span>
          <h1 className="products-title">Our Store Products</h1>
          <p className="products-subtitle">
            Every product is handcrafted in small kitchen batches with 100% natural ingredients — order directly on WhatsApp.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="no-results-box text-center" style={{ padding: "60px 20px" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🌿</div>
            <h2>No Products Available Yet</h2>
            <p style={{ maxWidth: "500px", margin: "10px auto 20px" }}>
              The store owner has not added any products yet. Products added from the Owner Admin Section will appear here automatically!
            </p>
            <Link to="/admin" className="btn btn-primary">
              🔐 Go to Owner Admin Portal
            </Link>
          </div>
        ) : (
          <>
            {/* Filter Controls Bar */}
            <div className="catalog-controls-container">
              <div className="search-box">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder="Search products, ingredients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button className="clear-search-btn" onClick={() => setSearchQuery("")}>
                    ✕
                  </button>
                )}
              </div>

              <div className="controls-row">
                <div className="category-pills">
                  {categoryFilters.map((cat) => (
                    <button
                      key={cat.id}
                      className={`pill-btn ${activeCategory === cat.id ? "active" : ""}`}
                      onClick={() => setActiveCategory(cat.id)}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                <div className="sort-box">
                  <label htmlFor="sort-select">Sort by:</label>
                  <select
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="popular">All Products</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Results Counter */}
            <div className="results-info-bar container">
              <span>
                Showing <strong>{filteredProducts.length}</strong> {filteredProducts.length === 1 ? "item" : "items"}
              </span>
            </div>

            {/* Products Grid */}
            <div className="products-grid">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className="no-results-box">
                  <h3>No matching items found</h3>
                  <p>Try searching for a different keyword or resetting your category filter.</p>
                  <button
                    className="btn btn-outline"
                    onClick={() => {
                      setSearchQuery("");
                      setActiveCategory("all");
                    }}
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Products;
