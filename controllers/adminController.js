const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel')
const Package = require('../models/package')
const validator = require("validator")
const bcrypt = require("bcryptjs")
const ErrorResponse = require("../utils/errorResponse")


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

        const userExists = await Admin.findOne({ email })

        if(userExists) {
            res.status(400)
            throw new Error("Email already exists")
        }

        const admin = await Admin.create({
            email,
            password
        })

        // generateToken
        const token = await generateToken(admin._id)

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
const loginAdmin = async(req, res, next) => {
    const { email, password } = req.body
    console.log(1)

    try {
        // validation
        if(!email || !password) {
             next(new ErrorResponse("Fill all fields",400));
            return;
        }
        console.log(2)
        if(!validator.isEmail(email)) {
            next(new ErrorResponse("Not a valid email address",400));
            return;
        }
        console.log(3)
        if(!validator.isStrongPassword(password)) {
            next(new ErrorResponse("Password is not strong enough",400));
            return;
        }
        console.log(4)
        const admin = await Admin.findOne({ email })
        console.log(5)
        if(!admin) {
            next(new ErrorResponse("Invalid email or password",400));
            return
        }

        console.log(6)
        const hashedPassword = await bcrypt.compare(password, admin.password)
        console.log(7)
        const token = await generateToken(admin._id)
        console.log(8)
        res.cookie("token", token),{
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400), 
            sameSite: "none",
            secure: true
        }
        console.log(9)
        if(admin && hashedPassword) {
            const { _id, email: adminEmail, password: adminPassword } = admin
            res.status(200).json({
            _id,
            adminEmail,
            adminPassword,
            token
            })

        } else {
            next(new ErrorResponse("Invalid email or password",400));
            return;
        }
        console.log(10)
    } catch (error) {
        res.status(400).json(error.message)
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

// change admin password 
const changePassword = async (req, res) => {
    const {oldpassword, password, password2 } = req.body
    const id = req.admin._id

    try {

        const admin = await Admin.findById(id)

        if(!admin) {
            res.status(400)
            throw new Error("you are not authorized")
        }

        if(!oldpassword || !password || !password2) {
            res.status(400)
            throw new Error("all fields are required")
        }

        if(password == oldpassword) {
            res.status(400)
            throw new Error("Password can not be same with old password")
        }

        if(password !== password2) {
            res.status(400)
            throw new Error("password does not match")
        }

        const hashedPassword = await bcrypt.compare(oldpassword, admin.password)

        if(!hashedPassword) {
            res.status(400)
            throw new Error("old password is not correct")
        }

         if(admin && hashedPassword) {
            admin.password = password
            await admin.save()
            res.status(200).json({message: "Password changed"})

         } else {
            res.status(400);
            throw new Error("Password is not correct");
         }
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// admin dashboard page 
const dashboardPage = async(req, res) => {
    const packages = await Package.find()
    const admin = req.admin
    res.render('./admin/dashboard', {admin, packages})
}

// create package page 
const createPage = async(req, res) => {
    const admin = req.admin
    res.render('./admin/create', {admin})
}

// view package page 
const viewPage = async(req,res) => {
    const admin = req.admin
    res.render('./admin/view', {admin})
}

// settings page 
const settingsPage = async(req, res) => {
    const admin = req.admin
    res.render('./admin/settings', {admin})
}

// edit page 
const editPage = async(req, res, next) => {
    const {id} = req.params

    const singlepackage = await Package.findById(id)

    if(!singlepackage) {
        next(new ErrorResponse("package not found", 404))
        return
    }
    const admin = req.admin
    res.render('./admin/edit', {admin, singlepackage})
}

// login page 
const loginPage = async(req, res) => {
    res.render('./admin/login')
}


module.exports = {
    registerAdmin,
    loginAdmin,
    logoutAdmin,
    changePassword,
    dashboardPage,
    createPage,
    viewPage,
    settingsPage,
    editPage,
    loginPage
}