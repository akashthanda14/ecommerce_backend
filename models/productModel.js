const db = require('../db.js');
module.exports = {
  getAll: () => db.query('SELECT * FROM products'),
  getById: (id) => db.query('SELECT * FROM products WHERE id = $1', [id]),
  create: (p) => db.query('INSERT INTO products (name, description, price) VALUES ($1, $2, $3) RETURNING *', [p.name, p.description, p.price]),
  update: (id, p) => db.query('UPDATE products SET name = $1, description = $2, price = $3 WHERE id = $4 RETURNING *', [p.name, p.description, p.price, id]),
  remove: (id) => db.query('DELETE FROM products WHERE id = $1', [id])
};