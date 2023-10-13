const ErrorHandle = (error) =>{
    return { status: 400, Error_Type: error.name, Error_Message: error.message }
}

module.exports = {ErrorHandle}