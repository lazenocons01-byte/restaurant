import React, { useState, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { menuItems } from '../data/menuData';
import DishDetailModal from './DishDetailModal';
import { triggerFlyToCart } from './FlyingFood';
import {
  Utensils,
  Search,
  Star,
  Plus,
  Check,
  Sparkles,
  Layers,
  Leaf,
  Wine,
  IceCream,
  Pizza,
  Clock,
  Flame,
  Eye,
  Bike,
  UtensilsCrossed,
} from 'lucide-react';

export default function Menu() {
  const { addToCart, cart } = useCart();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');
  const [selectedDish, setSelectedDish] = useState(null);
  const [orderMode, setOrderMode] = useState('delivery'); // 'delivery' | 'dinein'

  const tabs = [
    { id: 'all', label: 'All Dishes', icon: <Layers size={16} /> },
    { id: 'starters', label: 'Antipasti (Starters)', icon: <Leaf size={16} /> },
    { id: 'mains', label: 'Secondi (Mains)', icon: <Utensils size={16} /> },
    { id: 'pasta', label: 'Primi & Pizza', icon: <Pizza size={16} /> },
    { id: 'desserts', label: 'Dolci (Desserts)', icon: <IceCream size={16} /> },
    { id: 'drinks', label: 'Bevande (Drinks)', icon: <Wine size={16} /> },
  ];

  const allTags = ['all', 'Vegetarian', 'Gluten-Free', 'Seafood', 'Signature'];

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory = activeTab === 'all' || item.category === activeTab;
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.italianName && item.italianName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag =
        selectedTag === 'all' ||
        (item.tags && item.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase()));

      return matchesCategory && matchesSearch && matchesTag;
    });
  }, [activeTab, searchQuery, selectedTag]);

  const getItemCartQty = (id) => {
    const found = cart.find((i) => i.id === id);
    return found ? found.qty : 0;
  };

  const handleQuickAdd = (e, item) => {
    e.stopPropagation();
    addToCart(item);
    triggerFlyToCart(e, item.image);
  };

  return (
    <section className="menu-section" id="menu">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Artisanal Italian Dining</span>
          <h2 className="section-title">
            Our Handcrafted <em>Menu</em>
          </h2>
          <p className="section-desc">
            Explore authentic regional Italian recipes made from scratch daily with certified DOP
            ingredients, organic farm produce, and generations of culinary mastery.
          </p>

          {/* Dine-In vs Delivery Switcher */}
          <div className="order-mode-switcher">
            <button
              type="button"
              className={`order-mode-btn ${orderMode === 'delivery' ? 'active' : ''}`}
              onClick={() => setOrderMode('delivery')}
            >
              <Bike size={16} /> Doorstep Delivery
            </button>
            <button
              type="button"
              className={`order-mode-btn ${orderMode === 'dinein' ? 'active' : ''}`}
              onClick={() => setOrderMode('dinein')}
            >
              <UtensilsCrossed size={16} /> Dine-In Order to Table
            </button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="menu-filter-container">
          <div className="menu-search-wrap">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes (e.g., Truffle, Carbonara, Sea Bass, Burrata)..."
              className="menu-search-input"
            />
            <Search size={18} className="menu-search-icon" />
          </div>

          {/* Quick Dietary Tags */}
          <div className="dietary-tags-wrap">
            {allTags.map((tag) => (
              <button
                key={tag}
                type="button"
                className={`dietary-tag-btn ${selectedTag === tag ? 'active' : ''}`}
                onClick={() => setSelectedTag(tag)}
              >
                {tag === 'all' ? 'All Dietary' : tag}
              </button>
            ))}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="menu-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Proper Menu Cards Grid */}
        <div className="menu-grid" id="menu-grid">
          {filteredItems.length === 0 ? (
            <div
              style={{
                gridColumn: '1 / -1',
                textAlign: 'center',
                padding: '54px 20px',
                background: '#fff',
                borderRadius: 20,
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              }}
            >
              <Utensils size={44} style={{ color: '#c8973a', marginBottom: 14 }} />
              <h3 style={{ margin: '0 0 8px', fontSize: '1.25rem' }}>No matching dishes found</h3>
              <p style={{ color: '#777', margin: 0, fontSize: '0.92rem' }}>
                Try searching for another dish or resetting the dietary filter.
              </p>
            </div>
          ) : (
            filteredItems.map((item) => {
              const currentQty = getItemCartQty(item.id);

              return (
                <div
                  className="menu-card"
                  key={item.id}
                  onClick={() => setSelectedDish(item)}
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 18,
                    overflow: 'hidden',
                    background: '#fff',
                    boxShadow: '0 4px 22px rgba(0,0,0,0.08)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                >
                  {/* Image container with badges & quick view overlay */}
                  <div className="menu-card__img-wrap" style={{ position: 'relative', height: 230 }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      onError={(e) => {
                        e.target.src =
                          'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80';
                      }}
                    />

                    {/* Badge */}
                    {item.badge && (
                      <span className="menu-card__badge" style={{ zIndex: 2 }}>
                        {item.badge}
                      </span>
                    )}

                    {/* Prep time chip */}
                    {item.prepTime && (
                      <span
                        style={{
                          position: 'absolute',
                          top: 12,
                          right: 12,
                          background: 'rgba(26, 26, 46, 0.82)',
                          color: '#fff',
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          padding: '4px 9px',
                          borderRadius: 20,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4,
                          backdropFilter: 'blur(4px)',
                          zIndex: 2,
                        }}
                      >
                        <Clock size={11} style={{ color: '#f9a825' }} /> {item.prepTime}
                      </span>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="menu-card__body" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div className="menu-card__header">
                      <div>
                        <h3 className="menu-card__name" style={{ fontSize: '1.08rem' }}>
                          {item.name}
                        </h3>
                        {item.italianName && (
                          <span
                            style={{
                              display: 'block',
                              fontSize: '0.8rem',
                              fontStyle: 'italic',
                              color: '#888',
                              marginTop: 2,
                              fontFamily: "'Playfair Display', serif",
                            }}
                          >
                            {item.italianName}
                          </span>
                        )}
                      </div>
                      <span className="menu-card__price" style={{ fontSize: '1.18rem' }}>
                        ₹{item.price.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <p className="menu-card__desc" style={{ flex: 1, margin: '8px 0 14px' }}>
                      {item.desc}
                    </p>

                    {/* Dietary & Calories Chips */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        marginBottom: 14,
                        flexWrap: 'wrap',
                      }}
                    >
                      {item.tags?.map((t, i) => (
                        <span
                          key={i}
                          style={{
                            background: '#f3f4f6',
                            color: '#555',
                            fontSize: '0.72rem',
                            fontWeight: 600,
                            padding: '2px 8px',
                            borderRadius: 6,
                          }}
                        >
                          {t}
                        </span>
                      ))}

                      {item.calories && (
                        <span
                          style={{
                            fontSize: '0.72rem',
                            color: '#888',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 3,
                            marginLeft: 'auto',
                          }}
                        >
                          <Flame size={12} style={{ color: '#e53935' }} /> {item.calories}
                        </span>
                      )}
                    </div>

                    {/* Card Footer: Rating + Add Button */}
                    <div className="menu-card__footer" style={{ borderTop: '1px solid #f2f2f2', paddingTop: 12 }}>
                      <div className="menu-card__rating">
                        <Star size={14} fill="#f59e0b" style={{ color: '#f59e0b' }} />
                        <span style={{ fontWeight: 600 }}>{item.rating.toFixed(1)}</span>
                        <span style={{ color: '#999', fontSize: '0.78rem' }}>({item.reviewsCount})</span>
                      </div>

                      <div style={{ display: 'flex', gap: 6 }}>
                        <button
                          type="button"
                          className="btn--add-cart"
                          onClick={(e) => handleQuickAdd(e, item)}
                          style={{
                            background: currentQty > 0 ? '#2d7a4f' : '#1a1a2e',
                            padding: '8px 14px',
                            borderRadius: 8,
                            fontSize: '0.84rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 5,
                          }}
                          aria-label={`Add ${item.name} to order`}
                        >
                          {currentQty > 0 ? (
                            <>
                              <Check size={14} /> ({currentQty})
                            </>
                          ) : (
                            <>
                              <Plus size={14} /> Add
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Tasting Menu CTA */}
        <div className="menu-cta" style={{ marginTop: 48 }}>
          <p>Planning an intimate anniversary or VIP dinner celebration?</p>
          <a
            href="#reservation"
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              const el = document.querySelector('#reservation');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <Sparkles size={16} /> Reserve Chef Marco's 7-Course Tasting Menu
          </a>
        </div>
      </div>

      {/* Dish Detail & Customization Modal */}
      {selectedDish && (
        <DishDetailModal
          item={selectedDish}
          onClose={() => setSelectedDish(null)}
          onAddAnimated={(e, imageSrc) => triggerFlyToCart(e, imageSrc)}
        />
      )}
    </section>
  );
}
