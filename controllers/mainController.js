const Package = require("../models/packageModel")

// home page 
const homePage = async(req, res) => {
    res.render('index')
}

// about page 
const aboutPage = async(req, res) => {
    res.render('about')
}

// service page 
const servicePage = async(req, res) => {
    res.render('services')
}

// faw page 
const faqPage = async(req, res) => {
    res.render('faq')
}

// track-shipment page 
const trackPage = async(req, res) => {
    res.render('track-shipment')
}

// contact page 
const contactPage = async(req, res) => {
    res.render('contact')
}

// service page 
const quotePage = async(req, res) => {
    res.render('request-qoute')
}

// tracking page 
const trackingPage = async(req, res) => {
    res.render('tracking')
}

const tracking = async (req, res, next) => {
    const {id: trackingCode} = req.params

    try {
        const package = await Package.findOne({trackingId: trackingCode})

        if(!package) {
            res.render('./tracking', {package})
            return
        }

        res.render('./tracking', {package})

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


const uploadPage = (req, res, next) => {
    res.render('upload')
}








module.exports = {
    homePage,
    quotePage,
    contactPage,
    trackPage,
    faqPage,
    servicePage,
    aboutPage,
    trackingPage,
    tracking,
    uploadPage
}

