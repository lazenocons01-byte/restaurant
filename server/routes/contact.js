/**
 * routes/contact.js — Contact message endpoints
 */

import { Router } from 'express';
import { body } from 'express-validator';
import db from '../db.js';
import { validate } from '../middleware/validate.js';
import { sendContactNotification } from '../mailer.js';

const router = Router();

// ── POST /api/contact ───────────────────────────────────────────────────────
router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
    body('email').trim().isEmail().withMessage('A valid email is required').normalizeEmail(),
    body('subject').optional().trim().isLength({ max: 150 }),
    body('message').trim().notEmpty().withMessage('Message content is required').isLength({ max: 2000 }),
    validate,
  ],
  async (req, res, next) => {
    try {
      const { name, email, subject, message } = req.body;

      const stmt = db.prepare(`
        INSERT INTO contact_messages (name, email, subject, message)
        VALUES (?, ?, ?, ?)
      `);

      stmt.run(name, email, subject || null, message);

      sendContactNotification({
        name,
        email,
        subject,
        message,
      }).catch(err => console.error('Contact notification failed:', err));

      return res.status(201).json({
        success: true,
        message: 'Your message has been sent successfully. We will get back to you shortly!',
      });
    } catch (err) {
      next(err);
    }
  }
);

export default router;

