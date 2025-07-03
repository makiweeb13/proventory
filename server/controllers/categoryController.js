const { ThrowError } = require('../middleware/errorHandler');
const categoryService = require('../services/categoryService');

const addCategoryController = async (req, res, next) => {
    const { name } =  req.body;

    if (!name) {
        return new ThrowError(res, 400, 'Category name required');
    }

    try {
        const category = await categoryService.addCategory(name);
        res.status(201).json({ category, message: 'Category added successfully' });
    } catch (error) {
        next(error);
    }
}

const getAllCategoriesController = async (req, res, next) => {
    try {
        const { search } = req.query;
        const categories = await categoryService.getAllCategories(search);
        res.json(categories);
    } catch (error) {
        next(error)
    }
}

const updateCategoryController = async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) {
        return new ThrowError(res, 400, 'Category name required');
    }
    try {
        const category = await categoryService.updateCategory(id, name);
        res.status(200).json({ category, message: 'Category updated successfully' });
    } catch (error) {
        next(error);
    }
}

const deleteCategoryController = async (req, res, next) => {
    const { id } = req.params;
    try {
        await categoryService.deleteCategory(id);
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    addCategoryController,
    getAllCategoriesController,
    updateCategoryController,
    deleteCategoryController
}