// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  try {

    // Get Authorization header
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      return res.status(401).json({
        status: 'error',
        message: 'Access token required'
      });
    }

    // Extract token from "Bearer TOKEN"
    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid token format'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request
    req.user = decoded;

    next();

  } catch (error) {
    return res.status(403).json({
      status: 'error',
      message: 'Invalid or expired token'
    });
  }
};

module.exports = authenticateToken;