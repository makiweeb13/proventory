const auditService = require('../services/auditService');

const getAuditLogsController = async (req, res, next) => {
    try {
        const { search: rawSearch, page, order, pageSize } = req.query;
        const search = rawSearch || '';
        let skip, limit;
        if (!page || !pageSize) {
            limit = 10;
            skip = 0;
        } else {
            skip = (parseInt(page) - 1) * parseInt(pageSize);
            limit = parseInt(pageSize);
        }
        const logs = await auditService.getAuditLogs(search, skip, limit, order);
        const totalLogs = await auditService.getAuditLogCount(search);
        const totalPages = Math.ceil(totalLogs / limit);
        res.json({ logs, totalPages });
    } catch (error) {
        next(error);
    }
};

module.exports = { getAuditLogsController };