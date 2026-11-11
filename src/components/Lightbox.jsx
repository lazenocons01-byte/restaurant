import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Lightbox({ images, currentIndex, onClose, onPrev, onNext }) {
  const current = images[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onPrev, onNext]);

  if (!current) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.94)',
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(8px)',
        padding: '20px',
      }}
      onClick={onClose}
    >
      {/* Close button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close photo lightbox"
        style={{
          position: 'absolute',
          top: 24,
          right: 28,
          background: 'rgba(255, 255, 255, 0.15)',
          border: 'none',
          color: '#fff',
          width: 44,
          height: 44,
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.2s',
        }}
      >
        <X size={24} />
      </button>

      {/* Prev button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous image"
        style={{
          position: 'absolute',
          left: 24,
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(255, 255, 255, 0.15)',
          border: 'none',
          color: '#fff',
          width: 48,
          height: 48,
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.2s',
        }}
      >
        <ChevronLeft size={28} />
      </button>

      {/* Main photo and caption */}
      <div
        style={{
          maxWidth: '90vw',
          maxHeight: '82vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={current.src}
          alt={current.title}
          style={{
            maxWidth: '100%',
            maxHeight: '74vh',
            objectFit: 'contain',
            borderRadius: 12,
            boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
          }}
        />

        <div style={{ textAlign: 'center', marginTop: 14, color: '#fff' }}>
          <h4 style={{ margin: '0 0 4px', fontSize: '1.1rem', fontWeight: 600 }}>
            {current.title}
          </h4>
          <p style={{ margin: 0, fontSize: '0.88rem', color: '#ccc' }}>
            {current.caption}
          </p>
          <span style={{ fontSize: '0.78rem', color: '#888', marginTop: 4, display: 'inline-block' }}>
            {currentIndex + 1} / {images.length}
          </span>
        </div>
      </div>

      {/* Next button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next image"
        style={{
          position: 'absolute',
          right: 24,
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(255, 255, 255, 0.15)',
          border: 'none',
          color: '#fff',
          width: 48,
          height: 48,
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.2s',
        }}
      >
        <ChevronRight size={28} />
      </button>
    </div>
  );
}

