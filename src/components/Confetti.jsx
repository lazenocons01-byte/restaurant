import React, { useEffect, useState } from 'react';

export default function Confetti({ count = 60 }) {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    const colors = ['#2d7a4f', '#c8973a', '#f9a825', '#4CAF50', '#e53935', '#3b82f6', '#9333ea'];
    const generated = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage across width
      y: -10 - Math.random() * 20,
      size: 6 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 0.4,
      duration: 2.2 + Math.random() * 1.5,
      rotation: Math.random() * 360,
      shape: Math.random() > 0.4 ? 'rect' : 'circle',
    }));

    setPieces(generated);

    const timer = setTimeout(() => {
      setPieces([]);
    }, 4000);

    return () => clearTimeout(timer);
  }, [count]);

  if (!pieces.length) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 100000,
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes confettiFall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            transform: translateY(105vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>

      {pieces.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.shape === 'rect' ? p.size * 1.5 : p.size,
            borderRadius: p.shape === 'circle' ? '50%' : 2,
            backgroundColor: p.color,
            animation: `confettiFall ${p.duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
            animationDelay: `${p.delay}s`,
            transform: `rotate(${p.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
}

