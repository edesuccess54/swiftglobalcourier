const Package = require("../models/package")

// create package fucntion 
const createPackage = async (req, res) => {
    const {sendersName, sendersEmail, receiverName, receiversAddress, receiversNumber, description, weight, location, status, worth  } = req.body

    try {
        // validations
        if(!sendersName || !sendersEmail || !receiverName || !receiversAddress || !receiversNumber || ! description || !weight || !location || !status || !worth) {
            res.status(400)
            throw new Error("Fill all field")
        }

        // create package 
        const package = await Package.create({
            sendersName, 
            sendersEmail, 
            receiverName, 
            receiversAddress, 
            receiversNumber, 
            description, 
            weight, 
            location, 
            status, 
            worth
        })

        if(!package) {
            throw new Error("package fail to create")
        }

        res.status(201).json(package)
        
    } catch (error) {
        res.status(400).send(error.message)
    }
}







module.exports = {
    createPackage
}