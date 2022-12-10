const express = require('express');
const env = require('dotenv').config()
const ejs = require('ejs');
const mongoose = require('mongoose');
const adminRoutes = require('./routes/adminRoutes');
const mainRoutes = require('./routes/mainRoutes')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const errorHandler = require("./middleware/error")

const app = express();
app.set("view engine", 'ejs')

// middlewares & static assets
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(cors())

app.use(mainRoutes)
app.use('/',adminRoutes)

app.use(errorHandler)

mongoose.connect(process.env.MONGO_URI).then((result) => {
   app.listen(process.env.PORT, () => {
      console.log(`Connected to dabase and now Listening on port ${process.env.PORT}`)
   })
}).catch((error) => {
   console.log(error.message)
})
