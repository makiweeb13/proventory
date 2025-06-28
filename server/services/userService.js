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

const addUser = async( name, email, hashedPassword, role ) => {
    await prisma.users.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role
        }
    })
}

module.exports = {
    getUserByEmail,
    addUser,
    getUserById
}