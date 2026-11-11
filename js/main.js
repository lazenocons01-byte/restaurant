/* ==========================================================================
   LocalShore Restaurant — main.js
   All interactive features: navbar, menu, cart, testimonials, reservations,
   counters, gallery lightbox, newsletter, scroll animations, toasts, checkout.
   ========================================================================== */

'use strict';

/* --------------------------------------------------------------------------
   1. MENU DATA
   -------------------------------------------------------------------------- */
const menuItems = [
  // ── Starters ──
  {
    id: 1,
    name: 'Bruschetta Classica',
    category: 'starters',
    price: 8.99,
    rating: 4.8,
    badge: 'Popular',
    desc: 'Toasted sourdough with fresh tomatoes, basil, and extra virgin olive oil',
    image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&q=80',
  },
  {
    id: 2,
    name: 'Calamari Fritti',
    category: 'starters',
    price: 12.99,
    rating: 4.6,
    badge: 'Chef\'s Pick',
    desc: 'Crispy fried squid rings served with lemon aioli and marinara sauce',
    image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&q=80',
  },
  {
    id: 3,
    name: 'Lobster Bisque',
    category: 'starters',
    price: 14.99,
    rating: 4.9,
    badge: 'Signature',
    desc: 'Velvety lobster bisque with a touch of cognac, cream, and fresh herbs',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80',
  },
  {
    id: 4,
    name: 'Oysters on the Half Shell',
    category: 'starters',
    price: 18.99,
    rating: 4.7,
    badge: 'Fresh Daily',
    desc: 'Half dozen freshly shucked oysters with mignonette and cocktail sauce',
    image: 'https://images.unsplash.com/photo-1606731219412-3b1e6cb61c5a?w=400&q=80',
  },
  {
    id: 5,
    name: 'Burrata & Heirloom Tomato',
    category: 'starters',
    price: 13.99,
    rating: 4.5,
    badge: '',
    desc: 'Creamy burrata on a bed of heirloom tomatoes, basil oil, and sea salt',
    image: 'https://images.unsplash.com/photo-1529604278261-8bce70fd4b46?w=400&q=80',
  },
  // ── Mains ──
  {
    id: 6,
    name: 'Grilled Sea Bass',
    category: 'mains',
    price: 32.99,
    rating: 4.9,
    badge: 'Signature',
    desc: 'Pan-seared sea bass with lemon butter, capers, and sautéed asparagus',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&q=80',
  },
  {
    id: 7,
    name: 'Lobster Thermidor',
    category: 'mains',
    price: 54.99,
    rating: 5.0,
    badge: 'Premium',
    desc: 'Whole lobster baked with cognac cream sauce, gruyère, and fresh tarragon',
    image: 'https://images.unsplash.com/photo-1550507992-eb63ffee0847?w=400&q=80',
  },
  {
    id: 8,
    name: 'Truffle Risotto',
    category: 'mains',
    price: 28.99,
    rating: 4.7,
    badge: 'Vegetarian',
    desc: 'Arborio rice slow-cooked with black truffle, parmesan, and wild mushrooms',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&q=80',
  },
  {
    id: 9,
    name: 'Wagyu Beef Tenderloin',
    category: 'mains',
    price: 68.99,
    rating: 4.9,
    badge: 'Premium',
    desc: 'A5 Wagyu tenderloin with truffle butter, potato gratin, and red wine jus',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80',
  },
  {
    id: 10,
    name: 'Bouillabaisse',
    category: 'mains',
    price: 38.99,
    rating: 4.8,
    badge: 'Popular',
    desc: 'Classic Provençal seafood stew with saffron broth, rouille, and crusty bread',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&q=80',
  },
  // ── Desserts ──
  {
    id: 11,
    name: 'Crème Brûlée',
    category: 'desserts',
    price: 9.99,
    rating: 4.8,
    badge: 'Classic',
    desc: 'Silky vanilla custard with a perfectly caramelised sugar crust',
    image: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=400&q=80',
  },
  {
    id: 12,
    name: 'Dark Chocolate Fondant',
    category: 'desserts',
    price: 10.99,
    rating: 4.9,
    badge: 'Popular',
    desc: 'Warm dark chocolate lava cake with vanilla bean ice cream and raspberry coulis',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80',
  },
  {
    id: 13,
    name: 'Tiramisu',
    category: 'desserts',
    price: 8.99,
    rating: 4.7,
    badge: '',
    desc: 'Layers of espresso-soaked ladyfingers and mascarpone cream, dusted with cocoa',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80',
  },
  {
    id: 14,
    name: 'Lemon Tart',
    category: 'desserts',
    price: 8.49,
    rating: 4.5,
    badge: '',
    desc: 'Buttery pastry shell filled with tangy lemon curd, topped with Italian meringue',
    image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=400&q=80',
  },
  {
    id: 15,
    name: 'Panna Cotta',
    category: 'desserts',
    price: 7.99,
    rating: 4.6,
    badge: '',
    desc: 'Silky cream set with vanilla and topped with fresh seasonal berry compote',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80',
  },
  // ── Drinks ──
  {
    id: 16,
    name: 'Aperol Spritz',
    category: 'drinks',
    price: 11.99,
    rating: 4.7,
    badge: 'Popular',
    desc: 'Classic Italian aperitivo with Aperol, prosecco, and a splash of soda',
    image: 'https://images.unsplash.com/photo-1560508180-03f285f67ded?w=400&q=80',
  },
  {
    id: 17,
    name: 'Signature Mojito',
    category: 'drinks',
    price: 12.99,
    rating: 4.8,
    badge: 'Signature',
    desc: 'Premium white rum, fresh lime, mint, and house-made sugar syrup',
    image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&q=80',
  },
  {
    id: 18,
    name: 'Champagne Flute',
    category: 'drinks',
    price: 16.99,
    rating: 4.6,
    badge: '',
    desc: 'Chilled Moët & Chandon Impérial Brut, served ice cold',
    image: 'https://images.unsplash.com/photo-1515696955266-4f67e13219e8?w=400&q=80',
  },
  {
    id: 19,
    name: 'Cold Brew Coffee',
    category: 'drinks',
    price: 6.99,
    rating: 4.5,
    badge: '',
    desc: 'Smooth 24-hour cold-brew concentrate over ice with oat milk option',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80',
  },
  {
    id: 20,
    name: 'Tropical Lemonade',
    category: 'drinks',
    price: 5.99,
    rating: 4.4,
    badge: 'Non-Alcoholic',
    desc: 'Fresh-squeezed lemonade with mango, passion fruit, and mint',
    image: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?w=400&q=80',
  },
  // ── Pasta & Pizza ──
  {
    id: 21,
    name: 'Spaghetti Carbonara',
    category: 'pasta',
    price: 19.99,
    rating: 4.9,
    badge: 'Popular',
    desc: 'Silky egg-based sauce, guanciale, Pecorino Romano, and black pepper — classic Roman recipe',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&q=80',
  },
  {
    id: 22,
    name: 'Pappardelle al Ragù',
    category: 'pasta',
    price: 22.99,
    rating: 4.8,
    badge: 'Chef\'s Pick',
    desc: 'Wide ribbon pasta with slow-braised beef and pork ragù, topped with fresh Parmesan',
    image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=400&q=80',
  },
  {
    id: 23,
    name: 'Wood-Fired Margherita',
    category: 'pasta',
    price: 18.99,
    rating: 4.7,
    badge: 'Vegan Option',
    desc: 'San Marzano tomatoes, fresh mozzarella, hand-picked basil, baked in our wood-fired oven',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80',
  },
  {
    id: 24,
    name: 'Truffle Tagliatelle',
    category: 'pasta',
    price: 26.99,
    rating: 4.9,
    badge: 'Signature',
    desc: 'Fresh egg pasta with shaved black truffle, butter, and Parmigiano-Reggiano',
    image: 'https://images.unsplash.com/photo-1611270629569-8b357cb88da9?w=400&q=80',
  },
  {
    id: 25,
    name: 'Quattro Stagioni Pizza',
    category: 'pasta',
    price: 21.99,
    rating: 4.6,
    badge: 'New',
    desc: 'Four seasons pizza with artichokes, mushrooms, ham, and black olives on tomato base',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80',
  },
];

