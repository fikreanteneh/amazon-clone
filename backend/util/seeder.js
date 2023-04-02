const Product = require("../models/product")
const dotenv = require("dotenv")

const connectDb = require("../config/database")


const products = require("../data/products.json")
x = dotenv.config({path: "backend/config/config.env"})

connectDb(x)

const seedProduct = async () => {
    try{
        await Product.deleteMany()
        console.log("Products are Deleted")

        await Product.insertMany(products)
        console.log("Products are added")

        process.exit
    }catch(error) {
        console.log(error.message)
        process.exit()
    }
}
seedProduct()