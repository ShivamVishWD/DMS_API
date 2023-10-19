const serviceRequestSchema = require('../schemas/serviceRequestSchema')
const { ErrorHandle } = require('../helpers/ErrorHandler')

const serviceRequestModel = {
    save : async(body) => {
        try{
            const record = await new serviceRequestSchema(body).save()
            if(record)
                return { status: 200, recordId: record._id }
            else
                return { status: 400 }
        }catch(error){
            return ErrorHandle(error)
        }
    },

    find : async(filterObj) => {
        try{
            const record = await serviceRequestSchema.find(filterObj).exec()
            if(record.length > 0)
                return { status: 200, message: 'Record Found', data: record }
            else
                return { staus: 400, message: 'No Record Found' }
        }catch(error){
            return ErrorHandle(error)
        }
    },

    findById : async(id) => {
        try{
            const record = await serviceRequestSchema.findById({_id: id}).exec()
            if(record)
                return { status: 200, recordId: record._id }
            else
                return { staus: 400 }
        }catch(error){
            return ErrorHandle(error)
        }
    },

    findOne : async(filterObj) => {
        try{
            const record = await serviceRequestSchema.findOne(filterObj).exec()
            if(record)
                return { status: 200, data: record }
            else
                return { status: 400 }
        }catch(error){
            return ErrorHandle(error)
        }
    }
}

module.exports = serviceRequestModel