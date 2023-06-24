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
    Logo: {
        type: String,
        required: false,
        default: null
    },
    status: {
        type: String,
        required: true,
        enum: ['Active', 'Deactive', 'Deleted', 'Blocked'],
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

const companySchema = new mongoose.model('company', schema, 'company')
module.exports = companySchema