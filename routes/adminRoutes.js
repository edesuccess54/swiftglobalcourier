const express = require('express')
const {registerAdmin, loginAdmin, logoutAdmin, changePassword, dashboardPage, createPage, viewPage, settingsPage, editPage, loginPage, displayName, forgotPasswordPage, resetPassword, resetPasswordPage, forgotPassword} = require('../controllers/adminController')

const auth = require('../middleware/auth.js')
const siteInfo = require('../middleware/siteInfo.js')

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

// Admin Routes 
router.get('/dashboard', auth, dashboardPage)
router.get('/create', auth, createPage)
router.get('/view', auth, viewPage)
router.get('/settings', auth, settingsPage)
router.get('/edit/', auth, editPage)
router.get('/login', siteInfo, loginPage)
router.get('/forgot-password', siteInfo, forgotPasswordPage)

module.exports = router