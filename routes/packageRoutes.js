const express = require("express");
const router = express.Router()
// const { createPackage, updatePackage, deletePackage, getAllPackage} = require("../controllers/packageController")
const { packages_get,packages_post,packages_put, packages_delete} = require("../controllers/packageController")
const auth = require("../middleware/auth.js")

// create package route 
// router.post("/create", protect, createPackage)
// router.post("/update/:id", protect, updatePackage)
// router.delete("/delete/:id", protect, deletePackage)
// router.get("/", protect, getAllPackage)

// Packages Routes
router.get("/", auth, packages_get)
router.post("/create", auth, packages_post)
router.put("/update/:id", auth, packages_put)
router.delete("/delete/:id", auth, packages_delete)


module.exports = router;