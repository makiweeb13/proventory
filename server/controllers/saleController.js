const { ThrowError } = require('../middleware/errorHandler');
const saleService = require('../services/saleService');
const productService = require('../services/productService');

const addSaleController = async (req, res, next) => {
    const { product_id, user_id, quantity, selling_price } = req.body;
    try {
        const sale = await saleService.addSale(product_id, user_id, quantity, selling_price);
        const product = await productService.getProductById(product_id);
        res.status(200).json({ sale, product, message: 'Sale added successfully' });
    } catch (error) {
        next(new ThrowError(500, 'Failed to add sale'));
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