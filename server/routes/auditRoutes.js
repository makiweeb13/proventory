const express = require('express');
const router = express.Router();
const auditController = require('../controllers/auditController');
const authenticateToken = require('../middleware/authenticateToken');
const checkAdmin = require('../middleware/checkAdmin');

router.get('/', authenticateToken, checkAdmin, auditController.getAuditLogsController);

module.exports = router;