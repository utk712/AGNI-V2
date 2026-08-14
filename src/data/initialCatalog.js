import roseWaterImg from "../assets/products/rose-water.jpg";
import beetrootPowderImg from "../assets/products/beetroot-powder.jpg";
import beetrootLipBalmImg from "../assets/products/beetroot-lip-balm.jpg";
import ricePowderImg from "../assets/products/rice-powder.jpg";
import rosePowderImg from "../assets/products/rose-powder.jpg";
import abcPowderImg from "../assets/products/abc-powder.jpg";

export const initialCatalog = [
  {
    id: 1,
    name: "Rose Water",
    numericPrice: 60,
    price: "₹60",
    size: "100ml",
    category: "rose",
    categoryLabel: "Face Care",
    tagline: "100% Pure Steam Distilled Fresh Rose Hydrosol",
    description: "Handcrafted from steam-distilled Indian Damask Rose petals. Tightens pores, balances pH, and provides instant morning hydration.",
    ingredients: ["Fresh Indian Rose Petals (Steam Distilled)", "Pure Spring Water"],
    howToUse: "Mist directly onto face morning and night, or mix into herbal face packs.",
    image: roseWaterImg,
    bestSeller: true
  },
  {
    id: 2,
    name: "Beetroot Powder",
    numericPrice: 50,
    price: "₹50",
    size: "50g",
    category: "herbal",
    categoryLabel: "Herbal Powders",
    tagline: "Natural Flush & Skin Brightening Face Pack",
    description: "Sun-dried organic beetroot powder rich in antioxidants and Vitamin C. Adds a natural rosy glow and reduces pigmentation.",
    ingredients: ["100% Pure Dehydrated Beetroot Root Powder"],
    howToUse: "Mix 1 teaspoon with Rose Water or curd, apply evenly for 15 mins, and rinse.",
    image: beetrootPowderImg,
    bestSeller: true
  },
  {
    id: 3,
    name: "Beetroot Lip Balm",
    numericPrice: 40,
    price: "₹40",
    size: "20g",
    category: "lip",
    categoryLabel: "Lip Care",
    tagline: "Deep Nourishment with Natural Rose Tint",
    description: "Hand-poured with pure beeswax, cold-pressed coconut oil, and natural beetroot extract for soft, naturally pink lips.",
    ingredients: ["Beeswax", "Cold-Pressed Coconut Oil", "Beetroot Extract", "Shea Butter"],
    howToUse: "Swipe onto lips whenever dry or before sleep for deep overnight repair.",
    image: beetrootLipBalmImg,
    bestSeller: true
  },
  {
    id: 4,
    name: "Rice Powder",
    numericPrice: 0,
    price: "₹0",
    size: "25g",
    category: "herbal",
    categoryLabel: "Free Gift",
    tagline: "Brightening & Oil Absorbing Polish Pack",
    description: "Finely milled organic rice starch that gently exfoliates dead skin cells and absorbs excess facial oil.",
    ingredients: ["100% Pure Milled Organic Rice Starch"],
    howToUse: "Mix with rose water as a gentle scrub or mask.",
    image: ricePowderImg,
    bestSeller: false
  },
  {
    id: 5,
    name: "Rose Powder",
    numericPrice: 50,
    price: "₹50",
    size: "50g",
    category: "herbal",
    categoryLabel: "Herbal Powders",
    tagline: "Pure Sun-Dried Rose Petal Skin Complexion Mask",
    description: "Finely ground shade-dried Indian Damask Rose petals. Soothes inflammation and brightens skin tone.",
    ingredients: ["100% Pure Sun-Dried Damask Rose Petals"],
    howToUse: "Mix with Rose Water or raw milk into a smooth paste.",
    image: rosePowderImg,
    bestSeller: false
  },
  {
    id: 6,
    name: "ABC Powder",
    numericPrice: 120,
    price: "₹120",
    size: "100g",
    category: "herbal",
    categoryLabel: "Herbal Powders",
    tagline: "Apple, Beetroot & Carrot Superfood Skin Pack",
    description: "Nutrient-rich blend of dehydrated organic Apple, Beetroot, and Carrot. Packed with Vitamins A, C, and E for skin glow.",
    ingredients: ["Organic Dehydrated Apple", "Organic Beetroot", "Organic Carrot"],
    howToUse: "Mix 1-2 teaspoons with rose water or honey.",
    image: abcPowderImg,
    bestSeller: true
  }
];
