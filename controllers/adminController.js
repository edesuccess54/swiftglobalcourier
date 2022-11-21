const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel')
const validator = require("validator")
const bcrypt = require("bcryptjs")


// generateToken
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

        // hash password 
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const admin = await Admin.create({
            email,
            password: hashedPassword
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

        const hashedPassword = await bcrypt.compare(password, admin.password)

        const token = await generateToken(admin._id)

        res.cookie("token", token),{
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400), // 1 day
            sameSite: "none"
        }

        if(admin && hashedPassword) {
            const { _id, email: adminEmail, password: adminPassword } = admin
            res.status(200).json({
            _id,
            adminEmail,
            adminPassword,
            token
            })

        } else {
            res.status(400)
            throw new Error("Invalid email or password")
        }
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// const logout admin 
const logoutAdmin = async (req, res) => {
    res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        sameSite: "none",
        expires: new Date(0),
        secure: true
    })
    return res.status(200).json({message: "Successfully Logged out"})
}


module.exports = {
    registerAdmin,
    loginAdmin,
    logoutAdmin
}