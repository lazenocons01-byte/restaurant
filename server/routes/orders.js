/**
 * routes/orders.js — Online ordering endpoints
 */

import { Router } from 'express';
import { body, param } from 'express-validator';
import crypto from 'crypto';
import db from '../db.js';
import { validate } from '../middleware/validate.js';
import { sendOrderConfirmation } from '../mailer.js';

const router = Router();

function generateRef() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes = crypto.randomBytes(8);
  let ref = 'ORD-';
  for (let i = 0; i < 8; i++) {
    ref += chars[bytes[i] % chars.length];
  }
  return ref;
}

// ── POST /api/orders ────────────────────────────────────────────────────────
router.post(
  '/',
  [
    body('customer').trim().notEmpty().withMessage('Customer name is required'),
    body('email').trim().isEmail().withMessage('A valid email is required').normalizeEmail(),
    body('phone').optional().trim().isLength({ max: 30 }),
    body('address').optional().trim().isLength({ max: 200 }),
    body('items').isArray({ min: 1 }).withMessage('At least one item is required in the order'),
    body('items.*.id').isInt().withMessage('Valid item ID is required'),
    body('items.*.name').trim().notEmpty().withMessage('Item name is required'),
    body('items.*.price').isFloat({ min: 0 }).withMessage('Item price must be positive'),
    body('items.*.qty').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
    body('notes').optional().trim().isLength({ max: 500 }),
    validate,
  ],
  async (req, res, next) => {
    try {
      const { customer, email, phone, address, items, notes } = req.body;
      const ref = generateRef();

      // Calculate totals on backend for safety in INR
      const subtotal = items.reduce((sum, item) => sum + (Number(item.price) * Number(item.qty)), 0);
      const tax = Number((subtotal * 0.05).toFixed(2)); // 5% GST
      const delivery = subtotal >= 999 ? 0 : 99; // Free above ₹999, else ₹99
      const total = Number((subtotal + tax + delivery).toFixed(2));

      // Transaction to insert order and order_items
      db.exec('BEGIN TRANSACTION');
      try {
        const insertOrderStmt = db.prepare(`
          INSERT INTO orders (ref, customer, email, phone, address, subtotal, tax, delivery, total, notes)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        const orderResult = insertOrderStmt.run(
          ref,
          customer,
          email,
          phone || null,
          address || null,
          subtotal,
          tax,
          delivery,
          total,
          notes || null
        );

        const orderId = orderResult.lastInsertRowid;

        const insertItemStmt = db.prepare(`
          INSERT INTO order_items (order_id, item_id, name, price, qty, subtotal)
          VALUES (?, ?, ?, ?, ?, ?)
        `);

        for (const item of items) {
          const itemSubtotal = Number((item.price * item.qty).toFixed(2));
          insertItemStmt.run(orderId, item.id, item.name, item.price, item.qty, itemSubtotal);
        }

        db.exec('COMMIT');
      } catch (err) {
        db.exec('ROLLBACK');
        throw err;
      }

      // Send confirmation email
      sendOrderConfirmation({
        to: email,
        name: customer,
        ref,
        items,
        total,
      }).catch(err => console.error('Error sending order email:', err));

      return res.status(201).json({
        success: true,
        message: 'Order created successfully',
        data: {
          ref,
          customer,
          email,
          subtotal,
          tax,
          delivery,
          total,
          itemsCount: items.reduce((s, i) => s + i.qty, 0),
        },
      });
    } catch (err) {
      next(err);
    }
  }
);

// ── GET /api/orders/:ref ────────────────────────────────────────────────────
router.get(
  '/:ref',
  [param('ref').trim().notEmpty().withMessage('Order reference is required'), validate],
  (req, res, next) => {
    try {
      const { ref } = req.params;
      const order = db.prepare('SELECT * FROM orders WHERE ref = ?').get(ref);

      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found',
        });
      }

      const items = db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(order.id);

      return res.json({
        success: true,
        data: {
          ...order,
          items,
        },
      });
    } catch (err) {
      next(err);
    }
  }
);

export default router;

