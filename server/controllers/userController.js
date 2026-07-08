const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { ThrowError } = require('../middleware/errorHandler');
const userService = require('../services/userService');

dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET;

const registerController = async (req, res, next) => {
    const { name, email, password, role } = req.body;

    try {
        if (!name || !email || !password || !role) {
            throw new ThrowError(400, 'All fields are required');
        }
        const existingUser = await userService.getUserByEmail(email);
        if (existingUser) {
            throw new ThrowError(400, 'User already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userService.addUser(name, email, hashedPassword, role);
        const { password: _, ...safeUser } = user;
        res.status(201).json({ user: safeUser, message: 'User registered successfully' });
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

        if (findUser.account_status === 'deleted') {
            throw new ThrowError(403, 'Account has been deactivated');
        }

        if (findUser.account_status === 'suspended') {
            throw new ThrowError(403, 'Account is suspended');
        }

        const passwordMatched = await bcrypt.compare(password, findUser.password);

        if (!passwordMatched) {
            throw new ThrowError(400, 'Password mismatch')
        }

        const token = jwt.sign({ id: findUser.user_id, name: findUser.name, email: findUser.email, role: findUser.role, account_status: findUser.account_status }, SECRET_KEY, { expiresIn: '1h'})
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 3600000, sameSite: 'Strict' })
        res.status(200).json({ message: 'Login successful' })

    } catch (error) {
        next(error)
    }
}

const getCurrentUser = async (req, res) => {
    const { id, name, email, role, account_status } = req.user
    res.json({ id, name, email, role, account_status })
}

const getUserController = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await userService.getUserById(id);
        if (!user) {
            throw new ThrowError(404, 'User not found');
        }
        const { password: _, ...safeUser } = user;
        res.json(safeUser);
    } catch (error) {
        next(error);
    }
}

const getAllUsersController = async (req, res, next) => {
    try {
        const { search: rawSearch, page, order, pageSize, showDeleted } = req.query;
        const search = rawSearch || '';
        const showDel = showDeleted === 'true';
        let skip, limit;
        if (!page || !pageSize) {
            limit = 5;
            skip = 0;
        } else {
            skip = (parseInt(page) - 1) * parseInt(pageSize);
            limit = parseInt(pageSize);
        }
        const users = await userService.getAllUsers(search, order, skip, limit, showDel);
        const totalUsers = await userService.getTotalUsersCount(search, showDel);
        const totalPages = Math.ceil(totalUsers / limit);
        res.json({ users, totalPages });
    } catch (error) {
        next(error);
    }
}

const logoutController = (req, res) => {
  res.clearCookie('token', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' });
 
  res.status(200).json({ message: 'Logged out successfully' });
}

const updateUserController = async (req, res, next) => {
    const { id } = req.params;
    const { name, email, role, account_status } = req.body;

    try {
        if (role !== undefined && parseInt(req.user.id) === parseInt(id)) {
            throw new ThrowError(403, 'Cannot change your own role');
        }
        if (name || email || role) {
            await userService.updateUser(id, name, email, role);
        }
        if (account_status) {
            await userService.updateUserStatus(id, account_status);
        }
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        next(error);
    }
}

const deleteUserController = async (req, res, next) => {
    const { id } = req.params;

    try {
        await userService.deleteUser(id);
        res.status(200).json({ message: 'User deactivated successfully' });
    } catch (error) {
        next(error);
    }
}

const forgotPasswordController = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            throw new ThrowError(400, 'Email and password are required');
        }
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