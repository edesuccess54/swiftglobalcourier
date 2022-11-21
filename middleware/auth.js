const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel')
const proctect = async (req, res, next) => {
    try {
        const token = req.cookies.token

        if(!token) {
            res.status(401)
            throw new Error('Not authorized, Please log in')
        }

        // verify token 
        const verified = jwt.verify(token, process.env.JWT_SECRET)

        // get admin 
        const admin = await Admin.findById(verified.id).SELECT('-password')

        if(!admin) {
            res.status(401)
            throw new Error('Your account is not authorized')
        }

        req.admin = admin
        next()
        
    } catch (error) {
        res.status(401).json({error: error.message});
    }
}

module.exports = proctect