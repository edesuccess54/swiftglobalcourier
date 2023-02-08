const mongoose = require('mongoose')
const Schema = mongoose.Schema

const packageSchema = new Schema({
    senderName: {
        type: String,
        // required: [true, "Senders name is required"],
        trim: true
    },
    
    senderEmail: {
        type: String,
        // required: [true, "Senders' email is required"],
        trim: true
    },
    receiverName: {
        type: String,
        // required: [true, "Receivers' name is required"],
        trim: true
    },
    receiverEmail: {
        type: String,
        // required: [true, "Receivers' name is required"],
        trim: true
    },
    receiverNumber: {
        type: String,
        // required: [true, "Receivers' name is required"],
        trim: true
    },
    destination: {
        type: String,
        // required: [true, "Destination is required"],
        trim: true
    },
    item: {
        type: String,
        // required: [true, "Package is required"],
        trim: true
    },
    weight: {
        type: String,
        // required: [true, "Package weight is required"],
        trim: true
    },
    currentLocation: {
        type: String,
        // required: [true, "Package location is required"],
        trim: true
    },
    depatureDate: {
        type: String,
        // required: [true, "Departure date is required"],
        trim: true
    },
    deliveryDate: {
        type: String,
        // required: [true, "Delivery date is required"],
        trim: true
    },
    shipmentMethod: {
        type: String,
        // required: [true, "Please select a shipment method"],
        trim: true
    },
    pickupDate: {
        type: String,
        // required: [true, "Pick up date is required"],
        trim: true
    },
    trackingId: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    },
    image: {
        type: Array,
        required: true
    },
    status: {
        type: String,
        // required: [true, "Package status is required"],
        trim: true
    },

}, {timestamps: true})

const Package = mongoose.model('package', packageSchema)
module.exports = Package