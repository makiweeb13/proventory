const { PrismaClient, Decimal } = require('../generated/prisma');
const prisma = new PrismaClient();


const addSale = async (product_id, user_id, quantity, selling_price) => {
    const amount = new Decimal(selling_price).mul(quantity);

    const sale = await prisma.sales.create({
        data: {
            product_id: parseInt(product_id),
            user_id: parseInt(user_id),
            amount: amount,
            sale_date: new Date()
        }
    });

    const product = await prisma.products.update({
        where : {
            product_id: parseInt(product_id)
        },
        data: {
            stock: {
                decrement: parseInt(quantity)
            }
        }
    });

    if (product.stock < 1) {
        await prisma.products.delete({
            where: {
                product_id: parseInt(product_id)
            }
        });
    }

    return sale;
}

const getAllSales = async (period = 'daily') => {
    let sales;

    switch (period) {
        case 'weekly':
            sales = await prisma.$queryRaw`
                SELECT YEAR(sale_date) as year, WEEK(sale_date, 1) as week, SUM(amount) as totalSales
                FROM sales
                GROUP BY year, week
                ORDER BY year ASC, week ASC
            `;
            break;

        case 'yearly':
            sales = await prisma.$queryRaw`
                SELECT YEAR(sale_date) as year, SUM(amount) as totalSales
                FROM sales
                GROUP BY year
                ORDER BY year ASC
            `;
            break;

        default:
            sales = await prisma.$queryRaw`
                SELECT DATE(sale_date) as date, SUM(amount) as totalSales
                FROM sales
                GROUP BY DATE(sale_date)
                ORDER BY date ASC
            `;
            break;
    }

    return sales;
}

module.exports = {
    addSale,
    getAllSales
}