const jobModel = require("../model/job.model");


const jobCreate = async(req,res)=> {
    try{
        console.log(req.body);
        //Insert data into db
        const jobObj = {
            ...req.body,
            isVacant : true
        }

        const response = await jobModel.create(jobObj);
        console.log(response);

        res.json({
            success : true,
            message : `Job Created Successfully with id ${response._id}` 
        })
    }
    catch(err){
        console.log("ERROR WHILE CREATING JOB POST : ",err);
    }
}

const jobList = async(req,res)=>{

   try{
    const response = await jobModel.find({});
        let userMap = {};

        response.forEach((user)=>{
            userMap[user._id] = user;
        });

    res.json({
        success : true,
        message : "Job detail get successfully",
        data : userMap,
    })
   }
   catch(err){
    res.status(500).json({
        success : false,
        message : "Error Retrieving Job Details",
        err : err.message,
    })
   }
}

const jobEdit = async(req,res)=>{
    const title = { title  : "Frontend Developer"};
    const update = {location : "Delhi"};

    const edit = await jobModel.findOneAndUpdate(title , update);

    res.json({
        success : true,
        message : "Job edit successfully",
        data : edit,
    })
}

const jobDelete = async(req,res)=>{

    const findTitle = { title : "Galti sE "}

    const remove = await jobModel.findOneAndDelete(findTitle);

    res.json({
        success : true,
        message : "Job deleted successfully",
        data : remove,
    })
}

const jobController = {
    jobList,
    jobCreate,
    jobDelete,
    jobEdit
}

module.exports = jobController;