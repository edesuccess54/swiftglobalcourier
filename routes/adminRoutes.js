const express = require("express")
const {registerAdmin, loginAdmin, logoutAdmin, changePassword,dashboardPage,createPage,viewPage,settingsPage,editPage,loginPage, displayName} = require("../controllers/adminController")
const { packages_get,packages_post,packages_put, packages_delete} = require("../controllers/packageController")

const auth = require("../middleware/auth.js")

const router = express.Router()

// Admin APIS 
router.post("/register", registerAdmin)
router.post("/login", loginAdmin)
router.get("/logout", logoutAdmin)
router.put("/changepassword", auth, changePassword)
router.put("/displayName", auth, displayName)


// Admin Routes 
router.get('/dashboard', auth, dashboardPage)
router.get('/create', auth, createPage)
router.get('/view', auth, viewPage)
router.get('/settings', auth, settingsPage)
router.get('/edit/:id', auth, editPage)
router.get('/login', loginPage)

// Packages Routes
router.get("/packages", auth, packages_get)
router.post("/packages", auth, packages_post)
router.put("/packages/:id", auth, packages_put)
router.delete("/packages/:id", auth, packages_delete)




module.exports = router