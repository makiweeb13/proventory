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

const getProductById = async (id) => {
    const product = await prisma.products.findUnique({
        where: { product_id: parseInt(id) }
    });
    return product;
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

const getTopProducts = async (limit = 10) => {
    return await prisma.$queryRaw`
        SELECT p.product_id, p.name, p.stock, COUNT(s.product_id) as totalSold
        FROM products p
        JOIN sales s ON p.product_id = s.product_id
        GROUP BY p.product_id, p.name, p.stock
        HAVING COUNT(s.product_id) > 0
        ORDER BY totalSold DESC
        LIMIT ${Number(limit)}
    `;
};

module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    getTopProducts
};