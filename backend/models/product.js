
const mongoose = require("mongoose")

//tzfsnrli3szrdnb4jgge

const Schema = mongoose.Schema
const productSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"],
        trim: true,
        maxLength: [100, "Product name can not exceed 100 characters"]
    },
    price: {
        type: Number,
        required: [true, "Please enter product price"],
        trim: true,
        maxLength: [5, "Product name can not exceed 100 characters"],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, "Please enter product description"],
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String, 
        required: [true, " please enter a category for the product"],
        enum: {
            values: [
                "Electronics",
                "Cameras",
                "Accessories",
                "Food",
                "Books",
                "Headphones",
                "Clothes/Shoes", 
                "Beauty/Health",
                "Sports",
                "Outdoor",
                "Home"
            ],
            message: "Please select correct category for the product"
        }
    },
    seller: {
        type: String,
        requires: [true, "please enter product seller"]
    },
    stock: {
        type: Number, 
        required: [true, "Product Stock"],
        maxLength: [5, "cant exceedd 5 characters"],
        default: 0
    },
    numberofReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model("Product", productSchema)