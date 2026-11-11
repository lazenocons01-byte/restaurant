import React from 'react';
import { Utensils, Phone, Bike, Clock, ShieldCheck } from 'lucide-react';

export default function CtaBanner() {
  const scrollToMenu = () => {
    const el = document.querySelector('#menu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="cta-section">
      <div className="cta-bg">
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80"
          alt="Artisanal food preparation"
          loading="lazy"
        />
        <div className="cta-overlay"></div>
      </div>

      <div className="container">
        <div className="cta-content">
          <span className="section-badge light">Order Online</span>
          <h2>
            Craving La Bella Cucina?
            <br />
            We Deliver <em>To Your Door</em>
          </h2>
          <p>
            Enjoy our restaurant-quality handmade pasta, wood-fired pizzas, and classic desserts in the
            comfort of your own home. Fast, warm, and tamper-sealed.
          </p>

          <div className="cta-actions">
            <button
              type="button"
              className="btn btn-white btn-lg"
              onClick={scrollToMenu}
            >
              <Utensils size={18} /> Order Online Now
            </button>
            <a href="tel:+15551234567" className="btn btn-outline-white btn-lg">
              <Phone size={18} /> Call to Order: +1 (555) 123-4567
            </a>
          </div>

          <div className="cta-badges">
            <span>
              <Bike size={16} /> Free delivery on orders over ₹999
            </span>
            <span>
              <Clock size={16} /> 30–45 min average delivery
            </span>
            <span>
              <ShieldCheck size={16} /> Contactless tamper-sealed delivery
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

