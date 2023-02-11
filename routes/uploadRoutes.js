const express = require('express');
const router = express.Router()

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    
    filename: function (req, file, cb) {
        cb(null, new Date().toString().replace(/:/g, "-") + "-" + file.originalname)
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



router.post('/', upload.single('file'), async (req, res) => {
    console.log('1')

    try {

        const { name, age } = req.body
      
        console.log("body of the request: ", req.body)

    console.log(req.file)
    res.status(200).json({message: "uploaded successfuly"})
        
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
   
})

module.exports = router