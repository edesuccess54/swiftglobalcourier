const mongoose = require('mongoose')
const Schema = mongoose.Schema

const packageSchema = new Schema({
    sendersName: {
        type: String,
        require: true
    },
    
    sendersEmail: {
        type: String,
        require: true
    },
    receiverName: {
        type: String,
        require: true
    },
    receiversEmail: {
        type: String,
        require: true
    },
    receiversNumber: {
        type: String,
        require: true
    },
    receiversAddress: {
        type: String,
        require: true
    },
    package: {
        type: String,
        require: true
    },
    weight: {
        type: String,
        require: true
    },
    location: {
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
    // worth: {
    //     type: String,
    //     require: true
    // }
}, {timestamps: true})

const Package = mongoose.model('package', packageSchema)
module.exports = Package