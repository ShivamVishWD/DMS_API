const orderModel = require('../models/orderModel')
const dealerModel = require('../models/dealerModel')
const companyModel = require('../models/companyModel')
const helper = require('../helpers/commonHelper')
const { ErrorHandle } = require('../helpers/ErrorHandler')
//const EventEmitter = require('events');

//const eventEmitter = new EventEmitter();

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

            let dealerObj = {}, companyObj = {}
            if(req.authData.data.dealerId){
                const dealer = await dealerModel.find({_id: req.authData.data.dealerId})
                if(dealer.status == 200){
                    dealerObj = {
                        Name: dealer.data[0].Name,
                        Username: dealer.data[0].Username,
                        Address: helper.checkNull(dealer.data[0].addressLine1) + helper.checkNull(dealer.data[0].addressLine2) + helper.checkNull(dealer.data[0].district) + helper.checkNull(dealer.data[0].state) + helper.checkNull(dealer.data[0].pinCode)
                    }
                }
                body['dealer'] = dealerObj
                body['dealerId'] = req.authData.data.dealerId
            }
            if(req.authData.data.companyId){
                const company = await companyModel.findOneRecord({_id: req.authData.data.companyId})
                if(company.status == 200){
                    companyObj = {
                        Name: company.data.Name,
                        Username: company.data.Username
                    }
                }
                body['company'] = companyObj
                body['companyId'] = req.authData.data.companyId
            }

            body['orderItems'] = req.body

            let totalAmount = 0
            for(let item of body.orderItems){
                totalAmount += item.totalPrice;
                delete item.productPrice
            }
            body['orderAmount'] = totalAmount

            const result = await orderModel.save(body)
            if(result.status == 200)
                return res.status(200).json({status: 200, message: 'Order Created', reordId: result.recordId})
            else
                return res.status(400).json({status: 400, message: 'Order Creatrion Failed'})
        }catch(error){
            return res.json(ErrorHandle(error))
        }
    },

    get : async(req, res, next) => {
        try{
            const eventEmitter = req.app.get('eventEmitter')
            eventEmitter.emit('start', 'hello');
            if(!req.authData || !req.authData.data || !(req.authData.data.dealerId || req.authData.data.companyId))
                return res.status(400).json({status: 400, message: 'Invalid Auth Token'})
            let filter = {}
            
            if(req.authData.dealerId)
                filter['dealerId'] = req.authData.dealerId
            if(req.authData.companyId)
                filter['companyId'] = req.authData.companyId
            const records = await orderModel.find(filter)
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
    },

    myfun : (data) => {
        console.log('myfun emit : ',data)
    }

}

module.exports = companyController