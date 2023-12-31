const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'company',
        required: true,
        default: null
    },
    dealerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'dealer',
        required: true,
        default: null
    },
    type: {
        type: String,
        required: true,
        enum: ['Payment', 'Order', 'Product', 'Offer'],
        default: null
    },
    subject: {
        type: String,
        required: true,
        default: null
    },
    description: {
        type: String,
        required: false,
        default: null
    },
    image: {
        type: String,
        required: false,
        default: null
    },
    status: {
        type: String,
        required: true,
        enum: ['Open', 'Processing', 'Blocked', 'Processed', 'Complete', 'Closed'],
        default: 'Open',
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false
    }
}, {timestamps: true})

const serviceRequestSchema = new mongoose.model('serviceRequest', schema, 'serviceRequest')
module.exports = serviceRequestSchema