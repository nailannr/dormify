const jwt = require('jsonwebtoken');
const User= require('../models/user')

const JWT_SECRET = process.env.JWT_SECRET;

async function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization']; 

  if (!authHeader || !authHeader.startsWith("Bearer ")){
    return res.status(401).json({ message: 'Access denied. Invalid token format.' });
  }
  const token = authHeader.split(" ")[1]; 

  try {
    const verified = jwt.verify(token, JWT_SECRET); 
    const user = await User.findById(verified.id);
    req.user = user; 
    
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ message: 'Session expired. Please log in again.' });
    }
    res.status(400).json({ message: 'Invalid token.' });
  }
}

module.exports = authMiddleware;
