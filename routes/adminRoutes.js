const express = require("express")
const {registerAdmin, loginAdmin, logoutAdmin, changePassword,dashboardPage,createPage,viewPage,settingsPage,editPage,loginPage} = require("../controllers/adminController")
const { packages_get,packages_post,packages_put, packages_delete} = require("../controllers/packageController")

const auth = require("../middleware/auth.js")

const router = express.Router()

router.post("/register", registerAdmin)
router.post("/api/admin/login", loginAdmin)
router.get("/logout", logoutAdmin)
router.post("/changepassword", auth, changePassword)


// admin routes 
router.get('/dashboard', dashboardPage)
router.get('/create', auth, createPage)
router.get('/admin/view', auth, viewPage)
router.get('/admin/settings', auth, settingsPage)
router.get('/admin/edit/:id', auth, editPage)
router.get('/admin/login', loginPage)

// packages 
router.get("/packages", auth, packages_get)
router.post("/packages", auth, packages_post)
router.put("/packages/:id", auth, packages_put)
router.delete("/packages/:id", auth, packages_delete)




module.exports = router