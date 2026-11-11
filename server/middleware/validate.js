/**
 * validate.js — Input validation middleware using express-validator
 */

import { validationResult } from 'express-validator';

/**
 * Middleware to check validation results and return 422 on failure.
 */
export function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(e => ({ field: e.path, message: e.msg })),
    });
  }
  next();
}
