const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order',
        required: true,
        default: null
    },
    paymentType: {
        type: String,
        enum: ['Cheque', 'RTGS', 'Cash', 'Online Payment'],
        required: true,
        default: null
    },
    paidAmount: {
        type: Number,
        required: true,
        default: 0
    },
    paymentProofImg: {
        type: String,
        required: false,
        default: 0
    },
    status: {
        type: String,
        required: true,
        enum: ['Pending','Not Complete Paid','Complete Paid'],
        default: 'Pending',
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

const paymentSchema = new mongoose.model('payments', schema, 'payments')
module.exports = paymentSchema