import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, X, Minus, Plus, Trash2, ArrowRight, Sparkles } from 'lucide-react';

export default function CartSidebar() {
  const {
    cart,
    isCartOpen,
    closeCart,
    openCheckout,
    updateQty,
    removeFromCart,
    clearCart,
    subtotal,
    tax,
    delivery,
    total,
    amountNeededForFreeDelivery,
    freeDeliveryThreshold,
  } = useCart();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isCartOpen) closeCart();
    };

    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCartOpen, closeCart]);

  if (!isCartOpen) return null;

  const progressPercent = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  return (
    <>
      <div
        className="cart-overlay visible"
        onClick={closeCart}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          zIndex: 350,
          backdropFilter: 'blur(3px)',
        }}
      />

      <aside
        className="cart-sidebar open"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          maxWidth: 440,
          background: '#fff',
          zIndex: 400,
          boxShadow: '-10px 0 40px rgba(0,0,0,0.2)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Cart Header */}
        <div
          className="cart-header"
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #eee',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <ShoppingBag size={20} style={{ color: '#2d7a4f' }} /> Your Order (
            {cart.reduce((s, i) => s + i.qty, 0)})
          </h3>

          <button
            type="button"
            className="cart-close"
            onClick={closeCart}
            aria-label="Close cart drawer"
            style={{
              background: '#f4f4f4',
              border: 'none',
              borderRadius: 8,
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Free Delivery Meter */}
        <div style={{ padding: '14px 24px', background: '#f8fdf9', borderBottom: '1px solid #e0f0e5' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.82rem',
              fontWeight: 600,
              marginBottom: 6,
              color: amountNeededForFreeDelivery === 0 ? '#2d7a4f' : '#444',
            }}
          >
            <span>
              {amountNeededForFreeDelivery === 0 ? (
                <>
                  <Sparkles size={14} style={{ display: 'inline', marginRight: 4 }} /> You qualify for FREE Delivery!
                </>
              ) : (
                `Add ₹${Math.ceil(amountNeededForFreeDelivery).toLocaleString('en-IN')} more for FREE delivery`
              )}
            </span>
            <span>{progressPercent}%</span>
          </div>

          <div
            style={{
              width: '100%',
              height: 6,
              background: '#e0e0e0',
              borderRadius: 3,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${progressPercent}%`,
                height: '100%',
                background: '#2d7a4f',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div
          className="cart-items"
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px 24px',
          }}
        >
          {cart.length === 0 ? (
            <div
              className="cart-empty"
              style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: '#888',
              }}
            >
              <ShoppingBag size={56} style={{ color: '#ccc', marginBottom: 16 }} />
              <h4 style={{ margin: '0 0 8px', color: '#333' }}>Your order is empty</h4>
              <p style={{ margin: '0 0 20px', fontSize: '0.9rem' }}>
                Explore our signature pastas, wood-fired pizzas, and dolci to begin.
              </p>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => {
                  closeCart();
                  const el = document.querySelector('#menu');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="cart-item"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    paddingBottom: 14,
                    borderBottom: '1px solid #f0f0f0',
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 10,
                      objectFit: 'cover',
                      flexShrink: 0,
                    }}
                  />

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <strong
                      style={{
                        display: 'block',
                        fontSize: '0.9rem',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        color: '#222',
                      }}
                    >
                      {item.name}
                    </strong>
                    <span style={{ fontSize: '0.86rem', color: '#c8973a', fontWeight: 600 }}>
                      ₹{(item.price * item.qty).toLocaleString('en-IN')}{' '}
                      <small style={{ color: '#888', fontWeight: 400 }}>
                        (₹{item.price.toLocaleString('en-IN')} ea)
                      </small>
                    </span>
                  </div>

                  {/* Quantity Stepper */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      background: '#f8f8f8',
                      borderRadius: 20,
                      padding: '3px 8px',
                      border: '1px solid #ddd',
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => updateQty(item.id, -1)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 3,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={12} />
                    </button>
                    <span style={{ fontSize: '0.86rem', fontWeight: 700, minWidth: 16, textAlign: 'center' }}>
                      {item.qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQty(item.id, 1)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 3,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                      aria-label="Increase quantity"
                    >
                      <Plus size={12} />
                    </button>
                  </div>

                  {/* Delete Item */}
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#bbb',
                      cursor: 'pointer',
                      padding: 6,
                    }}
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Footer */}
        {cart.length > 0 && (
          <div
            className="cart-footer"
            style={{
              padding: '20px 24px 24px',
              borderTop: '1px solid #eee',
              background: '#fff',
            }}
          >
            <div className="cart-totals" style={{ marginBottom: 16 }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.88rem',
                  color: '#666',
                  marginBottom: 6,
                }}
              >
                <span>Subtotal</span>
                <span style={{ fontWeight: 600, color: '#333' }}>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.88rem',
                  color: '#666',
                  marginBottom: 6,
                }}
              >
                <span>Estimated GST (5%)</span>
                <span style={{ fontWeight: 600, color: '#333' }}>₹{tax.toLocaleString('en-IN')}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.88rem',
                  color: '#666',
                  marginBottom: 10,
                }}
              >
                <span>Delivery</span>
                <span style={{ fontWeight: 600, color: delivery === 0 ? '#2d7a4f' : '#333' }}>
                  {delivery === 0 ? 'FREE 🎉' : `₹${delivery.toLocaleString('en-IN')}`}
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  color: '#1a1a2e',
                  borderTop: '2px solid #eee',
                  paddingTop: 10,
                }}
              >
                <span>Total</span>
                <span style={{ color: '#2d7a4f' }}>₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-primary btn-full"
              onClick={openCheckout}
              style={{ height: 48, fontSize: '1rem', fontWeight: 600 }}
            >
              Checkout <ArrowRight size={18} style={{ marginLeft: 8 }} />
            </button>

            <button
              type="button"
              className="btn btn-outline btn-full"
              onClick={() => clearCart(false)}
              style={{
                marginTop: 8,
                fontSize: '0.84rem',
                padding: '8px 16px',
                border: '1px solid #ddd',
                color: '#777',
              }}
            >
              Clear Cart
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

