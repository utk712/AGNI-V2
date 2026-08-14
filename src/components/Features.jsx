import { Check, Sparkles } from "./Icons";

const featuresData = [
  {
    icon: "🌸",
    title: "Fresh Rose Distillation",
    desc: "Distilled from pure Indian Damask rose petals for natural pore tightening and hydration."
  },
  {
    icon: "🌱",
    title: "Sun-Dried Botanical Powders",
    desc: "Beetroot and Rice powders dehydrated carefully to preserve active Vitamin C and antioxidants."
  },
  {
    icon: "🍯",
    title: "Pure Beeswax Lip Mists",
    desc: "Cold-pressed oils and natural beeswax for long-lasting lip softness with a rosy flush."
  },
  {
    icon: "🚚",
    title: "Direct WhatsApp Delivery",
    desc: "Order directly on WhatsApp with zero hassle and fast dispatch to your doorstep."
  }
];

function Features() {
  return (
    <section className="features-section container">
      <div className="section-intro text-center">
        <span className="eyebrow"><Sparkles /> The AGNI Guarantee</span>
        <h2 className="section-heading">Why Choose Our Botanical Formulas?</h2>
      </div>

      <div className="features-grid">
        {featuresData.map((f, i) => (
          <div key={i} className="feature-card">
            <div className="feature-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
