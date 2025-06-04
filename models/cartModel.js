const db = require('../db');
module.exports = {
  getCart: (userId) => db.query('SELECT * FROM cart WHERE user_id = $1', [userId]),
  addItem: (userId, item) => db.query(
    'INSERT INTO cart (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
    [userId, item.product_id, item.quantity]
  ),
  removeItem: (userId, itemId) => db.query(
    'DELETE FROM cart WHERE user_id = $1 AND id = $2',
    [userId, itemId]
  ),
  updateItem: (userId, itemId, quantity) => db.query(
    'UPDATE cart SET quantity = $1 WHERE user_id = $2 AND id = $3 RETURNING *',
    [quantity, userId, itemId]
  )
};
