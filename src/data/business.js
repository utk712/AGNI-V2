export const business = {
  name: "Akshaya Glow Naturals",
  shortName: "AGNI",
  phone: "+91 9302579140",
  rawPhone: "919302579140",
  whatsappNumber: "919302579140",
  tagline: "Pure Handmade Skincare & Botanical Powders",
  freeShippingThreshold: 150,
  freeGiftName: "Rice Powder (25g)",
  freeGiftThreshold: 150,
};

export const whatsappLink = (message) => {
  return `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(message)}`;
};
