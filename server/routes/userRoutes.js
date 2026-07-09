const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authenticateToken');
const checkAdmin = require('../middleware/checkAdmin');
const { authLimiter } = require('../middleware/rateLimiter');

router.post('/register', authenticateToken, checkAdmin, userController.registerController);
router.post('/login', authLimiter, userController.loginController);
router.post('/logout', authenticateToken, userController.logoutController);
router.get('/me', authenticateToken, userController.getCurrentUser);
router.post('/forgot-password', authLimiter, userController.forgotPasswordController);
router.get('/', authenticateToken, checkAdmin, userController.getAllUsersController);
router.get('/:id', authenticateToken, userController.getUserController);
router.put('/profile', authenticateToken, userController.updateProfileController);
router.put('/change-password', authenticateToken, userController.changePasswordController);
router.put('/:id', authenticateToken, checkAdmin, userController.updateUserController);
router.delete('/:id', authenticateToken, checkAdmin, userController.deleteUserController);

module.exports = router;