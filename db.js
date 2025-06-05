const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || `postgresql://${process.env.PG_USER || 'user123'}:${process.env.PG_PASSWORD || 'password123'}@${process.env.PG_HOST || 'db'}:${process.env.PG_PORT || 5432}/${process.env.PG_DATABASE || 'db123'}`,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

module.exports = pool;
