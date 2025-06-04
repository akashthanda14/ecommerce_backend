const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/cartController');

router.get('/', ctrl.getCart);
router.post('/', ctrl.addItem);
router.delete('/:itemId', ctrl.removeItem);
router.put('/:itemId', ctrl.updateItem);

module.exports = router;