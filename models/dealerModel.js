const dealerSchema = require('../schemas/dealerSchema')
const { ErrorHandle } = require('../helpers/ErrorHandler')

const dealerModel = {
    save : async(body) => {
        try{
            const record = await new dealerSchema(body).save()
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
            const record = await dealerSchema.find(filterObj).select(" -Password -HashPassword -isDeleted").exec()
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
            const record = await dealerSchema.findById({_id: id}).select(" -Password -HashPassword -isDeleted").exec()
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
            const record = await dealerSchema.findOne(filterObj).select(" -Password -HashPassword -isDeleted").exec()
            if(record)
                return { status: 200, data: record }
            else
                return { status: 400 }
        }catch(error){
            return ErrorHandle(error)
        }
    }
}

module.exports = dealerModel