const { Pool } = require('pg');
// require('dotenv').config();

const pool = new Pool({
  connectionString: "postgresql://postgres:xbsCuGGvNymdZFHzyBIXsGBWyaWBCjfM@postgres.railway.internal:5432/railway"
    // connectionString: process.env.DATABASE_URL, // Uncomment this line if you want to use the DATABASE_URL from .env file    
  });

module.exports = pool;
