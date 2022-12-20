const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema

const adminSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    adminName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

adminSchema.pre("save", async function(req, res, next) {
    if (!this.isModified("password")) {
        return next();
      }
    
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt)

    this.password = hashedPassword
    next();
})

const Admin = mongoose.model('admin', adminSchema)

module.exports = Admin