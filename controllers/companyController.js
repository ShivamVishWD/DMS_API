const companyModel = require('../models/companyModel')
const jwtToken = require('../middlewares/JWT')
const {encrypt, decrypt} = require('../middlewares/encryptDecrypt')
const { ErrorHandle } = require('../helpers/ErrorHandler')

// Object for Match the fields from request body and replace it in actual Field Name
const FieldsName = {
    name: 'Name',
    username: 'Username',
    email: 'Email',
    password: 'Password',
    logo: 'Logo',
    gst: 'GST',
    pan: 'PAN',
    status: 'Status'
}

const companyController = {
    
    insert : async(req, res, next) => {
        try{
            let body = {}
            // Check if body is blank or not
            if(Object.keys(req.body).length < 1)
                return res.status(406).json({status: 406, message: 'Request Body should not blank'})
            
            let genratePassword = encrypt(req.body.password) // generate a hash password
            let hashPassword = ""
            if(genratePassword.generate){
                hashPassword = genratePassword.hash // assign hash password 
            }
            for(let item in req.body){
                body[FieldsName[item]] = req.body[item] // set body to insert
            }
            body['PasswordEncode'] = hashPassword // set Hash pasword in a key of final body
            let result = await companyModel.saveRecord(body)
            if(result.status == 200){
                const genratedToken = jwtToken.generate({body: {companyId: result.recordId}})
                if(genratedToken.status == 200)
                    return res.status(200).json({status: 200, message: 'Registration Success', authToken: genratedToken.token})
                else
                    return res.status(200).json({status: 200, message: 'Registration Success', id: result.recordId})
            }
        }catch(error){
            return res.json(ErrorHandle(error))
        }
    },

    auth : async(req, res, next) => {
        try{
            if(req.authData && req.authData.data && req.authData.data.companyId){
                const fetchCompanyById = await companyModel.findRecordById(req.authData.data.companyId)
                if(fetchCompanyById.status == 200){
                    return res.status(200).json({status: 200, message: 'Authorization Successfull', authToken: req.authData.token})
                }else{
                    return res.status(200).json({status: 200, message: 'Invalid Auth Token'})
                }
            }else{
                let filter = {}
                if(req.body.email){
                    filter['Email'] = req.body.email
                }
                if(req.body.username){
                    filter['Username'] = req.body.username
                }
                const fetchCompanyByEmail = await companyModel.findOneRecord(filter)
                if(fetchCompanyByEmail.status == 200){
                    if(decrypt(req.body.password, fetchCompanyByEmail.data.PasswordEncode)){
                        const genratedToken = jwtToken.generate({body: {companyId: fetchCompanyByEmail.data._id}})
                        if(genratedToken.status == 200)
                            return res.status(200).json({status: 200, message: 'Authorization Successfull', authToken: genratedToken.token})
                    }else{
                        return res.status(200).json({status: 200, message: 'Wrong Credential'})
                    }
                }else{
                    return res.status(200).json({status: 200, message: 'Wrong Credential'})
                }
            }
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
            const records = await companyModel.findRecords(filter)
            return res.status(records.status).json(records)
        }catch(error){
            return res.json(ErrorHandle(error))
        }
    },

    update: async(req, res, next) => {
        try{
            if(!req.authData || !req.authData.data || !req.authData.data.companyId){
                return res.status(400).json({status: 400, message: 'Invalid Auth Token'})
            }
            let filter = {}
            let data = {}
            const result = await companyModel.updateRecord(filter, data)
            return res.status(result.status).json(result)
        }catch(error){
            return res.json(ErrorHandle(error))
        }
    },

    delete: async(req, res, next) => {
        try{
            if(!req.authData || !req.authData.data || !req.authData.data.companyId){
                return res.status(400).json({status: 400, message: 'Invalid Auth Token'})
            }
            let filter = {}
            const result = await companyModel.deleteRecord(filter)
            return res.status(result.status).json(result)
        }catch(error){
            return res.json(ErrorHandle(error))
        }
    }
}

module.exports = companyController