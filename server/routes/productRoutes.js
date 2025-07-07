const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authenticateToken = require('../middleware/authenticateToken');
const checkAdmin = require('../middleware/checkAdmin');

router.post('/', authenticateToken, checkAdmin, productController.addProductController);
router.get('/', authenticateToken, productController.getAllProductsController);
router.put('/:id', authenticateToken, checkAdmin, productController.updateProductController);
router.delete('/:id', authenticateToken, checkAdmin, productController.deleteProductController);

module.exports = router;