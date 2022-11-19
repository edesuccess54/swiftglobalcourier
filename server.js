const express = require('express');
const env = require('dotenv').config()
const ejs = require('ejs');
const mongoose = require('mongoose');


const app = express();
app.set("view engine", 'ejs')

// middlewares & static assets
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.render('index')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/services', (req, res) => {
    res.render('services')
})

app.get('/faq', (req, res) => {
    res.render('faq')
})

app.get('/track-shipment', (req, res) => {
    res.render('track-shipment')
})

app.get('/contact', (req, res) => {
    res.render('contact')
})

app.get('/request-qoute', (req, res) => {
    res.render('request-qoute')
})



 mongoose.connect(process.env.MONGO_URI).then((result) => {
    app.listen(process.env.PORT, () => {
        console.log(`Connected to dabase and now Listening on port ${process.env.PORT}`)
    })
 }).catch((error) => {
    console.log(error.message)
 })
