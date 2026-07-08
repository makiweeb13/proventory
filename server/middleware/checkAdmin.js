const { ThrowError } = require('./errorHandler');

function checkAdmin(req, res, next) {
    if (req.user && req.user.role === 'admin') {
        return next();
    }
    return next(new ThrowError(403, 'Forbidden: Admins only.'));
}

module.exports = checkAdmin;