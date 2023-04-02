const ErrorHandler = require("../util/errorHandler")

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    if (process.env.NODE_ENV === "DEVELOPMENT") {
        res.status(err.statusCode).json({
            success: false,
            error: err,
            errorMsg : err.message,
            stack : err.stack
        })

    }
    if (process.env.NODE_ENV === "DEVELOPMENT"){
        let error = { ...err }
        err.message = err.message


        if (err.name == "CastError") {
            const message = `Resource not found. Invalid ${err.path}`
            error = new ErrorHandler(message, 400)
        }

        if (err.name == "ValidationError") {
            const message = Object.values(err.values).map(value => value.message)
            error = new ErrorHandler(message, 400)
        }



        error.message = err.message
        res.status(error.statusCode).json({
            success: false,
            message : err.message || "Internal server  error"
        })
    }
    
} 