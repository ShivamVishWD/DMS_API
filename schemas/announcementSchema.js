const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'company',
        required: true,
        default: null
    },
    announcementTitle: {
        type: String,
        required: true,
        default: null
    },
    announcementDescription: {
        type: String,
        required: false,
        default: null
    },
    announcementImage: {
        type: String,
        required: false,
        default: null
    },
    announcementTillDate: {
        type: Date,
        required: false,
        default: Date.now
    },
    status: {
        type: String,
        required: true,
        enum: ['Active', 'Deactive', 'Deleted', 'Closed'],
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

const announcementSchema = new mongoose.model('announcement', schema, 'announcement')
module.exports = announcementSchema