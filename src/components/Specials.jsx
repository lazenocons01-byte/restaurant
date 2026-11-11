import React from 'react';
import { useCart } from '../context/CartContext';
import { menuItems } from '../data/menuData';
import { triggerFlyToCart } from './FlyingFood';
import { Sparkles, Plus, Star } from 'lucide-react';

export default function Specials() {
  const { addToCart } = useCart();

  // Find featured items
  const mainSpecial = menuItems.find((i) => i.id === 8) || menuItems[0];
  const sideSpecials = [
    menuItems.find((i) => i.id === 16) || menuItems[1],
    menuItems.find((i) => i.id === 10) || menuItems[2],
    menuItems.find((i) => i.id === 13) || menuItems[3],
  ];

  return (
    <section className="specials-section" id="specials">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Chef's Selection</span>
          <h2 className="section-title">
            Today's <em>Recommendations</em>
          </h2>
          <p className="section-desc">
            Handpicked specialties made with seasonal truffles, rare catch, and heritage recipes.
          </p>
        </div>

        <div className="specials-grid">
          {/* Main Large Spotlight */}
          <div className="special-card special-large">
            <div className="special-img">
              <img src={mainSpecial.image} alt={mainSpecial.name} loading="lazy" />
              <div className="special-overlay">
                <span className="special-badge">
                  <Sparkles size={12} style={{ marginRight: 4 }} /> Chef's Signature
                </span>
              </div>
            </div>

            <div className="special-info">
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8, color: '#f59e0b' }}>
                <Star size={16} fill="#f59e0b" />
                <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>5.0 Rating (220+ reviews)</span>
              </div>
              <h3>{mainSpecial.name}</h3>
              <p>{mainSpecial.desc}</p>
              <div className="special-footer">
                <span className="price">₹{mainSpecial.price.toLocaleString('en-IN')}</span>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={(e) => {
                    addToCart(mainSpecial);
                    triggerFlyToCart(e, mainSpecial.image);
                  }}
                >
                  <Plus size={15} /> Add to Order
                </button>
              </div>
            </div>
          </div>

          {/* Side Stack Cards */}
          <div className="specials-stack">
            {sideSpecials.map((item) => (
              <div className="special-card special-small" key={item.id}>
                <div className="special-img">
                  <img src={item.image} alt={item.name} loading="lazy" />
                  <span className="special-badge">{item.badge || 'Popular'}</span>
                </div>

                <div className="special-info">
                  <h3>{item.name}</h3>
                  <div className="special-footer">
                    <span className="price">₹{item.price.toLocaleString('en-IN')}</span>
                    <button
                      type="button"
                      className="btn btn-outline btn-sm"
                      onClick={(e) => {
                        addToCart(item);
                        triggerFlyToCart(e, item.image);
                      }}
                    >
                      <Plus size={13} /> Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

