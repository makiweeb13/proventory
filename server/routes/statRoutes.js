const express = require('express');
const router = express.Router();
const statController = require('../controllers/statController');
const authenticateToken = require('../middleware/authenticateToken');

router.get('/', authenticateToken, statController.getStatsController);

module.exports = router;  