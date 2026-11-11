import React from 'react';
import { ToastProvider } from './context/ToastContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Menu from './components/Menu';
import Specials from './components/Specials';
import About from './components/About';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Reservation from './components/Reservation';
import CtaBanner from './components/CtaBanner';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import CheckoutModal from './components/CheckoutModal';
import ToastContainer from './components/ToastContainer';
import BackToTop from './components/BackToTop';
import FlyingFood from './components/FlyingFood';

export default function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <div className="app-container">
          <Navbar />
          <main>
            <Hero />
            <Features />
            <Menu />
            <Specials />
            <About />
            <Gallery />
            <Testimonials />
            <Reservation />
            <CtaBanner />
            <Contact />
          </main>
          <Footer />
          <CartSidebar />
          <CheckoutModal />
          <ToastContainer />
          <BackToTop />
          <FlyingFood />
        </div>
      </CartProvider>
    </ToastProvider>
  );
}

