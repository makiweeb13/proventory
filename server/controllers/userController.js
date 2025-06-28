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

const loginController = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const findUser = await userService.getUserByEmail(email);

        if (!findUser) {
            throw new ThrowError(404, 'User not found');
        }

        const passwordMatched = await bcrypt.compare(password, findUser.password);

        if (!passwordMatched) {
            throw new ThrowError(400, 'Password mismatch')
        }

        const token = jwt.sign({ id: findUser.user_id, name: findUser.name, email: findUser.email, role: findUser.role }, SECRET_KEY, { expiresIn: '1h'})
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 3600000, sameSite: 'Strict' })
        res.status(200).json({ message: 'Login successful' })

    } catch (error) {
        next(error)
    }
}

const getCurrentUser = async (req, res) => {
    const { id, name, email, role } = req.user
    res.json({ id, name, email, role })
}

const getUserController = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await userService.getUserById(id);
        if (!user) {
            return ThrowError(res, 404, 'User not found');
        }
        res.json(user);
    } catch (error) {
        next(error);
    }
}

const logoutController = (req, res) => {
  // Clear the JWT cookie
  res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'strict' });
 
  res.status(200).json({ message: 'Logged out successfully' });
}
    
module.exports = {
    registerController,
    loginController,
    getCurrentUser,
    getUserController,
    logoutController
}