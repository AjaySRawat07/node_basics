const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        require : true,
        unique : true,
        trim : true
    },
    email : {
        type : String,
        require : true,
        unique : true,
        lowercase : true,
        trim : true,    
    },
    password : {
        type : String,
        require : true,
    },
    role : {
        type : String,
        require : true,
        enum : ["user", "admin", "superAdmin"],
        default : "user"
    }
},{timestamps : true})

const userModel = mongoose.model("User", UserSchema);

module.exports = userModel;