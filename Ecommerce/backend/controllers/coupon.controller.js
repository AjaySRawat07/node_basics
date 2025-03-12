const couponModel = require("../models/coupon.model");

const applyCoupon = async(req,res) =>{
    try{
        if(!req.body.code || !req.body.discountPercentage || !req.body.maxDiscountInRupees || !req.body.active){
            res.status(500).json({ message : "Input feilds are required"});
        }
        else{
       await couponModel.create(req.body)
        res.json({
        success : true,
        message : "Coupon apply successfully"
        })
        }
    }
    catch(error){
        console.error("Error while appling coupon");
    }
}

const couponController = {
    applyCoupon
}

module.exports = couponController;