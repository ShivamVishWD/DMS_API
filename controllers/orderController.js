const orderModel = require('../models/orderModel')
const dealerModel = require('../models/dealerModel')
const companyModel = require('../models/companyModel')
const jwtToken = require('../middlewares/JWT')
const { ErrorHandle } = require('../helpers/ErrorHandler')

const companyController = {
    
    insert : async(req, res, next) => {
        try{
            if(!req.authData || !req.authData.data || !(req.authData.data.dealerId || req.authData.data.companyId))
                return res.status(400).json({status: 400, message: 'Invalid Auth Token'})

            let body = {}, mandatoryFields = []

            for(let obj of req.body){
                if(!obj.productId && !mandatoryFields.includes('productId'))
                    mandatoryFields.push('productId')
                else if(obj.productId)
                    obj['totalPrice'] = obj.totalQuantity * obj.productPrice;

                if(!obj.totalQuantity && !mandatoryFields.includes('totalQuantity'))
                    mandatoryFields.push('totalQuantity')
                else if(obj.totalQuantity)
                    obj['totalPrice'] = obj.totalQuantity * obj.productPrice;

                if(!obj.productPrice && !mandatoryFields.includes('productPrice'))
                    mandatoryFields.push('productPrice')
                else if(obj.productPrice)
                    obj['totalPrice'] = obj.totalQuantity * obj.productPrice;
            }

            if(mandatoryFields.length > 0)
                return res.status(406).json({status: 406, message: 'Mandatory Fields', fields: mandatoryFields})

            if(req.body.coupon){
                body['couponCode'] = req.body.coupon
                body['isCouponApplied'] = true
            }

            if(req.authData.data.dealerId)
                body['dealerId'] = req.authData.data.dealerId
            if(req.authData.data.companyId)
                body['companyId'] = req.authData.data.companyId

            body['orderItems'] = req.body

            for(let item of body.orderItems){
                delete item.productPrice
            }

            
        }catch(error){
            return res.json(ErrorHandle(error))
        }
    },

    get : async(req, res, next) => {
        try{
            let filter = {}
            const records = await productModel.find(filter)
            return res.status(records.status).json(records)
        }catch(error){
            return res.json(ErrorHandle(error))
        }
    },

    update : async(req, res, next) => {
        try{
            
        }catch(error){
            return res.json(ErrorHandle(error))
        }
    },

    delete : async(req, res, next) => {
        try{
            
        }catch(error){
            return res.json(ErrorHandle(error))
        }
    }

}

module.exports = companyController