const pool = require('../db.js');
const bcrypt = require('bcrypt');

const saltRounds = 10;

async function createUser(name, email, password, role = 'user') {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const result = await pool.query(
    'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
    [name, email, hashedPassword, role]
  );
  return result.rows[0];
}

async function findUserByEmail(email) {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
}

module.exports = {
  createUser,
  findUserByEmail
};
// This module handles user-related database operations such as creating a new user and finding a user by email.
// It uses bcrypt for password hashing and PostgreSQL for database interactions.
// The `createUser` function hashes the password before storing it in the database, and the `findUserByEmail` function retrieves user details based on the provided email.      