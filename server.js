require('dotenv').config();
const db = require('./db.js');
const express = require('express');
const port = process.env.PORT || 3000;

const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes.js');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes.js');

const helmet = require('./middlewares/helmet.js');
const { apiLimiter, authLimiter } = require('./middlewares/rateLimit.js');

const app = express();

app.use(helmet);
app.use('/api', apiLimiter); // Apply general rate limiter
app.use(express.json());


app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the E-commerce API!');
});

const migrate = async () => {
  // Create users table if missing (without role column)
  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),             -- Added name column here
      email VARCHAR(100) UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);

  // Add role column if missing
  await db.query(`
    ALTER TABLE users
    ADD COLUMN IF NOT EXISTS role VARCHAR(10) DEFAULT 'user';
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      description TEXT,
      price NUMERIC(10, 2) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL,
      total_price NUMERIC(10, 2) NOT NULL,
      status VARCHAR(20) DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS order_items (
      id SERIAL PRIMARY KEY,
      order_id INT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
      product_id INT NOT NULL REFERENCES products(id),
      quantity INT NOT NULL,
      price NUMERIC(10, 2) NOT NULL
    );
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS cart (
      id SERIAL PRIMARY KEY,
      user_id INT NOT NULL,
      product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
      quantity INT NOT NULL DEFAULT 1,
      added_at TIMESTAMP DEFAULT NOW()
    );
  `);
};

(async () => {
  await migrate();
  app.listen(port, '0.0.0.0', () => {
    console.log("Server started on port", port);
  });
})();
