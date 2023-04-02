const jwt = require("jsonwebtoken");
const user = require("../models/user");
const ErrorHandler = require("../util/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

exports.isAuthenticatedUser = catchAsyncErrors( async(req, res, next) =>{
    const {token} = req.cookies
    if (!token) {
        return next(new ErrorHandler("login first"))
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await user.findById(decoded.id)
    next ()
})

// exports.authorizeRoles = (...roles)