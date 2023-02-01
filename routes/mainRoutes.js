const express = require('express');
const { homePage, aboutPage, servicePage, faqPage, trackPage, contactPage, quotePage, trackingPage} = require('../controllers/mainController');
const checkUser = require('../middleware/siteInfo.js');

const router = express.Router()

router.get('/', checkUser, homePage)
router.get('/about', checkUser, aboutPage)
router.get('/services', checkUser, servicePage)
router.get('/faq', checkUser, faqPage)
router.get('/track-shipment', checkUser, trackPage)
router.get('/contact', checkUser, contactPage)
router.get('/quote', checkUser, quotePage)


module.exports = router;