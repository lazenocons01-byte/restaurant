import React, { useState, useEffect } from 'react';
import { Award, Utensils, CalendarCheck, Star } from 'lucide-react';

export default function Hero() {
  const [counts, setCounts] = useState({
    guests: 0,
    recipes: 0,
    years: 0,
    rating: 0,
  });

  useEffect(() => {
    const targets = { guests: 1200, recipes: 85, years: 12, rating: 4.9 };
    const duration = 1800;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);

      setCounts({
        guests: Math.round(targets.guests * ease),
        recipes: Math.round(targets.recipes * ease),
        years: Math.round(targets.years * ease),
        rating: +(targets.rating * ease).toFixed(1),
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) {
      const navH = 75;
      const top = el.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" id="home">
      <div className="hero-bg-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
      </div>

      <div className="hero-container">
        <div className="hero-content">
          <span className="hero-badge">
            <Award size={15} style={{ color: '#f9a825' }} /> Best Italian Restaurant 2026
          </span>

          <h1 className="hero-title">
            Where Every Meal<br />
            Tells a <em>Story</em>
          </h1>

          <p className="hero-desc">
            Experience the authentic flavors of Italy, crafted with the finest seasonal ingredients,
            house-made pastas, and generations of culinary tradition.
          </p>

          <div className="hero-actions">
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={() => scrollTo('#menu')}
            >
              <Utensils size={18} /> Explore Menu
            </button>
            <button
              type="button"
              className="btn btn-outline btn-lg"
              onClick={() => scrollTo('#reservation')}
            >
              <CalendarCheck size={18} /> Book a Table
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-num">{counts.guests.toLocaleString()}</span>
              <span>+</span>
              <p>Happy Guests</p>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-num">{counts.recipes}</span>
              <span>+</span>
              <p>Authentic Recipes</p>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-num">{counts.years}</span>
              <p>Years of Excellence</p>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-num">{counts.rating.toFixed(1)}</span>
              <span>★</span>
              <p>Average Rating</p>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-img-wrap">
            <div className="hero-img-main">
              <img
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80"
                alt="Signature Pasta Dish"
                loading="eager"
              />
            </div>

            <div className="hero-float-card card-top">
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=120&q=80"
                alt="Chef Marco Russo"
              />
              <div>
                <strong>Chef Marco Russo</strong>
                <span>Executive Head Chef</span>
              </div>
            </div>

            <div className="hero-float-card card-bottom">
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: '#f9a825',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                }}
              >
                <Star size={18} fill="#fff" />
              </div>
              <div>
                <strong>100% Sourced Daily</strong>
                <span>Organic & Non-GMO</span>
              </div>
            </div>

            <div className="hero-img-secondary img-s1">
              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&q=80"
                alt="Burrata Caprese"
              />
            </div>
            <div className="hero-img-secondary img-s2">
              <img
                src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&q=80"
                alt="Tiramisù"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll-hint" onClick={() => scrollTo('#features')} style={{ cursor: 'pointer' }}>
        <span>Scroll to explore</span>
        <div className="scroll-dot"></div>
      </div>
    </section>
  );
}

