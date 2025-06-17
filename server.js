require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const db = require('./db.js');
const port = process.env.PORT || 3000;

// Routes
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes.js');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes.js');

// Middlewares
const helmet = require('./middlewares/helmet.js');
const { apiLimiter, authLimiter } = require('./middlewares/rateLimit.js');

const app = express();

const path = require('path');
const fs = require('fs');

// Ensure uploads folder exists
const uploadsPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath);
}

// Serve static image files
app.use('/uploads', express.static(uploadsPath));


// Middleware setup
app.use(helmet);
app.use(express.json());
app.use('/api', apiLimiter); // general rate limit

// Routes
app.use('/api/auth', authLimiter, authRoutes); // auth limiter applied
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the E-commerce API!');
});

// 🧱 Migration logic
const migrate = async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(100) UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);

  await db.query(`
    ALTER TABLE users
    ADD COLUMN IF NOT EXISTS name VARCHAR(100);
  `);

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
  ALTER TABLE products
  ADD COLUMN IF NOT EXISTS image_url TEXT;
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

// 🛡️ Create default admin user if not exists
const createDefaultAdmin = async () => {
  const email = 'admin@example.com';
  const name = 'Admin';
  const password = 'admin123';
  const role = 'admin';

  const existing = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  if (existing.rows.length > 0) {
    console.log('✅ Admin already exists');
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.query(
    'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)',
    [name, email, hashedPassword, role]
  );

  console.log('✅ Default admin created: admin@example.com / admin123');
};

// 🚀 Start Server
(async () => {
  try {
    await migrate();
    await createDefaultAdmin();
    app.listen(port, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  } catch (err) {
    console.error('❌ Startup error:', err.message);
  }
})();
