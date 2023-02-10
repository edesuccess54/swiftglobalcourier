const mongoose = require('mongoose')
const Schema = mongoose.Schema

const packageSchema = new Schema({
    senderName: {
        type: String,
        trim: true
    },
    
    senderEmail: {
        type: String,
        trim: true
    },
    receiverName: {
        type: String,
        trim: true
    },
    receiverEmail: {
        type: String,
        trim: true
    },
    receiverNumber: {
        type: String,
        trim: true
    },
    destination: {
        type: String,
        trim: true
    },
    item: {
        type: String,
        trim: true
    },
    weight: {
        type: String,
        trim: true
    },
    currentLocation: {
        type: String,
        trim: true
    },
    depatureDate: {
        type: String,
        trim: true
    },
    deliveryDate: {
        type: String,
        trim: true
    },
    shipmentMethod: {
        type: String,
        trim: true
    },
    pickupDate: {
        type: String,
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
        trim: true
    },

}, {timestamps: true})

const Package = mongoose.model('package', packageSchema)
module.exports = Package