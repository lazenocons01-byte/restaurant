/**
 * server/index.js — Production Express server for La Bella Cucina
 */

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve, join } from 'path';
import { existsSync } from 'fs';

// Routes
import reservationsRouter from './routes/reservations.js';
import ordersRouter from './routes/orders.js';
import subscribersRouter from './routes/subscribers.js';
import contactRouter from './routes/contact.js';
import menuRouter from './routes/menu.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = resolve(__dirname, '..');

const app = express();
const PORT = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

// ── Security Headers ──────────────────────────────────────────────────────────
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", 'https://cdnjs.cloudflare.com'],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com', 'https://cdnjs.cloudflare.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com', 'https://cdnjs.cloudflare.com'],
        imgSrc: ["'self'", 'data:', 'https://images.unsplash.com', 'https://i.pravatar.cc'],
        frameSrc: ["'self'", 'https://www.google.com'],
        connectSrc: ["'self'", 'http://localhost:3000', 'http://localhost:5173'],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);

// ── Compression & CORS ────────────────────────────────────────────────────────
app.use(compression());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
  })
);

// ── Logging ───────────────────────────────────────────────────────────────────
app.use(morgan(isProd ? 'combined' : 'dev'));

// ── Body Parsing ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// ── Rate Limiting ─────────────────────────────────────────────────────────────
const apiLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15 mins
  max: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.',
  },
});

const submitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20, // max 20 reservations/orders per 15 min per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many submissions from this IP. Please try again after 15 minutes.',
  },
});

app.use('/api/', apiLimiter);
app.use('/api/reservations', submitLimiter, reservationsRouter);
app.use('/api/orders', submitLimiter, ordersRouter);
app.use('/api/newsletter', submitLimiter, subscribersRouter);
app.use('/api/contact', submitLimiter, contactRouter);
app.use('/api/menu', menuRouter);

// ── Health Check ──────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// ── Static Files Serving ──────────────────────────────────────────────────────
const distPath = join(ROOT_DIR, 'dist');
if (existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/')) return next();
    res.sendFile(join(distPath, 'index.html'));
  });
} else {
  // Serve root static files for development mode
  app.use(express.static(ROOT_DIR));
}

// ── 404 Handler for API ───────────────────────────────────────────────────────
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint ${req.originalUrl} not found`,
  });
});

// ── Global Error Handler ──────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: isProd ? 'Internal server error' : err.message || 'Internal server error',
    ...(isProd ? {} : { stack: err.stack }),
  });
});

// ── Server Start ──────────────────────────────────────────────────────────────
const server = app.listen(PORT, () => {
  console.log(`🚀 La Bella Cucina server running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;

