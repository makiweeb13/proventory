const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const authenticateToken = require('../middleware/authenticateToken');

router.post('/', authenticateToken, categoryController.addCategoryController);
router.get('/', authenticateToken, categoryController.getAllCategoriesController);
router.put('/:id', authenticateToken, categoryController.updateCategoryController);
router.delete('/:id', authenticateToken, categoryController.deleteCategoryController);

module.exports = router;