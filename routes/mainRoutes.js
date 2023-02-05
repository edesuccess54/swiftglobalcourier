const express = require('express');
const { homePage, aboutPage, servicePage, faqPage, trackPage, contactPage, quotePage, tracking} = require('../controllers/mainController');
const siteInfo = require('../middleware/siteInfo.js');

const router = express.Router()

router.get('/', siteInfo, homePage)
router.get('/about', siteInfo, aboutPage)
router.get('/services', siteInfo, servicePage)
router.get('/faq', siteInfo, faqPage)
router.get('/track-shipment', siteInfo, trackPage)
router.get("/shipment/tracking/:id", siteInfo, tracking)
router.get('/contact', siteInfo, contactPage)
router.get('/quote', siteInfo, quotePage)



module.exports = router;