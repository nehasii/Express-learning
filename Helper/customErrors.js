let customApiErrors = (message, statusCode)=>{
    let customError = new Error (message)
    customError.statusCode = statusCode
    return customError;
}

module.exports = customApiErrors