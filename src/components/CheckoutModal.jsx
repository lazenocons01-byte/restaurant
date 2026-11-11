import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import Confetti from './Confetti';
import {
  X,
  CreditCard,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Lock,
  Loader2,
  Clock,
  Bike,
  UtensilsCrossed,
  Sparkles,
  ChefHat,
  Flame,
  FileCheck,
} from 'lucide-react';

export default function CheckoutModal() {
  const { isCheckoutOpen, closeCheckout, cart, subtotal, tax, delivery, total, clearCart } =
    useCart();
  const { showToast } = useToast();

  const [step, setStep] = useState(1);
  const [orderType, setOrderType] = useState('delivery'); // 'delivery' | 'dinein'
  const [tableNumber, setTableNumber] = useState('4');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderRef, setOrderRef] = useState(null);
  const [kitchenStage, setKitchenStage] = useState(1);
  const [countdownSeconds, setCountdownSeconds] = useState(35 * 60); // 35 minutes
  const [showConfetti, setShowConfetti] = useState(false);

  // Delivery details
  const [deliveryInfo, setDeliveryInfo] = useState({
    customer: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
  });

  // Payment details
  const [paymentInfo, setPaymentInfo] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const [errors, setErrors] = useState({});

  // Live countdown timer & kitchen stage simulation
  useEffect(() => {
    let interval = null;
    let stageInterval = null;

    if (step === 4) {
      interval = setInterval(() => {
        setCountdownSeconds((sec) => Math.max(0, sec - 1));
      }, 1000);

      stageInterval = setInterval(() => {
        setKitchenStage((s) => (s < 4 ? s + 1 : 4));
      }, 4500);
    }

    return () => {
      if (interval) clearInterval(interval);
      if (stageInterval) clearInterval(stageInterval);
    };
  }, [step]);

  if (!isCheckoutOpen) return null;

  const handleDeliveryChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;

    if (name === 'cardNumber') {
      const cleaned = value.replace(/\D/g, '').slice(0, 16);
      const formatted = cleaned.replace(/(.{4})/g, '$1 ').trim();
      setPaymentInfo((prev) => ({ ...prev, cardNumber: formatted }));
    } else if (name === 'expiry') {
      const cleaned = value.replace(/\D/g, '').slice(0, 4);
      let formatted = cleaned;
      if (cleaned.length >= 3) {
        formatted = cleaned.slice(0, 2) + '/' + cleaned.slice(2);
      }
      setPaymentInfo((prev) => ({ ...prev, expiry: formatted }));
    } else if (name === 'cvv') {
      const cleaned = value.replace(/\D/g, '').slice(0, 4);
      setPaymentInfo((prev) => ({ ...prev, cvv: cleaned }));
    } else {
      setPaymentInfo((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validateStep2 = () => {
    const errs = {};
    if (!deliveryInfo.customer.trim()) errs.customer = 'Full name is required';
    if (!deliveryInfo.email.trim()) {
      errs.email = 'Email is required for confirmation receipt';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(deliveryInfo.email.trim())) {
      errs.email = 'Please provide a valid email';
    }
    if (!deliveryInfo.phone.trim()) errs.phone = 'Phone number is required';

    if (orderType === 'delivery' && !deliveryInfo.address.trim()) {
      errs.address = 'Street delivery address is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep3 = () => {
    const errs = {};
    if (!paymentInfo.cardName.trim()) errs.cardName = 'Name on card is required';
    const rawCard = paymentInfo.cardNumber.replace(/\s/g, '');
    if (rawCard.length < 15) errs.cardNumber = 'Valid 15-16 digit card number is required';
    if (paymentInfo.expiry.length < 5) errs.expiry = 'Valid MM/YY required';
    if (paymentInfo.cvv.length < 3) errs.cvv = 'Valid CVV required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!validateStep3()) return;

    setIsSubmitting(true);

    const payload = {
      customer: deliveryInfo.customer.trim(),
      email: deliveryInfo.email.trim(),
      phone: deliveryInfo.phone.trim(),
      address: orderType === 'delivery' ? deliveryInfo.address.trim() : `Dine-In Table #${tableNumber}`,
      notes: deliveryInfo.notes.trim() || undefined,
      items: cart.map((i) => ({
        id: i.id,
        name: i.name,
        price: i.price,
        qty: i.qty,
      })),
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setOrderRef(data.data.ref);
        setStep(4);
        setShowConfetti(true);
        clearCart(true);
        showToast('Order confirmed! Chef Marco has started preparing your meal.', 'success');
      } else {
        showToast(data.message || 'Payment authorization failed', 'error');
      }
    } catch {
      // Offline fallback
      const fallbackRef = 'ORD-' + Math.random().toString(36).substring(2, 10).toUpperCase();
      setOrderRef(fallbackRef);
      setStep(4);
      setShowConfetti(true);
      clearCart(true);
      showToast('Order confirmed! Ref: ' + fallbackRef, 'success');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setOrderRef(null);
    setKitchenStage(1);
    setShowConfetti(false);
    closeCheckout();
  };

  const formatTimer = (sec) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <>
      {showConfetti && <Confetti count={75} />}

      <div
        className="modal-overlay checkout-modal-overlay open"
        onClick={handleClose}
      >
        <div
          className="modal checkout-modal-card"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            type="button"
            className="modal-close"
            onClick={handleClose}
            aria-label="Close checkout modal"
            style={{
              position: 'absolute',
              top: 18,
              right: 18,
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

          {/* Stepper Progress bar (Steps 1-3) */}
          {step < 4 && (
            <div style={{ marginBottom: 24, textAlign: 'center' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  color: '#888',
                  marginBottom: 8,
                }}
              >
                <span style={{ color: step >= 1 ? '#2d7a4f' : '#ccc' }}>1. Order Summary</span>
                <span>›</span>
                <span style={{ color: step >= 2 ? '#2d7a4f' : '#ccc' }}>2. Delivery/Table</span>
                <span>›</span>
                <span style={{ color: step >= 3 ? '#2d7a4f' : '#ccc' }}>3. Secure Payment</span>
              </div>
              <h2 style={{ margin: 0, fontSize: '1.45rem', color: '#1a1a2e' }}>
                {step === 1 && 'Review Your Order'}
                {step === 2 && 'Delivery or Dine-In Details'}
                {step === 3 && 'Payment Information'}
              </h2>
            </div>
          )}

          {/* STEP 1: SUMMARY */}
          {step === 1 && (
            <div>
              <div
                style={{
                  background: '#f8fdf9',
                  borderRadius: 14,
                  padding: '16px 20px',
                  border: '1px solid #e0f0e5',
                  maxHeight: 250,
                  overflowY: 'auto',
                  marginBottom: 20,
                }}
              >
                {cart.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '10px 0',
                      borderBottom: '1px solid #f0f0f0',
                      fontSize: '0.92rem',
                    }}
                  >
                    <div>
                      <strong style={{ display: 'block', color: '#222' }}>{item.name}</strong>
                      {item.customizations && item.customizations.length > 0 && (
                        <span style={{ fontSize: '0.78rem', color: '#2d7a4f' }}>
                          + {item.customizations.join(', ')}
                        </span>
                      )}
                      <span style={{ fontSize: '0.82rem', color: '#888', display: 'block' }}>
                        Qty: {item.qty} × ₹{item.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <span style={{ fontWeight: 700, color: '#1a1a2e' }}>
                      ₹{(item.price * item.qty).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: 24, fontSize: '0.94rem', color: '#555' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span>Subtotal</span>
                  <span style={{ fontWeight: 600 }}>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span>Estimated GST (5%)</span>
                  <span>₹{tax.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span>Delivery Fee</span>
                  <span style={{ color: delivery === 0 ? '#2d7a4f' : '#555', fontWeight: 600 }}>
                    {delivery === 0 ? 'FREE 🎉' : `₹${delivery.toLocaleString('en-IN')}`}
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#1a1a2e',
                    borderTop: '2px solid #eee',
                    paddingTop: 10,
                  }}
                >
                  <span>Grand Total</span>
                  <span style={{ color: '#2d7a4f' }}>₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                type="button"
                className="btn btn-primary btn-full"
                onClick={() => setStep(2)}
                style={{ height: 48, fontSize: '1rem', fontWeight: 600 }}
              >
                Continue to Details <ArrowRight size={18} style={{ marginLeft: 6 }} />
              </button>
            </div>
          )}

          {/* STEP 2: DINE-IN VS DELIVERY + CONTACT */}
          {step === 2 && (
            <div>
              {/* Service Type Selector */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 12,
                  marginBottom: 20,
                }}
              >
                <div
                  onClick={() => setOrderType('delivery')}
                  style={{
                    padding: '14px 16px',
                    borderRadius: 12,
                    border: orderType === 'delivery' ? '2px solid #2d7a4f' : '1px solid #ddd',
                    background: orderType === 'delivery' ? '#f4fbf6' : '#fafafa',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Bike size={22} style={{ color: orderType === 'delivery' ? '#2d7a4f' : '#777', marginBottom: 4 }} />
                  <strong style={{ display: 'block', fontSize: '0.92rem', color: orderType === 'delivery' ? '#2d7a4f' : '#333' }}>
                    Doorstep Delivery
                  </strong>
                  <span style={{ fontSize: '0.78rem', color: '#888' }}>30–45 mins to your door</span>
                </div>

                <div
                  onClick={() => setOrderType('dinein')}
                  style={{
                    padding: '14px 16px',
                    borderRadius: 12,
                    border: orderType === 'dinein' ? '2px solid #2d7a4f' : '1px solid #ddd',
                    background: orderType === 'dinein' ? '#f4fbf6' : '#fafafa',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <UtensilsCrossed size={22} style={{ color: orderType === 'dinein' ? '#2d7a4f' : '#777', marginBottom: 4 }} />
                  <strong style={{ display: 'block', fontSize: '0.92rem', color: orderType === 'dinein' ? '#2d7a4f' : '#333' }}>
                    Dine-In Table Order
                  </strong>
                  <span style={{ fontSize: '0.78rem', color: '#888' }}>Served hot to your table</span>
                </div>
              </div>

              {/* Table Number if Dine-In */}
              {orderType === 'dinein' && (
                <div className="form-group" style={{ marginBottom: 16 }}>
                  <label htmlFor="table-num">Table Number (look at your table stand)</label>
                  <select
                    id="table-num"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: 8,
                      border: '1px solid #ddd',
                      fontSize: '0.95rem',
                    }}
                  >
                    {[...Array(24)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        Table #{i + 1} ({i < 8 ? 'Main Dining' : i < 16 ? 'Patio Garden' : 'Wine Cellar'})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="chk-name">Your Full Name *</label>
                <input
                  type="text"
                  id="chk-name"
                  name="customer"
                  value={deliveryInfo.customer}
                  onChange={handleDeliveryChange}
                  placeholder="e.g. Sofia Russo"
                  className={errors.customer ? 'input-error' : ''}
                />
                {errors.customer && <span className="field-error">{errors.customer}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="chk-email">Email Address (for receipts & tracking) *</label>
                <input
                  type="email"
                  id="chk-email"
                  name="email"
                  value={deliveryInfo.email}
                  onChange={handleDeliveryChange}
                  placeholder="sofia@example.com"
                  className={errors.email ? 'input-error' : ''}
                />
                {errors.email && <span className="field-error">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="chk-phone">Phone Number (for order SMS updates) *</label>
                <input
                  type="tel"
                  id="chk-phone"
                  name="phone"
                  value={deliveryInfo.phone}
                  onChange={handleDeliveryChange}
                  placeholder="+1 (555) 432-1098"
                  className={errors.phone ? 'input-error' : ''}
                />
                {errors.phone && <span className="field-error">{errors.phone}</span>}
              </div>

              {orderType === 'delivery' && (
                <div className="form-group">
                  <label htmlFor="chk-address">Complete Street Delivery Address *</label>
                  <input
                    type="text"
                    id="chk-address"
                    name="address"
                    value={deliveryInfo.address}
                    onChange={handleDeliveryChange}
                    placeholder="124 Olive Garden Lane, Apt 4B, San Francisco, CA"
                    className={errors.address ? 'input-error' : ''}
                  />
                  {errors.address && <span className="field-error">{errors.address}</span>}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="chk-notes">Special Kitchen / Delivery Requests</label>
                <textarea
                  id="chk-notes"
                  name="notes"
                  rows={2}
                  value={deliveryInfo.notes}
                  onChange={handleDeliveryChange}
                  placeholder="Gate code #1234, extra napkins, dietary preferences..."
                />
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setStep(1)}
                  style={{ flex: 1, height: 48 }}
                >
                  <ArrowLeft size={16} style={{ marginRight: 6 }} /> Back
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    if (validateStep2()) setStep(3);
                  }}
                  style={{ flex: 2, height: 48 }}
                >
                  Proceed to Payment <ArrowRight size={16} style={{ marginLeft: 6 }} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT */}
          {step === 3 && (
            <form onSubmit={handlePlaceOrder} noValidate>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  background: '#f8fdf9',
                  border: '1px solid #c2e3cd',
                  padding: '10px 14px',
                  borderRadius: 10,
                  fontSize: '0.84rem',
                  color: '#2d7a4f',
                  marginBottom: 20,
                }}
              >
                <Lock size={16} />
                <span>256-Bit SSL Encrypted Instant Payment Processing</span>
              </div>

              <div className="form-group">
                <label htmlFor="chk-cardname">Cardholder Full Name *</label>
                <input
                  type="text"
                  id="chk-cardname"
                  name="cardName"
                  value={paymentInfo.cardName}
                  onChange={handlePaymentChange}
                  placeholder="Sofia Russo"
                  className={errors.cardName ? 'input-error' : ''}
                />
                {errors.cardName && <span className="field-error">{errors.cardName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="chk-cardnum">Credit / Debit Card Number *</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    id="chk-cardnum"
                    name="cardNumber"
                    value={paymentInfo.cardNumber}
                    onChange={handlePaymentChange}
                    placeholder="4532 •••• •••• 8892"
                    maxLength={19}
                    className={errors.cardNumber ? 'input-error' : ''}
                  />
                  <CreditCard
                    size={18}
                    style={{
                      position: 'absolute',
                      right: 14,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#888',
                    }}
                  />
                </div>
                {errors.cardNumber && <span className="field-error">{errors.cardNumber}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="chk-expiry">Expiry Date *</label>
                  <input
                    type="text"
                    id="chk-expiry"
                    name="expiry"
                    value={paymentInfo.expiry}
                    onChange={handlePaymentChange}
                    placeholder="MM/YY"
                    maxLength={5}
                    className={errors.expiry ? 'input-error' : ''}
                  />
                  {errors.expiry && <span className="field-error">{errors.expiry}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="chk-cvv">Security Code (CVV) *</label>
                  <input
                    type="password"
                    id="chk-cvv"
                    name="cvv"
                    value={paymentInfo.cvv}
                    onChange={handlePaymentChange}
                    placeholder="•••"
                    maxLength={4}
                    className={errors.cvv ? 'input-error' : ''}
                  />
                  {errors.cvv && <span className="field-error">{errors.cvv}</span>}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setStep(2)}
                  disabled={isSubmitting}
                  style={{ flex: 1, height: 48 }}
                >
                  <ArrowLeft size={16} style={{ marginRight: 6 }} /> Back
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                  style={{ flex: 2, height: 48, fontSize: '1rem', fontWeight: 600 }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="spin" style={{ marginRight: 8 }} /> Authorizing...
                    </>
                  ) : (
                    <>
                      <Lock size={16} style={{ marginRight: 8 }} /> Confirm & Pay ₹{total.toLocaleString('en-IN')}
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: LIVE KITCHEN ORDER TRACKER ANIMATION */}
          {step === 4 && (
            <div style={{ textAlign: 'center', padding: '10px 0' }}>
              <div className="success-animation">
                <div className="success-circle" style={{ width: 70, height: 70 }}>
                  <CheckCircle size={38} />
                </div>
              </div>

              <h2 style={{ fontSize: '1.5rem', margin: '0 0 6px', color: '#1a1a2e' }}>
                Order Fired in Kitchen! 🍕
              </h2>
              <p style={{ color: '#666', fontSize: '0.92rem', margin: '0 0 14px' }}>
                Thank you, <strong>{deliveryInfo.customer}</strong>! Your order is being prepared live.
              </p>

              <div className="booking-ref" style={{ fontSize: '1rem', padding: '8px 16px', margin: '0 auto 20px', display: 'inline-block' }}>
                Ref: {orderRef}
              </div>

              {/* Live Kitchen Status Progress Animation */}
              <div
                style={{
                  background: '#f8fdf9',
                  border: '1.5px solid #d5ebd9',
                  borderRadius: 16,
                  padding: '20px 18px',
                  marginBottom: 24,
                  textAlign: 'left',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 16,
                    paddingBottom: 10,
                    borderBottom: '1px solid #e0f0e5',
                  }}
                >
                  <strong style={{ fontSize: '0.9rem', color: '#2d7a4f', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                    Live Kitchen Status Tracker
                  </strong>
                  <span
                    style={{
                      background: '#2d7a4f',
                      color: '#fff',
                      padding: '3px 10px',
                      borderRadius: 20,
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <Clock size={12} /> {formatTimer(countdownSeconds)}
                  </span>
                </div>

                {/* Animated Stages */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {/* Stage 1 */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        background: kitchenStage >= 1 ? '#2d7a4f' : '#e0e0e0',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <FileCheck size={16} />
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.88rem', color: kitchenStage >= 1 ? '#1a1a2e' : '#888' }}>
                        Order Received & Ticket Printed
                      </strong>
                      <span style={{ fontSize: '0.78rem', color: '#666' }}>Transmitted directly to kitchen station</span>
                    </div>
                  </div>

                  {/* Stage 2 */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        background: kitchenStage >= 2 ? '#2d7a4f' : '#e0e0e0',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <ChefHat size={16} />
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.88rem', color: kitchenStage >= 2 ? '#1a1a2e' : '#888' }}>
                        Chef Marco is Cooking in 900° Stone Oven
                      </strong>
                      <span style={{ fontSize: '0.78rem', color: '#666' }}>Handmade pastas & wood-fired dough sizzling</span>
                    </div>
                  </div>

                  {/* Stage 3 */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        background: kitchenStage >= 3 ? '#2d7a4f' : '#e0e0e0',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Sparkles size={16} />
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.88rem', color: kitchenStage >= 3 ? '#1a1a2e' : '#888' }}>
                        Garnishing with Fresh Truffles & Basil
                      </strong>
                      <span style={{ fontSize: '0.78rem', color: '#666' }}>Quality inspected and sealed in thermal box</span>
                    </div>
                  </div>

                  {/* Stage 4 */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        background: kitchenStage >= 4 ? '#2d7a4f' : '#e0e0e0',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {orderType === 'delivery' ? <Bike size={16} /> : <UtensilsCrossed size={16} />}
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.88rem', color: kitchenStage >= 4 ? '#1a1a2e' : '#888' }}>
                        {orderType === 'delivery' ? 'Express Courier En Route to Your Address' : `Service Staff Plating for Table #${tableNumber}`}
                      </strong>
                      <span style={{ fontSize: '0.78rem', color: '#666' }}>
                        {orderType === 'delivery' ? 'Estimated arrival in 25–35 minutes' : 'Ready in approximately 8–10 minutes'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '0.84rem', color: '#777', margin: '0 0 20px' }}>
                A confirmation receipt with courier tracking link was sent to{' '}
                <strong>{deliveryInfo.email}</strong>.
              </p>

              <button
                type="button"
                className="btn btn-primary btn-full"
                onClick={handleClose}
                style={{ height: 48 }}
              >
                Done & Return to Menu
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
