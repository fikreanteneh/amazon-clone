const mongoose = require("mongoose") ///
const connectDb = () => {
    mongoose.connect(/*"mongodb://localhost:27017/shopit"*/process.env.DB_LOCAL_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
        //useCreateIndex: true
    }).then(con => {
        console.log(`MongoDB connected with host${con.connection.host}`)
    }).catch((err)=> {console.error(err)})
}
module.exports = connectDb