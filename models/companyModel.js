const companySchema = require('../schemas/companySchema')
const { ErrorHandle } = require('../helpers/ErrorHandler')

const companyModel = {
    saveRecord : async(body) => {
        try{
            const record = await new companySchema(body).save()
            if(record)
                return { status: 200, recordId: record._id }
            else
                return { status: 400 }
        }catch(error){
            return ErrorHandle(error)
        }
    },

    findRecords : async(filterObj) => {
        try{
            const record = await companySchema.find(filterObj).select('-Password -PasswordEncode').exec()
            if(record.length > 0)
                return { status: 200, data: record }
            else
                return { staus: 400 }
        }catch(error){
            return ErrorHandle(error)
        }
    },

    findRecordById : async(id) => {
        try{
            const record = await companySchema.findById({_id: id})
            if(record)
                return { status: 200, recordId: record._id }
            else
                return { staus: 400 }
        }catch(error){
            return ErrorHandle(error)
        }
    },

    findOneRecord : async(filterObj) => {
        try{
            const record = await companySchema.findOne(filterObj)
            if(record)
                return { status: 200, data: record }
            else
                return { status: 400 }
        }catch(error){
            return ErrorHandle(error)
        }
    },

    updateRecord: async(filterObj, updatedData) => {
        try{
            const record = await companySchema.findOneAndUpdate(filterObj, updatedData, {new: true})
            if(record)
                return { status: 200, updatedData: record }
            else
                return { status: 400 }
        }catch(error){
            return ErrorHandle(error)
        }
    },

    deleteRecord: async(filterObj) => {
        try{
            const response = await companySchema.findOneAndUpdate(filterObj, {isDeleted: true}, {new: true})
            if(response)
                return { status: 200, message: 'Record Deleted' }
            else
                return { status: 400 }
        }catch(error){
            return ErrorHandle(error)
        }
    }
}

module.exports = companyModel