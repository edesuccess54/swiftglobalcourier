

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








module.exports = {
    homePage,
    quotePage,
    contactPage,
    trackPage,
    faqPage,
    servicePage,
    aboutPage,
    trackingPage,
}