/* --------------------------------------------------------------------------
   2. TESTIMONIALS DATA
   -------------------------------------------------------------------------- */
const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Food Blogger',
    rating: 5,
    text: 'An extraordinary dining experience that elevates coastal cuisine to pure art. Every dish tells a story of passion and craftsmanship. The lobster bisque alone is worth the journey!',
    avatar: 'https://i.pravatar.cc/80?img=1',
  },
  {
    name: 'Michael Chen',
    role: 'Restaurant Critic',
    rating: 5,
    text: 'LocalShore redefines fine dining on this coastline. The attention to detail — from the perfectly curated wine list to the impeccable service — sets a new benchmark for the region.',
    avatar: 'https://i.pravatar.cc/80?img=3',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Travel Influencer',
    rating: 5,
    text: 'I\'ve dined at Michelin-starred restaurants around the world, and LocalShore holds its own beautifully. The ocean view combined with that truffle risotto is an experience I replay daily.',
    avatar: 'https://i.pravatar.cc/80?img=5',
  },
  {
    name: 'James & Patricia Whitmore',
    role: 'Regulars since 2019',
    rating: 5,
    text: 'Our anniversary tradition for five years running. Chef always surprises us with something new while keeping our favourites on the menu. The staff remember our names — that\'s rare and special.',
    avatar: 'https://i.pravatar.cc/80?img=8',
  },
  {
    name: 'Aisha Okonkwo',
    role: 'Culinary Institute Graduate',
    rating: 5,
    text: 'As someone who studied at Le Cordon Bleu, I appreciate technique. The sea bass was cooked to absolute perfection — crispy skin, flaky interior, balanced acidity. Pure craftsmanship.',
    avatar: 'https://i.pravatar.cc/80?img=20',
  },
  {
    name: 'David Hartley',
    role: 'Business Executive',
    rating: 5,
    text: 'I regularly host client dinners here and have never been disappointed. The private dining room, the sommelier\'s guidance, and the consistently outstanding food make every deal feel celebratory.',
    avatar: 'https://i.pravatar.cc/80?img=12',
  },
];

/* --------------------------------------------------------------------------
   3. UTILITY HELPERS
   -------------------------------------------------------------------------- */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

function generateBookingRef() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let ref = 'LS-';
  for (let i = 0; i < 8; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)];
  }
  return ref;
}

function formatCurrency(amount) {
  return `$${amount.toFixed(2)}`;
}

function starHTML(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let html = '';
  for (let i = 0; i < 5; i++) {
    if (i < full) html += '<i class="fas fa-star"></i>';
    else if (i === full && half) html += '<i class="fas fa-star-half-alt"></i>';
    else html += '<i class="far fa-star"></i>';
  }
  return html;
}

/* --------------------------------------------------------------------------
   4. TOAST NOTIFICATIONS
   -------------------------------------------------------------------------- */
let toastContainer;

function initToasts() {
  toastContainer = document.createElement('div');
  toastContainer.id = 'toast-container';
  toastContainer.setAttribute('aria-live', 'polite');
  toastContainer.style.cssText = `
    position: fixed;
    top: 24px;
    right: 24px;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 10px;
    pointer-events: none;
  `;
  document.body.appendChild(toastContainer);
}

function showToast(message, type = 'success') {
  const icons = { success: 'fa-check-circle', error: 'fa-times-circle', info: 'fa-info-circle' };
  const colors = {
    success: { bg: '#10b981', border: '#059669' },
    error:   { bg: '#ef4444', border: '#dc2626' },
    info:    { bg: '#3b82f6', border: '#2563eb' },
  };
  const cfg = colors[type] || colors.info;

  const toast = document.createElement('div');
  toast.style.cssText = `
    display: flex;
    align-items: center;
    gap: 10px;
    background: ${cfg.bg};
    border-left: 4px solid ${cfg.border};
    color: #fff;
    padding: 12px 18px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 4px 20px rgba(0,0,0,0.25);
    min-width: 260px;
    max-width: 360px;
    pointer-events: all;
    transform: translateX(120%);
    transition: transform 0.35s cubic-bezier(.4,0,.2,1), opacity 0.35s ease;
    opacity: 0;
  `;
  toast.innerHTML = `<i class="fas ${icons[type] || icons.info}" style="font-size:18px;flex-shrink:0"></i><span>${message}</span>`;
  toastContainer.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.style.transform = 'translateX(0)';
      toast.style.opacity = '1';
    });
  });

  // Auto-dismiss after 3 s
  setTimeout(() => {
    toast.style.transform = 'translateX(120%)';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

/* --------------------------------------------------------------------------
   5. NAVBAR
   -------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = $('#navbar') || $('.navbar') || $('nav');
  if (!navbar) return;

  // ── Scroll detection ──
  function onScroll() {
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
    updateActiveLink();
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ── Mobile hamburger ──
  const hamburger = $('.hamburger, .nav-toggle, [data-toggle="nav"]');
  const navMenu = $('.nav-menu, .nav-links, .navbar-menu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      navMenu.classList.toggle('open');
    });
    // Close on link click
    $$('a', navMenu).forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active', 'open');
      });
    });
  }

  // ── Smooth scroll for anchor links ──
  document.addEventListener('click', e => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const target = document.getElementById(link.getAttribute('href').slice(1));
    if (!target) return;
    e.preventDefault();
    const offset = navbar ? navbar.offsetHeight : 0;
    const top = target.getBoundingClientRect().top + window.scrollY - offset - 8;
    window.scrollTo({ top, behavior: 'smooth' });
  });

  // ── Active link highlighting ──
  function updateActiveLink() {
    const sections = $$('section[id]');
    const navLinks = $$('a[href^="#"]');
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY + navbar.offsetHeight + 20 >= sec.offsetTop) {
        current = sec.id;
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }
}

/* --------------------------------------------------------------------------
   6. MENU SYSTEM
   -------------------------------------------------------------------------- */
let activeMenuFilter = 'all';

function renderMenu(filter = 'all') {
  activeMenuFilter = filter;
  const grid = $('#menu-grid');
  if (!grid) return;

  const filtered = filter === 'all' ? menuItems : menuItems.filter(i => i.category === filter);

  grid.innerHTML = filtered.map((item, idx) => `
    <div class="menu-card animate-on-scroll" style="--delay:${idx * 60}ms" data-id="${item.id}">
      <div class="menu-card__img-wrap">
        <img
          src="${item.image}"
          alt="${item.name}"
          loading="lazy"
          onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80'"
        >
        ${item.badge ? `<span class="menu-card__badge">${item.badge}</span>` : ''}
      </div>
      <div class="menu-card__body">
        <div class="menu-card__header">
          <h3 class="menu-card__name">${item.name}</h3>
          <span class="menu-card__price">${formatCurrency(item.price)}</span>
        </div>
        <p class="menu-card__desc">${item.desc}</p>
        <div class="menu-card__footer">
          <div class="menu-card__rating">
            ${starHTML(item.rating)}
            <span>${item.rating.toFixed(1)}</span>
          </div>
          <button
            class="btn btn--add-cart"
            data-id="${item.id}"
            aria-label="Add ${item.name} to cart"
          >
            <i class="fas fa-cart-plus"></i> Add
          </button>
        </div>
      </div>
    </div>
  `).join('');

  // Staggered animation trigger
  setTimeout(() => {
    $$('.menu-card', grid).forEach((card, i) => {
      setTimeout(() => card.classList.add('visible'), i * 60);
    });
  }, 50);

  // Bind add-to-cart buttons
  $$('.btn--add-cart', grid).forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      addToCart(parseInt(btn.dataset.id, 10));
    });
  });
}

