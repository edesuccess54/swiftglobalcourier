const express = require('express');
const env = require('dotenv').config()
const ejs = require('ejs');
const mongoose = require('mongoose');
const adminRoutes = require('./routes/adminRoutes');
const mainRoutes = require('./routes/mainRoutes')
const packageRoutes = require('./routes/packageRoutes')
const uploadRoutes =  require('./routes/uploadRoutes')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const errorHandler = require("./middleware/error")
const path = require('path')


const app = express();

app.set("view engine", 'ejs')

// middlewares & static assets
app.use(express.static('public'));
app.use(express.json())
app.use (express.urlencoded ( { extended: true, }) )
app.use(cookieParser())
app.use(cors())

app.use("/uploads", express.static(path.join(__dirname, "./uploads")))

app.use('/',mainRoutes)
app.use('/admin',adminRoutes)
app.use('/packages', packageRoutes)

app.use('/upload', uploadRoutes)


app.use(errorHandler)

// connect to mongoDB and start server
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Connected to database and now Listening on port ${process.env.PORT}`)
    });
})
.catch((error) => {
    console.log(error.message)
})
