const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'uploads')
    },

    fileName: function (req, file, callback) { 
        callback(null, new Date().toString().replace(/:/g,"-" + "-" + file.originalname))
    }
})

function fileFilter (req, file, callback) {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        callback(null, true)
    } else {
        callback(null, false)
    }
}

const upload = multer({ storage, fileFilter }).array('file')

module.exports = {upload}