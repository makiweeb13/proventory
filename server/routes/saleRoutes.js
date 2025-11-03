const express = require('express');
const router = express.Router();
const saleController = require('../controllers/saleController');
const authenticateToken = require('../middleware/authenticateToken');

router.post('/', authenticateToken, saleController.addSaleController);
router.get('/', authenticateToken, saleController.getAllSalesController);
router.get('/transactions', authenticateToken, saleController.getAllTransactionsController);

module.exports = router;