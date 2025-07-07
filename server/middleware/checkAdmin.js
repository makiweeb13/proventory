function checkAdmin(req, res, next) {
    // Assumes req.user is set by your authentication middleware
    if (req.user && req.user.role === 'admin') {
        return next();
    }
    return res.status(403).json({ message: 'Forbidden: Admins only.' });
}

module.exports = checkAdmin;