import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import {
  X,
  Star,
  Clock,
  Flame,
  Wine,
  Check,
  Plus,
  Minus,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';

export default function DishDetailModal({ item, onClose, onAddAnimated }) {
  const { addToCart } = useCart();
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isAdded, setIsAdded] = useState(false);

  if (!item) return null;

  const toggleAddon = (addon) => {
    setSelectedAddons((prev) => {
      const exists = prev.find((a) => a.name === addon.name);
      if (exists) {
        return prev.filter((a) => a.name !== addon.name);
      }
      return [...prev, addon];
    });
  };

  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const unitPrice = item.price + addonsTotal;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = (e) => {
    const customizedItem = {
      ...item,
      price: unitPrice,
      customizations: selectedAddons.map((a) => a.name),
      notes: specialInstructions.trim() || undefined,
    };

    // Add multiples if quantity > 1
    for (let i = 0; i < quantity; i++) {
      addToCart(customizedItem, i > 0);
    }

    if (onAddAnimated) {
      onAddAnimated(e, item.image);
    }

    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 450);
  };

  return (
    <div
      className="modal-overlay dish-modal-overlay open"
      onClick={onClose}
    >
      <div
        className="modal dish-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dish modal"
          className="dish-modal-close"
        >
          <X size={20} />
        </button>

        {/* Hero Image Header */}
        <div className="dish-modal-img-wrap">
          <img
            src={item.image}
            alt={item.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)',
            }}
          />

          {item.badge && (
            <span
              style={{
                position: 'absolute',
                top: 16,
                left: 16,
                background: '#c8973a',
                color: '#fff',
                fontSize: '0.76rem',
                fontWeight: 700,
                letterSpacing: '0.6px',
                padding: '5px 12px',
                borderRadius: 20,
                textTransform: 'uppercase',
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
              }}
            >
              {item.badge}
            </span>
          )}

          <div
            style={{
              position: 'absolute',
              bottom: 16,
              left: 20,
              right: 20,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              color: '#fff',
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: '1.5rem',
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  textShadow: '0 2px 8px rgba(0,0,0,0.6)',
                }}
              >
                {item.name}
              </h2>
              {item.italianName && (
                <p
                  style={{
                    margin: '3px 0 0',
                    fontSize: '0.88rem',
                    fontStyle: 'italic',
                    color: 'rgba(255,255,255,0.85)',
                  }}
                >
                  {item.italianName}
                </p>
              )}
            </div>

            <div
              style={{
                background: 'rgba(45, 122, 79, 0.95)',
                padding: '6px 14px',
                borderRadius: 12,
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#fff',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              }}
            >
              ₹{item.price.toLocaleString('en-IN')}
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="dish-modal-body">
          {/* Metadata chips: Prep time, calories, ratings */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              flexWrap: 'wrap',
              paddingBottom: 16,
              borderBottom: '1px solid #f0f0f0',
              marginBottom: 18,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                color: '#f59e0b',
                fontSize: '0.88rem',
                fontWeight: 600,
              }}
            >
              <Star size={16} fill="#f59e0b" />
              <span>{item.rating.toFixed(1)}</span>
              <span style={{ color: '#888', fontWeight: 400 }}>({item.reviewsCount} reviews)</span>
            </div>

            {item.prepTime && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  color: '#555',
                  fontSize: '0.84rem',
                }}
              >
                <Clock size={15} style={{ color: '#2d7a4f' }} />
                <span>Prep: {item.prepTime}</span>
              </div>
            )}

            {item.calories && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  color: '#555',
                  fontSize: '0.84rem',
                }}
              >
                <Flame size={15} style={{ color: '#e53935' }} />
                <span>{item.calories}</span>
              </div>
            )}
          </div>

          {/* Description */}
          <p style={{ fontSize: '0.94rem', lineHeight: 1.7, color: '#444', margin: '0 0 18px' }}>
            {item.desc}
          </p>

          {/* Sommelier Wine Pairing Card */}
          {item.winePairing && (
            <div
              style={{
                background: '#fcf8f0',
                border: '1px solid #fae3be',
                borderRadius: 12,
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: '#c8973a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  flexShrink: 0,
                }}
              >
                <Wine size={18} />
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '0.82rem', color: '#8c651f', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  Sommelier Pairing Recommendation
                </strong>
                <span style={{ fontSize: '0.9rem', color: '#333', fontWeight: 600 }}>
                  {item.winePairing}
                </span>
              </div>
            </div>
          )}

          {/* Authentic Ingredients List */}
          {item.ingredients && item.ingredients.length > 0 && (
            <div style={{ marginBottom: 22 }}>
              <h4
                style={{
                  margin: '0 0 10px',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  color: '#1a1a2e',
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                }}
              >
                Artisanal Ingredients
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {item.ingredients.map((ing, i) => (
                  <span
                    key={i}
                    style={{
                      background: '#f4fbf6',
                      border: '1px solid #d5ebd9',
                      color: '#2d7a4f',
                      padding: '4px 10px',
                      borderRadius: 16,
                      fontSize: '0.8rem',
                      fontWeight: 500,
                    }}
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Add-ons & Customizations */}
          {item.addons && item.addons.length > 0 && (
            <div style={{ marginBottom: 22 }}>
              <h4
                style={{
                  margin: '0 0 10px',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  color: '#1a1a2e',
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                }}
              >
                Chef's Add-ons & Customizations
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {item.addons.map((addon, i) => {
                  const isChecked = selectedAddons.some((a) => a.name === addon.name);

                  return (
                    <label
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 14px',
                        borderRadius: 10,
                        border: isChecked ? '1.5px solid #2d7a4f' : '1px solid #eee',
                        background: isChecked ? '#f8fdf9' : '#fafafa',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleAddon(addon)}
                          style={{
                            accentColor: '#2d7a4f',
                            width: 17,
                            height: 17,
                            cursor: 'pointer',
                          }}
                        />
                        <span style={{ fontSize: '0.88rem', fontWeight: 500, color: '#333' }}>
                          {addon.name}
                        </span>
                      </div>
                      <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#c8973a' }}>
                        +{addon.price === 0 ? 'FREE' : `₹${addon.price.toLocaleString('en-IN')}`}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special Kitchen Notes */}
          <div style={{ marginBottom: 24 }}>
            <label
              htmlFor="dish-note"
              style={{
                display: 'block',
                fontSize: '0.86rem',
                fontWeight: 600,
                color: '#555',
                marginBottom: 6,
              }}
            >
              Special Kitchen Instructions (Optional)
            </label>
            <input
              type="text"
              id="dish-note"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="e.g. Dressing on the side, extra crispy crust..."
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 8,
                border: '1px solid #ddd',
                fontSize: '0.88rem',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Action Row: Quantity + Add to Order */}
          <div className="dish-modal-footer">
            {/* Quantity Stepper */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                border: '1.5px solid #ddd',
                borderRadius: 30,
                padding: '6px 14px',
                background: '#fafafa',
              }}
            >
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: quantity <= 1 ? 'not-allowed' : 'pointer',
                  padding: 4,
                  opacity: quantity <= 1 ? 0.4 : 1,
                  display: 'flex',
                  alignItems: 'center',
                }}
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>

              <span style={{ fontWeight: 700, fontSize: '1rem', minWidth: 20, textAlign: 'center' }}>
                {quantity}
              </span>

              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 4,
                  display: 'flex',
                  alignItems: 'center',
                }}
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Add to Order Button */}
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAddToCart}
              style={{
                flex: 1,
                height: 48,
                fontSize: '1rem',
                fontWeight: 600,
                background: isAdded ? '#10b981' : '#2d7a4f',
                transition: 'background 0.3s, transform 0.15s',
              }}
            >
              {isAdded ? (
                <>
                  <Check size={18} style={{ marginRight: 8 }} /> Added to Order!
                </>
              ) : (
                <>
                  <ShoppingBag size={18} style={{ marginRight: 8 }} /> Add {quantity} to Order • ₹
                  {totalPrice.toLocaleString('en-IN')}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

