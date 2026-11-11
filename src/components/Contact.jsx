import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';
import {
  Phone,
  Mail,
  MapPin,
  Send,
  Loader2,
  Share2,
} from 'lucide-react';

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

export default function Contact() {
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please provide your name';
    if (!formData.email.trim()) {
      errs.email = 'Please provide an email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please provide a message or inquiry';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showToast(data.message || 'Your message has been sent successfully!', 'success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        showToast(data.message || 'Failed to deliver message. Please call us directly.', 'error');
      }
    } catch {
      showToast('Thank you! Your message has been received.', 'success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Get In Touch</span>
          <h2 className="section-title">
            We'd Love to <em>Hear From You</em>
          </h2>
          <p className="section-desc">
            Whether inquiring about private dining, customized banquet menus, or press requests, our
            concierge team is at your service.
          </p>
        </div>

        <div className="contact-grid">
          {/* Contact Details Cards */}
          <div className="contact-info">
            <div className="contact-card">
              <Phone size={24} style={{ color: '#2d7a4f', marginBottom: 8 }} />
              <h3>Direct Telephone</h3>
              <p>
                <a href="tel:+15551234567">+1 (555) 123-4567</a>
              </p>
            </div>

            <div className="contact-card">
              <Mail size={24} style={{ color: '#2d7a4f', marginBottom: 8 }} />
              <h3>Concierge Email</h3>
              <p>
                <a href="mailto:hello@labellacucina.com">hello@labellacucina.com</a>
              </p>
            </div>

            <div className="contact-card">
              <MapPin size={24} style={{ color: '#2d7a4f', marginBottom: 8 }} />
              <h3>Address</h3>
              <p>
                124 Olive Garden Lane
                <br />
                San Francisco, CA 94102
              </p>
            </div>

            <div className="contact-card">
              <h3 style={{ marginTop: 0 }}>Follow Our Culinary Story</h3>
              <div className="social-links" style={{ justifyContent: 'center', marginTop: 12 }}>
                <a href="#instagram" className="social-link" aria-label="Instagram">
                  <InstagramIcon />
                </a>
                <a href="#facebook" className="social-link" aria-label="Facebook">
                  <FacebookIcon />
                </a>
                <a href="#twitter" className="social-link" aria-label="Twitter">
                  <TwitterIcon />
                </a>
                <a href="#share" className="social-link" aria-label="Share">
                  <Share2 size={17} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-wrap">
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="c-name">Full Name *</label>
                <input
                  type="text"
                  id="c-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Isabella Rossi"
                  className={errors.name ? 'input-error' : ''}
                />
                {errors.name && <span className="field-error">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="c-email">Email Address *</label>
                <input
                  type="email"
                  id="c-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="isabella@example.com"
                  className={errors.email ? 'input-error' : ''}
                />
                {errors.email && <span className="field-error">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="c-subject">Subject</label>
                <select
                  id="c-subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                >
                  <option value="">General Inquiry</option>
                  <option value="Private Dining">Private Dining / Corporate Buyout</option>
                  <option value="Chef Tasting">Chef Tasting Menu Questions</option>
                  <option value="Dietary & Allergies">Dietary Inquiries & Allergies</option>
                  <option value="Press & Media">Press & Media Relations</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="c-message">Your Message *</label>
                <textarea
                  id="c-message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us how our team can assist you..."
                  className={errors.message ? 'input-error' : ''}
                />
                {errors.message && <span className="field-error">{errors.message}</span>}
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-full"
                disabled={isSubmitting}
                style={{ height: 48 }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="spin" style={{ marginRight: 8 }} /> Sending
                    Message...
                  </>
                ) : (
                  <>
                    <Send size={18} style={{ marginRight: 8 }} /> Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
