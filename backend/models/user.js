const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

Schema = mongoose.Schema 
const userSchema = new Schema ({
    name: {
        type: String,
        required: [true, "Please enter ur name"],
        maxLength: [30, "Name Cant exceed 30 characters "]
    },
    email: {
        type: String,
        required: [true, " Enter a valid email"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, " Enter ur password"],
        minlength: [6, "password length must be greater than 6"],
        // select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})

userSchema.pre("save", async function(next){
    if (!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.comparePassword = async  function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.getJwtToken = function () {
    return jwt.sign( {id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    } )
}



module.exports = mongoose.model("User", userSchema )