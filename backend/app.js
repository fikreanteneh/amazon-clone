const express = require('express');
const app = express();
const cookieParser = require("cookie-parser")

const errorMiddleware = require("./middlewares/error")

app.use(express.json());
app.use(cookieParser());

const products = require("./routes/product")
const auth = require("./routes/auth")



app.get("/", (req,res)=>{
    res.send("<h1>HOME</h1>")
})
app.use('/api/v1', products)
app.use('/api/v1', auth)

app.use(errorMiddleware);

module.exports = app