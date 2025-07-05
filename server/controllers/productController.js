const { ThrowError } = require('../middleware/errorHandler');
const productService = require('../services/productService');

const addProductController = async (req, res, next) => {
    const { name, stock, buying_price, selling_price, category_id } = req.body;

    if (!name || !stock || !buying_price || !selling_price || !category_id) {
        return new ThrowError(res, 400, 'All product fields are required');
    }

    try {
        const product = await productService.addProduct(name, stock, buying_price, selling_price, category_id);
        return res.status(200).json({ product, message: 'Product added successfully'});
    } catch (error) {
        return next(error);
    }
};

const getAllProductsController = async (req, res, next) => {
    try {
        const { search } = req.query;
        const products = await productService.getAllProducts(search);
        return res.json(products);
    } catch (error) {
        return next(error);
    }
};

const updateProductController = async (req, res, next) => {
    const { id } = req.params;
    const { name, stock, buying_price, selling_price, category_id } = req.body;

    if (!name || !stock || !buying_price || !selling_price || !category_id) {
        return new ThrowError(res, 400, 'All product fields are required');
    }

    try {
        const product = await productService.updateProduct(id, name, stock, buying_price, selling_price, category_id);
        return res.status(200).json({ product, message: 'Product updated successfully' });
    } catch (error) {
        return next(error);
    }
};

const deleteProductController = async (req, res, next) => {
    const { id } = req.params;

    try {
        await productService.deleteProduct(id);
        return res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    addProductController,
    getAllProductsController,
    updateProductController,
    deleteProductController
};