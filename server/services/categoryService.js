const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

const getAllCategories = async ( search ) => {
    const categories = await prisma.categories.findMany({
        orderBy: {
            category_id: 'asc'
        },
        where: {
            name: { contains: search }
        }
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

module.exports = {
    getAllCategories,
    getCategoryByName,
    addCategory,
    updateCategory,
    deleteCategory
}