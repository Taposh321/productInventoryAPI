const express = require("express");
const fs= require("fs");

const adminRouter=express.Router();
//Error handling in asyncronous code
adminRouter.get("/",(req,res,next)=>{
    
        setTimeout(()=>{
            try{
                Hello() //undefined
                console.log("hello")
                res.status(200).json({"massage":"This is admin pannel"})

            }catch(err){
                console.log(err);
                next(err);
            }
        })


})
module.exports=adminRouter