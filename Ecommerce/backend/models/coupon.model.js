const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
    "code" : {
        type : String,
        required : true,
        unique : true,
    },
    "discountPercentage" : {
        type : Number,
        required : true
    },
    "maxDiscountInRupees" : {
        type : Number,
        required : true
    },
    "description" : {
        type : String,
        required : true
    },
    "validTill" : {
        type : Date,
        required : true
    },
    "maxUsedTime" : {
        type : Number,
        require : true,
    },
    "active" : {
        type : Boolean,
        required : true,
        default : "true"
    }
},{
    timestamps : true
})

const couponModel = mongoose.model("coupons",couponSchema);

module.exports = couponModel;