const userModel = require('../models/userModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'wvojnvqovqonqve';

async function signUp({ name, email, password, role = 'user' }) {
  // Check if User Exists
  const existingUser = await userModel.findUserByEmail(email);
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Create New User with Role
  const user = await userModel.createUser(name, email, password, role);

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET_KEY,
    { expiresIn: '1d' }
  );

  return { user, token };
}

async function signIn({ email, password }) {
  const user = await userModel.findUserByEmail(email);
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET_KEY,
    { expiresIn: '1d' }
  );

  delete user.password; // Remove password from response

  return { user, token };
}

module.exports = {
  signUp,
  signIn
};
