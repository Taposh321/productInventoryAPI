const express = require("express");
const cors =require("cors")
require("dotenv").config();

const PORT =process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors())
app.set('json spaces', 2);

const productsRouter = require('./lib/routers')
const adminRouter= require('./lib/admitRouter')
const connectDB = require("./lib/connection")
connectDB()

app.use("/products",productsRouter);
app.use("/admin",adminRouter)

app.use((req,res)=>{
res.status(404).json({
    "massage":"Inviled url"
})
})
app.use((err,req,res,next)=>{
    if(err){
        res.status(500).json({message:err.message})
    }else{
        res.status(400).json({message:"An unknown error occured"})
    }


})
app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});
