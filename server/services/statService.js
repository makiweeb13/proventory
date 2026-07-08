const prisma = require('../utils/prisma');

const getTotalSales = async () => {
    const totalSales = await prisma.sales.aggregate({
        _sum: {
            amount: true
        }
    });
    return totalSales._sum.amount || 0;
}

const getTotalUsers = async () => {
    const totalUsers = await prisma.users.count({
        where: {
            account_status: { not: 'deleted' }
        }
    });
    return totalUsers;
}

const getTotalProducts = async () => {
    const totalProducts = await prisma.products.count();
    return totalProducts;
}

const getTotalStock = async () => {
    const totalStock = await prisma.products.aggregate({
        _sum: {
            stock: true
        }
    });
    return totalStock._sum.stock || 0;
}

const getTotalSalesByUser = async (userId) => {
    const totalSales = await prisma.sales.aggregate({
        _sum: {
            amount: true
        },
        where: {
            user_id: parseInt(userId)
        }
    });
    return totalSales._sum.amount || 0;
}

const getLowStockCount = async (threshold = 5) => {
    return await prisma.products.count({
        where: { stock: { lte: threshold } }
    });
}

const getTotalInventoryValue = async () => {
    const products = await prisma.products.findMany({
        select: { stock: true, buying_price: true }
    });
    return products.reduce((total, p) => total + (p.stock * Number(p.buying_price)), 0);
}

module.exports = {
    getTotalSales,
    getTotalUsers,
    getTotalProducts,
    getTotalStock,
    getTotalSalesByUser,
    getLowStockCount,
    getTotalInventoryValue
};