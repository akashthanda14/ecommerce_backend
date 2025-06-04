const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/productController');

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);
router.post('/', ctrl.create); // Assume auth middleware checks admin
router.put('/:id', ctrl.update); // Assume auth middleware checks admin
router.delete('/:id', ctrl.remove); // Assume auth middleware checks admin

module.exports = router;