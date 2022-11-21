const express = require('express');
const { homePage, aboutPage, servicePage, faqPage, trackPage, contactPage, quotePage } = require('../controllers/mainController')

const router = express.Router()

router.get('/', homePage)
router.get('/about', aboutPage)
router.get('/services', servicePage)
router.get('/faq', faqPage)
router.get('/track-shipment', trackPage)
router.get('/contact', contactPage)
router.get('/quote', quotePage)



module.exports = router;