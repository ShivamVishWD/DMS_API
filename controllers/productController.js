const productModel = require('../models/productModel')
const jwtToken = require('../middlewares/JWT')
const { ErrorHandle } = require('../helpers/ErrorHandler')

// Object for Match the fields from request body and replace it in actual Field Name
const FieldsName = {
    brand: 'productBrand',
    category: 'productCateg',
    subcategory: 'productSubCateg'
}

const companyController = {
    
    insert : async(req, res, next) => {
        try{
            if(!req.authData || !req.authData.data || !req.authData.data.companyId)
                return res.status(400).json({status: 400, message: 'Invalid Auth Token'})

            if(!req.body)
                return res.status(200).json({status: 400, message: 'Request Body should not blank'})

            let body = {}, mandatoryFields = []

            if(!req,body.name)
                mandatoryFields.push("name")

            if(!req.body.price)
                mandatoryFields.push("price")

            if(mandatoryFields.length > 0)
                return res.status(200).json({status: 200, message: 'Mandatory fields', fields: mandatoryFields})

            body = req.body

            if('brand' in body)
                body[FieldsName['brand']] = body.brand

            if('category' in body)
                body[FieldsName['category']] = body.category

            if('subcategory' in body)
                body[FieldsName['subcategory']] = body.subcategory

            delete body.brand
            delete body.category
            delete body.subcategory

            body['companyId'] = req.authData.data.companyId

            let result = await productModel.save(body);
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
            let filter = {
                companyId: req.authData.data.companyId
            }
            const records = await productModel.find(filter)
            return res.status(records.status).json(records)
        }catch(error){
            return res.json(ErrorHandle(error))
        }
    },

    update : async(req, res, next) => {
        try{
            if(!req.authData || !req.authData.data || !req.authData.data.companyId){
                return res.status(400).json({status: 400, message: 'Invalid Auth Token'})
            }
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