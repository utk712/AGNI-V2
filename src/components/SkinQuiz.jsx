import { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "./Icons";

function SkinQuiz() {
  const [skinType, setSkinType] = useState("all");

  const recommendations = {
    all: {
      title: "Daily Glow Routine",
      desc: "Rose Water Spray (100ml) + Beetroot Lip Balm for all skin types.",
      item: "Rose Water"
    },
    dry: {
      title: "Hydration & Moisture Boost",
      desc: "Rose Water Spray + Beetroot Lip Balm for deep hydration.",
      item: "Lip Balm"
    },
    oily: {
      title: "Oil Balance & Pore Care",
      desc: "Beetroot Powder Pack + Rose Water for oil control.",
      item: "Beetroot Powder"
    },
    pigmented: {
      title: "Natural Brightening Combo",
      desc: "Beetroot Powder + Rice Powder (Free Gift) for glow.",
      item: "Rice Powder"
    }
  };

  return (
    <section className="skin-quiz-section container">
      <div className="quiz-card">
        <div className="quiz-head">
          <span className="eyebrow"><Sparkles /> Custom Routine Matcher</span>
          <h2>Find Your Perfect Botanical Routine</h2>
          <p>Select your skin concern to reveal your recommended natural treatment pack:</p>
        </div>

        <div className="quiz-options">
          <button
            className={`quiz-opt-btn ${skinType === "all" ? "active" : ""}`}
            onClick={() => setSkinType("all")}
          >
            🌟 All Skin Types
          </button>
          <button
            className={`quiz-opt-btn ${skinType === "dry" ? "active" : ""}`}
            onClick={() => setSkinType("dry")}
          >
            🌵 Dry / Dull Skin
          </button>
          <button
            className={`quiz-opt-btn ${skinType === "oily" ? "active" : ""}`}
            onClick={() => setSkinType("oily")}
          >
            ✨ Oily / Pore Care
          </button>
          <button
            className={`quiz-opt-btn ${skinType === "pigmented" ? "active" : ""}`}
            onClick={() => setSkinType("pigmented")}
          >
            🌸 Pigmentation &amp; Glow
          </button>
        </div>

        <div className="quiz-result-box">
          <h3>{recommendations[skinType].title}</h3>
          <p>{recommendations[skinType].desc}</p>
          <Link to="/products" className="btn btn-primary btn-sm">
            View Recommended Formula <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default SkinQuiz;
