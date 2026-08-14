import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";
import { whatsappLink } from "../data/business";
import { WhatsApp, Trash, X, ArrowRight, ShoppingBag } from "./Icons";

function CartDrawer() {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    clearCart,
  } = useCart();

  const { createCustomerOrder } = useProducts();

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [note, setNote] = useState("");

  if (!isCartOpen) return null;

  const handleWhatsAppCheckout = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const orderItems = cart.map((item) => ({
      name: item.product.name,
      size: item.product.size || "Standard",
      quantity: item.quantity,
      price: item.product.numericPrice,
    }));

    const finalTotal = subtotal;

    // Record order in Owner Accounting System
    createCustomerOrder({
      customerName: customerName || "Customer",
      phone: customerPhone || "Not specified",
      address: deliveryAddress || "Share in chat",
      items: orderItems,
      subtotal: subtotal,
      totalAmount: finalTotal,
    });

    let itemsListText = cart
      .map(
        (item, index) =>
          `${index + 1}. *${item.product.name}* (${item.product.size || "Standard"}) - Qty: ${item.quantity} x ₹${item.product.numericPrice} = ₹${item.product.numericPrice * item.quantity}`
      )
      .join("\n");

    const message = `🌿 *NEW ORDER FROM AKSHAYA GLOW NATURALS*

*Customer Details:*
👤 *Name:* ${customerName || "Customer"}
📱 *Phone:* ${customerPhone || "Not specified"}
📍 *Delivery Address:* ${deliveryAddress || "Will share in chat"}
${note ? `📝 *Note:* ${note}\n` : ""}
---
*Order Items:*
${itemsListText}

---
💰 *TOTAL AMOUNT:* ₹${finalTotal}

Please confirm availability and share payment details (UPI/PhonePe). Thank you!`;

    const url = whatsappLink(message);
    window.open(url, "_blank");

    clearCart();
    closeCart();
  };

  return (
    <AnimatePresence>
      <div className="cart-backdrop" onClick={closeCart}>
        <motion.div
          className="cart-drawer"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 220 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="cart-header">
            <div className="cart-header-title">
              <ShoppingBag />
              <h2>Your Shopping Bag</h2>
              <span className="cart-count-badge">{cart.reduce((a, b) => a + b.quantity, 0)}</span>
            </div>
            <button className="cart-close-btn" onClick={closeCart} aria-label="Close cart">
              <X />
            </button>
          </div>

          {/* Cart Body */}
          <div className="cart-body">
            {cart.length === 0 ? (
              <div className="empty-cart-state">
                <div className="empty-cart-icon">🌿</div>
                <h3>Your bag is currently empty</h3>
                <p>Explore our handcrafted botanical products to get glowing!</p>
                <button className="btn btn-primary" onClick={closeCart}>
                  Browse Store Items <ArrowRight />
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items-list">
                  {cart.map((item) => (
                    <div key={item.product.id} className="cart-item-card">
                      <img
                        src={item.product.image || "https://via.placeholder.com/60"}
                        alt={item.product.name}
                        className="cart-item-img"
                      />
                      <div className="cart-item-details">
                        <div className="cart-item-head">
                          <h4 className="cart-item-name">{item.product.name}</h4>
                          <button
                            className="cart-item-remove"
                            onClick={() => removeFromCart(item.product.id)}
                            title="Remove item"
                          >
                            <Trash />
                          </button>
                        </div>
                        <span className="cart-item-size">{item.product.size || "Standard"}</span>
                        <div className="cart-item-bottom">
                          <span className="cart-item-price">
                            ₹{item.product.numericPrice * item.quantity}
                          </span>
                          <div className="qty-controls">
                            <button
                              onClick={() => updateQuantity(item.product.id, -1)}
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, 1)}
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Customer Checkout Form */}
                <div className="checkout-form-section">
                  <h3>Contact &amp; Delivery Details</h3>
                  <div className="form-group">
                    <label htmlFor="cust-name">Your Full Name *</label>
                    <input
                      id="cust-name"
                      type="text"
                      placeholder="e.g. Ananya Sharma"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cust-phone">WhatsApp Phone Number *</label>
                    <input
                      id="cust-phone"
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cust-address">Delivery Address</label>
                    <textarea
                      id="cust-address"
                      rows="2"
                      placeholder="House No, Street, City, Pincode"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer / Checkout */}
          {cart.length > 0 && (
            <div className="cart-footer">
              <div className="summary-row total-row">
                <span>Subtotal</span>
                <strong>₹{subtotal}</strong>
              </div>

              <button
                className="btn btn-whatsapp btn-block"
                onClick={handleWhatsAppCheckout}
              >
                <WhatsApp /> Send Order on WhatsApp
              </button>
              <p className="cart-secure-note">
                🔒 Orders sent directly to Akshaya Glow Naturals via WhatsApp!
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default CartDrawer;
