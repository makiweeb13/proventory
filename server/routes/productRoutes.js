const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/', productController.addProductController);
router.get('/', productController.getAllProductsController);
router.put('/:id', productController.updateProductController);
router.delete('/:id', productController.deleteProductController);

module.exports = router;