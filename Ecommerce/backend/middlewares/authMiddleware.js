const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

const authMiddleware = async(req,res,next) =>{
    const authHeader = req.headers.authorization;
    // req.cookie               To get cookies from request
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // split and remove bearer string
    const token = authHeader.split(" ")[1];
    
    const tokenData = jwt.verify(token, process.env.JWT_SECRET_ID);
    console.log("isValid",tokenData);

    const user = await UserModel.findById(tokenData._id);
    if(!user.isActive){
        return res.status(401).json({ success: false, message: "Unauthorized User" });
    }

    req.user = user; // get all data of user
    next();
}


module.exports = authMiddleware;
