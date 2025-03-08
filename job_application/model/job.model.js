const mongoose = require("mongoose");

const jobSchemaDetails = {
    title : {
        type : String,
        required  : true,
    },
    description : {
        type : String,
        required  : true,
    },
    location : {
        type : String,
        required  : true,
    },
    skills : {
        type : [String],
        required  : true,
    },
    minExperienceRequired : {
        type : Number,
        required  : true,
    },
    salary : {
        type : Number,
        required  : true,
    },
    isVacant : {
        type : Boolean
    }
}


const jobSchema = mongoose.Schema(jobSchemaDetails);

const jobModel = mongoose.model("jobs",jobSchema);

module.exports = jobModel;
 