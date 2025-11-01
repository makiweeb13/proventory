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
        throw new ThrowError(400, 'All fields are required');
    }

    try {
        const existingUser = await userService.getUserByEmail(email);
        if (existingUser) {
            throw new ThrowError(400, 'User already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userService.addUser(name, email, hashedPassword, role);
        res.status(201).json({ user, message: 'User registered successfully' });
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
            throw new ThrowError(404, 'User not found');
        }
        res.json(user);
    } catch (error) {
        next(error);
    }
}

const getAllUsersController = async (req, res, next) => {
    try {
        const { search, page, order, pageSize } = req.query;
        if (!page || !pageSize) {
            limit = 5;
            skip = 0;
        } else {
            skip = (parseInt(page) - 1) * parseInt(pageSize);
            limit = parseInt(pageSize);
        }
        const users = await userService.getAllUsers(search, order, skip, limit);
        const totalUsers = await userService.getTotalUsersCount();
        const totalPages = Math.ceil(totalUsers / limit);
        res.json({ users, totalPages });
    } catch (error) {
        next(error);
    }
}

const logoutController = (req, res) => {
  // Clear the JWT cookie
  res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'strict' });
 
  res.status(200).json({ message: 'Logged out successfully' });
}

const updateUserController = async (req, res, next) => {
    const { id } = req.params;
    const { name, email } = req.body;

    if (!name || !email ) {
        throw new ThrowError(400, 'All fields are required');
    }

    try {
        await userService.updateUser(id, name, email );
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        next(error);
    }
}

const deleteUserController = async (req, res, next) => {
    const { id } = req.params;

    try {
        await userService.deleteUser(id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
}

const forgotPasswordController = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ThrowError(400, 'Email and password are required');
    }

    try {
        const user = await userService.getUserByEmail(email);
        if (!user) {
            throw new ThrowError(404, 'User not found');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await userService.updateUserPassword(user.user_id, hashedPassword);
        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    registerController,
    loginController,
    getCurrentUser,
    getUserController,
    getAllUsersController,
    logoutController,
    updateUserController,
    deleteUserController,
    forgotPasswordController
}