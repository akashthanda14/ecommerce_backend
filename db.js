require('dotenv').config(); // Ensure this line is at the top to load environment variables
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Use the DATABASE_URL from .env file
  ssl: {
    rejectUnauthorized: false // For local development, set to true in production
  }
}); 

module.exports = pool;
