const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authenticateToken');
const checkAdmin = require('../middleware/checkAdmin');

router.post('/register', authenticateToken, checkAdmin, userController.registerController);
router.post('/login', userController.loginController);
router.post('/logout', authenticateToken, userController.logoutController);
router.get('/me', authenticateToken, userController.getCurrentUser);
router.get('/', authenticateToken, checkAdmin, userController.getAllUsersController);
router.get('/:id', authenticateToken, userController.getUserController);
router.put('/:id', authenticateToken, checkAdmin, userController.updateUserController);
router.delete('/:id', authenticateToken, checkAdmin, userController.deleteUserController);

module.exports = router;