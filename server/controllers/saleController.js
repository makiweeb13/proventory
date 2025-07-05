const { ThrowError } = require('../middleware/errorHandler');
const saleService = require('../services/saleService');

const addSaleController = async (req, res, next) => {
    const { product_id, user_id, quantity, selling_price } = req.body;
    try {
        const sale = await saleService.addSale(product_id, user_id, quantity, selling_price);
        res.status(200).json({ sale, message: 'Sale added successfully' });
    } catch (error) {
        next(ThrowError(500, 'Failed to add sale'));
    }
}

const getAllSalesController = async (req, res, next) => {
    try {
        const { search } = req.query;
        const sales = await saleService.getAllSales(search);
        return res.json(sales);
    } catch (error) {
        next(error)
    }
}

module.exports = {
    addSaleController,
    getAllSalesController
}