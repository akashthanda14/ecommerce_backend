const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const upload = require('../middlewares/uploadMiddleware'); // 👈 Add this

// 🟢 Public routes
router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);

// 🔐 Protected admin routes (with image upload support)
router.post(
  '/',
  authMiddleware,
  adminMiddleware,
  upload.single('image'),  // 👈 Multer middleware
  ctrl.create
);

router.put(
  '/:id',
  authMiddleware,
  adminMiddleware,
  upload.single('image'),  // 👈 Multer middleware
  ctrl.update
);

router.delete('/:id', authMiddleware, adminMiddleware, ctrl.remove);

module.exports = router;
