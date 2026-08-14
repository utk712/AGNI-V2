import { createContext, useContext, useState, useEffect } from "react";
import { initialCatalog } from "../data/initialCatalog";
import { fetchCloudStore, saveCloudStore } from "../services/cloudSync";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  // Default to 0 hardcoded products
  const [products, setProducts] = useState([]);
  const [customerOrders, setCustomerOrders] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [ownerProfile, setOwnerProfile] = useState(() => {
    try {
      const saved = localStorage.getItem("agni_owner_profile_v2");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isCloudLoaded, setIsCloudLoaded] = useState(false);

  // Initial local storage load
  useEffect(() => {
    try {
      const savedProds = localStorage.getItem("agni_custom_products_v2");
      if (savedProds) {
        const parsed = JSON.parse(savedProds);
        if (Array.isArray(parsed)) setProducts(parsed);
      }
      const savedOrders = localStorage.getItem("agni_customer_orders_v2");
      if (savedOrders) setCustomerOrders(JSON.parse(savedOrders));

      const savedExps = localStorage.getItem("agni_expenses_v2");
      if (savedExps) setExpenses(JSON.parse(savedExps));

      const savedProfile = localStorage.getItem("agni_owner_profile_v2");
      if (savedProfile) setOwnerProfile(JSON.parse(savedProfile));
    } catch (e) {
      console.error("Local storage load error", e);
    }
  }, []);

  // Fetch Cloud Master state (Integrated with Vercel /api/store)
  useEffect(() => {
    async function syncWithCloudMaster() {
      const cloudData = await fetchCloudStore();
      if (cloudData && typeof cloudData === "object") {
        if (cloudData.products && Array.isArray(cloudData.products)) {
          setProducts(cloudData.products);
          localStorage.setItem("agni_custom_products_v2", JSON.stringify(cloudData.products));
        }
        if (cloudData.customerOrders && Array.isArray(cloudData.customerOrders)) {
          setCustomerOrders(cloudData.customerOrders);
          localStorage.setItem("agni_customer_orders_v2", JSON.stringify(cloudData.customerOrders));
        }
        if (cloudData.expenses && Array.isArray(cloudData.expenses)) {
          setExpenses(cloudData.expenses);
          localStorage.setItem("agni_expenses_v2", JSON.stringify(cloudData.expenses));
        }
        if (cloudData.ownerProfile && typeof cloudData.ownerProfile === "object" && cloudData.ownerProfile.password) {
          setOwnerProfile(cloudData.ownerProfile);
          localStorage.setItem("agni_owner_profile_v2", JSON.stringify(cloudData.ownerProfile));
        }
      }
      setIsCloudLoaded(true);
    }

    syncWithCloudMaster();

    // Auto-sync every 5 seconds for live cross-device updates!
    const pollInterval = setInterval(() => {
      syncWithCloudMaster();
    }, 5000);

    return () => clearInterval(pollInterval);
  }, []);

  // Helper to persist all data to Cloud Master
  const persistState = (newProds, newOrders, newExps, newProfile) => {
    const dataToSave = {
      products: newProds !== undefined ? newProds : products,
      customerOrders: newOrders !== undefined ? newOrders : customerOrders,
      expenses: newExps !== undefined ? newExps : expenses,
      ownerProfile: newProfile !== undefined ? newProfile : ownerProfile,
    };
    saveCloudStore(dataToSave);
  };

  const updateOwnerProfile = (newDetails) => {
    const updated = {
      ...ownerProfile,
      ...newDetails,
      isConfigured: true,
    };
    setOwnerProfile(updated);
    localStorage.setItem("agni_owner_profile_v2", JSON.stringify(updated));
    persistState(products, customerOrders, expenses, updated);
    return updated;
  };

  const addProduct = (newProd) => {
    const id = Date.now();
    const productToAdd = {
      ...newProd,
      id,
      numericPrice: Number(newProd.numericPrice) || 0,
      price: `₹${newProd.numericPrice}`,
      ingredients: typeof newProd.ingredients === "string" 
        ? newProd.ingredients.split(",").map((s) => s.trim()).filter(Boolean)
        : newProd.ingredients || [],
      bestSeller: Boolean(newProd.bestSeller),
    };

    const updated = [productToAdd, ...products];
    setProducts(updated);
    localStorage.setItem("agni_custom_products_v2", JSON.stringify(updated));
    persistState(updated, customerOrders, expenses, ownerProfile);
    return productToAdd;
  };

  const updateProduct = (id, updatedFields) => {
    const updated = products.map((p) => {
      if (p.id === id) {
        const numericPrice = updatedFields.numericPrice !== undefined 
          ? Number(updatedFields.numericPrice) 
          : p.numericPrice;
        return {
          ...p,
          ...updatedFields,
          numericPrice,
          price: `₹${numericPrice}`,
        };
      }
      return p;
    });
    setProducts(updated);
    localStorage.setItem("agni_custom_products_v2", JSON.stringify(updated));
    persistState(updated, customerOrders, expenses, ownerProfile);
  };

  const deleteProduct = (id) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    localStorage.setItem("agni_custom_products_v2", JSON.stringify(updated));
    persistState(updated, customerOrders, expenses, ownerProfile);
  };

  const clearAllProducts = () => {
    setProducts([]);
    localStorage.setItem("agni_custom_products_v2", JSON.stringify([]));
    persistState([], customerOrders, expenses, ownerProfile);
  };

  const createCustomerOrder = (orderData) => {
    const newOrder = {
      id: Date.now(),
      customerName: orderData.customerName || "Website Customer",
      phone: orderData.phone || "Not specified",
      address: orderData.address || "Share in chat",
      items: orderData.items || [],
      subtotal: orderData.subtotal || 0,
      totalAmount: orderData.totalAmount || orderData.subtotal || 0,
      status: "Pending",
      date: new Date().toISOString().split("T")[0],
      freeGift: orderData.freeGift || false,
    };

    const updatedOrders = [newOrder, ...customerOrders];
    setCustomerOrders(updatedOrders);
    localStorage.setItem("agni_customer_orders_v2", JSON.stringify(updatedOrders));
    persistState(products, updatedOrders, expenses, ownerProfile);
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = customerOrders.map((o) =>
      o.id === orderId ? { ...o, status: newStatus } : o
    );
    setCustomerOrders(updatedOrders);
    localStorage.setItem("agni_customer_orders_v2", JSON.stringify(updatedOrders));
    persistState(products, updatedOrders, expenses, ownerProfile);
  };

  const deleteCustomerOrder = (orderId) => {
    const updatedOrders = customerOrders.filter((o) => o.id !== orderId);
    setCustomerOrders(updatedOrders);
    localStorage.setItem("agni_customer_orders_v2", JSON.stringify(updatedOrders));
    persistState(products, updatedOrders, expenses, ownerProfile);
  };

  const addExpense = (exp) => {
    const newExp = {
      ...exp,
      id: Date.now(),
      amount: Number(exp.amount) || 0,
      date: exp.date || new Date().toISOString().split("T")[0],
    };
    const updatedExpenses = [newExp, ...expenses];
    setExpenses(updatedExpenses);
    localStorage.setItem("agni_expenses_v2", JSON.stringify(updatedExpenses));
    persistState(products, customerOrders, updatedExpenses, ownerProfile);
  };

  const deleteExpense = (id) => {
    const updatedExpenses = expenses.filter((e) => e.id !== id);
    setExpenses(updatedExpenses);
    localStorage.setItem("agni_expenses_v2", JSON.stringify(updatedExpenses));
    persistState(products, customerOrders, updatedExpenses, ownerProfile);
  };

  const purgeStaleMobileCache = async () => {
    localStorage.clear();
    if (ownerProfile) {
      localStorage.setItem("agni_owner_profile_v2", JSON.stringify(ownerProfile));
    }
    const cloudData = await fetchCloudStore();
    if (cloudData) {
      if (cloudData.products) setProducts(cloudData.products);
      if (cloudData.customerOrders) setCustomerOrders(cloudData.customerOrders);
      if (cloudData.expenses) setExpenses(cloudData.expenses);
      if (cloudData.ownerProfile) setOwnerProfile(cloudData.ownerProfile);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        clearAllProducts,
        customerOrders,
        createCustomerOrder,
        updateOrderStatus,
        deleteCustomerOrder,
        expenses,
        addExpense,
        deleteExpense,
        ownerProfile,
        updateOwnerProfile,
        isCloudLoaded,
        purgeStaleMobileCache,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
}
