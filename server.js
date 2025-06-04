require('dotenv').config();
const db = require('./db.js');
const express = require('express');
const port = process.env.PORT || 3000;
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes.js');
const orderRoutes = require('./routes/orderRoutes');


const authRoutes = require('./routes/authRoutes.js');


const app = express();

app.use(express.json());

// Example middleware to inject user object (simulate auth)
app.use((req, res, next) => {
  req.user = { id: 1 }; // mock user
  next();
});



app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);


const migrate = async () => {
  // 1. Products table
  await db.query(`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      description TEXT,
      price NUMERIC(10, 2) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);

  // 2. Orders table — must come before order_items
  await db.query(`
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL,
      total_price NUMERIC(10, 2) NOT NULL,
      status VARCHAR(20) DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 3. Order items table (after orders & products)
  await db.query(`
    CREATE TABLE IF NOT EXISTS order_items (
      id SERIAL PRIMARY KEY,
      order_id INT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
      product_id INT NOT NULL REFERENCES products(id),
      quantity INT NOT NULL,
      price NUMERIC(10, 2) NOT NULL
    );
  `);

  // 4. Cart table
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


migrate();

app.listen(port,'0.0.0.0', () => {
  console.log("Server started on port", port);
});