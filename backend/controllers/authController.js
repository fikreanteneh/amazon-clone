
const User = require("../models/user")
const ErrorHandler = require("../util/errorHandler")
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const sendToken = require("../util/jwtToken")


exports.registerUser = catchAsyncErrors(async(req, res, next) => {
    const {name, email, password} = req.body;
     const user = await User.create({
        name,
        email,
        password,
        avatar : {
            public_id: "nrcgbjjjj",
            url: "https://image.shutterstock.com/image-photo/many-happy-diverse-ethnicity-different-260nw-1733872811.jpg"
        }
     })

     sendToken(user, 200, res)
})
 
exports.loginUser = catchAsyncErrors( async(req, res, next)=>{
    const {email, password} = req.body

    if (!email || !password) {
        return next (new ErrorHandler("please enter email and password"), 400)
    }
    const user = await (await User.findOne({email}))//.select("+password")
    console.log(user)
    if (!user){
        console.log("22")
        return next(new ErrorHandler("invalid Email or Password", 401))
    }
    const isPasswordMatched = await user.comparePassword(password)

    if (!isPasswordMatched){
        console.log("33")
        return next( new ErrorHandler("invalid email or pass"), 401)
    }

    sendToken(user, 200, res)
    // const token = user.getJwtToken();
    
    // res.status(200).json({
    //     success: true,
    //     token
    // })
})

exports.logout = catchAsyncErrors( async(req, res, next) => {
    console.log("rrrr")
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
        
    })
    res.status(200).json({
        success: true,
        message: "Logged Out"
    })
})