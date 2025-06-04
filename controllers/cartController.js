const service = require('../services/cartService');
module.exports = {
  getCart: async (req, res) => {
    const userId = req.user.id;
    const result = await service.getCart(userId);
    res.json(result.rows);
  },
  addItem: async (req, res) => {
    const userId = req.user.id;
    const result = await service.addItem(userId, req.body);
    res.status(201).json(result.rows[0]);
  },
  removeItem: async (req, res) => {
    const userId = req.user.id;
    await service.removeItem(userId, req.params.itemId);
    res.status(204).send();
  },
  updateItem: async (req, res) => {
    const userId = req.user.id;
    const result = await service.updateItem(userId, req.params.itemId, req.body.quantity);
    res.json(result.rows[0]);
  }
};