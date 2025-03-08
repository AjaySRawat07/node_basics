const User = require("../model/user.model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const register = async(req,res) =>{
    try{
        const {username,email,password,role} = req.body;

        const checkUserExe = await User.findOne({ $or:[ {username}, {email} ]});
        // username or email password already exist in DB
        if(checkUserExe){
            res.status(400).json({
                success : false,
                message : "[username or email] already used."
            })
        }

        // set data into database
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        // add new user
        const newUser =  new User({
            username,
            email,
            password : hashedPassword,
            role : role || "user",
        })

        await newUser.save();

        if(newUser){
            res.status(201).json({
                success : true,
                message : "User created successfully"
            })
        }else{
            res.status(500).json({
                success : true,
                message : "Unable to register user",
            })
        }
     }
     catch(err){
        console.log("Registration Error ",err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
     }
}

const login = async(req,res) =>{
    try{
         const {email , password} = req.body;

         const isUser = await User.findOne({email});

         if(!isUser){
            res.status(400).json({
                success : false,
                message : "User don't exist",
            })
         }
         const isPasswordMatch = await bcrypt.compare(password, isUser.password);

         if(!isPasswordMatch){
            res.status(401).json({
                success : true,
                message : "password don't match"
            })
         }

         const accessToken = jwt.sign({
            id : isUser._id,
            name : isUser.username,
            role : isUser.role
         },process.env.JWT_SECRET_KEY,{
            expiresIn : "1d"
         }) 

         res.status(200).json({
            success : true,
            message : "User login successfully",
            accessToken
         })

     }
     catch(err){
        console.log("Login error ",err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
     }
}

const authController = {
    register,
    login
}

module.exports = authController;