const { isObjectIdOrHexString } = require("mongoose")
const Product = require("../models/product")

const ErrorHandler = require("../util/errorHandler")
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const APIFeatures = require("../util/apiFeatures")


exports.newProduct = catchAsyncErrors(async(req, res, next) => {
    const product = await Product.create(req.body)
    product.save((err)=> {if (err) console.log(handleError(err))})
    res.status(201).json({
        success: true,
        product
    })
})

exports.getProducts = catchAsyncErrors(async(req, res, next) => {
    const resPerPage = 4
    const productCount = await Product.countDocuments()


    const APIFeature = new APIFeatures(Product.find(), req.query).search().filter().pagination(resPerPage)

    const products = await APIFeature.query;
    //const products = await Product.find()
    res.status(200).json({
        success: true,
        count: products.length,
        products,
        productCount,
        message: 'Succesfully retrieved'
    })
})

exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id)

    if (!product){ return next(new ErrorHandler("Product not Found", 404)) }
    res.status(200).json({
        success: true,
        product
    })
})

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id)
    if (!product){ return next(new ErrorHandler("Product not Found", 404)) }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        userFindAndModify: false
    })

    res.status(200).json({
        success: true,
        product
    })
})

exports.deleteProduct = catchAsyncErrors(async(req, res, next) => {

    let product = await Product.findById(req.params.id)
    if (!product){ return next(new ErrorHandler("Product not Found", 404)) }
    await product.remove()
    res.status(200).json({
        success: true,
        message : "Product deleted successfully"
    })
})
