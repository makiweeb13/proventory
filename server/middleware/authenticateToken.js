const jwt = require('jsonwebtoken');

// Middleware to check if a user is authenticated by verifying the JWT token
const authenticateToken = (req, res, next) => {
    const token = req.cookies.token; // Assuming token is stored in cookies
    if (!token) return res.status(401).json({ message: "Unauthorized" });
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: "Token is invalid" });
  
      // Attach the user data (decoded token) to the request object
      req.user = user;
      next();
    });
};

module.exports = authenticateToken;