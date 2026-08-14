# 🌿 Akshaya Glow Naturals (AGNI-V2)

> **Pure Botanical Skincare • Handcrafted Kitchen Distillations • Market-Ready E-Commerce Platform**

Akshaya Glow Naturals (AGNI-V2) is a modern, high-converting, fully dynamic e-commerce web application built for handcrafted natural skincare products. Backed by a Vercel Serverless API and a real-time cross-device Cloud Master database, AGNI-V2 features 0 hardcoded products and provides a complete Owner Admin Studio for catalog management, sales tracking, and March-ending financial accounting.

---

## ✨ Key Features

- **🚫 Zero Hardcoded Products**: Every product, combo deal, price, description, and bestseller badge is dynamically loaded and managed from the Owner Studio.
- **🔐 Secure First-Time Owner Registration**: No hardcoded master passwords. First-time owner setup allows registering custom credentials (Name, Phone, Email, Password). Secure password authentication on all subsequent logins.
- **🎁 Special Combo Offers Builder**: Dedicated Combo Deal creator in Owner Studio with photo upload options (File upload & Image URL preview). Dynamic rendering on the Homepage Banner and dedicated `/combo` offer page.
- **📦 Automated WhatsApp Checkout**: Slide-over Shopping Bag drawer automatically formats orders with itemized lists and customer shipping details, generating instant WhatsApp order messages.
- **📊 Real-Time 5-Second Cloud Master Sync**: Integrated with same-domain Vercel Serverless API (`/api/store`) for instant cross-device updates across Laptop and Mobile phones without CORS or AdBlocker interference.
- **💼 March-Ending Financial Ledger & CSV Exporter**: Track shipped sales revenue, record business expenses, calculate net profit, and export 1-click `AGNI_March_Ending_Report.csv` for CA and tax filing.
- **📱 Fluid Mobile Responsive Design**: Custom CSS design system with HSL natural tokens (`#8C3A4B` Rosewood & `#2E7D32` Moss), fluid typography (`Fraunces` & `Inter`), and mobile item cards to prevent layout shifts or text wrapping.

---

## 🛠️ Technology Stack

- **Frontend Core**: React 19, Vite 6, React Router DOM 7
- **Animations**: Framer Motion 12
- **Styling**: Pure Vanilla CSS Design Tokens (No external UI frameworks)
- **Backend API**: Vercel Node.js Serverless Functions (`/api/store.js`)
- **Icons**: Custom SVG Icon Collection (`src/components/Icons.jsx`)

---

## 🚀 Quick Start & Installation

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn

### 1. Clone Repository
```bash
git clone https://github.com/utk712/AGNI-V2.git
cd AGNI-V2
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 4. Build for Production
```bash
npm run build
```

---

## 🔐 Owner Admin Studio Access

To access the hidden Owner Studio:
1. Navigate to `/admin` on your website URL (e.g. `https://your-domain.vercel.app/admin`).
2. **First-Time Access**: Register your Owner Name, Business Phone, Email, and Create your Personal Security Password.
3. **Subsequent Access**: Enter your set password to unlock the studio dashboard.

---

## 🌐 Deploying to Vercel

1. Push your code to GitHub: `git push origin main`.
2. Connect your GitHub repository to [Vercel](https://vercel.com).
3. Vercel automatically detects the Vite build configuration and serverless route at `/api/store`.
4. Click **Deploy**!

---

## 📄 License & Credits

- Developed for **Akshaya Glow Naturals**.
- All botanical product photos and graphics copyright Akshaya Glow Naturals.
