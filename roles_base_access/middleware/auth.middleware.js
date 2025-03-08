const jwt = require("jsonwebtoken");
const authMiddleware = async(req,res,next) =>{
    const authHeader = req.headers["authorization"];
    // here we correct bearer token form
    const token = authHeader && authHeader.split(" ")[1];

        if(!token){
            res.status(500).json({
                message : "User not authenticate. Try again to login"
            })
        }
    try{
        // verify token through secret key
        const decodeTokenInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(decodeTokenInfo);
        req.userInfo = decodeTokenInfo;
        next();
    }
    catch(err){
        console.log("error from auth middleware side ",err);     
    }
}


module.exports = authMiddleware;