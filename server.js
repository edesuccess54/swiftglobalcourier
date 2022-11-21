const express = require('express');
const env = require('dotenv').config()
const ejs = require('ejs');
const mongoose = require('mongoose');
const packageRoutes = require('./routes/packageRoutes');
const adminRoutes = require('./routes/adminRoutes');
const mainRoutes = require('./routes/mainRoutes')
const cookieParser = require('cookie-parser')

const app = express();
app.set("view engine", 'ejs')

// middlewares & static assets
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

app.use('/api/package',packageRoutes)
app.use('/api/user/admin',adminRoutes)
app.use('/',mainRoutes)





 mongoose.connect(process.env.MONGO_URI).then((result) => {
    app.listen(process.env.PORT, () => {
        console.log(`Connected to dabase and now Listening on port ${process.env.PORT}`)
    })
 }).catch((error) => {
    console.log(error.message)
 })
