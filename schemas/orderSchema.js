const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    orderAmount: {
        type: Number,
        required: true,
        default: 0
    },
    isCouponApplied: {
        type: Boolean,
        required: true,
        default: false
    },
    couponCode: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'coupon',
        required: false,
        default: null
    },
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
    status: {
        type: String,
        required: true,
        enum: ['Ordered', 'Shipping', 'Shipped', 'Out of Delivery', 'Delivered'],
        default: 'Ordered',
    },
    orderItems: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product',
            required: true,
            default: null
        },
        totalPrice: {
            type: Number,
            required: true,
            default: 0
        },
        totalQuantity: {
            type: Number,
            required: true,
            default: 0
        },
    }],
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

const orderSchema = new mongoose.model('order', schema, 'order')
module.exports = orderSchema