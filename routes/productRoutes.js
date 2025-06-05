const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);

// 🔐 Protected admin routes
router.post('/', authMiddleware, adminMiddleware, ctrl.create);
router.put('/:id', authMiddleware, adminMiddleware, ctrl.update);
router.delete('/:id', authMiddleware, adminMiddleware, ctrl.remove);

module.exports = router;
