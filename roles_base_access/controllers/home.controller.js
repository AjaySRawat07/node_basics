
const userDashboard = async(req,res) =>{
    if(req.userInfo.role === "user"){
        const {id , name , role } = req.userInfo;
    // console.log("here",id , name , role);
    res.json({
        message : "Welcome to backend world bro",
        result : {id , name, role}
    })
    }

    res.status(500).json({
        message : "User not found" 
    })
}

const adminDashboard = (req,res) =>{
    res.status(201).json({
        message : "Welcome to admin dashboard",
    })
}
const homeController = { userDashboard , adminDashboard};

module.exports = homeController