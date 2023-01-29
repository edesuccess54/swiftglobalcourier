const express = require("express");
const router = express.Router()
const { packages_get,packages_post,packages_put, packages_delete} = require("../controllers/packageController")
const auth = require("../middleware/auth.js")


// Packages Routes
router.get("/", auth, packages_get)
router.post("/", auth, packages_post)
router.put("/:id", auth, packages_put)
router.delete("/:id", auth, packages_delete)


module.exports = router;

