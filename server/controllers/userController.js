const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { ThrowError } = require('../middleware/errorHandler');
const userService = require('../services/userService');

dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET;

const registerController = async (req, res, next) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return ThrowError(res, 400, 'All fields are required');
    }

    try {
        const existingUser = await userService.getUserByEmail(email);
        if (existingUser) {
            return ThrowError(res, 400, 'User already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        userService.addUser(name, email, hashedPassword, role);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    registerController
}