const express = require('express');
const router = express.Router();
const saleController = require('../controllers/saleController');
const authenticateToken = require('../middleware/authenticateToken');

router.post('/', authenticateToken, saleController.addSaleController);
router.get('/', authenticateToken, saleController.getAllSalesController);

module.exports = router;