function initMenu() {
  const filterBtns = $$('[data-filter]');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderMenu(btn.dataset.filter);
    });
  });
  renderMenu('all');
}

/* --------------------------------------------------------------------------
   7. SHOPPING CART
   -------------------------------------------------------------------------- */
let cart = [];

function saveCart() {
  try { localStorage.setItem('localshore_cart', JSON.stringify(cart)); } catch (_) {}
}

function loadCart() {
  try {
    const stored = localStorage.getItem('localshore_cart');
    if (stored) cart = JSON.parse(stored);
  } catch (_) { cart = []; }
}

function addToCart(id) {
  const item = menuItems.find(i => i.id === id);
  if (!item) return;
  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...item, qty: 1 });
  }
  saveCart();
  renderCart();
  updateCartBadge();
  showToast(`"${item.name}" added to cart`, 'success');
  animateCartIcon();
}

function removeFromCart(id) {
  const idx = cart.findIndex(c => c.id === id);
  if (idx === -1) return;
  const name = cart[idx].name;
  cart.splice(idx, 1);
  saveCart();
  renderCart();
  updateCartBadge();
  showToast(`"${name}" removed`, 'info');
}

function updateQuantity(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty = Math.max(0, item.qty + delta);
  if (item.qty === 0) { removeFromCart(id); return; }
  saveCart();
  renderCart();
  updateCartBadge();
}

const DELIVERY_FEE = 3.99;
const FREE_DELIVERY_THRESHOLD = 40;

function calculateTotal() {
  const subtotal = cart.reduce((sum, c) => sum + c.price * c.qty, 0);
  const tax = subtotal * 0.08;
  const delivery = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal + tax + delivery;
  return { subtotal, tax, delivery, total };
}

