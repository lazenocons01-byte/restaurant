/**
 * routes/subscribers.js — Newsletter subscription endpoints
 */

import { Router } from 'express';
import { body } from 'express-validator';
import db from '../db.js';
import { validate } from '../middleware/validate.js';

const router = Router();

// ── POST /api/newsletter/subscribe ──────────────────────────────────────────
router.post(
  '/subscribe',
  [
    body('email').trim().isEmail().withMessage('Valid email address is required').normalizeEmail(),
    validate,
  ],
  (req, res, next) => {
    try {
      const { email } = req.body;

      const existing = db.prepare('SELECT id, active FROM subscribers WHERE email = ?').get(email);
      if (existing) {
        if (!existing.active) {
          db.prepare('UPDATE subscribers SET active = 1 WHERE id = ?').run(existing.id);
        }
        return res.json({
          success: true,
          message: 'You are already subscribed to our newsletter!',
        });
      }

      db.prepare('INSERT INTO subscribers (email) VALUES (?)').run(email);

      return res.status(201).json({
        success: true,
        message: 'Thank you for subscribing to La Bella Cucina newsletter!',
      });
    } catch (err) {
      next(err);
    }
  }
);

export default router;

