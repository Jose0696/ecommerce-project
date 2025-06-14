const express = require('express');
const router = express.Router();

const {
  getProducts,
  getProduct,
  create,
  update,
  remove,
} = require('../controllers/product.controller');

const { verifyToken, requireAdmin } = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload');

// Rutas públicas
router.get('/', getProducts);
router.get('/:id', getProduct);

// Rutas protegidas (solo admin)
router.post(
  '/',
  verifyToken,
  requireAdmin,
  upload.single('image'),
  create
);

router.put(
  '/:id',
  verifyToken,
  requireAdmin,
  upload.single('image'),
  update
);

router.delete('/:id', verifyToken, requireAdmin, remove);

module.exports = router;
