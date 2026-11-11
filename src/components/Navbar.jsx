import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Calendar, Menu as MenuIcon, X, Leaf } from 'lucide-react';

export default function Navbar() {
  const { itemCount, openCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartAnimate, setCartAnimate] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (itemCount > 0) {
      setCartAnimate(true);
      const timer = setTimeout(() => setCartAnimate(false), 450);
      return () => clearTimeout(timer);
    }
  }, [itemCount]);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Menu', href: '#menu' },
    { label: 'Specials', href: '#specials' },
    { label: 'About', href: '#about' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Reviews', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const navH = 75;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="nav-container">
        <a href="#home" className="nav-logo" onClick={(e) => handleNavClick(e, '#home')}>
          <span className="logo-icon">
            <Leaf size={20} />
          </span>
          <span className="logo-text">
            La Bella <span>Cucina</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <ul className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`} id="nav-links">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="nav-link"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
          {/* Mobile-only reservation button */}
          <li className="mobile-only-reserve" style={{ display: isMobileMenuOpen ? 'block' : 'none', marginTop: 12 }}>
            <a
              href="#reservation"
              className="btn btn-primary btn-full"
              onClick={(e) => handleNavClick(e, '#reservation')}
            >
              <Calendar size={16} style={{ marginRight: 6 }} /> Book Table
            </a>
          </li>
        </ul>

        {/* Action Buttons */}
        <div className="nav-actions">
          <button
            type="button"
            className={`cart-btn ${cartAnimate ? 'cart-bounce' : ''}`}
            onClick={openCart}
            aria-label={`Open shopping cart with ${itemCount} items`}
          >
            <ShoppingBag size={20} />
            {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
          </button>

          <a
            href="#reservation"
            className="btn btn-primary nav-reserve-btn"
            onClick={(e) => handleNavClick(e, '#reservation')}
          >
            <Calendar size={16} />
            <span>Reserve</span>
          </a>

          <button
            type="button"
            className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
}

