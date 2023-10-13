const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: null
    },
    description: {
        type: String,
        required: false,
        default: null
    },
    price: {
        type: Number,
        required: true,
        default: null
    },
    productCode: {
        type: String,
        required: false,
        default: null
    },
    productSKU: {
        type: String,
        required: false,
        default: null
    },
    productBrand: {
        type: String,
        required: false,
        default: null
    },
    productCateg: {
        type: String,
        required: false,
        default: null
    },
    productSubCateg: {
        type: String,
        required: false,
        default: null
    },
    productImage: {
        type: Array,
        required: false,
        default: []
    },
    productStock: {
        type: Number,
        required: false,
        default: 10
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'company',
        required: true,
        default: null
    },
    status: {
        type: String,
        required: true,
        enum: ['In Stock', 'Out Of Stock', 'Few Remains'],
        default: 'In Stock',
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

const productSchema = new mongoose.model('product', schema, 'product')
module.exports = productSchema