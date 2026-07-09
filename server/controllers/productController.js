const { ThrowError } = require('../middleware/errorHandler');
const productService = require('../services/productService');
const saleController = require('./saleController');
const auditService = require('../services/auditService');
const multer = require('multer');
const { parse } = require('csv-parse/sync');
const prisma = require('../utils/prisma');

const upload = multer({ storage: multer.memoryStorage() });

const addProductController = async (req, res, next) => {
    const { name, stock, buying_price, selling_price, category_id } = req.body;

    try {
        if (!name || !stock || !buying_price || !selling_price || !category_id) {
            throw new ThrowError(400, 'All product fields are required');
        }
        existingProduct = await productService.getProductByName(name);
        if (existingProduct && category_id == existingProduct.category_id) {
            throw new ThrowError(400, 'Product already exists');
        }
        const product = await productService.addProduct(name, stock, buying_price, selling_price, category_id);
        return res.status(200).json({ product, message: 'Product added successfully'});
    } catch (error) {
        return next(error);
    }
};

const getAllProductsController = async (req, res, next) => {
    try {
        const { search: rawSearch, page, order, pageSize } = req.query;
        const search = rawSearch || '';
        let skip, limit;
        if (!page || !pageSize) {
            limit = 5;
            skip = 0;
        } else {
            skip = (parseInt(page) - 1) * parseInt(pageSize);
            limit = parseInt(pageSize);
        }
        const products = await productService.getAllProducts(search, order, skip, limit);
        const totalProducts = await productService.getTotalProductsCount(search);
        const totalPages = Math.ceil(totalProducts / limit);
        res.json({ products, totalPages });
    } catch (error) {
        return next(error);
    }
};

const updateProductController = async (req, res, next) => {
    const { id } = req.params;
    const { name, stock, buying_price, selling_price, category_id } = req.body;

    try {
        if (!name || !stock || !buying_price || !selling_price || !category_id) {
            throw new ThrowError(400, 'All product fields are required');
        }
        const product = await productService.updateProduct(id, name, stock, buying_price, selling_price, category_id);
        return res.status(200).json({ product, message: 'Product updated successfully' });
    } catch (error) {
        return next(error);
    }
};

const deleteProductController = async (req, res, next) => {
    const { id } = req.params;

    try {
        const product = await productService.getProductById(id);
        await productService.deleteProduct(id);
        await auditService.logAction(req.user.id, 'DELETE_PRODUCT', 'products', id, { name: product?.name });
        return res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        return next(error);
    }
};

const addStockController = async (req, res, next) => {
    const { id } = req.params;
    const { quantity } = req.body;

    try {
        if (!quantity || quantity < 1) {
            throw new ThrowError(400, 'Quantity must be at least 1');
        }
        const product = await productService.addStock(id, quantity);
        await auditService.logAction(req.user.id, 'ADD_STOCK', 'products', id, { quantity, newStock: product.stock });
        return res.status(200).json({ product, message: 'Stock added successfully' });
    } catch (error) {
        return next(error);
    }
};

const getTopProductsController = async (req, res, next) => {
    try {
        const topProducts = await productService.getTopProducts(10);
        res.json(saleController.convertBigInt(topProducts));
    } catch (error) {
        next(error);
    }
};

const bulkImportController = async (req, res, next) => {
    try {
        if (!req.file) {
            throw new ThrowError(400, 'CSV file is required');
        }
        const csvContent = req.file.buffer.toString('utf-8');
        let records;
        try {
            records = parse(csvContent, {
                columns: true,
                skip_empty_lines: true,
                trim: true
            });
        } catch (parseError) {
            throw new ThrowError(400, 'Invalid CSV format');
        }

        if (records.length === 0) {
            throw new ThrowError(400, 'CSV file is empty');
        }

        const imported = [];
        const errors = [];

        for (let i = 0; i < records.length; i++) {
            const row = records[i];
            const lineNum = i + 2; // header is line 1
            const { name, stock, buying_price, selling_price, category_id } = row;

            if (!name || !stock || !buying_price || !selling_price || !category_id) {
                errors.push({ line: lineNum, error: 'Missing required fields (name, stock, buying_price, selling_price, category_id)' });
                continue;
            }

            const stockNum = parseInt(stock);
            const buyingNum = parseFloat(buying_price);
            const sellingNum = parseFloat(selling_price);
            const catId = parseInt(category_id);

            if (isNaN(stockNum) || stockNum < 0) {
                errors.push({ line: lineNum, error: 'Invalid stock value' });
                continue;
            }
            if (isNaN(buyingNum) || buyingNum < 0) {
                errors.push({ line: lineNum, error: 'Invalid buying_price value' });
                continue;
            }
            if (isNaN(sellingNum) || sellingNum < 0) {
                errors.push({ line: lineNum, error: 'Invalid selling_price value' });
                continue;
            }
            if (isNaN(catId)) {
                errors.push({ line: lineNum, error: 'Invalid category_id' });
                continue;
            }

            try {
                const product = await productService.addProduct(name, stockNum, buyingNum, sellingNum, catId);
                imported.push(product.name);
            } catch (err) {
                errors.push({ line: lineNum, error: err.message || 'Failed to import' });
            }
        }

        await auditService.logAction(req.user.id, 'IMPORT_PRODUCTS', 'products', null, { imported: imported.length, errors: errors.length });

        res.status(201).json({
            message: `Imported ${imported.length} product(s) successfully`,
            imported: imported.length,
            errors
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    addProductController,
    getAllProductsController,
    updateProductController,
    deleteProductController,
    addStockController,
    getTopProductsController,
    bulkImportController,
    upload
};