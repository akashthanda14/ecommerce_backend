const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Routes (auth middleware already injects req.user)
router.get('/', orderController.getOrders); // GET /api/orders
router.get('/:id', orderController.getOrder); // GET /api/orders/:id
router.post('/', orderController.createOrder); // POST /api/orders
router.put('/:id', orderController.updateOrder); // PUT /api/orders/:id (admin only)

module.exports = router;
