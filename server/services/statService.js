const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

const getTotalSales = async () => {
    const totalSales = await prisma.sales.aggregate({
        _sum: {
            amount: true
        }
    });
    return totalSales._sum.amount || 0;
}

const getTotalUsers = async () => {
    const totalUsers = await prisma.users.count();
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

module.exports = {
    getTotalSales,
    getTotalUsers,
    getTotalProducts,
    getTotalStock,
    getTotalSalesByUser
};