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
    settingsPage,
    editPage,
    trackingPage,
    loginPage } = require('../controllers/mainController');
const proctect = require('../middleware/auth');

const router = express.Router()

router.get('/', homePage)
router.get('/about', aboutPage)
router.get('/services', servicePage)
router.get('/faq', faqPage)
router.get('/track-shipment', trackPage)
router.get('/contact', contactPage)
router.get('/quote', quotePage)
router.get('/tracking', trackingPage)



// admin routes 
router.get('/admin/dashboard', dashboardPage)
router.get('/admin/create', createPage)
router.get('/admin/view', viewPage)
router.get('/admin/settings', settingsPage)
router.get('/admin/edit/:id', editPage)
router.get('/admin/login', loginPage)



module.exports = router;