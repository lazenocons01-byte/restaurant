import React, { useState } from 'react';
import { galleryImages } from '../data/galleryData';
import Lightbox from './Lightbox';
import { Maximize2 } from 'lucide-react';

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const handlePrev = () => {
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : galleryImages.length - 1));
  };
  const handleNext = () => {
    setLightboxIndex((prev) => (prev < galleryImages.length - 1 ? prev + 1 : 0));
  };

  return (
    <section className="gallery-section" id="gallery">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Visual Tour</span>
          <h2 className="section-title">
            A Feast for the <em>Eyes</em>
          </h2>
          <p className="section-desc">
            A glimpse into our world of sensory craftsmanship, warm ambiance, and artful presentation.
          </p>
        </div>

        <div className="gallery-grid">
          {galleryImages.map((img, idx) => (
            <div
              key={img.id}
              className={`gallery-item ${img.className || ''}`}
              onClick={() => openLightbox(idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') openLightbox(idx);
              }}
              aria-label={`Open ${img.title} in lightbox`}
            >
              <img src={img.thumb} alt={img.title} loading="lazy" />
              <div className="gallery-overlay">
                <Maximize2 size={24} style={{ color: '#fff' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={galleryImages}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </section>
  );
}

