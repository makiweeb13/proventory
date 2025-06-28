const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authenticateToken');

router.post('/register', userController.registerController);
router.post('/login', userController.loginController);
router.get('/me', authenticateToken, userController.getUser);

module.exports = router;