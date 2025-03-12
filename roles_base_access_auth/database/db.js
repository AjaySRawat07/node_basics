const mongoose = require("mongoose");

// console.log(process.env.MONGO_URL);

const connectToDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB connected successfully");
    }
    catch(error){
        console.error("Mongo connection failed :",error.message);
        process.exit(1);
    }
}

module.exports = connectToDB;