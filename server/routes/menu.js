/**
 * routes/menu.js — Menu items endpoint
 */

import { Router } from 'express';
import { menuItems, categories } from '../../src/data/menuData.js';

const router = Router();

// ── GET /api/menu ───────────────────────────────────────────────────────────
router.get('/', (req, res) => {
  const { category, search, dietary } = req.query;

  let items = [...menuItems];

  if (category && category !== 'all') {
    items = items.filter(item => item.category === category.toLowerCase());
  }

  if (dietary && dietary !== 'all') {
    items = items.filter(item =>
      item.tags && item.tags.some(t => t.toLowerCase() === dietary.toLowerCase())
    );
  }

  if (search) {
    const q = search.toLowerCase();
    items = items.filter(
      item =>
        item.name.toLowerCase().includes(q) ||
        (item.italianName && item.italianName.toLowerCase().includes(q)) ||
        (item.desc && item.desc.toLowerCase().includes(q)) ||
        (item.ingredients && item.ingredients.some(i => i.toLowerCase().includes(q)))
    );
  }

  return res.json({
    success: true,
    currency: 'INR',
    symbol: '₹',
    count: items.length,
    data: items,
  });
});

// ── GET /api/menu/categories ────────────────────────────────────────────────
router.get('/categories', (req, res) => {
  return res.json({
    success: true,
    data: categories,
  });
});

// ── GET /api/menu/:id ───────────────────────────────────────────────────────
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const item = menuItems.find(i => i.id === id);

  if (!item) {
    return res.status(404).json({
      success: false,
      message: `Menu item with id ${id} not found`,
    });
  }

  return res.json({
    success: true,
    currency: 'INR',
    symbol: '₹',
    data: item,
  });
});

export default router;
