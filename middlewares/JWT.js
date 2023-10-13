const jwt = require('jsonwebtoken');
const { ErrorHandle } = require('../helpers/ErrorHandler');

const jwtToken = {

    generate : (req, res, next) => {
        try{
            const token = jwt.sign(
                req.body, process.env.JWT_TOKEN, { expiresIn: "5h" }
            )
            return { status: 200, message: 'Token Genrated', token }
        }catch(error){
            return ErrorHandle(error)
        }
    },

    verify : (req, res, next) => {
        try{
            let authToken = ""
            if('authorization' in req.headers && req.headers['authorization']){
                if(req.headers['authorization'].startsWith('Bearer')){
                    authToken = req.headers['authorization'].split("Bearer ")[1]
                }else{
                    authToken = req.headers['authorization']
                }
                let getData = jwt.verify(authToken, process.env.JWT_TOKEN)
                req.authData = {data: getData, token: authToken}
            }
            next()
        }catch(error){
            return res.json(ErrorHandle(error))
        }
    }
}

module.exports = jwtToken;