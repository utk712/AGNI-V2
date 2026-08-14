import Footer from "../components/Footer";
import { Sparkles, Check } from "../components/Icons";

function About() {
  return (
    <>
      <div className="about-page container">
        <div className="about-hero text-center">
          <span className="eyebrow"><Sparkles /> Our Botanical Journey</span>
          <h1>Akshaya Glow Naturals</h1>
          <p className="about-subtitle">
            Handcrafted with love, distilled from fresh flowers, and powdered with pure organic herbs in India.
          </p>
        </div>

        <div className="about-content-grid">
          <div className="about-text-box">
            <h2>Pure Skincare Made Fresh</h2>
            <p>
              Akshaya Glow Naturals (AGNI) was created with a simple vision: to offer honest, chemical-free skincare formulas straight from kitchen distillation to your home.
            </p>
            <p>
              We don't mass-produce in factories. Every bottle of Rose Water is steam-distilled in small copper vessels, and every gram of Beetroot and Rice powder is sun-dried carefully to retain natural vitamin potency.
            </p>

            <div className="about-highlights">
              <div className="highlight-item">
                <Check /> <strong>Zero Preservatives:</strong> Free from parabens, sulfates, and artificial scents.
              </div>
              <div className="highlight-item">
                <Check /> <strong>100% Transparent:</strong> Every single ingredient listed clearly on your jar.
              </div>
              <div className="highlight-item">
                <Check /> <strong>Fresh Batches:</strong> Prepared weekly to ensure peak botanical freshness.
              </div>
            </div>
          </div>

          <div className="about-image-box">
            <img
              src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80"
              alt="Rose Petals Distillation"
              className="about-photo"
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default About;
