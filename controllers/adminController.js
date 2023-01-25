const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel')
const Package = require('../models/packageModel')
const Token = require('../models/tokenModel')
const validator = require("validator")
const bcrypt = require("bcryptjs")
const ErrorResponse = require('../utils/errorResponse')
const crypto = require("crypto")



// generateToken
generateToken = async (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: "1d"})
}

// register admin 
const registerAdmin = async (req, res) => {
    const {email, password, adminName} = req.body

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
            adminName,
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
                adminName, 
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

        if(!validator.isEmail(email)) {
            next(new ErrorResponse("Not a valid email address",400));
            return;
        }

        const admin = await Admin.findOne({ email })

        console.log(admin)
        if(!admin) {
            next(new ErrorResponse("Invalid email or password",400));
            return
        }

        const hashedPassword = await bcrypt.compare(password, admin.password)

        console.log(hashedPassword)
        const token = await generateToken(admin._id)
        res.cookie("token", token),{
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400), 
            sameSite: "none",
            secure: true
        }

        console.log('token is ... '+token)
  
        if(admin && hashedPassword) {
            const { _id, email: adminEmail, password: adminPassword } = admin
            res.status(200).json({
            _id,
            adminEmail,
            adminPassword,
            token
            })

            console.log('everything is correct ... '+token)

        } else {
            next(new ErrorResponse("Invalid email or password",400));
            return;
        }

    } catch (error) {
        res.status(400).json(error.message)
    }
}

// update Display Name 
 const displayName = async (req, res, next) => {
    const {adminName} = req.body
    const id = req.admin._id

    try {
        const admin = await Admin.findByIdAndUpdate(id, {adminName})

        if(!admin) {
            next(new ErrorResponse("Not Authorized", 400))
            return
        }

        res.status(200).json({message: "Display name changed successfuly"})
        
    } catch (error) {
        console.log(error.message)
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
const changePassword = async (req, res, next) => {
    const {oldpassword, newpassword, confirmpassword } = req.body
    const id = req.admin._id

    console.log(1)
    try {
        console.log(2)
        const admin = await Admin.findById(id)
        console.log(3)
        if(!admin) {
            next(new ErrorResponse("you are not authorized", 400) )
            return
        }
        console.log(4)
        if(!oldpassword || !newpassword || !confirmpassword) {
            next(new ErrorResponse("all fields are required", 400) )
            return
        }

        console.log(5)
        const hashedPassword = await bcrypt.compare(oldpassword, admin.password)

        console.log("hased password is -- "+ hashedPassword)

        if(!hashedPassword) {
            next(new ErrorResponse("old password is not correct", 400) )
            return
        }

        console.log(6)
        if(newpassword == oldpassword) {
            next(new ErrorResponse("Password can not be same with old password", 400) )
            return
        }
        console.log(7)
        if(newpassword !== confirmpassword) {
            next(new ErrorResponse("password does not match", 400) )
            return
        }
        
        console.log(8)
         if(admin && hashedPassword) {
            admin.password = newpassword
            await admin.save()
            res.status(200).json({message: "Password changed successfully"})

         } else {
            next(new ErrorResponse("Password is not correct", 400) )
            return
         }
        
    } catch (error) {
        console.log(error.message)
        res.status(400).json({error: error.message})
    }
}

// reset password 
const resetPassword = async (req, res, next) => {
    const {email} = req.body

    if(!email) {
        next(new ErrorResponse("Email is required", 400))
    }

    // check if email is valid 
    if(!validator.isEmail(email)) {
        next(new ErrorResponse("enter a valid email", 400))
    }

    // check if email exist in database 
    const user = await Admin.findOne({email})

    if(!user) {
        next(new ErrorResponse("email does not exit", 400))
    }

    const token = await Token.findOne({userId: user._id})

    if(token) {
        await Token.deleteOne({_id: token._id})
    }

    const resetToken = crypto.randomBytes(32).toString("hex") + user._id;

    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex")

    await new Token({
        userId: user._id,
        token: hashedToken,
        createdAt: Date.now(),
        expiresAt: Date.now() + 30 * (60 * 1000) //30 minutes,
    }).save()

  const resetUrl = `${process.env.URL}/auth/resetpassword/${resetToken}`

  // reset email 
  const message = `
    <h2>Hellow ${user.adminName}</h2>
    <p>You requested to reset your password, Please use the url below to reset your password</p>
    <p>Please contact customer care  if you didn't initiate this.</p>
    <p>This reset link is only valid for 30 minutes</p>

    <a href=${resetUrl} clicktracking="off">${resetUrl}</a>

    <p>regards...</p>  `

  const subject = "Password Reset Request";
  const send_to = user.email
  const sent_from = process.env.EMAIL_USER





    console.log("hello")
    res.json(email)
    
    
}

// forgot password page
const forgotPassword = async (req, res) => {
    res.render('./admin/forgot-password')
}

// admin dashboard page 
const dashboardPage = async(req, res) => {
    const packages = await Package.find()
    const total_package = await Package.countDocuments()
    const uncompleted = await Package.countDocuments({completed:false})
    const completed = await Package.countDocuments({completed:true})
    const admin = req.admin
    const packageOverview = {
        total_package,
        uncompleted,
        completed
    }
    res.render('./admin/dashboard', {admin, packages, packageOverview})
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

    // if(!singlepackage) {
    //     next(new ErrorResponse("package not found", 404))
    //     return
    // }
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
    loginPage,
    displayName,
    forgotPassword,
    resetPassword
}