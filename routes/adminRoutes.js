const express = require('express')
const {registerAdmin, loginAdmin, logoutAdmin, changePassword, dashboardPage, createPage, viewPage, changeLocationPage, settingsPage, editPage, loginPage, registerPage, displayName, forgotPasswordPage, resetPassword, resetPasswordPage, forgotPassword, changePackageLocation} = require('../controllers/adminController')

const auth = require('../middleware/auth.js')
const {siteInfo} = require('../middleware/siteInfo')

const router = express.Router()

// Admin APIS 
router.post('/register', registerAdmin)
router.post('/login', loginAdmin)
router.get('/logout', logoutAdmin)
router.put('/changepassword', auth, changePassword)
router.put('/displayName', auth, displayName)
router.post('/forgotPassword', forgotPassword)
router.post('/auth/resetpassword/:resetToken', resetPassword)
router.get('/auth/resetpassword/', siteInfo, resetPasswordPage)
router.post('/change-location', auth, changePackageLocation)

// Admin Routes 
router.get('/dashboard', siteInfo, auth, dashboardPage)
router.get('/create', siteInfo, auth, createPage)
router.get('/view', siteInfo, auth, viewPage)
router.get('/change-location', siteInfo, auth, changeLocationPage)
router.get('/settings', siteInfo, auth, settingsPage)
router.get('/edit/', siteInfo, auth, editPage)
router.get('/login', siteInfo, loginPage)
// router.get('/register', siteInfo, registerPage)
router.get('/forgot-password', siteInfo, forgotPasswordPage)

module.exports = router