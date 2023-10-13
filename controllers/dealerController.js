const dealerModel = require('../models/dealerModel')
const jwtToken = require('../middlewares/JWT')
const {encrypt, decrypt} = require('../middlewares/encryptDecrypt')
const { ErrorHandle } = require('../helpers/ErrorHandler')

// Object for Match the fields from request body and replace it in actual Field Name
const FieldsName = {
    name: 'Name',
    username: 'Username',
    email: 'Email',
    password: 'Password',
    photo: 'profilePhoto',
    gst: 'GST',
    pan: 'PAN',
    addr1: 'addressLine1',
    addr2: 'addressLine2',
    district: 'district',
    state: 'state',
    pinCode: 'pinCode',
    status: 'Status'
}

const companyController = {
    
    insert : async(req, res, next) => {
        try{
            if(!req.authData){
                return res.status(400).json({status: 400, message: 'Invalid Auth Token'})
            }

            let body = {}, mandatoryFields = []

            if(Object.keys(req.body).length < 1)
                return res.status(406).json({status: 406, message: 'Request body should not blank'})

            if(!req.body.name)
                mandatoryFields.push('name');

            if(!req.body.username)
                mandatoryFields.push('username')

            if(!req.body.email)
                mandatoryFields.push('email')

            if(!req.body.password)
                mandatoryFields.push('password')

            if(!req.body.addr1)
                mandatoryFields.push('addr1')

            if(!req.body.state)
                mandatoryFields.push('state')

            if(!req.body.pinCode)
                mandatoryFields.push('pinCode');

            if(mandatoryFields.length > 0)
                return res.status(406).json({status: 406, message: 'mandatory fields', fields: mandatoryFields});

            let genratePassword = encrypt(req.body.password) // generate a hash password
            let hashPassword = ""
            if(genratePassword.generate)
                hashPassword = genratePassword.hash // assign hash password 

            for(let item in req.body)
                body[FieldsName[item]] = req.body[item] // set body to insert

            body['HashPassword'] = hashPassword // set Hash pasword in a key of final body

            if(req.authData && req.authData.data)
                body['companyId'] = req.authData.data;
            
            let result = await dealerModel.save(body);
            if(result.status == 200)
                return res.status(200).json({status: 200, message: 'Record Saved', recordId: result.recordId})
            else
                return res.status(400).json({status: 400, message: 'Record Creation Failed', errorType: result.Error_Type, error: result.Error_Message})
        }catch(error){
            return res.json(ErrorHandle(error))
        }
    },

    auth : async(req, res, next) => {
        try{
            if(!req.body)
                return res.status(406).json({status: 406, message: 'Request body should not blank'})

            let credentialObj = {}, mandatoryFields = []

            if(!req.body.username)
                mandatoryFields.push("username")

            if(!req.body.password)
                mandatoryFields.push("password")

            if(mandatoryFields.length > 0)
                return res.status(406).json({status: 406, message: 'Mandatory fields', fields: mandatoryFields})

            console.log(req.body)
            credentialObj = {
                $and: [ { $or: [ {Username : req.body.username}, {Email: req.body.username} ] }, {Password : req.body.password}, {isActive: true}, {isDeleted: false} ]
            }

            const result = await dealerModel.findOne(credentialObj);
            console.log(result)
            if(result.status == 200){
                const genratedToken = jwtToken.generate({body: {dealerId: result.data._id, companyId: result.data.companyId}})
                if(genratedToken.status == 200)
                    return res.status(200).json({status: 200, message: 'Authorization Successfull', authToken: genratedToken.token})
            }else{
                return res.status(200).json({status: 404, message: 'Wrong Credential'})
            }
        }catch(error){
            return res.json(ErrorHandle(error))
        }
    },

    get : async(req, res, next) => {
        try{
            if(!req.authData || !req.authData.data || !(req.authData.data.dealerId || req.authData.data.companyId)){
                return res.status(400).json({status: 400, message: 'Invalid Auth Token'})
            }
            let filter = {}
            if('dealerId' in req.authData.data){
                filter = {
                    _id: req.authData.data.dealerId
                }
            }else if('companyId' in req.authData.data){
                filter = {
                    companyId: req.authData.data.companyId
                }
            }
            const records = await dealerModel.find(filter)
            return res.status(records.status).json(records)
        }catch(error){
            return res.json(ErrorHandle(error))
        }
    },

    update : async(req, res, next) => {
        try{
            if(!req.authData || !req.authData.data || !req.authData.data.dealerId){
                return res.status(400).json({status: 400, message: 'Invalid Auth Token'})
            }
        }catch(error){
            return res.json(ErrorHandle(error))
        }
    },

    delete : async(req, res, next) => {
        try{
            if(!req.authData || !req.authData.data || !req.authData.data.dealerId){
                return res.status(400).json({status: 400, message: 'Invalid Auth Token'})
            }
        }catch(error){
            return res.json(ErrorHandle(error))
        }
    }

}

module.exports = companyController