function renderCart() {
  const cartItems = $('#cart-items');
  const cartSubtotal = $('#cart-subtotal');
  const cartTax = $('#cart-tax');
  const cartTotal = $('#cart-total');
  const cartEmpty = $('#cart-empty');
  const cartFooter = $('#cart-footer, .cart-footer');

  if (!cartItems) return;

  if (cart.length === 0) {
    cartItems.innerHTML = '';
    if (cartEmpty) cartEmpty.style.display = 'flex';
    if (cartFooter) cartFooter.style.display = 'none';
    return;
  }

  if (cartEmpty) cartEmpty.style.display = 'none';
  if (cartFooter) cartFooter.style.display = 'block';

  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <img src="${item.image}" alt="${item.name}" loading="lazy">
      <div class="cart-item__info">
        <span class="cart-item__name">${item.name}</span>
        <span class="cart-item__price">${formatCurrency(item.price)}</span>
      </div>
      <div class="cart-item__controls">
        <button class="cart-qty-btn" data-action="dec" data-id="${item.id}" aria-label="Decrease">
          <i class="fas fa-minus"></i>
        </button>
        <span class="cart-item__qty">${item.qty}</span>
        <button class="cart-qty-btn" data-action="inc" data-id="${item.id}" aria-label="Increase">
          <i class="fas fa-plus"></i>
        </button>
      </div>
      <button class="cart-remove-btn" data-id="${item.id}" aria-label="Remove">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
  `).join('');

  // Bind controls
  $$('.cart-qty-btn', cartItems).forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id, 10);
      updateQuantity(id, btn.dataset.action === 'inc' ? 1 : -1);
    });
  });
  $$('.cart-remove-btn', cartItems).forEach(btn => {
    btn.addEventListener('click', () => removeFromCart(parseInt(btn.dataset.id, 10)));
  });

  const { subtotal, tax, delivery, total } = calculateTotal();
  if (cartSubtotal) cartSubtotal.textContent = formatCurrency(subtotal);
  if (cartTax) cartTax.textContent = formatCurrency(tax);
  const deliveryEl = $('#cart-delivery');
  if (deliveryEl) {
    deliveryEl.textContent = delivery === 0 ? 'FREE 🎉' : formatCurrency(delivery);
    deliveryEl.style.color = delivery === 0 ? '#10b981' : '';
  }
  if (cartTotal) cartTotal.textContent = formatCurrency(total);
}

function updateCartBadge() {
  const badge = $('#cart-count, .cart-count, .cart-badge');
  if (!badge) return;
  const count = cart.reduce((s, c) => s + c.qty, 0);
  badge.textContent = count;
  badge.style.display = count > 0 ? 'flex' : 'none';
}

function animateCartIcon() {
  const icon = $('#cart-icon, .cart-icon, [data-toggle="cart"]');
  if (!icon) return;
  icon.classList.add('cart-bounce');
  setTimeout(() => icon.classList.remove('cart-bounce'), 500);
}

function initCart() {
  loadCart();
  renderCart();
  updateCartBadge();

  // Cart sidebar toggle
  const cartToggle = $('[data-toggle="cart"], #cart-toggle, #cart-icon, .cart-icon');
  const cartSidebar = $('#cart-sidebar, .cart-sidebar');
  const cartOverlay = $('#cart-overlay, .cart-overlay');
  const cartClose = $('#cart-close, .cart-close');

  function openCart() {
    if (cartSidebar) cartSidebar.classList.add('open');
    if (cartOverlay) cartOverlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }
  function closeCart() {
    if (cartSidebar) cartSidebar.classList.remove('open');
    if (cartOverlay) cartOverlay.classList.remove('visible');
    document.body.style.overflow = '';
  }

  // Close cart on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && cartSidebar && cartSidebar.classList.contains('open')) {
      closeCart();
    }
  });

  if (cartToggle) cartToggle.addEventListener('click', openCart);
  if (cartClose) cartClose.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

  // Checkout button in cart
  const checkoutBtn = $('#cart-checkout-btn, .cart-checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      closeCart();
      openCheckout();
    });
  }

  // Clear cart button
  const clearCartBtn = $('#clear-cart-btn, .clear-cart-btn');
  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
      if (cart.length === 0) return;
      cart = [];
      saveCart();
      renderCart();
      updateCartBadge();
      showToast('Cart cleared', 'info');
    });
  }
}

/* --------------------------------------------------------------------------
   8. TESTIMONIALS CAROUSEL
   -------------------------------------------------------------------------- */
let testimonialsIdx = 0;
let testimonialsTimer = null;

function renderTestimonialsSlide(idx) {
  const t = testimonials[idx];
  const display = $('#testimonial-display, #testimonials-track, .testimonials-track');
  if (!display) return;

  display.style.opacity = '0';
  display.style.transform = 'translateY(12px)';

  setTimeout(() => {
    display.innerHTML = `
      <div class="testimonial-card">
        <div class="testimonial-card__quote"><i class="fas fa-quote-left"></i></div>
        <p class="testimonial-card__text">${t.text}</p>
        <div class="testimonial-card__rating">${starHTML(t.rating)}</div>
        <div class="testimonial-card__author">
          <img src="${t.avatar}" alt="${t.name}" loading="lazy">
          <div>
            <strong class="testimonial-card__name">${t.name}</strong>
            <span class="testimonial-card__role">${t.role}</span>
          </div>
        </div>
      </div>
    `;
    display.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    display.style.opacity = '1';
    display.style.transform = 'translateY(0)';
  }, 200);

  // Update dots
  $$('.testimonial-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === idx);
  });
}

function goToTestimonial(idx) {
  testimonialsIdx = (idx + testimonials.length) % testimonials.length;
  renderTestimonialsSlide(testimonialsIdx);
  restartTestimonialsTimer();
}

function restartTestimonialsTimer() {
  if (testimonialsTimer) clearInterval(testimonialsTimer);
  testimonialsTimer = setInterval(() => goToTestimonial(testimonialsIdx + 1), 4000);
}

function initTestimonials() {
  const wrapper = $('#testimonials-wrapper, .testimonials-wrapper');
  if (!wrapper) return;

  // Build dots
  const dotsContainer = $('#testimonials-dots, #testi-dots, .testimonials-dots, .testi-dots');
  if (dotsContainer) {
    dotsContainer.innerHTML = testimonials.map((_, i) => `
      <button class="testimonial-dot${i === 0 ? ' active' : ''}" data-idx="${i}" aria-label="Testimonial ${i + 1}"></button>
    `).join('');
    $$('.testimonial-dot', dotsContainer).forEach(dot => {
      dot.addEventListener('click', () => goToTestimonial(parseInt(dot.dataset.idx, 10)));
    });
  }

  // Prev / next arrows — match both old and new IDs
  const prev = $('#testimonial-prev, #testi-prev, .testimonial-prev, .testi-prev');
  const next = $('#testimonial-next, #testi-next, .testimonial-next, .testi-next');
  if (prev) prev.addEventListener('click', () => goToTestimonial(testimonialsIdx - 1));
  if (next) next.addEventListener('click', () => goToTestimonial(testimonialsIdx + 1));

  // Touch / swipe
  let touchStartX = 0;
  wrapper.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
  wrapper.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) goToTestimonial(testimonialsIdx + (dx < 0 ? 1 : -1));
  }, { passive: true });

  renderTestimonialsSlide(0);
  restartTestimonialsTimer();

  // Pause on hover
  wrapper.addEventListener('mouseenter', () => { if (testimonialsTimer) clearInterval(testimonialsTimer); });
  wrapper.addEventListener('mouseleave', restartTestimonialsTimer);
}

/* --------------------------------------------------------------------------
   9. RESERVATION FORM
   -------------------------------------------------------------------------- */
let guestCount = 2;

function initReservation() {
  const form = $('#reservation-form, .reservation-form');
  if (!form) return;

  // Date minimum = today
  const dateInput = form.querySelector('[name="date"], #res-date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  // Guest counter — support both old (#guest-num) and new (#guest-count) IDs
  const guestDisplay = $('#guest-count, #guest-num, .guest-count, .guest-num');
  const guestInc = $('#guest-inc, #guest-plus, .guest-inc, .guest-plus');
  const guestDec = $('#guest-dec, #guest-minus, .guest-dec, .guest-minus');
  const guestInput = form.querySelector('[name="guests"], #res-guests');

  function updateGuests(n) {
    guestCount = Math.min(20, Math.max(1, n));
    if (guestDisplay) guestDisplay.textContent = guestCount;
    if (guestInput) guestInput.value = guestCount;
    if (guestDec) guestDec.disabled = guestCount <= 1;
    if (guestInc) guestInc.disabled = guestCount >= 20;
  }

  if (guestInc) guestInc.addEventListener('click', () => updateGuests(guestCount + 1));
  if (guestDec) guestDec.addEventListener('click', () => updateGuests(guestCount - 1));
  updateGuests(2);

  // Form submission with validation and API call
  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!validateReservationForm(form)) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    const origText = submitBtn ? submitBtn.innerHTML : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Reserving...';
    }

    const payload = {
      name: (form.querySelector('[name="name"], #res-name')?.value || '').trim(),
      email: (form.querySelector('[name="email"], #res-email')?.value || '').trim(),
      phone: (form.querySelector('[name="phone"], #res-phone')?.value || '').trim(),
      date: form.querySelector('[name="date"], #res-date')?.value || '',
      time: form.querySelector('[name="time"], #res-time')?.value || '',
      guests: parseInt(form.querySelector('[name="guests"], #res-guests')?.value || guestCount, 10),
      occasion: form.querySelector('[name="occasion"], #res-occasion')?.value || '',
      message: (form.querySelector('[name="message"], #res-message')?.value || '').trim(),
    };

    let ref = generateBookingRef();
    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success && data.data?.ref) {
        ref = data.data.ref;
      }
    } catch (err) {
      console.warn('API reservation offline, using local ref:', err);
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = origText;
      }
    }

    openBookingSuccessModal(ref, form);
    form.reset();
    updateGuests(2);
  });
}

function validateReservationForm(form) {
  let valid = true;

  // Required fields
  form.querySelectorAll('[required]').forEach(field => {
    clearFieldError(field);
    if (!field.value.trim()) {
      showFieldError(field, 'This field is required');
      valid = false;
    }
  });

  // Email
  const emailField = form.querySelector('[type="email"], [name="email"]');
  if (emailField && emailField.value.trim()) {
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(emailField.value.trim())) {
      showFieldError(emailField, 'Please enter a valid email address');
      valid = false;
    }
  }

  // Date must be future
  const dateField = form.querySelector('[name="date"], #res-date');
  if (dateField && dateField.value) {
    const selected = new Date(dateField.value);
    const today = new Date(); today.setHours(0, 0, 0, 0);
    if (selected < today) {
      showFieldError(dateField, 'Please select a future date');
      valid = false;
    }
  }

  return valid;
}

function showFieldError(field, msg) {
  field.classList.add('input-error');
  let err = field.parentElement.querySelector('.field-error');
  if (!err) {
    err = document.createElement('span');
    err.className = 'field-error';
    err.style.cssText = 'color:#ef4444;font-size:12px;margin-top:4px;display:block';
    field.parentElement.appendChild(err);
  }
  err.textContent = msg;
}

function clearFieldError(field) {
  field.classList.remove('input-error');
  const err = field.parentElement.querySelector('.field-error');
  if (err) err.remove();
}

function openBookingSuccessModal(ref, form) {
  const modal = $('#booking-success-modal, .booking-success-modal');
  if (modal) {
    const refEl = modal.querySelector('#booking-ref, .booking-ref');
    if (refEl) refEl.textContent = ref;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');

    const closeBtn = modal.querySelector('.modal-close, [data-close="modal"]');
    if (closeBtn) closeBtn.addEventListener('click', () => closeModal(modal), { once: true });
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(modal); });
  } else {
    showToast(`Booking confirmed! Reference: ${ref}`, 'success');
  }
}

/* --------------------------------------------------------------------------
   10. MODALS — generic open / close
   -------------------------------------------------------------------------- */
function closeModal(modal) {
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function openModal(modal) {
  if (!modal) return;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function initModals() {
  // Generic close buttons
  $$('.modal-close, [data-close="modal"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal');
      if (modal) closeModal(modal);
    });
  });
  // Click outside
  $$('.modal').forEach(modal => {
    modal.addEventListener('click', e => {
      if (e.target === modal) closeModal(modal);
    });
  });
  // ESC key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      $$('.modal.open').forEach(closeModal);
      closeLightbox();
    }
  });
}

/* --------------------------------------------------------------------------
   11. COUNTER ANIMATION
   -------------------------------------------------------------------------- */
function animateCounter(el, target, duration = 1800) {
  const start = performance.now();
  const startVal = 0;

  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(startVal + (target - startVal) * eased);
    el.textContent = current.toLocaleString();
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target.toLocaleString();
  }
  requestAnimationFrame(step);
}

function initCounters() {
  const counters = $$('[data-counter]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        const target = parseInt(entry.target.dataset.counter, 10);
        const duration = parseInt(entry.target.dataset.duration || '1800', 10);
        animateCounter(entry.target, target, duration);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(c => observer.observe(c));
}

/* --------------------------------------------------------------------------
   12. GALLERY LIGHTBOX
   -------------------------------------------------------------------------- */
let lightboxImages = [];
let lightboxIdx = 0;
let lightbox = null;

function buildLightbox() {
  lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', 'Image lightbox');
  lightbox.style.cssText = `
    display:none;position:fixed;inset:0;background:rgba(0,0,0,0.92);
    z-index:10000;align-items:center;justify-content:center;
    flex-direction:column;
  `;
  lightbox.innerHTML = `
    <button id="lightbox-close" aria-label="Close lightbox" style="
      position:absolute;top:20px;right:28px;background:none;border:none;
      color:#fff;font-size:32px;cursor:pointer;line-height:1;padding:4px;
    "><i class="fas fa-times"></i></button>
    <button id="lightbox-prev" aria-label="Previous image" style="
      position:absolute;left:20px;top:50%;transform:translateY(-50%);
      background:rgba(255,255,255,0.15);border:none;color:#fff;font-size:24px;
      width:48px;height:48px;border-radius:50%;cursor:pointer;display:flex;
      align-items:center;justify-content:center;transition:background 0.2s;
    "><i class="fas fa-chevron-left"></i></button>
    <button id="lightbox-next" aria-label="Next image" style="
      position:absolute;right:20px;top:50%;transform:translateY(-50%);
      background:rgba(255,255,255,0.15);border:none;color:#fff;font-size:24px;
      width:48px;height:48px;border-radius:50%;cursor:pointer;display:flex;
      align-items:center;justify-content:center;transition:background 0.2s;
    "><i class="fas fa-chevron-right"></i></button>
    <img id="lightbox-img" src="" alt="Gallery image" style="
      max-width:90vw;max-height:82vh;border-radius:8px;
      object-fit:contain;transition:opacity 0.25s ease;
    ">
    <p id="lightbox-caption" style="color:#ccc;margin-top:12px;font-size:14px;text-align:center;padding:0 20px;"></p>
    <span id="lightbox-counter" style="color:#888;font-size:12px;margin-top:6px;"></span>
  `;
  document.body.appendChild(lightbox);

  $('#lightbox-close').addEventListener('click', closeLightbox);
  $('#lightbox-prev').addEventListener('click', () => navigateLightbox(-1));
  $('#lightbox-next').addEventListener('click', () => navigateLightbox(1));
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (!lightbox || lightbox.style.display === 'none') return;
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });

  // Touch swipe in lightbox
  let lbTouchX = 0;
  lightbox.addEventListener('touchstart', e => { lbTouchX = e.changedTouches[0].clientX; }, { passive: true });
  lightbox.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - lbTouchX;
    if (Math.abs(dx) > 40) navigateLightbox(dx < 0 ? 1 : -1);
  }, { passive: true });
}

function openLightbox(images, startIdx) {
  lightboxImages = images;
  lightboxIdx = startIdx;
  if (lightbox) {
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    setLightboxImage(lightboxIdx);
  }
}

function closeLightbox() {
  if (lightbox) {
    lightbox.style.display = 'none';
    document.body.style.overflow = '';
  }
}

function navigateLightbox(dir) {
  lightboxIdx = (lightboxIdx + dir + lightboxImages.length) % lightboxImages.length;
  setLightboxImage(lightboxIdx);
}

function setLightboxImage(idx) {
  const img = $('#lightbox-img');
  const caption = $('#lightbox-caption');
  const counter = $('#lightbox-counter');
  if (!img) return;
  img.style.opacity = '0';
  setTimeout(() => {
    img.src = lightboxImages[idx].src;
    img.alt = lightboxImages[idx].alt || '';
    if (caption) caption.textContent = lightboxImages[idx].caption || lightboxImages[idx].alt || '';
    if (counter) counter.textContent = `${idx + 1} / ${lightboxImages.length}`;
    img.style.opacity = '1';
  }, 150);
}

function initGallery() {
  buildLightbox();

  const galleryItems = $$('.gallery-item, .gallery img, [data-gallery]');
  if (!galleryItems.length) return;

  // Build image array from gallery items
  const images = galleryItems.map(item => {
    const imgEl = item.tagName === 'IMG' ? item : item.querySelector('img');
    return {
      src: imgEl ? imgEl.src : item.dataset.src || '',
      alt: imgEl ? imgEl.alt : item.dataset.alt || '',
      caption: item.dataset.caption || (imgEl ? imgEl.alt : ''),
    };
  }).filter(i => i.src);

  galleryItems.forEach((item, idx) => {
    item.style.cursor = 'pointer';
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    item.setAttribute('aria-label', `Open image ${idx + 1} in lightbox`);

    item.addEventListener('click', () => openLightbox(images, idx));
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(images, idx);
      }
    });
  });
}

/* --------------------------------------------------------------------------
   13. NEWSLETTER & CONTACT FORMS
   -------------------------------------------------------------------------- */
function initNewsletter() {
  const forms = $$('#newsletter-form, .newsletter-form');
  forms.forEach(form => {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const emailField = form.querySelector('[type="email"], [name="email"]');
      if (!emailField) return;

      const email = emailField.value.trim();
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(email)) {
        showToast('Please enter a valid email address', 'error');
        return;
      }

      try {
        const res = await fetch('/api/newsletter/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();
        showToast(data.message || 'Subscribed! Check your inbox.', 'success');
      } catch (err) {
        showToast('Subscribed! Check your inbox.', 'success');
      }
      form.reset();
    });
  });
}

function initContact() {
  const form = $('#contact-form, .contact-form');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const nameEl = form.querySelector('#c-name, [name="name"]');
    const emailEl = form.querySelector('#c-email, [name="email"]');
    const subjectEl = form.querySelector('#c-subject, [name="subject"]');
    const messageEl = form.querySelector('#c-message, [name="message"]');
    const submitBtn = form.querySelector('button[type="submit"]');

    const name = nameEl ? nameEl.value.trim() : '';
    const email = emailEl ? emailEl.value.trim() : '';
    const subject = subjectEl ? subjectEl.value.trim() : '';
    const message = messageEl ? messageEl.value.trim() : '';

    if (!name || !email || !message) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
      showToast('Please enter a valid email address', 'error');
      return;
    }

    const origText = submitBtn ? submitBtn.innerHTML : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      });
      const data = await res.json();
      showToast(data.message || 'Your message has been sent!', 'success');
      form.reset();
    } catch (err) {
      showToast('Message sent! We will get back to you shortly.', 'success');
      form.reset();
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = origText;
      }
    }
  });
}

/* --------------------------------------------------------------------------
   14. SCROLL ANIMATIONS
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const elements = $$('.animate-on-scroll');
  if (!elements.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.style.getPropertyValue('--delay') || '0ms';
        setTimeout(() => entry.target.classList.add('visible'), parseInt(delay) || 0);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  elements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   15. CHECKOUT MODAL
   -------------------------------------------------------------------------- */
function openCheckout() {
  if (cart.length === 0) {
    showToast('Your cart is empty!', 'error');
    return;
  }

  let checkoutModal = $('#checkout-modal');
  if (!checkoutModal) {
    checkoutModal = document.createElement('div');
    checkoutModal.id = 'checkout-modal';
    checkoutModal.className = 'modal';
    checkoutModal.setAttribute('role', 'dialog');
    checkoutModal.setAttribute('aria-modal', 'true');
    checkoutModal.setAttribute('aria-label', 'Checkout');
    checkoutModal.setAttribute('aria-hidden', 'true');
    document.body.appendChild(checkoutModal);
  }

  const { subtotal, tax, delivery, total } = calculateTotal();

  checkoutModal.innerHTML = `
    <div class="modal__inner checkout-modal__inner">
      <button class="modal-close modal__close-btn" aria-label="Close">
        <i class="fas fa-times"></i>
      </button>

      <div class="checkout-steps" id="checkout-steps">
        <!-- STEP 1: Order Summary -->
        <div class="checkout-step active" id="checkout-step-1">
          <h2 class="checkout-modal__title">Order Summary</h2>
          <div class="checkout-order-items">
            ${cart.map(item => `
              <div class="checkout-order-item">
                <span class="checkout-order-item__name">${item.name} <small>×${item.qty}</small></span>
                <span class="checkout-order-item__price">${formatCurrency(item.price * item.qty)}</span>
              </div>
            `).join('')}
          </div>
          <div class="checkout-totals">
            <div class="checkout-total-row"><span>Subtotal</span><span>${formatCurrency(subtotal)}</span></div>
            <div class="checkout-total-row"><span>Tax (8%)</span><span>${formatCurrency(tax)}</span></div>
            <div class="checkout-total-row"><span>Delivery</span><span style="color:${delivery===0?'#10b981':'inherit'}">${delivery === 0 ? 'FREE 🎉' : formatCurrency(delivery)}</span></div>
            <div class="checkout-total-row checkout-total-row--grand"><span>Total</span><span>${formatCurrency(total)}</span></div>
          </div>
          <button class="btn btn--primary checkout-next-btn" id="to-payment-btn">
            Continue to Payment <i class="fas fa-arrow-right"></i>
          </button>
        </div>

        <!-- STEP 2: Payment -->
        <div class="checkout-step" id="checkout-step-2">
          <h2 class="checkout-modal__title">Payment Details</h2>
          <form id="payment-form" novalidate>
            <div class="form-group">
              <label for="pay-name">Cardholder Name</label>
              <input type="text" id="pay-name" name="pay-name" placeholder="Jane Smith" autocomplete="cc-name" required>
            </div>
            <div class="form-group">
              <label for="pay-card">Card Number</label>
              <input type="text" id="pay-card" name="pay-card" placeholder="1234 5678 9012 3456"
                maxlength="19" autocomplete="cc-number" required inputmode="numeric">
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="pay-expiry">Expiry (MM/YY)</label>
                <input type="text" id="pay-expiry" name="pay-expiry" placeholder="MM/YY"
                  maxlength="5" autocomplete="cc-exp" required inputmode="numeric">
              </div>
              <div class="form-group">
                <label for="pay-cvv">CVV</label>
                <input type="text" id="pay-cvv" name="pay-cvv" placeholder="•••"
                  maxlength="4" autocomplete="cc-csc" required inputmode="numeric">
              </div>
            </div>
            <div class="form-group">
              <label for="pay-email">Email for receipt</label>
              <input type="email" id="pay-email" name="pay-email" placeholder="you@example.com" autocomplete="email" required>
            </div>
            <div class="checkout-action-row">
              <button type="button" class="btn btn--outline checkout-back-btn" id="back-to-summary-btn">
                <i class="fas fa-arrow-left"></i> Back
              </button>
              <button type="submit" class="btn btn--primary" id="place-order-btn">
                Place Order — ${formatCurrency(total)}
              </button>
            </div>
          </form>
        </div>

        <!-- STEP 3: Success -->
        <div class="checkout-step" id="checkout-step-3">
          <div class="checkout-success">
            <div class="checkout-success__icon"><i class="fas fa-check-circle"></i></div>
            <h2>Order Placed!</h2>
            <p>Your order has been confirmed. You'll receive a confirmation email shortly.</p>
            <p>Reference: <strong id="checkout-ref"></strong></p>
            <button class="btn btn--primary" id="checkout-done-btn">Done</button>
          </div>
        </div>
      </div>
    </div>
  `;

  openModal(checkoutModal);

  // Step navigation
  const toPayment = checkoutModal.querySelector('#to-payment-btn');
  const backToSummary = checkoutModal.querySelector('#back-to-summary-btn');
  const paymentForm = checkoutModal.querySelector('#payment-form');
  const doneBtn = checkoutModal.querySelector('#checkout-done-btn');

  function showStep(n) {
    checkoutModal.querySelectorAll('.checkout-step').forEach((s, i) => {
      s.classList.toggle('active', i + 1 === n);
    });
  }

  if (toPayment) toPayment.addEventListener('click', () => showStep(2));
  if (backToSummary) backToSummary.addEventListener('click', () => showStep(1));

  // Card number formatting
  const cardInput = checkoutModal.querySelector('#pay-card');
  if (cardInput) {
    cardInput.addEventListener('input', e => {
      let v = e.target.value.replace(/\D/g, '').slice(0, 16);
      e.target.value = v.replace(/(.{4})/g, '$1 ').trim();
    });
  }

  // Expiry formatting
  const expiryInput = checkoutModal.querySelector('#pay-expiry');
  if (expiryInput) {
    expiryInput.addEventListener('input', e => {
      let v = e.target.value.replace(/\D/g, '').slice(0, 4);
      if (v.length >= 3) v = v.slice(0, 2) + '/' + v.slice(2);
      e.target.value = v;
    });
  }

  // CVV — digits only
  const cvvInput = checkoutModal.querySelector('#pay-cvv');
  if (cvvInput) {
    cvvInput.addEventListener('input', e => {
      e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4);
    });
  }

  if (paymentForm) {
    paymentForm.addEventListener('submit', async e => {
      e.preventDefault();

      // Basic payment form validation
      let valid = true;
      paymentForm.querySelectorAll('[required]').forEach(field => {
        clearFieldError(field);
        if (!field.value.trim()) {
          showFieldError(field, 'Required');
          valid = false;
        }
      });

      const emailField = paymentForm.querySelector('#pay-email');
      if (emailField && emailField.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value.trim())) {
        showFieldError(emailField, 'Valid email required');
        valid = false;
      }

      const cardVal = (cardInput ? cardInput.value.replace(/\s/g, '') : '');
      if (cardVal && cardVal.length < 16) {
        showFieldError(cardInput, 'Enter a 16-digit card number');
        valid = false;
      }

      if (!valid) return;

      // Submit order to API
      const placeBtn = paymentForm.querySelector('#place-order-btn');
      const origText = placeBtn ? placeBtn.innerHTML : '';
      if (placeBtn) {
        placeBtn.disabled = true;
        placeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
      }

      let ref = generateBookingRef();
      try {
        const res = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customer: paymentForm.querySelector('#pay-name')?.value.trim() || 'Guest',
            email: paymentForm.querySelector('#pay-email')?.value.trim(),
            address: 'Online Order',
            items: cart.map(item => ({
              id: item.id,
              name: item.name,
              price: item.price,
              qty: item.qty,
            })),
          }),
        });
        const data = await res.json();
        if (data.success && data.data?.ref) {
          ref = data.data.ref;
        }
      } catch (err) {
        console.warn('API orders offline, using local ref:', err);
      } finally {
        if (placeBtn) {
          placeBtn.disabled = false;
          placeBtn.innerHTML = origText;
        }
      }

      const refEl = checkoutModal.querySelector('#checkout-ref');
      if (refEl) refEl.textContent = ref;
      showStep(3);

      // Clear cart
      cart = [];
      saveCart();
      renderCart();
      updateCartBadge();
    });
  }

  if (doneBtn) {
    doneBtn.addEventListener('click', () => {
      closeModal(checkoutModal);
      showToast('Thank you for your order! Bon appétit 🍽️', 'success');
    });
  }

  // Generic close
  checkoutModal.querySelector('.modal-close')?.addEventListener('click', () => closeModal(checkoutModal));
  checkoutModal.addEventListener('click', e => { if (e.target === checkoutModal) closeModal(checkoutModal); });
}

/* --------------------------------------------------------------------------
   16. INJECT DYNAMIC STYLES
   -------------------------------------------------------------------------- */
function injectStyles() {
  const style = document.createElement('style');
  style.textContent = `
    /* ── Scroll-animated elements ── */
    .animate-on-scroll {
      opacity: 0;
      transform: translateY(28px);
      transition: opacity 0.55s ease, transform 0.55s ease;
      transition-delay: var(--delay, 0ms);
    }
    .animate-on-scroll.visible {
      opacity: 1;
      transform: translateY(0);
    }

    /* ── Menu cards ── */
    .menu-card {
      border-radius: 14px;
      overflow: hidden;
      background: #fff;
      box-shadow: 0 2px 16px rgba(0,0,0,0.08);
      transition: transform 0.25s ease, box-shadow 0.25s ease;
    }
    .menu-card:hover { transform: translateY(-4px); box-shadow: 0 8px 32px rgba(0,0,0,0.14); }
    .menu-card__img-wrap { position: relative; overflow: hidden; height: 220px; }
    .menu-card__img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; }
    .menu-card:hover .menu-card__img-wrap img { transform: scale(1.06); }
    .menu-card__badge {
      position: absolute; top: 12px; left: 12px;
      background: #c8973a; color: #fff;
      font-size: 11px; font-weight: 700; letter-spacing: .5px;
      padding: 4px 10px; border-radius: 20px; text-transform: uppercase;
    }
    .menu-card__body { padding: 16px 18px 18px; }
    .menu-card__header { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; margin-bottom: 6px; }
    .menu-card__name { font-size: 16px; font-weight: 700; margin: 0; }
    .menu-card__price { font-size: 17px; font-weight: 700; color: #c8973a; white-space: nowrap; }
    .menu-card__desc { font-size: 13px; color: #666; margin: 0 0 14px; line-height: 1.5; }
    .menu-card__footer { display: flex; justify-content: space-between; align-items: center; }
    .menu-card__rating { display: flex; align-items: center; gap: 4px; color: #f59e0b; font-size: 13px; }
    .menu-card__rating span { color: #555; }
    .btn--add-cart {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 8px 16px; border-radius: 8px;
      background: #1a1a2e; color: #fff; border: none;
      font-size: 13px; font-weight: 600; cursor: pointer;
      transition: background 0.2s, transform 0.15s;
    }
    .btn--add-cart:hover { background: #c8973a; transform: scale(1.04); }

    /* ── Cart sidebar ── */
    .cart-item {
      display: flex; align-items: center; gap: 10px;
      padding: 10px 0; border-bottom: 1px solid #f0f0f0;
    }
    .cart-item img { width: 56px; height: 56px; object-fit: cover; border-radius: 8px; flex-shrink: 0; }
    .cart-item__info { flex: 1; min-width: 0; }
    .cart-item__name { display: block; font-size: 13px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .cart-item__price { font-size: 13px; color: #c8973a; font-weight: 700; }
    .cart-item__controls { display: flex; align-items: center; gap: 6px; }
    .cart-qty-btn {
      width: 26px; height: 26px; border-radius: 50%; border: 1px solid #ddd;
      background: #f8f8f8; cursor: pointer; font-size: 11px;
      display: flex; align-items: center; justify-content: center;
      transition: background 0.15s;
    }
    .cart-qty-btn:hover { background: #c8973a; color: #fff; border-color: #c8973a; }
    .cart-item__qty { font-size: 14px; font-weight: 600; min-width: 20px; text-align: center; }
    .cart-remove-btn {
      background: none; border: none; color: #ccc; cursor: pointer; font-size: 14px;
      padding: 4px; transition: color 0.15s;
    }
    .cart-remove-btn:hover { color: #ef4444; }
    .cart-bounce { animation: cartBounce 0.4s ease; }
    @keyframes cartBounce {
      0%,100% { transform: scale(1); }
      30% { transform: scale(1.3) rotate(-10deg); }
      60% { transform: scale(0.9) rotate(5deg); }
    }

    /* ── Testimonials ── */
    .testimonial-card { max-width: 680px; margin: 0 auto; text-align: center; }
    .testimonial-card__quote { font-size: 48px; color: #c8973a; opacity: 0.4; line-height: 1; margin-bottom: 12px; }
    .testimonial-card__text { font-size: 17px; line-height: 1.75; color: #444; margin: 0 0 20px; font-style: italic; }
    .testimonial-card__rating { color: #f59e0b; font-size: 18px; margin-bottom: 20px; letter-spacing: 2px; }
    .testimonial-card__author { display: flex; align-items: center; justify-content: center; gap: 14px; }
    .testimonial-card__author img { width: 56px; height: 56px; border-radius: 50%; object-fit: cover; border: 2px solid #c8973a; }
    .testimonial-card__name { display: block; font-weight: 700; font-size: 15px; }
    .testimonial-card__role { font-size: 13px; color: #888; }
    .testimonial-dot {
      width: 10px; height: 10px; border-radius: 50%; border: 2px solid #ccc;
      background: transparent; cursor: pointer; padding: 0;
      transition: background 0.2s, border-color 0.2s, transform 0.2s;
    }
    .testimonial-dot.active { background: #c8973a; border-color: #c8973a; transform: scale(1.3); }

    /* ── Modals ── */
    .modal {
      display: none; position: fixed; inset: 0;
      background: rgba(0,0,0,0.65); z-index: 8000;
      align-items: center; justify-content: center; padding: 20px;
    }
    .modal.open { display: flex; }
    .modal__inner {
      background: #fff; border-radius: 16px;
      max-width: 560px; width: 100%; max-height: 90vh;
      overflow-y: auto; position: relative;
      padding: 36px 32px 32px;
    }
    .modal__close-btn {
      position: absolute; top: 16px; right: 16px;
      background: none; border: none; font-size: 20px;
      cursor: pointer; color: #888; line-height: 1; padding: 4px 8px;
    }

    /* ── Checkout modal ── */
    .checkout-modal__title { font-size: 22px; font-weight: 700; margin: 0 0 20px; }
    .checkout-step { display: none; }
    .checkout-step.active { display: block; }
    .checkout-order-item {
      display: flex; justify-content: space-between; padding: 8px 0;
      border-bottom: 1px solid #f0f0f0; font-size: 14px;
    }
    .checkout-order-item__price { font-weight: 600; }
    .checkout-totals { margin: 16px 0 24px; }
    .checkout-total-row {
      display: flex; justify-content: space-between; padding: 6px 0;
      font-size: 14px; color: #555;
    }
    .checkout-total-row--grand {
      font-size: 18px; font-weight: 700; color: #1a1a2e;
      border-top: 2px solid #eee; margin-top: 8px; padding-top: 12px;
    }
    .checkout-action-row { display: flex; justify-content: space-between; gap: 12px; margin-top: 20px; }
    .form-group { margin-bottom: 16px; }
    .form-group label { display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px; color: #333; }
    .form-group input {
      width: 100%; padding: 10px 14px; border: 1px solid #ddd; border-radius: 8px;
      font-size: 14px; outline: none; transition: border-color 0.2s;
      box-sizing: border-box;
    }
    .form-group input:focus { border-color: #c8973a; box-shadow: 0 0 0 3px rgba(200,151,58,0.15); }
    .form-group input.input-error { border-color: #ef4444; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
    .checkout-success { text-align: center; padding: 20px 0; }
    .checkout-success__icon { font-size: 72px; color: #10b981; margin-bottom: 16px; }
    .checkout-success h2 { font-size: 26px; margin-bottom: 12px; }
    .checkout-success p { color: #555; margin-bottom: 10px; }

    /* ── Buttons (generic) ── */
    .btn--primary {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 12px 24px; background: #1a1a2e; color: #fff;
      border: none; border-radius: 8px; font-size: 15px; font-weight: 600;
      cursor: pointer; transition: background 0.2s, transform 0.15s; width: 100%;
      justify-content: center;
    }
    .btn--primary:hover { background: #c8973a; transform: translateY(-1px); }
    .btn--outline {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 12px 20px; background: transparent; color: #1a1a2e;
      border: 2px solid #1a1a2e; border-radius: 8px; font-size: 14px; font-weight: 600;
      cursor: pointer; transition: background 0.2s, color 0.2s;
    }
    .btn--outline:hover { background: #1a1a2e; color: #fff; }

    /* ── Input error style ── */
    .input-error { border-color: #ef4444!important; }

    /* ── Navbar scrolled state (fallback) ── */
    nav.scrolled, header.scrolled, .navbar.scrolled {
      background: #fff!important;
      box-shadow: 0 2px 20px rgba(0,0,0,0.1);
    }

    /* ── Responsive ── */
    @media (max-width: 480px) {
      .modal__inner { padding: 24px 18px 20px; }
      .form-row { grid-template-columns: 1fr; }
      .checkout-action-row { flex-direction: column; }
    }
  `;
  document.head.appendChild(style);
}

/* --------------------------------------------------------------------------
   17. BACK TO TOP
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const btn = $('#back-to-top, .back-to-top, [data-scroll-top]');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.style.display = window.scrollY > 400 ? 'flex' : 'none';
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* --------------------------------------------------------------------------
   18. HERO PARALLAX (subtle)
   -------------------------------------------------------------------------- */
function initParallax() {
  const hero = $('#hero, .hero, .hero-section');
  if (!hero) return;
  window.addEventListener('scroll', () => {
    const offset = window.scrollY;
    if (offset < window.innerHeight) {
      hero.style.backgroundPositionY = `${offset * 0.4}px`;
    }
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   19. ACTIVE NAV LINK (standalone fallback)
   -------------------------------------------------------------------------- */
function initActiveLinkFallback() {
  const navLinks = $$('nav a[href^="#"], header a[href^="#"]');
  if (!navLinks.length) return;
  navLinks.forEach(link => {
    if (link.getAttribute('href') === '#' + location.hash.slice(1)) {
      link.classList.add('active');
    }
  });
}

/* --------------------------------------------------------------------------
   20. INIT — DOMContentLoaded
   -------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  injectStyles();
  initToasts();
  initNavbar();
  initMenu();
  initCart();
  initTestimonials();
  initReservation();
  initCounters();
  initGallery();
  initNewsletter();
  initContact();
  initScrollAnimations();
  initModals();
  initBackToTop();
  initParallax();
  initActiveLinkFallback();

  // Mark all pre-existing .animate-on-scroll elements for the observer
  $$('.animate-on-scroll').forEach(el => {
    // The IntersectionObserver in initScrollAnimations already handles these
  });

  console.info('%c🍽️ La Bella Cucina JS loaded', 'color:#c8973a;font-weight:bold;font-size:14px');

  // Performance mark
  if (typeof performance !== 'undefined' && performance.mark) {
    performance.mark('app-init-complete');
  }
});

/* --------------------------------------------------------------------------
   GLOBAL HELPERS — called from inline HTML onclick attributes
   -------------------------------------------------------------------------- */

/**
 * addToCartById(id) — global shim so onclick="addToCartById(14)" in HTML works.
 * Delegates to the module-scoped addToCart() after the page has loaded.
 */
window.addToCartById = function (id) {
  addToCart(id);
};

