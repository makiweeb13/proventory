const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

const getAllProducts = async (search) => {
    const products = await prisma.products.findMany({
        orderBy: {
            product_id: 'asc'
        },
        where: {
            name: { contains: search }
        }
    });
    return products;
};

const addProduct = async (name, stock, buying_price, selling_price, category_id) => {
    const product = await prisma.products.create({
        data: { 
            name, 
            stock: parseInt(stock),
            buying_price: parseFloat(buying_price),
            selling_price: parseFloat(selling_price),
            date_added: new Date(),
            category_id: parseInt(category_id)
        }
    });
    return product;
};

const updateProduct = async (id, name, stock, buying_price, selling_price, category_id) => {
    const product = await prisma.products.update({
        where: { 
            product_id: parseInt(id) 
        },
        data: { 
            name, 
            stock: parseInt(stock),
            buying_price: parseFloat(buying_price),
            selling_price: parseFloat(selling_price),
            category_id: parseInt(category_id)
        }
    });
    return product;
};

const deleteProduct = async (id) => {
    await prisma.products.delete({
        where: { 
            product_id: parseInt(id) 
        }
    });
};

module.exports = {
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct
};