import React, { useState, useEffect, useCallback } from 'react';

// Custom event name so any component can trigger flying item animation
export const TRIGGER_FLY_EVENT = 'labella_fly_to_cart';

export function triggerFlyToCart(event, imageSrc) {
  let startX = window.innerWidth / 2;
  let startY = window.innerHeight / 2;

  if (event && event.currentTarget) {
    const rect = event.currentTarget.getBoundingClientRect();
    startX = rect.left + rect.width / 2;
    startY = rect.top + rect.height / 2;
  } else if (event && event.clientX) {
    startX = event.clientX;
    startY = event.clientY;
  }

  // Find cart button in navbar
  const cartBtn = document.querySelector('.cart-btn');
  let endX = window.innerWidth - 60;
  let endY = 30;

  if (cartBtn) {
    const cartRect = cartBtn.getBoundingClientRect();
    endX = cartRect.left + cartRect.width / 2;
    endY = cartRect.top + cartRect.height / 2;
  }

  const detail = {
    id: Date.now() + Math.random(),
    imageSrc,
    startX,
    startY,
    endX,
    endY,
  };

  window.dispatchEvent(new CustomEvent(TRIGGER_FLY_EVENT, { detail }));
}

export default function FlyingFood() {
  const [particles, setParticles] = useState([]);

  const handleFly = useCallback((e) => {
    const { detail } = e;
    setParticles((prev) => [...prev, detail]);

    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== detail.id));
    }, 750);
  }, []);

  useEffect(() => {
    window.addEventListener(TRIGGER_FLY_EVENT, handleFly);
    return () => window.removeEventListener(TRIGGER_FLY_EVENT, handleFly);
  }, [handleFly]);

  if (!particles.length) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 999999,
        overflow: 'hidden',
      }}
    >
      {particles.map((p) => (
        <FlyingParticle key={p.id} particle={p} />
      ))}
    </div>
  );
}

function FlyingParticle({ particle }) {
  const [pos, setPos] = useState({ x: particle.startX, y: particle.startY, scale: 1, opacity: 1 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setPos({
        x: particle.endX,
        y: particle.endY,
        scale: 0.25,
        opacity: 0.8,
      });
    }, 20);

    return () => clearTimeout(timer);
  }, [particle]);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 54,
        height: 54,
        borderRadius: '50%',
        boxShadow: '0 8px 24px rgba(45, 122, 79, 0.45)',
        border: '2.5px solid #2d7a4f',
        overflow: 'hidden',
        background: '#fff',
        transform: `translate3d(${pos.x - 27}px, ${pos.y - 27}px, 0) scale(${pos.scale})`,
        opacity: pos.opacity,
        transition: 'transform 0.65s cubic-bezier(0.2, 0.8, 0.25, 1), opacity 0.65s ease',
        willChange: 'transform, opacity',
      }}
    >
      <img
        src={particle.imageSrc}
        alt="flying dish"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>
  );
}

