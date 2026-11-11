import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';
import { Leaf, Send, Heart, Loader2 } from 'lucide-react';

export default function Footer() {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      showToast('Please enter a valid email address', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      showToast(data.message || 'Subscribed! Check your inbox.', 'success');
      setEmail('');
    } catch {
      showToast('Thank you for subscribing to our seasonal newsletter!', 'success');
      setEmail('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleScroll = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            {/* Brand column */}
            <div className="footer-brand">
              <a href="#home" className="nav-logo footer-logo" onClick={(e) => handleScroll(e, '#home')}>
                <span className="logo-icon">
                  <Leaf size={18} />
                </span>
                <span className="logo-text">
                  La Bella <span>Cucina</span>
                </span>
              </a>
              <p>
                Bringing authentic regional Italian culinary traditions to San Francisco since 2014.
                Every dish is handcrafted daily with raw passion, heirloom techniques, and certified DOP
                ingredients.
              </p>
            </div>

            {/* Quick Links */}
            <div className="footer-links">
              <h4>Explore</h4>
              <ul>
                <li>
                  <a href="#home" onClick={(e) => handleScroll(e, '#home')}>
                    Home
                  </a>
                </li>
                <li>
                  <a href="#menu" onClick={(e) => handleScroll(e, '#menu')}>
                    Artisanal Menu
                  </a>
                </li>
                <li>
                  <a href="#specials" onClick={(e) => handleScroll(e, '#specials')}>
                    Chef's Specials
                  </a>
                </li>
                <li>
                  <a href="#about" onClick={(e) => handleScroll(e, '#about')}>
                    Our Story
                  </a>
                </li>
                <li>
                  <a href="#gallery" onClick={(e) => handleScroll(e, '#gallery')}>
                    Photo Gallery
                  </a>
                </li>
                <li>
                  <a href="#reservation" onClick={(e) => handleScroll(e, '#reservation')}>
                    Table Reservations
                  </a>
                </li>
                <li>
                  <a href="#contact" onClick={(e) => handleScroll(e, '#contact')}>
                    Contact & Concierge
                  </a>
                </li>
              </ul>
            </div>

            {/* Dining Menu shortcuts */}
            <div className="footer-links">
              <h4>Dining Sections</h4>
              <ul>
                <li>
                  <a href="#menu" onClick={(e) => handleScroll(e, '#menu')}>
                    Antipasti & Starters
                  </a>
                </li>
                <li>
                  <a href="#menu" onClick={(e) => handleScroll(e, '#menu')}>
                    Primi Piatti & Pastas
                  </a>
                </li>
                <li>
                  <a href="#menu" onClick={(e) => handleScroll(e, '#menu')}>
                    Wood-Fired Pizza
                  </a>
                </li>
                <li>
                  <a href="#menu" onClick={(e) => handleScroll(e, '#menu')}>
                    Secondi & Premium Cuts
                  </a>
                </li>
                <li>
                  <a href="#menu" onClick={(e) => handleScroll(e, '#menu')}>
                    Dolci & Tiramisù
                  </a>
                </li>
                <li>
                  <a href="#menu" onClick={(e) => handleScroll(e, '#menu')}>
                    Sommelier Wine Cellar
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter Column */}
            <div className="footer-newsletter">
              <h4>Seasonal Updates</h4>
              <p>
                Subscribe to receive seasonal white truffle alerts, private sommelier cellar dinner
                invitations, and monthly chef recipes.
              </p>

              <form className="newsletter-form" onSubmit={handleSubscribe} noValidate>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  aria-label="Email for newsletter subscription"
                  required
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <Loader2 size={16} className="spin" /> : <Send size={16} />}
                </button>
              </form>

              <div className="footer-hours">
                <h4>Hours of Operation</h4>
                <p>
                  <span>Mon – Fri:</span> 12:00 PM – 10:30 PM
                </p>
                <p>
                  <span>Sat – Sun:</span> 11:00 AM – 11:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>
            © 2026 La Bella Cucina. All rights reserved. Crafted with{' '}
            <Heart size={14} style={{ color: '#f9a825', display: 'inline', margin: '0 3px' }} /> for fine dining enthusiasts.
          </p>

          <div className="footer-legal">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#cookies">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

