import React from 'react';
import { CheckCircle2, HeartHandshake } from 'lucide-react';

export default function About() {
  const commitments = [
    '100% authentic regional recipes with zero artificial shortcuts',
    'DOP Parmigiano-Reggiano, San Marzano tomatoes & olive oil imported weekly from Italy',
    'Sustainable, ethical partnerships with local organic fisheries and growers',
    'Four generations of family culinary traditions preserved and refined',
  ];

  return (
    <section className="about-section" id="about">
      <div className="container">
        <div className="about-grid">
          {/* Images visual cluster */}
          <div className="about-images">
            <div className="about-img-main">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
                alt="La Bella Cucina Main Dining Hall"
                loading="lazy"
              />
            </div>
            <div className="about-img-side">
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&q=80"
                alt="Chef Marco prepping dishes"
                loading="lazy"
              />
            </div>
            <div className="about-experience-badge">
              <span className="years">12</span>
              <span>
                Years of
                <br />
                Excellence
              </span>
            </div>
          </div>

          {/* About content */}
          <div className="about-content">
            <span className="section-badge">Our Story</span>
            <h2 className="section-title">
              A Passion for <em>Authentic</em> Italian Cuisine
            </h2>
            <p>
              Founded in 2014 by Chef Marco Russo and his wife Sofia, La Bella Cucina was born from a
              simple belief: that exceptional food has the timeless power to bring people together in
              warmth and celebration.
            </p>
            <p>
              Marco spent over a decade training in the historic trattorias and Michelin-starred
              kitchens of Florence, Venice, and Rome before bringing that deep reverence for raw
              ingredients to your table. Today, every dish on our menu reflects that journey — a
              celebration of genuine tradition with contemporary finesse.
            </p>

            <div className="about-features">
              {commitments.map((text, idx) => (
                <div className="about-feat" key={idx}>
                  <CheckCircle2 size={18} style={{ color: '#2d7a4f', flexShrink: 0 }} />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            <a
              href="#reservation"
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                const el = document.querySelector('#reservation');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <HeartHandshake size={16} /> Book Your Experience
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

