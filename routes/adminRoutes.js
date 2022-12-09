const express = require("express")
const {registerAdmin, loginAdmin, logoutAdmin, changePassword} = require("../controllers/adminController")
const { packages_get,packages_post,packages_put, packages_delete} = require("../controllers/packageController")

const auth = require("../middleware/auth.js")

const router = express.Router()

router.post("/register", registerAdmin)
router.post("/login", loginAdmin)
router.get("/logout", logoutAdmin)
router.post("/changepassword", auth, changePassword)
router.get("/packages", auth, packages_get)
router.post("/packages", auth, packages_post)
router.put("/packages/:id", auth, packages_put)
router.delete("/packages/:id", auth, packages_delete)



module.exports = router