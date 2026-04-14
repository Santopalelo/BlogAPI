const mongoose = require("mongoose");
const joi = require("joi")
require('dotenv').config();

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Database Connected SuccessfullY")
}
catch(error){
    console.log("Connection to Database Failed", error.message)
    process.exit(1)
}
}

module.exports = connectDB