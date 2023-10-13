const bcrypt = require('bcrypt')
const sha1 = require('sha-1')
const { ErrorHandle } = require('../helpers/ErrorHandler')

const encrypt = (plainText) => {
    const saltRound = 15
    try{
        if(plainText != undefined || plainText != null){
            let hash = bcrypt.hashSync(sha1(plainText), saltRound)
            return {generate: true, hash}
        }else{
            return {generate: false, err: 'Value is not accepted'}
        }
    }catch(err){
        return ErrorHandle(err) 
    }
}

const decrypt = (plainText, hash) => {
    try{
        if(plainText != undefined || plainText != null){
            let decode = bcrypt.compareSync(sha1(plainText), hash)
            return decode
        }else{
            return false
        }
    }catch(err){
        return ErrorHandle(err)
    }
}

module.exports = {encrypt, decrypt}