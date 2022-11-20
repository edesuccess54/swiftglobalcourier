const Package = require("../models/package")

// create package fucntion 
const createPackage = async (req, res) => {
    const {senderName, senderEmail, receiverName, receiverAddress, reciverNumber } = req.body

    // validations
    if(!senderName || !senderEmail || !receiverName || !receiverAddress || !reciverNumber) {
        res.status(400)
        throw new Error("Fill all field")
    }

    // create package 
    const package = await Package.create({
        senderName, 
        senderEmail, 
        receiverName, 
        receiverAddress, 
        reciverNumber
    })

    if(!package) {
       throw new Error("package fail to create")
    }

    res.status(201).json(package)
}







module.exports = {
    createPackage
}