const express = require('express');
const { 
    homePage, 
    aboutPage, 
    servicePage, 
    faqPage, 
    trackPage, 
    contactPage, 
    quotePage, 
    dashboardPage,
    createPage,
    viewPage,
    settingsPage } = require('../controllers/mainController')

const router = express.Router()

router.get('/', homePage)
router.get('/about', aboutPage)
router.get('/services', servicePage)
router.get('/faq', faqPage)
router.get('/track-shipment', trackPage)
router.get('/contact', contactPage)
router.get('/quote', quotePage)

// admin routes 
router.get('/admin/dashboard', dashboardPage)
router.get('/admin/create', createPage)
router.get('/admin/view', viewPage)
router.get('/admin/settings', settingsPage)



module.exports = router;