require("dotenv").config()
const mongoose = require("mongoose")
const MONGO_URL=process.env.MONGO_URL

const connectDB= async ()=>{
    try{
      await  mongoose.connect(MONGO_URL,{
         useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000})
      console.log("Connected to MongoDB")
    }catch(err){
        console.log("Error connecting to MongoDB",err)
    }
}
module.exports= connectDB