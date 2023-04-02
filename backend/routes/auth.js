const express = require("express")
const router = express.Router()

const {registerUser, loginUser, logout} = require("../controllers/authController")


router
    .route("/register")
    .post((req,res, next) => {
        registerUser(req, res, next)
    })
router
    .route("/login")
    .post((req, res, next) => {
        loginUser(req, res, next)
    })

router
    .route("/logout")
    .get((req,res, next)=>{
        logout(req, res, next)
    })
module.exports = router