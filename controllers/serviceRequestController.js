const serviceRequestModel = require('../models/serviceRequestModel')
const { ErrorHandle } = require('../helpers/ErrorHandler')

const companyController = {
    
    insert : async(req, res, next) => {
        try{
            if(!req.authData || !req.authData.data || !req.authData.data.companyId)
                return res.status(400).json({status: 400, message: 'Invalid Auth Token'})

            let body = {}, mandatoryFields = []

            if(!req.body.subject)
                mandatoryFields.push("subject")

            if(!req.body.description)
                mandatoryFields.push("description")

            if(!req.body.type)
                mandatoryFields.push("type")

            if(mandatoryFields.length > 0)
                return res.status(200).json({status: 200, message: 'Fields are Mandatory', fields: mandatoryFields})

            body = req.body

            if(req.authData.data.dealerId)
                body['dealerId'] = req.authData.data.dealerId
            if(req.authData.data.companyId)
                body['companyId'] = req.authData.data.companyId

            let result = await serviceRequestModel.save(req.body)
            if(result.status == 200)
                return res.status(200).json({status: 200, message: 'Record Saved', recordId: result.recordId})
            else
                return res.status(400).json({status: 400, message: 'Record Creation Failed', errorType: result.Error_Type, error: result.Error_Message})
        }catch(error){
            return res.json(ErrorHandle(error))
        }
    },

    get : async(req, res, next) => {
        try{
            if(!req.authData || !req.authData.data || !req.authData.data.companyId){
                return res.status(400).json({status: 400, message: 'Invalid Auth Token'})
            }
            let filter = {}

            if(req.authData.data.dealerId)
                filter['dealerId'] = req.authData.data.dealerId
            if(req.authData.data.companyId)
                filter['companyId'] = req.authData.data.companyId

            const records = await serviceRequestModel.find(filter)
            return res.status(records.status).json(records)
        }catch(error){
            return res.json(ErrorHandle(error))
        }
    },

    update : async(req, res, next) => {
        try{
            if(!req.authData || !req.authData.data || !req.authData.data.companyId)
                return res.status(400).json({status: 400, message: 'Invalid Auth Token'})
            
        }catch(error){
            return res.json(ErrorHandle(error))
        }
    },

    delete : async(req, res, next) => {
        try{
            if(!req.authData || !req.authData.data || !req.authData.data.companyId){
                return res.status(400).json({status: 400, message: 'Invalid Auth Token'})
            }
        }catch(error){
            return res.json(ErrorHandle(error))
        }
    }

}

module.exports = companyController