const express = require('express')
const router =express.Router();
 

const { newProduct, getProducts, getSingleProduct, updateProduct, deleteProduct} = require('../controllers/productController')

const {isAuthenticatedUser} = require("../middlewares/auth")


router
  .route("/admin/product/new")
  .post((req, res, next)=> {
    isAuthenticatedUser(req, res, next)
    newProduct(req, res, next)
  });

router
  .route("/products")
  .get((req, res, next) =>{ 
    getProducts(req,res, next)
   });

router
  .route("/product/:id")
  .get((req,res, next)=> {
    getSingleProduct(req, res, next)
  });

router
  .route("/admin/product/:id")
  .put((req, res,next)=> {
    isAuthenticatedUser(req, res, next)
    updateProduct(req, res, next)
  })
  .delete((req, res, next)=> {
    isAuthenticatedUser(req, res, next)
    deleteProduct(req, res, next)
  });

module.exports = router;  
 