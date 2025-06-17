const service = require('../services/productService');
const path = require('path');

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
    try {
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

      const productData = {
        ...req.body,
        imageUrl,
      };

      const result = await service.create(productData);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  update: async (req, res) => {
    try {
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

      const productData = {
        ...req.body,
        imageUrl,
      };

      const result = await service.update(req.params.id, productData);
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  remove: async (req, res) => {
    try {
      await service.remove(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};
