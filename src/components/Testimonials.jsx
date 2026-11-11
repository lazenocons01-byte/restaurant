import React, { useState, useEffect, useRef } from 'react';
import { testimonials } from '../data/testimonialsData';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const total = testimonials.length;
  const current = testimonials[currentIndex];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(nextSlide, 5000);
    return () => clearInterval(timerRef.current);
  }, [isPaused, currentIndex]);

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Guest Experiences</span>
          <h2 className="section-title">
            What Our Guests <em>Say</em>
          </h2>
          <p className="section-desc">
            We are honored to welcome culinary lovers, local regulars, and travelers from around the world.
          </p>
        </div>

        <div
          className="testimonials-wrapper"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            id="testimonial-display"
            key={current.id}
            style={{
              animation: 'fadeIn .4s ease both',
            }}
          >
            <div className="testimonial-card">
              <div className="testimonial-card__quote">
                <Quote size={40} style={{ color: '#c8973a', opacity: 0.6 }} />
              </div>

              <p className="testimonial-card__text">"{current.text}"</p>

              <div className="testimonial-card__rating">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} size={18} fill="#f59e0b" style={{ color: '#f59e0b' }} />
                ))}
              </div>

              <div className="testimonial-card__author">
                <img src={current.avatar} alt={current.name} loading="lazy" />
                <div>
                  <strong className="testimonial-card__name">{current.name}</strong>
                  <span className="testimonial-card__role">{current.role}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="testimonial-controls">
            <button
              type="button"
              className="testi-prev"
              onClick={prevSlide}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="testi-dots">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`testimonial-dot ${i === currentIndex ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              className="testi-next"
              onClick={nextSlide}
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

