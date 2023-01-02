const Package = require("../models/package")
const ErrorResponse = require("../utils/errorResponse")

// create package fucntion 
const packages_post = async (req, res, next) => {
    console.log(1)
    const {
        senderName,senderEmail,receiverName,receiverEmail,receiverNumber,destination,item,weight,currentLocation,depatureDate,deliveryDate,shipmentMethod,PickupDate,status } = req.body
        console.log(2)
    try {
        console.log(3)
        // validations
        if(!senderName || !senderEmail|| !receiverName|| !receiverEmail|| !receiverNumber|| !destination|| !item||!weight|| !currentLocation|| !depatureDate|| !deliveryDate|| !shipmentMethod|| !PickupDate||!status) {
            next(new ErrorResponse("Fill all fields",400));
            return
        }
        console.log(4)

        const trackingId = "TC232425245-V3"
        // create package 
        const package = await Package.create({
            senderName,
            senderEmail,
            receiverName,
            receiverEmail,
            receiverNumber,
            destination,
            item,
            weight,
            currentLocation,
            depatureDate,
            deliveryDate,
            shipmentMethod,
            PickupDate,
            trackingId,
            completed: true,
            status
        })
        console.log(5)
        if(!package) {
            next(new ErrorResponse("package fail to create",400));
            return
        }

        res.status(201).json(package)
        console.log(5)
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

        const {sendersName,
                sendersEmail,
                receiversName,
                receiversEmail,
                receiversNumber,
                receiversAddress,
                item,
                weight,
                location,
                depatureDate,
                deliveryDate,
                shipmentMethod,
                pickupDate,
                status
        } = package

        package.sendersName = req.body.sendersName || sendersName
        package.sendersEmail = req.body.sendersEmail || sendersEmail
        package.receiversName = req.body.receiversName || receiversName
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
    const{ id } = req.body
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

        res.status(200).json({message: 'Package successfully deleted'})
        
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