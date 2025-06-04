const productModel = require('../models/productModel');
module.exports = {
  getAll: () => productModel.getAll(),
  getById: (id) => productModel.getById(id),
  create: (data) => productModel.create(data),
  update: (id, data) => productModel.update(id, data),
  remove: (id) => productModel.remove(id)
};