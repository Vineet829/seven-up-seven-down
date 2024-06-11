const jwt = require('jsonwebtoken');
const User = require('../models/Users');

module.exports = async function (req, res, next) {
  
  const token = req.header('x-auth-token');
console.log(token)
  
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.user.id);

    
    if (!user) {
      return res.status(401).json({ msg: 'User not found, authorization denied' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('Token verification failed:', err.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
