/**
 * db.js — SQLite database setup and schema migrations
 * Uses Node.js native DatabaseSync (node:sqlite) for zero-dependency, high-performance database access.
 */

import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = process.env.DB_PATH
  ? resolve(process.cwd(), process.env.DB_PATH)
  : resolve(__dirname, '../data/restaurant.db');

// Ensure data directory exists
mkdirSync(dirname(DB_PATH), { recursive: true });

const db = new DatabaseSync(DB_PATH);

// Performance & integrity pragmas
db.exec('PRAGMA journal_mode = WAL;');
db.exec('PRAGMA synchronous = NORMAL;');
db.exec('PRAGMA foreign_keys = ON;');

// ── Schema ────────────────────────────────────────────────────────────────────

db.exec(`
  CREATE TABLE IF NOT EXISTS reservations (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    ref         TEXT    NOT NULL UNIQUE,
    name        TEXT    NOT NULL,
    email       TEXT    NOT NULL,
    phone       TEXT,
    date        TEXT    NOT NULL,
    time        TEXT    NOT NULL,
    guests      INTEGER NOT NULL DEFAULT 2,
    occasion    TEXT,
    message     TEXT,
    status      TEXT    NOT NULL DEFAULT 'confirmed',
    created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS orders (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    ref         TEXT    NOT NULL UNIQUE,
    customer    TEXT    NOT NULL,
    email       TEXT    NOT NULL,
    phone       TEXT,
    address     TEXT,
    subtotal    REAL    NOT NULL,
    tax         REAL    NOT NULL,
    delivery    REAL    NOT NULL DEFAULT 0,
    total       REAL    NOT NULL,
    status      TEXT    NOT NULL DEFAULT 'received',
    notes       TEXT,
    created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS order_items (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id    INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    item_id     INTEGER NOT NULL,
    name        TEXT    NOT NULL,
    price       REAL    NOT NULL,
    qty         INTEGER NOT NULL,
    subtotal    REAL    NOT NULL
  );

  CREATE TABLE IF NOT EXISTS subscribers (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    email       TEXT    NOT NULL UNIQUE,
    active      INTEGER NOT NULL DEFAULT 1,
    created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS contact_messages (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT    NOT NULL,
    email       TEXT    NOT NULL,
    subject     TEXT,
    message     TEXT    NOT NULL,
    read        INTEGER NOT NULL DEFAULT 0,
    created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
  );

  -- Indexes for common queries
  CREATE INDEX IF NOT EXISTS idx_reservations_date   ON reservations(date);
  CREATE INDEX IF NOT EXISTS idx_reservations_email  ON reservations(email);
  CREATE INDEX IF NOT EXISTS idx_orders_status       ON orders(status);
  CREATE INDEX IF NOT EXISTS idx_order_items_order   ON order_items(order_id);
`);

console.log(`✅ Database ready at ${DB_PATH}`);

export default db;
