const jwt = require('jsonwebtoken')
require('dotenv').config();

const auth_handler = (req, res, next) => {
    try{
    
    const token =req.headers.authorization.substring(7)
    const decoded = jwt.verify(token, process.env.JWT_SIGN_KEY)
    req.user_id = decoded.id
    next()
    } catch (err) {
        next(new Error('Invalid Token'))
    }
}

module.exports = {
    auth_handler
}