const roleMiddleware = (...allowedRole) => (req,res,next) =>{
    
    if(allowedRole.includes(req.user.role)){
        next();
    }
    else{
        res.status(403).json({
            success : true,
            message : "You don't have permission add product",
        })
    }
}

module.exports = roleMiddleware;