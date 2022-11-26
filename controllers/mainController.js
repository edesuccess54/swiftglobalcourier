
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

// admin dashboard page 
const dashboardPage = async(req, res) => {
    res.render('./admin/dashboard')
}

// create package page 
const createPage = async(req, res) => {
    res.render('./admin/create')
}

// view package page 
const viewPage = async(req,res) => {
    res.render('./admin/view')
}

// settings page 
const settingsPage = async(req, res) => {
    res.render('./admin/settings')
}



module.exports = {
    homePage,
    quotePage,
    contactPage,
    trackPage,
    faqPage,
    servicePage,
    aboutPage,
    dashboardPage,
    createPage,
    viewPage,
    settingsPage
}

