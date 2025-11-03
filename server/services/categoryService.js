const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

const getAllCategories = async ( search, skip, limit, order, filter ) => {

    const categories = await prisma.categories.findMany(filter === 'all' ? {} : {
        orderBy: {
            name: order === 'desc' ? 'desc' : 'asc'
        },
        where: {
            name: { contains: search }
        },
        skip: skip,
        take: limit
    })
    return categories
}

const getCategoryByName = async ( name ) => {
    const category = await prisma.categories.findFirst({
        where: {
            name: name
        }
    })
    return category
}

const addCategory = async ( name ) => {
    const category = await prisma.categories.create({
        data: {
            name
        }
    })
    return category
}

const updateCategory = async ( id, name ) => {
    const category = await prisma.categories.update({
        where: { category_id: parseInt(id) },
        data: { name }
    })
    return category
}

const deleteCategory = async ( id ) => {
    await prisma.categories.delete({
        where: { category_id: parseInt(id) }
    })
}

const getTotalCategoriesCount = async ( search ) => {
    const count = await prisma.categories.count({
        where: {
            name: { contains: search }
        }
    });
    return count;
}

module.exports = {
    getAllCategories,
    getCategoryByName,
    addCategory,
    updateCategory,
    deleteCategory,
    getTotalCategoriesCount
}