const db = require('../db.js');

module.exports = {
  getAll: () => db.query('SELECT * FROM products'),

  getById: (id) => db.query('SELECT * FROM products WHERE id = $1', [id]),

  create: (p) =>
    db.query(
      `INSERT INTO products (name, description, price, image_url)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [p.name, p.description, p.price, p.imageUrl]
    ),

  update: (id, p) =>
    db.query(
      `UPDATE products 
       SET name = $1, description = $2, price = $3, image_url = $4 
       WHERE id = $5 
       RETURNING *`,
      [p.name, p.description, p.price, p.imageUrl, id]
    ),

  remove: (id) => db.query('DELETE FROM products WHERE id = $1', [id]),
};
