const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true,
        default: null
    },
    totalQty: {
        type: Number,
        required: true,
        default: 100
    },
    remainQty: {
        type: Number,
        required: true,
        default: 100
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

const stockSchema = new mongoose.model('stock', schema, 'stock')
module.exports = stockSchema