const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();


const addSale = async (product_id, user_id, quantity, selling_price) => {
    const amount = selling_price * quantity;

    const sale = await prisma.sales.create({
        data: {
            product_id: parseInt(product_id),
            user_id,
            amount: selling_price * quantity,
            sale_date: new Date()
        }
    });

    await prisma.products.update({
        where : {
            product_id: parseInt(product_id)
        },
        data: {
            stock: {
                decrement: quantity
            }
        }
    })

    return sale;
}

const getAllSales = async (search) => {
    const sales = await prisma.sales.findMany({
        where: {
            OR: [
                { product_id: { contains: parseInt(search) } },
                { user_id: { contains: parseInt(search) } },
                { sale_date: { contains: search } }
            ]
        },
        orderBy: {
            sale_date: 'desc'
        }
    })
    return sales;
}

module.exports = {
    addSale,
    getAllSales
}