
const isAdmin = (req,res,next) =>{
        if(req.userInfo.role !== "admin"){
            res.status(500).json({
                message : "Not a Admin",
            })
        }
        next();
}

module.exports = isAdmin;