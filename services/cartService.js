const cartModel = require('../models/cartModel');
module.exports = {
  getCart: (userId) => cartModel.getCart(userId),
  addItem: (userId, item) => cartModel.addItem(userId, item),
  removeItem: (userId, itemId) => cartModel.removeItem(userId, itemId),
  updateItem: (userId, itemId, quantity) => cartModel.updateItem(userId, itemId, quantity)
};