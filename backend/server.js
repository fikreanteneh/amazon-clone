const app = require('./app')

const connectDb = require("./config/database")

const dotenv = require('dotenv')

process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.message}`)
    console.log(`Shutting Down the server due to uncaughtException`)
    process.exit(1)
    
})


dotenv.config({path:"backend/config/config.env" })

connectDb((err) => {
    if (err) {
        console.log(err)
    }
})
const server = app.listen(process.env.PORT, () => {
    console.log(`Serever started on port: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})

process.on("unhandledRejection", err => {
    console.log(`ERROR: ${err.message}`)
    console.log(`Shutting Down the server due to unhandledRejection`)
    server.close(()=>{
        process.exit(1)
    })
})

 
