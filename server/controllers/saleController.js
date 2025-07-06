const { ThrowError } = require('../middleware/errorHandler');
const saleService = require('../services/saleService');
const productService = require('../services/productService');
const { Decimal } = require('../generated/prisma'); // Prisma v4+

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
        const { period } = req.query;
        const sales = await saleService.getAllSales(period);
        const safeSales = convertBigInt(sales);
        return res.json(safeSales);
    } catch (error) {
        next(error)
    }
}

const convertBigInt = (obj) => {
    if (Array.isArray(obj)) {
        return obj.map(convertBigInt);
    } else if (obj && typeof obj === 'object') {
        return Object.fromEntries(
            Object.entries(obj).map(([k, v]) => {
                if (v instanceof Decimal) return [k, v.toNumber()];
                if (v instanceof Date) return [k, v.toISOString().slice(0, 10)]; // YYYY-MM-DD
                if (typeof v === 'bigint') return [k, Number(v)];
                return [k, convertBigInt(v)];
            })
        );
    }
    return obj;
}

module.exports = {
    addSaleController,
    getAllSalesController
}