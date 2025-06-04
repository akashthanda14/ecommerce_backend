const db = require('../db');

exports.getOrdersByUserId = async (userId) => {
  const result = await db.query('SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
  return result.rows;
};

exports.getOrderById = async (id) => {
  const result = await db.query('SELECT * FROM orders WHERE id = $1', [id]);
  return result.rows[0];
};

exports.createOrder = async ({ user_id, total_price, status = 'pending' }) => {
  const result = await db.query(
    `INSERT INTO orders (user_id, total_price, status) VALUES ($1, $2, $3) RETURNING *`,
    [user_id, total_price, status]
  );
  return result.rows[0];
};

exports.updateOrderStatus = async (id, status) => {
  const result = await db.query(
    `UPDATE orders SET status = $1 WHERE id = $2 RETURNING *`,
    [status, id]
  );
  return result.rows[0];
};
