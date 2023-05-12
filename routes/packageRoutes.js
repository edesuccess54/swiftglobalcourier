const express = require("express");
const router = express.Router()
const { packages_get,packages_post,packages_put, packages_delete, deletePackageImage} = require("../controllers/packageController")
const auth = require("../middleware/auth.js")
const upload = require('../utils/fileUploads.js')
const siteInfo = require('../middleware/siteInfo.js');

// Packages Routes
router.get("/", auth, packages_get)
router.post("/", auth, upload.array("image"),  packages_post)
router.put("/:id", auth, upload.array("image"), packages_put)
router.delete("/:id", auth, packages_delete)
router.delete('/images/delete/:filename', auth, deletePackageImage)


module.exports = router;

