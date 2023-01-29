const Package = require("../models/packageModel")
const validator = require("validator")
const crypto = require("crypto")
const base64url = require("base64url")
const ErrorResponse = require("../utils/errorResponse")

// create package fucntion 
const packages_post = async (req, res, next) => {
    const {
        senderName,senderEmail,receiverName,receiverEmail,receiverNumber,destination,item,weight,currentLocation,depatureDate,deliveryDate,shipmentMethod,PickupDate,status } = req.body
    try {
        // validations
        if(!senderName || !senderEmail|| !receiverName|| !receiverEmail|| !receiverNumber|| !destination|| !item||!weight|| !currentLocation|| !depatureDate|| !deliveryDate|| !shipmentMethod|| !PickupDate||!status) {
            next(new ErrorResponse("Please fill all fields",400));
            return
        }
        if(!validator.isEmail(senderEmail)) {
            next(new ErrorResponse("Please enter a valid sender email",400));
            return
        }

        if(!validator.isEmail(receiverEmail)) {
            next(new ErrorResponse("Please enter a valid receiver email",400));
            return
        }

         function generateTrackingCode() {
            return base64url(crypto.randomBytes(12));
          }

          async function checkRandomCode(trackingCode) {
            //   check if trackingId already exists in  database
            const packageExist = await Package.countDocuments({trackingId: trackingCode})
            return packageExist.length > 0;
          }

          async function getRandomCode() {
            let trackingCode = generateTrackingCode();
            while (await checkRandomCode(trackingCode)) {
                trackingCode = generateTrackingCode();
            }
            return trackingCode;
          }

        let trackingId = await getRandomCode()

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

        if(!package) {
            next(new ErrorResponse("package fail to create",400));
            return
        }
        res.status(201).json(package)

    } catch (error) {
        res.status(400).json(error.message)
    }
}

// update package 
const packages_put = async (req, res, next) => {
    const { id } = req.params

    try {
        const package = await Package.findById(id)
        if(!package) {
            next(new ErrorResponse("package you're trying to update does not exits", 404))
            return
        }

        // package details from database 
        const {senderName,senderEmail,receiverName,receiverEmail,receiverNumber,destination,item,weight,currentLocation,departureDate,deliveryDate,shipmentMethod,pickupDate,trackingId,completed,status} = package

        package.senderName = req.body.senderName || senderName
        package.senderEmail = req.body.senderEmail || senderEmail
        package.receiverName = req.body.receiverName || receiverName
        package.receiverEmail = req.body.receiverEmail || receiverEmail
        package.receiverNumber = req.body.receiverNumber || receiverNumber
        package.destination = req.body.destination || destination
        package.item = req.body.item || item
        package.weight = req.body.weight || weight
        package.currentLocation = req.body.currentLocation || currentLocation

        package.departureDate = req.body.departureDate || departureDate
        package.deliveryDate = req.body.deliveryDate || deliveryDate
        package.shipmentMethod = req.body.shipmentMethod || shipmentMethod
        package.pickupDate = req.body.pickupDate || pickupDate
        package.status = req.body.status || status
        package.trackingId = trackingId
        package.completed = completed
        

        const updatedPackage = await package.save()

        res.status(200).json(updatedPackage)

        // res.status(200).json({
        //     _id: updatedPackage.id,
        //     sendersName: updatedPackage.senderName, 
        //     sendersEmail: updatedPackage.senderEmail, 
        //     receiverName: updatedPackage.receiverName, 
        //     receiversAddress: updatedPackage.destination, 
        //     receiversNumber: updatedPackage.receiverNumber, 
        //     weight: updatedPackage.weight, 
        //     location: updatedPackage.location, 
        //     status: updatedPackage.status, 
        //     worth: updatedPackage.worth
        // })
        
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