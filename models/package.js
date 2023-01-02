const mongoose = require('mongoose')
const Schema = mongoose.Schema

const packageSchema = new Schema({
    senderName: {
        type: String,
        require: true
    },
    
    senderEmail: {
        type: String,
        require: true
    },
    receiverName: {
        type: String,
        require: true
    },
    receiverEmail: {
        type: String,
        require: true
    },
    receiverNumber: {
        type: String,
        require: true
    },
    destination: {
        type: String,
        require: true
    },
    item: {
        type: String,
        require: true
    },
    weight: {
        type: String,
        require: true
    },
    currentLocation: {
        type: String,
        require: true
    },
    departureDate: {
        type: String,
        require: true
    },
    deliveryDate: {
        type: String,
        require: true
    },
    shipmentMethod: {
        type: String,
        require: true
    },
    pickupDate: {
        type: String,
        require: true
    },
    trackingId: {
        type: String,
        require: true
    },
    completed: {
        type: Boolean,
        require: true
    },
    status: {
        type: String,
        require: true
    },

}, {timestamps: true})

const Package = mongoose.model('package', packageSchema)
module.exports = Package