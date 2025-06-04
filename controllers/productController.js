const service = require('../services/productService');
module.exports = {
  getAll: async (req, res) => {
    const result = await service.getAll();
    res.json(result.rows);
  },
  getById: async (req, res) => {
    const result = await service.getById(req.params.id);
    res.json(result.rows[0]);
  },
  create: async (req, res) => {
    const result = await service.create(req.body);
    res.status(201).json(result.rows[0]);
  },
  update: async (req, res) => {
    const result = await service.update(req.params.id, req.body);
    res.json(result.rows[0]);
  },
  remove: async (req, res) => {
    await service.remove(req.params.id);
    res.status(204).send();
  }
};