const express = require('express');
const router = express.Router()

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    
    filename: function (req, file, cb) {
        cb(null, new Date().toString()+file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}
const upload = multer({storage, fileFilter})



router.post('/', upload.single('image'), async (req, res) => {
    const {name, age, image} = req.body

    console.log(req.file)
    res.status(200).json({message: "uploaded successfuly"})
})

module.exports = router