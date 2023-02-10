const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },

    fileName: function (req, file, cb) { 
        cb(null, new Date().toString().replace(/:/g,"-" + "-" + file.originalname))
    }
})


function fileFilter (req, file, cb) {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
    console.log('coming from fileUploads file: ' + file)

}

const upload = multer({ storage, fileFilter })

module.exports = upload;