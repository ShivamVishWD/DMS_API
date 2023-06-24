const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'company',
        required: true,
        default: null
    },
    couponTitle: {
        type: String,
        required: true,
        default: null
    },
    couponDescription: {
        type: String,
        required: true,
        default: null
    },
    couponCrieteria: {
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

const couponSchema = new mongoose.model('coupon', schema, 'coupon')
module.exports = couponSchema