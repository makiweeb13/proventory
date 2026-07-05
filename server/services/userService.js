const { PrismaClient } = require('../generated/prisma');

const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

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

const getAllUsers = async ( search, order = 'asc', skip, limit, showDeleted = false ) => {
    const where = {
        OR: [
            { name: { contains: search } },
            { email: { contains: search } }
        ]
    };
    if (!showDeleted) {
        where.account_status = { not: 'deleted' };
    }
    const users = await prisma.users.findMany({
        orderBy: {
            name: order
        },
        skip: skip,
        take: limit,
        where
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
    const data = {};
    if (name !== undefined) data.name = name;
    if (email !== undefined) data.email = email;
    if (role !== undefined) data.role = role;
    await prisma.users.update({
        where: {
            user_id: parseInt(id)
        },
        data
    })
}

const deleteUser = async ( id ) => {
    await prisma.users.update({
        where: {
            user_id: parseInt(id)
        },
        data: {
            account_status: 'deleted'
        }
    })
}

const updateUserStatus = async ( id, status ) => {
    await prisma.users.update({
        where: {
            user_id: parseInt(id)
        },
        data: {
            account_status: status
        }
    })
}

const updateUserPassword = async ( id, hashedPassword ) => {
    await prisma.users.update({
        where: {
            user_id: parseInt(id)
        },
        data: {
            password: hashedPassword
        }
    })
}

const getTotalUsersCount = async ( search, showDeleted = false ) => {
    const where = {
        OR: [
            { name: { contains: search } },
            { email: { contains: search } }
        ]
    };
    if (!showDeleted) {
        where.account_status = { not: 'deleted' };
    }
    const count = await prisma.users.count({ where });
    return count
}

module.exports = {
    getUserByEmail,
    addUser,
    updateUser,
    deleteUser,
    getUserById,
    getAllUsers,
    updateUserPassword,
    getTotalUsersCount,
    updateUserStatus
}
