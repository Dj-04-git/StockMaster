const jwt = require('jsonwebtoken');


function generateJwt(user) {
return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
}


module.exports = { generateJwt };