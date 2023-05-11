const Package = require("../models/packageModel")
const validator = require("validator")
const crypto = require("crypto")
const base64url = require("base64url")
const ErrorResponse = require("../utils/errorResponse")
// const uploadImg = require("../utils/convertToBase64.js")
const cloudinary = require("cloudinary").v2
const sendEmail = require("../utils/sendEmail")

// create package fucntion 
const packages_post = async (req, res, next) => {
    const { senderName, senderEmail, receiverName, receiverEmail, receiverNumber, destination, packages, weight, currentLocation, depatureDate, deliveryDate, shipmentMethod, pickupDate, status, originCountry, destinationCountry, } = req.body

    try {
        // validations
        if(!senderName || !senderEmail|| !receiverName|| !receiverEmail|| !receiverNumber|| !destination|| !packages||!weight|| !currentLocation|| !depatureDate|| !deliveryDate|| !shipmentMethod|| !pickupDate|| !status) {
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
             code = `T${Math.floor(Math.random() * 1000000000)}cr`
            return code;
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
        
        if (!req.files) {
            next(new ErrorResponse("no file was selected", 400));
            return
        }

        let images = []
        for (let i = 0; i < req.files.length; i++) {
            let fileData = {}

            let uploadedFile = await cloudinary.uploader.upload(req.files[i].path, { folder: "exlogistics", resource_type: "image" })
            
            if (!uploadedFile) {
                next(new ErrorResponse("image could not be uploaded", 500));
                return
            }

             fileData = {
                fileName: req.files[i].originalname,
                filePath: uploadedFile.secure_url,
                fileType: req.files[i].mimetype,
                fileSize: req.files[i].size,
            }

            images.push(fileData)
        }

        // generate deposit code 
        const depositCode = Math.floor(Math.random() * 1000000000)
        
        // create package 
        const package = await Package.create({
            senderName,
            senderEmail,
            receiverName,
            receiverEmail,
            receiverNumber,
            destination,
            item: packages,
            originCountry,
            destinationCountry,
            weight,
            currentLocation,
            depatureDate,
            deliveryDate,
            shipmentMethod,
            pickupDate,
            trackingId,
            depositCode,
            completed: true,
            image: images,
            status
        })

        if(!package) {
            next(new ErrorResponse("package fail to create",400));
            return
        }

        // construct url to track package 
      const TrackUrl = `${process.env.URL}/track-shipment`

         // package notification email 
      const message = `
        <h2>Hello, ${receiverName}.</h2>
        <p>This is to inform you that a package has been sent to you through our Logistics company from ${senderName} with the email address of ${senderEmail}. All process has been concluded and your package has been shipped. Below are the details of the package</p>

        <p>item: ${packages}</p>
        <p>Tracking Code: ${trackingId}</p>

        <a href=${TrackUrl}>${TrackUrl}</a>

        <p>Please click on the website above to track your package or copy the url to your browser. <br> 
        </p>
        <hr>
        <p>Best Regards...</p>  `
    
        const subject = "Your package has been shipped";
        const send_to = receiverEmail;
        const sent_from = process.env.EMAIL_USER;
    
    await sendEmail(subject, message, send_to, sent_from)

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

        res.status(200).json({message: 'Package has been updated'})
        
    } catch (error) {
        res.status(400).json(error.message)
    }
}

// delete package 
const packages_delete = async (req, res, next) => {
    const { id } = req.params
    try {
        const package = await Package.findById(id)

        if(!package) {
            next(new ErrorResponse("package not found", 404))
            return
        }
        const deleted = await Package.deleteOne({_id: package._id})

        if(!deleted) {
            next(new ErrorResponse("package was not deleted", 400))
            return

        }
        res.status(200).json({message: 'Package successfully deleted'})
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// get all package
const packages_get = async (req, res,) => {
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