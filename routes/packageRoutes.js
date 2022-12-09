const express = require("express");
const router = express.Router()
const { createPackage, updatePackage, deletePackage, getAllPackage} = require("../controllers/packageController")
const protect = require("../middleware/auth.js")

// create package route 
router.post("/create", protect, createPackage)
router.post("/update/:id", protect, updatePackage)
router.delete("/delete/:id", protect, deletePackage)
router.get("/", protect, getAllPackage)


module.exports = router;