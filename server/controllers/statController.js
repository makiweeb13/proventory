const { ThrowError } = require('../middleware/errorHandler');
const statService = require('../services/statService');

const getStatsController = async (req, res, next) => {
    try {
        const totalSales = await statService.getTotalSales();
        const totalUsers = await statService.getTotalUsers();
        const totalProducts = await statService.getTotalProducts();
        const totalStock = await statService.getTotalStock();
        const totalSalesByUser = req.user ? await statService.getTotalSalesByUser(req.user.id) : 0;

        res.status(200).json({
            statistics: [
                { label: 'Total Users', value: totalUsers },
                { label: 'Total Products', value: totalProducts },
                { label: 'Total Stock', value: totalStock },
                { label: 'Total Sales', value: totalSales },
                { label: 'Total Sales by User', value: totalSalesByUser }
            ]
        });
    } catch (error) {
        next(new ThrowError(500, 'Failed to fetch statistics'));
    }
};

module.exports = {
    getStatsController
};