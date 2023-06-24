const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order',
        required: true,
        default: null
    },
    creditedAmount: {
        type: Number,
        required: true,
        default: 0
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

const creditNoteSchema = new mongoose.model('creditNote', schema, 'creditNote')
module.exports = creditNoteSchema