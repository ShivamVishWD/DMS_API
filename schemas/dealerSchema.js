const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        default: null
    },
    Username: {
        type: String,
        required: true,
        default: null
    },
    Email: {
        type: String,
        required: true,
        default: null
    },
    Password: {
        type: String,
        required: true,
        default: null
    },
    GST: {
        type: String,
        required: false,
        default: null
    },
    PAN: {
        type: String,
        required: false,
        default: null
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'company',
        required: true,
        default: null
    },
    addressLine1: {
        type: String,
        required: false,
        default: null
    },
    addressLine2: {
        type: String,
        required: false,
        default: null
    },
    district: {
        type: String,
        required: false,
        default: null
    },
    state: {
        type: String,
        required: false,
        default: null
    },
    pinCode: {
        type: String,
        required: false,
        default: null
    },
    status: {
        type: String,
        required: true,
        enum: ['Active', 'Deactive', 'Deleted'],
        default: 'Active',
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

const dealerSchema = new mongoose.model('dealer', schema, 'dealer')
module.exports = dealerSchema