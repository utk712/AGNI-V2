import { useState, useEffect } from "react";
import { useProducts } from "../context/ProductContext";
import Footer from "../components/Footer";
import { Trash, Check, Sparkles, ArrowRight, ShoppingBag, Refresh } from "../components/Icons";

function Admin() {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    clearAllProducts,
    comboOffers,
    addComboOffer,
    toggleComboActive,
    deleteComboOffer,
    customerOrders,
    updateOrderStatus,
    deleteCustomerOrder,
    expenses,
    addExpense,
    deleteExpense,
    ownerProfile,
    updateOwnerProfile,
    isCloudLoaded,
    purgeStaleMobileCache,
  } = useProducts();

  // Authentication State - ALWAYS initialized to blank string & false!
  const [inputPin, setInputPin] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinError, setPinError] = useState("");

  const [activeSection, setActiveSection] = useState("products");
  const [successMsg, setSuccessMsg] = useState("");

  // First Time Owner Registration Form State
  const [regName, setRegName] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");

  // Owner Setup Form State (Inside Portal)
  const [ownerName, setOwnerName] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerPassword, setOwnerPassword] = useState("");

  useEffect(() => {
    if (ownerProfile) {
      setOwnerName(ownerProfile.name || "");
      setOwnerPhone(ownerProfile.phone || "");
      setOwnerEmail(ownerProfile.email || "");
      setOwnerPassword(ownerProfile.password || "");
    }
  }, [ownerProfile]);

  // Product Form State
  const [name, setName] = useState("");
  const [numericPrice, setNumericPrice] = useState("");
  const [size, setSize] = useState("");
  const [categoryLabel, setCategoryLabel] = useState("Face Care");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [howToUse, setHowToUse] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [bestSeller, setBestSeller] = useState(false);

  // Combo Form State
  const [comboTitle, setComboTitle] = useState("");
  const [comboOriginalPrice, setComboOriginalPrice] = useState("");
  const [comboDealPrice, setComboDealPrice] = useState("");
  const [comboDesc, setComboDesc] = useState("");
  const [comboImage, setComboImage] = useState("");
  const [comboImgPreview, setComboImgPreview] = useState(null);

  // Expense Form State
  const [expTitle, setExpTitle] = useState("");
  const [expAmount, setExpAmount] = useState("");
  const [expCategory, setExpCategory] = useState("Raw Materials");
  const [expDate, setExpDate] = useState(new Date().toISOString().split("T")[0]);

  // 1. FIRST TIME OWNER REGISTRATION
  const handleFirstTimeRegistration = (e) => {
    e.preventDefault();
    if (!regName || !regPassword) {
      alert("Please fill in your Name and Create a Password.");
      return;
    }

    const newProfile = updateOwnerProfile({
      name: regName,
      phone: regPhone,
      email: regEmail,
      password: regPassword,
    });

    setIsAuthenticated(true);
    setSuccessMsg(`Welcome ${newProfile.name}! Your Owner Profile & Password have been saved.`);
    setTimeout(() => setSuccessMsg(""), 5000);
  };

  // 2. SECURE SUBSEQUENT LOGIN
  const handleLogin = (e) => {
    e.preventDefault();
    if (!ownerProfile || !ownerProfile.password) {
      setPinError("Owner profile not configured. Please complete setup first.");
      return;
    }
    if (inputPin === ownerProfile.password) {
      setIsAuthenticated(true);
      setPinError("");
      setInputPin(""); // Clear password from memory state after unlock
    } else {
      setPinError("Incorrect password. Please enter the password you created during setup.");
    }
  };

  const handleSaveOwnerProfile = (e) => {
    e.preventDefault();
    if (!ownerPassword) {
      alert("Please enter a custom password.");
      return;
    }
    updateOwnerProfile({
      name: ownerName || "Owner",
      phone: ownerPhone,
      email: ownerEmail,
      password: ownerPassword,
    });
    setSuccessMsg("Owner details & password updated successfully!");
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleComboImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setComboImgPreview(reader.result);
        setComboImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    if (!name || !numericPrice || !size) {
      alert("Please fill in Product Name, Price, and Size.");
      return;
    }

    let category = "herbal";
    if (categoryLabel === "Face Care") category = "rose";
    if (categoryLabel === "Lip Care") category = "lip";
    if (categoryLabel === "Value Combo") category = "combo";

    const newProd = addProduct({
      name,
      numericPrice: Number(numericPrice),
      size,
      category,
      categoryLabel,
      tagline: tagline || "Handcrafted natural skincare",
      description: description || "Freshly made in small kitchen batches with 100% pure botanical ingredients.",
      ingredients,
      howToUse: howToUse || "Apply to clean skin and rinse after 15-20 minutes.",
      image: imagePreview || imageUrl || null,
      bestSeller,
    });

    setSuccessMsg(`Successfully added "${newProd.name}" to live website catalog!`);
    setTimeout(() => setSuccessMsg(""), 4000);

    setName("");
    setNumericPrice("");
    setSize("");
    setTagline("");
    setDescription("");
    setIngredients("");
    setHowToUse("");
    setImageUrl("");
    setImagePreview(null);
    setBestSeller(false);
  };

  const handleCreateComboSubmit = (e) => {
    e.preventDefault();
    if (!comboTitle || !comboDealPrice) {
      alert("Please enter Combo Title and Offer Deal Price.");
      return;
    }

    const createdCombo = addComboOffer({
      title: comboTitle,
      originalPrice: Number(comboOriginalPrice) || 0,
      dealPrice: Number(comboDealPrice),
      description: comboDesc || "Special Botanical Bundle",
      image: comboImgPreview || comboImage || null,
    });

    setSuccessMsg(`Successfully created Special Combo "${createdCombo.title}"!`);
    setTimeout(() => setSuccessMsg(""), 4000);

    setComboTitle("");
    setComboOriginalPrice("");
    setComboDealPrice("");
    setComboDesc("");
    setComboImage("");
    setComboImgPreview(null);
  };

  const handleToggleBestSeller = (product) => {
    const newBestSellerState = !product.bestSeller;
    updateProduct(product.id, { bestSeller: newBestSellerState });
    setSuccessMsg(
      newBestSellerState
        ? `"${product.name}" marked as Best Seller!`
        : `Removed Best Seller tag from "${product.name}".`
    );
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleRecordExpense = (e) => {
    e.preventDefault();
    if (!expTitle || !expAmount) {
      alert("Please enter expense title and amount.");
      return;
    }

    addExpense({
      title: expTitle,
      amount: Number(expAmount),
      category: expCategory,
      date: expDate,
    });

    setSuccessMsg(`Recorded expense of ₹${expAmount} (${expTitle})!`);
    setTimeout(() => setSuccessMsg(""), 4000);

    setExpTitle("");
    setExpAmount("");
  };

  const handlePurgeMobileCache = async () => {
    await purgeStaleMobileCache();
    alert("Cloud state synchronized successfully!");
  };

  // Pure Dynamic Financial Calculations (ZERO Hardcoded Numbers)
  const shippedOrders = Array.isArray(customerOrders)
    ? customerOrders.filter((o) => o.status === "Shipped" || o.status === "Delivered")
    : [];
  const totalRevenue = shippedOrders.reduce((sum, o) => sum + (Number(o.totalAmount) || 0), 0);
  const totalExpenseAmount = Array.isArray(expenses)
    ? expenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0)
    : 0;
  const netProfit = totalRevenue - totalExpenseAmount;
  const pendingOrdersCount = Array.isArray(customerOrders)
    ? customerOrders.filter((o) => o.status === "Pending").length
    : 0;

  const exportMarchEndingCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "AKSHAYA GLOW NATURALS - MARCH-ENDING FINANCIAL LEDGER REPORT\n";
    csvContent += `Generated On: ${new Date().toLocaleDateString()}\n\n`;

    csvContent += "FINANCIAL SUMMARY\n";
    csvContent += `Total Shipped Sales Revenue,₹${totalRevenue}\n`;
    csvContent += `Total Business Expenses,₹${totalExpenseAmount}\n`;
    csvContent += `Net Profit,₹${netProfit}\n`;
    csvContent += `Total Orders Logged,${customerOrders.length}\n\n`;

    csvContent += "CUSTOMER ORDERS LEDGER\n";
    csvContent += "Order ID,Date,Customer Name,Phone,Address,Items Ordered,Total Amount (₹),Status\n";
    customerOrders.forEach((o) => {
      const itemsStr = o.items.map((i) => `${i.name} (${i.size}) x${i.quantity}`).join(" + ");
      csvContent += `${o.id},${o.date},"${o.customerName}","${o.phone}","${o.address.replace(/"/g, '""')}","${itemsStr}",${o.totalAmount},${o.status}\n`;
    });

    csvContent += "\nBUSINESS EXPENSES LOG\n";
    csvContent += "ID,Date,Expense Description,Category,Amount (₹)\n";
    expenses.forEach((e) => {
      csvContent += `${e.id},${e.date},"${e.title}","${e.category}",${e.amount}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `AGNI_March_Ending_Report_${new Date().getFullYear()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // IF OWNER HAS NOT SETUP PROFILE YET -> SHOW REGISTRATION FORM
  if (!ownerProfile || !ownerProfile.password) {
    return (
      <div className="admin-lock-screen">
        <div className="admin-login-card" style={{ maxWidth: "480px" }}>
          <div className="admin-badge">🌿 First Time Owner Registration</div>
          <h2>Setup Your Owner Account</h2>
          <p>As the store owner, enter your details and create a password.</p>

          <form onSubmit={handleFirstTimeRegistration} className="admin-pin-form" autoComplete="off">
            <div className="form-group">
              <label htmlFor="reg-name">Your Full Name *</label>
              <input
                id="reg-name"
                type="text"
                placeholder="e.g. Utkarsh"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                autoComplete="off"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="reg-phone">WhatsApp Business Phone</label>
              <input
                id="reg-phone"
                type="tel"
                placeholder="e.g. 9876543210"
                value={regPhone}
                onChange={(e) => setRegPhone(e.target.value)}
                autoComplete="off"
              />
            </div>

            <div className="form-group">
              <label htmlFor="reg-email">Business Email</label>
              <input
                id="reg-email"
                type="email"
                placeholder="e.g. owner@example.com"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                autoComplete="off"
              />
            </div>

            <div className="form-group">
              <label htmlFor="reg-pass">Create Your Owner Password *</label>
              <input
                id="reg-pass"
                type="password"
                placeholder="Create a strong password"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: "16px" }}>
              Complete Setup &amp; Open Owner Portal <ArrowRight />
            </button>
          </form>
        </div>
      </div>
    );
  }

  // SECURE LOGIN PROMPT (ALWAYS BLANK FOR ANY VISITOR!)
  if (!isAuthenticated) {
    return (
      <div className="admin-lock-screen">
        <div className="admin-login-card">
          <div className="admin-badge">🔐 Owner Access Studio</div>
          <h2>Owner Portal Access</h2>
          <p>Please enter your Owner password to access your dashboard.</p>

          <form onSubmit={handleLogin} className="admin-pin-form" autoComplete="off">
            <input
              type="password"
              placeholder="Enter Password"
              value={inputPin}
              onChange={(e) => setInputPin(e.target.value)}
              autoComplete="new-password"
              autoFocus
              required
            />
            {pinError && <p className="pin-error-text">{pinError}</p>}
            <button type="submit" className="btn btn-primary btn-block">
              Unlock Dashboard <ArrowRight />
            </button>
          </form>
          <div className="cloud-sync-status">
            {isCloudLoaded ? "🟢 Cloud Synced" : "⏳ Syncing with Cloud..."}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="admin-layout">
        {/* Left Sidebar */}
        <aside className="admin-sidebar">
          <div className="sidebar-header">
            <span className="sidebar-brand">🌿 AGNI Owner Studio</span>
            <div className="cloud-sync-chip">
              <span className="dot-green"></span> Hello, {ownerProfile.name}
            </div>
          </div>

          <nav className="sidebar-nav">
            <button
              className={`sidebar-link ${activeSection === "products" ? "active" : ""}`}
              onClick={() => setActiveSection("products")}
            >
              🛍️ Products Catalog ({products.length})
            </button>
            <button
              className={`sidebar-link ${activeSection === "combos" ? "active" : ""}`}
              onClick={() => setActiveSection("combos")}
            >
              🎁 Special Combo Offers ({comboOffers.length})
            </button>
            <button
              className={`sidebar-link ${activeSection === "dashboard" ? "active" : ""}`}
              onClick={() => setActiveSection("dashboard")}
            >
              📊 Stats &amp; Revenue
            </button>
            <button
              className={`sidebar-link ${activeSection === "orders" ? "active" : ""}`}
              onClick={() => setActiveSection("orders")}
            >
              📦 Incoming Orders
              {pendingOrdersCount > 0 && (
                <span className="sidebar-badge">{pendingOrdersCount}</span>
              )}
            </button>
            <button
              className={`sidebar-link ${activeSection === "accounting" ? "active" : ""}`}
              onClick={() => setActiveSection("accounting")}
            >
              💼 March-Ending Ledger
            </button>
            <button
              className={`sidebar-link ${activeSection === "profile" ? "active" : ""}`}
              onClick={() => setActiveSection("profile")}
            >
              👤 Owner Password &amp; Profile
            </button>
          </nav>

          <div className="sidebar-footer">
            <button className="btn btn-outline btn-block btn-sm" onClick={handlePurgeMobileCache} style={{ marginBottom: "8px" }}>
              <Refresh /> Sync Cloud Master
            </button>
            <button className="btn btn-outline btn-block btn-sm" onClick={() => setIsAuthenticated(false)}>
              🔒 Lock Dashboard
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="admin-main-content">
          {successMsg && (
            <div className="admin-success-alert">
              <Check /> {successMsg}
            </div>
          )}

          {/* SECTION 1: CATALOG MANAGEMENT */}
          {activeSection === "products" && (
            <div className="admin-section-block">
              <div className="admin-section-header">
                <div>
                  <span className="eyebrow"><Sparkles /> Store Catalog</span>
                  <h1>Products &amp; Items Manager</h1>
                </div>
              </div>

              {/* Form: Add New Product */}
              <div className="admin-panel-box" style={{ marginBottom: "30px" }}>
                <h2>Add Product to Website</h2>
                <form onSubmit={handleAddProductSubmit} className="admin-add-form">
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label htmlFor="p-name">Product Name *</label>
                      <input
                        id="p-name"
                        type="text"
                        placeholder="e.g. Saffron Face Oil"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="p-category">Category *</label>
                      <select
                        id="p-category"
                        value={categoryLabel}
                        onChange={(e) => setCategoryLabel(e.target.value)}
                      >
                        <option value="Face Care">Face Care</option>
                        <option value="Herbal Powders">Herbal Powders</option>
                        <option value="Lip Care">Lip Care</option>
                        <option value="Value Combo">Value Combo</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label htmlFor="p-price">Price in ₹ *</label>
                      <input
                        id="p-price"
                        type="number"
                        placeholder="e.g. 70"
                        value={numericPrice}
                        onChange={(e) => setNumericPrice(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="p-size">Size / Quantity *</label>
                      <input
                        id="p-size"
                        type="text"
                        placeholder="e.g. 50g, 100ml"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="p-tagline">Short Tagline</label>
                    <input
                      id="p-tagline"
                      type="text"
                      placeholder="e.g. Deep hydration &amp; natural glow mist"
                      value={tagline}
                      onChange={(e) => setTagline(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="p-desc">Product Description</label>
                    <textarea
                      id="p-desc"
                      rows="3"
                      placeholder="Describe ingredients and usage instructions..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label htmlFor="p-ingredients">Ingredients (Comma separated)</label>
                      <input
                        id="p-ingredients"
                        type="text"
                        placeholder="e.g. Fresh Rose, Saffron"
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="p-how">How to Use</label>
                      <input
                        id="p-how"
                        type="text"
                        placeholder="e.g. Apply morning and night"
                        value={howToUse}
                        onChange={(e) => setHowToUse(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Photo Upload */}
                  <div className="form-group image-upload-box">
                    <label>Product Photo (Upload File OR Image URL)</label>
                    <div className="upload-options-row">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileChange}
                        className="file-input-btn"
                      />
                      <span>or</span>
                      <input
                        type="url"
                        placeholder="Paste Image URL"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="url-input"
                      />
                    </div>
                    {(imagePreview || imageUrl) && (
                      <div className="photo-preview-bar">
                        <span>Preview:</span>
                        <img src={imagePreview || imageUrl} alt="Preview" />
                      </div>
                    )}
                  </div>

                  <div className="form-checkbox-row">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={bestSeller}
                        onChange={(e) => setBestSeller(e.target.checked)}
                      />
                      Mark as "Best Seller"
                    </label>
                  </div>

                  <button type="submit" className="btn btn-primary btn-lg">
                    Add Product to Live Store <ArrowRight />
                  </button>
                </form>
              </div>

              {/* Products Manager List */}
              <div className="admin-panel-box">
                <div className="panel-title-row">
                  <h2>Store Catalog ({products.length} items)</h2>
                  {products.length > 0 && (
                    <button
                      className="btn btn-outline btn-sm danger-btn"
                      onClick={() => {
                        if (confirm("Are you sure you want to remove all products from the store?")) {
                          clearAllProducts();
                        }
                      }}
                    >
                      Clear All Products
                    </button>
                  )}
                </div>

                {products.length === 0 ? (
                  <div className="empty-state-box" style={{ textAlign: "center", padding: "40px 20px" }}>
                    <h3>No products in your store yet</h3>
                    <p>Use the form above to add your first product!</p>
                  </div>
                ) : (
                  <>
                    <div className="mobile-product-cards-list">
                      {products.map((prod) => (
                        <div key={prod.id} className="mobile-prod-item-card">
                          <div className="mobile-prod-top">
                            <img
                              src={prod.image || "https://via.placeholder.com/60"}
                              alt={prod.name}
                              className="mobile-prod-img"
                            />
                            <div className="mobile-prod-details">
                              <h4>{prod.name}</h4>
                              <span className="sub-text">{prod.categoryLabel} • {prod.size}</span>
                            </div>
                            <button
                              className="admin-delete-btn"
                              onClick={() => {
                                if (confirm(`Delete "${prod.name}"?`)) {
                                  deleteProduct(prod.id);
                                }
                              }}
                              title="Delete item"
                            >
                              <Trash />
                            </button>
                          </div>

                          <div className="mobile-prod-bottom">
                            <div className="mobile-price-input">
                              <label>Price ₹:</label>
                              <input
                                type="number"
                                value={prod.numericPrice}
                                onChange={(e) =>
                                  updateProduct(prod.id, { numericPrice: Number(e.target.value) })
                                }
                              />
                            </div>

                            <button
                              className={`btn-bestseller-toggle ${prod.bestSeller ? "active" : ""}`}
                              onClick={() => handleToggleBestSeller(prod)}
                            >
                              {prod.bestSeller ? "★ Best Seller (Active)" : "Set Bestseller"}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="table-responsive desktop-catalog-table">
                      <table className="admin-ledger-table">
                        <thead>
                          <tr>
                            <th>Photo</th>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Size</th>
                            <th>Price (₹)</th>
                            <th>Bestseller Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.map((prod) => (
                            <tr key={prod.id}>
                              <td>
                                <img
                                  src={prod.image || "https://via.placeholder.com/60"}
                                  alt={prod.name}
                                  className="admin-prod-thumb"
                                />
                              </td>
                              <td><strong>{prod.name}</strong></td>
                              <td>{prod.categoryLabel}</td>
                              <td>{prod.size}</td>
                              <td>
                                <div className="admin-prod-price">
                                  <span>₹</span>
                                  <input
                                    type="number"
                                    value={prod.numericPrice}
                                    onChange={(e) =>
                                      updateProduct(prod.id, { numericPrice: Number(e.target.value) })
                                    }
                                  />
                                </div>
                              </td>
                              <td>
                                <button
                                  className={`btn-bestseller-toggle ${prod.bestSeller ? "active" : ""}`}
                                  onClick={() => handleToggleBestSeller(prod)}
                                >
                                  {prod.bestSeller ? "★ Best Seller (Active)" : "Set Bestseller"}
                                </button>
                              </td>
                              <td>
                                <button
                                  className="admin-delete-btn"
                                  onClick={() => {
                                    if (confirm(`Delete "${prod.name}"?`)) {
                                      deleteProduct(prod.id);
                                    }
                                  }}
                                  title="Delete item"
                                >
                                  <Trash />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* SECTION 2: SPECIAL COMBO OFFERS BUILDER */}
          {activeSection === "combos" && (
            <div className="admin-section-block">
              <div className="admin-section-header">
                <div>
                  <span className="eyebrow"><Sparkles /> High Value Deals</span>
                  <h1>Special Combo Offers Builder</h1>
                </div>
              </div>

              {/* Create Combo Form */}
              <div className="admin-panel-box" style={{ marginBottom: "30px" }}>
                <h2>Create Special Combo Deal</h2>
                <p>Combos created here will automatically display on the Combo Offers Page (`/combo`) and Homepage Banner!</p>

                <form onSubmit={handleCreateComboSubmit} className="admin-add-form" style={{ marginTop: "16px" }}>
                  <div className="form-group">
                    <label htmlFor="c-title">Combo Offer Name *</label>
                    <input
                      id="c-title"
                      type="text"
                      placeholder="e.g. Glow Radiance Combo Pack"
                      value={comboTitle}
                      onChange={(e) => setComboTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label htmlFor="c-orig-price">Original Price ₹ (MRP)</label>
                      <input
                        id="c-orig-price"
                        type="number"
                        placeholder="e.g. 190"
                        value={comboOriginalPrice}
                        onChange={(e) => setComboOriginalPrice(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="c-deal-price">Special Offer Deal Price ₹ *</label>
                      <input
                        id="c-deal-price"
                        type="number"
                        placeholder="e.g. 150"
                        value={comboDealPrice}
                        onChange={(e) => setComboDealPrice(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="c-desc">Combo Products Included &amp; Description *</label>
                    <textarea
                      id="c-desc"
                      rows="3"
                      placeholder="e.g. Rose Water (100ml) + Beetroot Glow Powder (50g) + Beetroot Lip Balm (20g)"
                      value={comboDesc}
                      onChange={(e) => setComboDesc(e.target.value)}
                      required
                    ></textarea>
                  </div>

                  {/* Combo Photo Upload (Optional) */}
                  <div className="form-group image-upload-box">
                    <label>Combo Offer Photo (Optional - Upload Image File OR Paste Image URL)</label>
                    <div className="upload-options-row">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleComboImgChange}
                        className="file-input-btn"
                      />
                      <span>or</span>
                      <input
                        type="url"
                        placeholder="Paste Image URL (https://...)"
                        value={comboImage}
                        onChange={(e) => setComboImage(e.target.value)}
                        className="url-input"
                      />
                    </div>
                    {(comboImgPreview || comboImage) && (
                      <div className="photo-preview-bar">
                        <span>Preview:</span>
                        <img src={comboImgPreview || comboImage} alt="Combo Preview" />
                      </div>
                    )}
                  </div>

                  <button type="submit" className="btn btn-primary btn-lg">
                    Create Combo &amp; Set Live <ArrowRight />
                  </button>
                </form>
              </div>

              {/* Combo Offers List */}
              <div className="admin-panel-box">
                <h2>Created Combo Deals ({comboOffers.length})</h2>

                {comboOffers.length === 0 ? (
                  <div className="empty-state-box" style={{ textAlign: "center", padding: "40px 20px" }}>
                    <h3>No Special Combos Created Yet</h3>
                    <p>Use the form above to create your first Special Combo Offer!</p>
                  </div>
                ) : (
                  <div className="mobile-product-cards-list" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {comboOffers.map((c) => (
                      <div key={c.id} className="mobile-prod-item-card" style={{ borderLeft: c.active ? "4px solid var(--rosewood)" : "1px solid var(--line)" }}>
                        <div className="mobile-prod-top">
                          {c.image && (
                            <img src={c.image} alt={c.title} className="mobile-prod-img" />
                          )}
                          <div className="mobile-prod-details">
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              <h4>{c.title}</h4>
                              {c.active && <span className="status-badge status-delivered">ACTIVE HOMEPAGE BANNER</span>}
                            </div>
                            <p style={{ fontSize: "13px", color: "var(--ink-soft)", margin: "4px 0" }}>{c.description}</p>
                            <span style={{ fontSize: "14px", fontWeight: "700", color: "var(--rosewood)" }}>
                              Deal Price: ₹{c.dealPrice} {c.originalPrice ? <strike style={{ color: "var(--ink-soft)", fontSize: "12px", marginLeft: "6px" }}>₹{c.originalPrice}</strike> : ""}
                            </span>
                          </div>
                          <button
                            className="admin-delete-btn"
                            onClick={() => {
                              if (confirm(`Delete combo offer "${c.title}"?`)) {
                                deleteComboOffer(c.id);
                              }
                            }}
                            title="Delete Combo"
                          >
                            <Trash />
                          </button>
                        </div>

                        <div className="mobile-prod-bottom">
                          <button
                            className={`btn-bestseller-toggle ${c.active ? "active" : ""}`}
                            onClick={() => toggleComboActive(c.id)}
                          >
                            {c.active ? "★ Active Homepage Banner" : "Set as Active Banner"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SECTION 3: STATS & OVERVIEW (DYNAMIC ONLY) */}
          {activeSection === "dashboard" && (
            <div className="admin-section-block">
              <div className="admin-section-header">
                <div>
                  <span className="eyebrow"><Sparkles /> Business Performance</span>
                  <h1>Dashboard Overview</h1>
                </div>
              </div>

              <div className="admin-stats-grid">
                <div className="stat-card">
                  <span className="stat-num" style={{ color: "#2E7D32" }}>₹{totalRevenue}</span>
                  <span className="stat-label">Total Shipped Revenue</span>
                </div>
                <div className="stat-card">
                  <span className="stat-num" style={{ color: pendingOrdersCount > 0 ? "#E65100" : "#2E7D32" }}>
                    {pendingOrdersCount}
                  </span>
                  <span className="stat-label">Pending Orders</span>
                </div>
                <div className="stat-card">
                  <span className="stat-num" style={{ color: "#D32F2F" }}>₹{totalExpenseAmount}</span>
                  <span className="stat-label">Business Expenses</span>
                </div>
                <div className="stat-card">
                  <span className="stat-num" style={{ color: netProfit >= 0 ? "#1976D2" : "#D32F2F" }}>
                    ₹{netProfit}
                  </span>
                  <span className="stat-label">Net Profit</span>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 4: INCOMING ORDERS */}
          {activeSection === "orders" && (
            <div className="admin-section-block">
              <div className="admin-section-header">
                <div>
                  <span className="eyebrow"><ShoppingBag /> Orders</span>
                  <h1>Incoming WhatsApp Orders</h1>
                </div>
              </div>

              <div className="admin-panel-box">
                {customerOrders.length === 0 ? (
                  <p>No customer orders recorded yet.</p>
                ) : (
                  <div className="table-responsive">
                    <table className="admin-ledger-table order-management-table">
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Customer</th>
                          <th>Address</th>
                          <th>Items</th>
                          <th>Total</th>
                          <th>Status</th>
                          <th>Remove</th>
                        </tr>
                      </thead>
                      <tbody>
                        {customerOrders.map((o) => (
                          <tr key={o.id}>
                            <td>#{o.id}</td>
                            <td>
                              <strong>{o.customerName}</strong>
                              <br />
                              <span className="sub-text">{o.phone}</span>
                            </td>
                            <td>{o.address}</td>
                            <td>
                              {o.items.map((i, idx) => (
                                <div key={idx}>🌿 {i.name} (x{i.quantity})</div>
                              ))}
                            </td>
                            <td className="amount-green">₹{o.totalAmount}</td>
                            <td>
                              <select
                                value={o.status}
                                onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                                className={`select-status status-${o.status.toLowerCase()}`}
                              >
                                <option value="Pending">🟡 Pending</option>
                                <option value="Shipped">🚚 Shipped</option>
                                <option value="Delivered">✅ Delivered</option>
                                <option value="Cancelled">❌ Cancelled</option>
                              </select>
                            </td>
                            <td>
                              <button
                                className="admin-delete-btn"
                                onClick={() => deleteCustomerOrder(o.id)}
                              >
                                <Trash />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SECTION 5: ACCOUNTING LEDGER */}
          {activeSection === "accounting" && (
            <div className="admin-section-block">
              <div className="admin-section-header">
                <div>
                  <span className="eyebrow"><Sparkles /> Accounting</span>
                  <h1>March-Ending Ledger</h1>
                </div>
                <button className="btn btn-primary" onClick={exportMarchEndingCSV}>
                  📥 Export March-Ending CSV
                </button>
              </div>

              <div className="admin-panel-box">
                <form onSubmit={handleRecordExpense} style={{ marginBottom: "20px" }}>
                  <h3>Record Business Expense</h3>
                  <div className="form-grid-2">
                    <input
                      type="text"
                      placeholder="Expense Title"
                      value={expTitle}
                      onChange={(e) => setExpTitle(e.target.value)}
                      required
                    />
                    <input
                      type="number"
                      placeholder="Amount ₹"
                      value={expAmount}
                      onChange={(e) => setExpAmount(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-outline" style={{ marginTop: "10px" }}>
                    Record Expense
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* SECTION 6: OWNER PROFILE & PASSWORD */}
          {activeSection === "profile" && (
            <div className="admin-section-block">
              <div className="admin-section-header">
                <div>
                  <span className="eyebrow"><Sparkles /> Owner Credentials</span>
                  <h1>Owner Profile &amp; Password</h1>
                </div>
              </div>

              <div className="admin-panel-box">
                <form onSubmit={handleSaveOwnerProfile} className="admin-add-form">
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label htmlFor="o-name">Owner Full Name *</label>
                      <input
                        id="o-name"
                        type="text"
                        value={ownerName}
                        onChange={(e) => setOwnerName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="o-phone">WhatsApp Business Phone</label>
                      <input
                        id="o-phone"
                        type="tel"
                        value={ownerPhone}
                        onChange={(e) => setOwnerPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label htmlFor="o-email">Business Email</label>
                      <input
                        id="o-email"
                        type="email"
                        value={ownerEmail}
                        onChange={(e) => setOwnerEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="o-pass">Your Custom Security Password *</label>
                      <input
                        id="o-pass"
                        type="password"
                        value={ownerPassword}
                        onChange={(e) => setOwnerPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: "16px" }}>
                    Save &amp; Update Password
                  </button>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </>
  );
}

export default Admin;
