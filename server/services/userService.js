const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

const getUserByEmail = async ( email ) => {
    const user = await prisma.users.findUnique({
        where: {
            email: email
        }
    })
    return user
}

const getUserById = async ( id ) => {
    const user = await prisma.users.findUnique({
        where: {
            user_id: parseInt(id)
        }
    })
    return user
}

const getAllUsers = async ( search ) => {
    const users = await prisma.users.findMany({
        orderBy: {
            user_id: 'asc'
        },
        where: {
            OR: [
                { name: { contains: search } },
                { email: { contains: search } }
            ]
        }
    })
    return users
}

const addUser = async( name, email, hashedPassword, role ) => {
    const user = await prisma.users.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role
        }
    })
    return user
}

const updateUser = async ( id, name, email, role ) => {
    await prisma.users.update({
        where: {
            user_id: parseInt(id)
        },
        data: {
            name,
            email,
            role
        }
    })
}

const deleteUser = async ( id ) => {
    await prisma.users.delete({
        where: {
            user_id: parseInt(id)
        }
    })
}

module.exports = {
    getUserByEmail,
    addUser,
    updateUser,
    deleteUser,
    getUserById,
    getAllUsers
}