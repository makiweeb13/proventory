const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const authenticateToken = require('../middleware/authenticateToken');
const checkAdmin = require('../middleware/checkAdmin');

router.post('/', authenticateToken, checkAdmin, categoryController.addCategoryController);
router.get('/', authenticateToken, categoryController.getAllCategoriesController);
router.put('/:id', authenticateToken, checkAdmin, categoryController.updateCategoryController);
router.delete('/:id', authenticateToken, checkAdmin, categoryController.deleteCategoryController);

module.exports = router;