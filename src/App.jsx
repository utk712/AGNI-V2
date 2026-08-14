import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import CartDrawer from "./components/CartDrawer";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import About from "./pages/About";
import Admin from "./pages/Admin";

function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <Router>
          <div className="app-shell">
            <Navbar />
            <CartDrawer />
            <main className="main-viewport">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/combo" element={<Products />} />
                <Route path="/about" element={<About />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </main>
          </div>
        </Router>
      </CartProvider>
    </ProductProvider>
  );
}

export default App;
