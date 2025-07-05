const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authenticateToken = require('../middleware/authenticateToken');

router.post('/', authenticateToken, productController.addProductController);
router.get('/', authenticateToken, productController.getAllProductsController);
router.put('/:id', authenticateToken, productController.updateProductController);
router.delete('/:id', authenticateToken, productController.deleteProductController);

module.exports = router;