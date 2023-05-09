const express = require('express');
const { homePage, aboutPage, servicePage, faqPage, trackPage, contactPage, quotePage, tracking, uploadPage} = require('../controllers/mainController');
const {siteInfo} = require('../middleware/siteInfo');

const router = express.Router()

router.get('/', siteInfo, homePage)
router.get('/about', siteInfo, aboutPage)
router.get('/services', siteInfo, servicePage)
router.get('/faq', siteInfo, faqPage)
router.get('/track-shipment', siteInfo, trackPage)
router.get("/shipment/tracking/:id", siteInfo, tracking)
router.get('/contact', siteInfo, contactPage)
router.get('/quote', siteInfo, quotePage)


router.get('/upload', siteInfo, uploadPage)



module.exports = router;