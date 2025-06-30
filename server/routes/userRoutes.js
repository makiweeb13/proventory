const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authenticateToken');

router.post('/register', authenticateToken, userController.registerController);
router.post('/login', userController.loginController);
router.post('/logout', authenticateToken, userController.logoutController);
router.get('/me', authenticateToken, userController.getCurrentUser);
router.get('/', authenticateToken, userController.getAllUsersController);
router.get('/:id', authenticateToken, userController.getUserController);

module.exports = router;