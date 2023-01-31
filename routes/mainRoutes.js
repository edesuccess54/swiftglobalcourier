const express = require('express');
const { homePage, aboutPage, servicePage, faqPage, trackPage, contactPage, quotePage, trackingPage} = require('../controllers/mainController');
// const proctect = require('../middleware/auth');

const router = express.Router()

router.get('/', homePage)
router.get('/about', aboutPage)
router.get('/services', servicePage)
router.get('/faq', faqPage)
router.get('/track-shipment', trackPage)
router.get('/contact', contactPage)
router.get('/quote', quotePage)
// router.get('/shipment/tracking', trackingPage)







module.exports = router;