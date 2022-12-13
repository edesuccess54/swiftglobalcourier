const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel')
const ErrorResponse = require("../utils/errorResponse")

const proctect = async (req, res, next) => {
    try {
        const token = req.cookies.token
        console.log("token: " + token)

        console.log(11)
        if(!token) {
            console.log("before")
            next(new ErrorResponse("Not authorized, Please log in",401))
            console.log("after")
            return
        }

        console.log(22)
        // verify token 
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        console.log('the verfified is now is -- '+verified)
        console.log(33)
        if(!verified) {
            next(new ErrorResponse("Invalid token",401))
            return
        }

        console.log(44)
        // get admin 
        const admin = await Admin.findById(verified.id).select('-password')
        console.log(55)
        if(!admin) {
            next(new ErrorResponse("Your account is not authorized",401))
            return
        }
        console.log(66)
        req.admin = admin
        next()
        
    } catch (error) {
        console.log(error)
        return res.status(401).json({error: error.message})
        // next(new ErrorResponse({error: error.message}, 401))
    }
}

module.exports = proctect