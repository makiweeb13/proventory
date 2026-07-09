const jwt = require('jsonwebtoken');
const { ThrowError } = require('./errorHandler');

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return next(new ThrowError(401, 'Unauthorized'));

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return next(new ThrowError(403, 'Token is invalid'));

      req.user = user;
      next();
    });
};

module.exports = authenticateToken;