import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { useToast } from './ToastContext';

const CartContext = createContext(null);

const STORAGE_KEY = 'labella_cucina_cart';
const FREE_DELIVERY_THRESHOLD = 999.0;
const STANDARD_DELIVERY_FEE = 99.0;
const TAX_RATE = 0.05; // 5% GST for restaurant dining & delivery

export function CartProvider({ children }) {
  const { showToast } = useToast();

  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (err) {
      console.warn('Failed to persist cart to localStorage', err);
    }
  }, [cart]);

  const addToCart = useCallback((item, quiet = false) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });

    if (!quiet) {
      showToast(`"${item.name}" added to your order`, 'success');
    }
  }, [showToast]);

  const removeFromCart = useCallback((id) => {
    setCart((prev) => {
      const target = prev.find((i) => i.id === id);
      if (target) {
        showToast(`"${target.name}" removed from order`, 'info');
      }
      return prev.filter((i) => i.id !== id);
    });
  }, [showToast]);

  const updateQty = useCallback((id, delta) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  }, []);

  const clearCart = useCallback((silent = false) => {
    setCart([]);
    if (!silent) {
      showToast('Order cart cleared', 'info');
    }
  }, [showToast]);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const openCheckout = useCallback(() => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  }, []);
  const closeCheckout = useCallback(() => setIsCheckoutOpen(false), []);

  const { subtotal, tax, delivery, total, itemCount, amountNeededForFreeDelivery } = useMemo(() => {
    const rawSubtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const subtotal = Math.round(rawSubtotal * 100) / 100;
    const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
    const delivery = subtotal >= FREE_DELIVERY_THRESHOLD || cart.length === 0 ? 0 : STANDARD_DELIVERY_FEE;
    const total = Math.round((subtotal + tax + delivery) * 100) / 100;
    const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);
    const amountNeededForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);

    return {
      subtotal,
      tax,
      delivery,
      total,
      itemCount,
      amountNeededForFreeDelivery,
    };
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        openCart,
        closeCart,
        isCheckoutOpen,
        setIsCheckoutOpen,
        openCheckout,
        closeCheckout,
        subtotal,
        tax,
        delivery,
        total,
        itemCount,
        freeDeliveryThreshold: FREE_DELIVERY_THRESHOLD,
        amountNeededForFreeDelivery,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
}

