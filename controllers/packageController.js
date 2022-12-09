const Package = require("../models/package")

// create package fucntion 
const packages_post = async (req, res) => {
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

// update package 
const packages_put = async (req, res) => {
    const { id } = req.params

    try {

        const package = await Package.findById(id)

        if(!package) {
            res.status(400)
            throw new Error("Product not found")
        }

        const {sendersName, sendersEmail, receiverName, receiversAddress, receiversNumber, description, weight, location, status, worth} = package

        package.sendersName = req.body.sendersName || sendersName
        package.sendersEmail = req.body.sendersEmail || sendersEmail
        package.receiverName = req.body.receiverName || receiverName
        package.receiversAddress = req.body.receiversAddress || receiversAddress
        package.receiversNumber = req.body.receiversNumber || receiversNumber
        package.description = req.body.description || description
        package.weight = req.body.weight || weight
        package.location = req.body.location || location
        package.status = req.body.status || status
        package.worth = req.body.worth || worth

        const updatedPackage = await package.save()

        res.status(200).json({
            _id: updatedPackage.id,
            sendersName: updatedPackage.sendersName, 
            sendersEmail: updatedPackage.sendersEmail, 
            receiverName: updatedPackage.receiverName, 
            receiversAddress: updatedPackage.receiversAddress, 
            receiversNumber: updatedPackage.receiversNumber, 
            description: updatedPackage.description, 
            weight: updatedPackage.weight, 
            location: updatedPackage.location, 
            status: updatedPackage.status, 
            worth: updatedPackage.worth
        })
        
    } catch (error) {
        res.status(400).json(error.message)
    }
}

// delete package 
const packages_delete = async (req, res) => {
    const{ id } = req.params
    try {
        const package = await Package.findById(id)

        if(!package) {
            res.status(404)
            throw new Error("package not found")
        }

        const deleted = await Package.deleteOne(package)

        if(!deleted) {
            res.status(400)
            throw new Error("package was not deleted")
        }

        res.status(200)
        throw new Error("Package successfully deleted")
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// get all package
const packages_get = async (req, res) => {

    try {
        const package = await Package.find()

        if(!package) {
            res.status(404)
            throw new Error("packages not found")
        }

        res.status(200).json({package})

        
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}







module.exports = { packages_get,packages_post,packages_put, packages_delete}