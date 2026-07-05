const jwt = require('jsonwebtoken');
const { ThrowError } = require('../middleware/errorHandler');
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();
const { seed } = require('../services/seedService');

const seedController = async (req, res, next) => {
    try {
        const adminCount = await prisma.users.count({ where: { role: 'admin' } });

        if (adminCount > 0) {
            const token = req.cookies && req.cookies.token;
            if (!token) {
                throw new ThrowError(401, 'Authentication required');
            }

            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                if (decoded.role !== 'admin') {
                    throw new ThrowError(403, 'Admin access required');
                }
            } catch (err) {
                if (err instanceof ThrowError) throw err;
                throw new ThrowError(403, 'Token is invalid');
            }
        }

        const result = await seed();
        res.status(201).json({ message: 'Seed completed', data: result });
    } catch (error) {
        next(error);
    }
};

module.exports = { seedController };
