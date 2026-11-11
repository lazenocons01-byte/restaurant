/**
 * routes/reservations.js — Table reservation endpoints
 */

import { Router } from 'express';
import { body, param } from 'express-validator';
import crypto from 'crypto';
import db from '../db.js';
import { validate } from '../middleware/validate.js';
import { sendReservationConfirmation } from '../mailer.js';

const router = Router();

function generateRef() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes = crypto.randomBytes(8);
  let ref = 'RES-';
  for (let i = 0; i < 8; i++) {
    ref += chars[bytes[i] % chars.length];
  }
  return ref;
}

// ── POST /api/reservations ──────────────────────────────────────────────────
router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
    body('email').trim().isEmail().withMessage('A valid email is required').normalizeEmail(),
    body('phone').optional().trim().isLength({ max: 30 }),
    body('date').trim().notEmpty().withMessage('Reservation date is required')
      .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('Date must be in YYYY-MM-DD format'),
    body('time').trim().notEmpty().withMessage('Reservation time is required'),
    body('guests').isInt({ min: 1, max: 20 }).withMessage('Guest count must be between 1 and 20'),
    body('occasion').optional().trim().isLength({ max: 100 }),
    body('message').optional().trim().isLength({ max: 500 }),
    validate,
  ],
  async (req, res, next) => {
    try {
      const { name, email, phone, date, time, guests, occasion, message } = req.body;
      const ref = generateRef();

      const stmt = db.prepare(`
        INSERT INTO reservations (ref, name, email, phone, date, time, guests, occasion, message)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      stmt.run(
        ref,
        name,
        email,
        phone || null,
        date,
        time,
        Number(guests),
        occasion || null,
        message || null
      );

      // Send confirmation email asynchronously
      sendReservationConfirmation({
        to: email,
        name,
        ref,
        date,
        time,
        guests,
      }).catch(err => console.error('Error sending reservation email:', err));

      return res.status(201).json({
        success: true,
        message: 'Reservation confirmed successfully',
        data: {
          ref,
          name,
          email,
          date,
          time,
          guests,
          occasion,
        },
      });
    } catch (err) {
      next(err);
    }
  }
);

// ── GET /api/reservations/:ref ──────────────────────────────────────────────
router.get(
  '/:ref',
  [param('ref').trim().notEmpty().withMessage('Reference code is required'), validate],
  (req, res, next) => {
    try {
      const { ref } = req.params;
      const reservation = db.prepare('SELECT * FROM reservations WHERE ref = ?').get(ref);

      if (!reservation) {
        return res.status(404).json({
          success: false,
          message: 'Reservation not found',
        });
      }

      return res.json({
        success: true,
        data: reservation,
      });
    } catch (err) {
      next(err);
    }
  }
);

export default router;

