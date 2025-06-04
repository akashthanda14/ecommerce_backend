const Order = require('../models/orderModel');

exports.getAllOrdersForUser = async (userId) => {
  return await Order.getOrdersByUserId(userId);
};

exports.getOrderById = async (id) => {
  return await Order.getOrderById(id);
};

exports.createOrder = async (orderData) => {
  return await Order.createOrder(orderData);
};

exports.updateOrderStatus = async (id, status) => {
  return await Order.updateOrderStatus(id, status);
};
