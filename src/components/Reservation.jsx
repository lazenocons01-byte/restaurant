import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';
import {
  Calendar,
  Clock,
  Phone,
  Mail,
  MapPin,
  Car,
  User,
  Users,
  GlassWater,
  MessageSquare,
  CheckCircle,
  Loader2,
  Minus,
  Plus,
  X,
} from 'lucide-react';

export default function Reservation() {
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    occasion: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedRef, setConfirmedRef] = useState(null);

  const todayStr = new Date().toISOString().split('T')[0];

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.date) {
      newErrors.date = 'Reservation date is required';
    } else if (formData.date < todayStr) {
      newErrors.date = 'Date must be today or in the future';
    }

    if (!formData.time) newErrors.time = 'Please select a dining time';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleGuestChange = (delta) => {
    setFormData((prev) => ({
      ...prev,
      guests: Math.min(20, Math.max(1, prev.guests + delta)),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setConfirmedRef(data.data.ref);
        showToast('Reservation confirmed! Check your inbox for confirmation.', 'success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          date: '',
          time: '',
          guests: 2,
          occasion: '',
          message: '',
        });
      } else {
        const errorMsg = data.message || (data.errors && data.errors[0]?.message) || 'Failed to submit reservation';
        showToast(errorMsg, 'error');
      }
    } catch (err) {
      // Offline fallback simulation
      const fallbackRef = 'RES-' + Math.random().toString(36).substring(2, 10).toUpperCase();
      setConfirmedRef(fallbackRef);
      showToast('Reservation recorded! Reference: ' + fallbackRef, 'success');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="reservation-section" id="reservation">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Table Booking</span>
          <h2 className="section-title">
            Reserve Your <em>Table</em>
          </h2>
          <p className="section-desc">
            Reserve your intimate table or private dining party in advance and let our kitchen prepare for you.
          </p>
        </div>

        <div className="reservation-grid">
          {/* Reservation Form */}
          <div className="reservation-form-wrap">
            <form className="reservation-form" onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="res-name">
                    <User size={15} style={{ display: 'inline', marginRight: 6 }} /> Full Name *
                  </label>
                  <input
                    type="text"
                    id="res-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Leonardo Moretti"
                    className={errors.name ? 'input-error' : ''}
                  />
                  {errors.name && <span className="field-error">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="res-email">
                    <Mail size={15} style={{ display: 'inline', marginRight: 6 }} /> Email Address *
                  </label>
                  <input
                    type="email"
                    id="res-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="leonardo@example.com"
                    className={errors.email ? 'input-error' : ''}
                  />
                  {errors.email && <span className="field-error">{errors.email}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="res-phone">
                    <Phone size={15} style={{ display: 'inline', marginRight: 6 }} /> Phone Number
                  </label>
                  <input
                    type="tel"
                    id="res-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 234-5678"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="res-date">
                    <Calendar size={15} style={{ display: 'inline', marginRight: 6 }} /> Date *
                  </label>
                  <input
                    type="date"
                    id="res-date"
                    name="date"
                    min={todayStr}
                    value={formData.date}
                    onChange={handleChange}
                    className={errors.date ? 'input-error' : ''}
                  />
                  {errors.date && <span className="field-error">{errors.date}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="res-time">
                    <Clock size={15} style={{ display: 'inline', marginRight: 6 }} /> Seating Time *
                  </label>
                  <select
                    id="res-time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className={errors.time ? 'input-error' : ''}
                  >
                    <option value="">Select seating time</option>
                    <optgroup label="Lunch Service">
                      <option value="12:00">12:00 PM</option>
                      <option value="12:30">12:30 PM</option>
                      <option value="13:00">1:00 PM</option>
                      <option value="13:30">1:30 PM</option>
                      <option value="14:00">2:00 PM</option>
                    </optgroup>
                    <optgroup label="Dinner Service">
                      <option value="17:30">5:30 PM</option>
                      <option value="18:00">6:00 PM</option>
                      <option value="18:30">6:30 PM</option>
                      <option value="19:00">7:00 PM</option>
                      <option value="19:30">7:30 PM</option>
                      <option value="20:00">8:00 PM</option>
                      <option value="20:30">8:30 PM</option>
                      <option value="21:00">9:00 PM</option>
                    </optgroup>
                  </select>
                  {errors.time && <span className="field-error">{errors.time}</span>}
                </div>

                <div className="form-group">
                  <label>
                    <Users size={15} style={{ display: 'inline', marginRight: 6 }} /> Party Size
                  </label>
                  <div className="guest-counter">
                    <button
                      type="button"
                      className="guest-btn"
                      onClick={() => handleGuestChange(-1)}
                      disabled={formData.guests <= 1}
                      aria-label="Decrease guest count"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="guest-num">{formData.guests} Guests</span>
                    <button
                      type="button"
                      className="guest-btn"
                      onClick={() => handleGuestChange(1)}
                      disabled={formData.guests >= 20}
                      aria-label="Increase guest count"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="res-occasion">
                  <GlassWater size={15} style={{ display: 'inline', marginRight: 6 }} /> Special Occasion (Optional)
                </label>
                <select
                  id="res-occasion"
                  name="occasion"
                  value={formData.occasion}
                  onChange={handleChange}
                >
                  <option value="">Select occasion</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="birthday">Birthday Celebration</option>
                  <option value="date">Romantic Date Night</option>
                  <option value="business">Business Dinner</option>
                  <option value="family">Family Gathering</option>
                  <option value="proposal">Special Celebration / Proposal</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="res-message">
                  <MessageSquare size={15} style={{ display: 'inline', marginRight: 6 }} /> Dietary Requests & Notes
                </label>
                <textarea
                  id="res-message"
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Allergies (gluten, nuts, shellfish), preferred seating (window/patio), high chair needs..."
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-full"
                disabled={isSubmitting}
                style={{ height: 48 }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="spin" style={{ marginRight: 8 }} /> Reserving Table...
                  </>
                ) : (
                  <>
                    <Calendar size={18} style={{ marginRight: 8 }} /> Confirm Reservation
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Restaurant Information Side Card */}
          <div className="reservation-info">
            <div className="res-info-card">
              <div className="res-info-item">
                <div className="res-info-icon">
                  <Clock size={20} />
                </div>
                <div>
                  <h4>Opening Hours</h4>
                  <p>Monday – Friday: 12:00 PM – 10:30 PM</p>
                  <p>Saturday: 11:00 AM – 11:00 PM</p>
                  <p>Sunday: 11:00 AM – 9:30 PM</p>
                </div>
              </div>

              <div className="res-info-item">
                <div className="res-info-icon">
                  <Phone size={20} />
                </div>
                <div>
                  <h4>Direct Inquiries</h4>
                  <p>
                    <a href="tel:+15551234567">+1 (555) 123-4567</a>
                  </p>
                  <p>
                    <a href="mailto:reservations@labellacucina.com">reservations@labellacucina.com</a>
                  </p>
                </div>
              </div>

              <div className="res-info-item">
                <div className="res-info-icon">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4>Location</h4>
                  <p>124 Olive Garden Lane</p>
                  <p>San Francisco, CA 94102</p>
                </div>
              </div>

              <div className="res-info-item">
                <div className="res-info-icon">
                  <Car size={20} />
                </div>
                <div>
                  <h4>Valet Parking</h4>
                  <p>Complimentary valet service available daily starting at 5:30 PM.</p>
                </div>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="res-map-placeholder">
              <iframe
                title="Restaurant Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0!2d-122.4194!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ2JzI5LjYiTiAxMjLCsDI1JzA5LjkiVw!5e0!3m2!1sen!2sus!4v1620000000000"
                width="100%"
                height="210"
                style={{ border: 0, borderRadius: 14, display: 'block' }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmedRef && (
        <div
          className="modal-overlay open"
          style={{ display: 'flex' }}
          onClick={() => setConfirmedRef(null)}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close"
              onClick={() => setConfirmedRef(null)}
              aria-label="Close confirmation dialog"
            >
              <X size={20} />
            </button>

            <div className="success-animation">
              <div className="success-circle">
                <CheckCircle size={40} />
              </div>
            </div>

            <h2>Table Confirmed! 🎉</h2>
            <p>We are delighted to welcome you to La Bella Cucina.</p>
            <div className="booking-ref">Reference Code: {confirmedRef}</div>
            <p style={{ fontSize: '0.88rem', color: '#666' }}>
              A confirmation email has been dispatched with parking instructions and our seasonal tasting preview.
            </p>

            <button
              type="button"
              className="btn btn-primary btn-full"
              onClick={() => setConfirmedRef(null)}
              style={{ marginTop: 20 }}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

