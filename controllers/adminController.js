const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel')
const validator = require("validator")


generateToken = async (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: "1d"})
}


// register admin 
const registerAdmin = async (req, res) => {
    const {email, password} = req.body

    try {
        // validation 
        if(!validator.isEmail(email)) {
            res.status(400)
            throw new Error("Invalid email")
        }

        if(!validator.isStrongPassword(password)) {
            res.status(400)
            throw new Error("Password is not strong enough")
        }

        const admin = await Admin.create({
            email,
            password
        })

        // generateToken
        const token = await generateToken(admin._id)

        console.log("the token  is " + token)

        res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + ( 1000 * 86400)),
            sameSite:"none",
            secure: true
        })

        if(admin) {
            const { _id, email, password } = admin
            res.status(200).json({
                _id, 
                email, 
                password,
                token
            })
        } else {
            res.status(400)
            throw new Error("Registration failed")
        }
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


// login admin 
const loginAdmin = async(req, res) => {
    const { email, password } = req.body

    try {
        // validation
        if(!email || !password) {
            res.status(400)
            throw new Error("Fill all fields")
        }

        // check if email is valid email address
        if(!validator.isEmail(email)) {
            res.status(400)
            throw new Error("Not a valid email address")
        }

        // check if password is strong enough
        if(!validator.isStrongPassword(password)) {
            res.status(400)
            throw new Error("Password is not strong enough")
        }

        // check if details are correct 
        const admin = await Admin.findOne({ email })

        if(!admin) {
            res.status(400)
            throw new Error("Invalid email or password")
        }

        // check if password is correct 
        if(admin.password !== password) {
            res.status(400)
            throw new Error("invalid email or password")
        }

        const token = await generateToken(admin._id)

        res.cookie("token", token),{
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400), // 1 day
            sameSite: "none"
        }

        const { _id, email: adminEmail, password: adminPassword } = admin
        res.status(200).json({
            _id,
            adminEmail,
            adminPassword,
            token
        })
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


module.exports = {
    registerAdmin,
    loginAdmin
}