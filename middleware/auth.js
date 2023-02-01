const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel')
const ErrorResponse = require("../utils/errorResponse").default

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token

        if(!token) {
            res.redirect("/admin/login")
            return
        }

        // verify token 
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        if(!verified) {
            res.redirect("/admin/login")
            return
        }

        // get admin 
        const admin = await Admin.findById(verified.id).select('-password')
        if(!admin) {
            res.redirect("/admin/login")
            return
        }

        req.admin = admin 
        next()

    } catch (error) {
        res.redirect("/admin/login")
        return 
    }
}

module.exports = auth