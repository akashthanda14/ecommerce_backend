const orderService = require('../services/orderService');

// GET /api/orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrdersForUser(req.user.id);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/orders/:id
exports.getOrder = async (req, res) => {
  try {
    const order = await orderService.getOrderById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/orders
exports.createOrder = async (req, res) => {
  try {
    const orderData = { ...req.body, user_id: req.user.id };
    const order = await orderService.createOrder(orderData);
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/orders/:id
exports.updateOrder = async (req, res) => {
  try {
    const order = await orderService.updateOrderStatus(req.params.id, req.body.status);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
