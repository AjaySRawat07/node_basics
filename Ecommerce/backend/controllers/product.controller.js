const ProductModel = require("../models/product.model");
const UserModel = require("../models/user.model");

const productCreate = async (req, res) => {
  await ProductModel.create(req.body);
  res.json({
    success: true,
    message: "Product created successfully",
  });
};

const productList = async(req, res) => {
    const itemLimitation = req.query.pageSize || 10;
    const pageNo = req.query.pageNo || 3;
    const itemToSkip = (pageNo - 1) * itemLimitation; 
    const searchKey = req.query.searchKey || "";

    const searchQuery = {
       $or: [
           {
            title : new RegExp(searchKey,"gi")
           },
           {
            description : new RegExp(searchKey,"gi")
           },
           {
            tags :{ $in: [searchKey]}
           }
       ]
    }; // gi for globally-integrate
    
   const totalItem = await ProductModel.find(searchQuery).countDocuments();

   const Product =  await ProductModel
                        .find(searchQuery,{
                            title : 1,
                            price : 1,
                            thumbnail : 1,
                            tags : 1
                        })
                        .skip(itemToSkip)
                        .limit(itemLimitation)
                        
  res.json({
    success: true,
    message: "Products Listed successfully",
    total : totalItem,
    result : Product,
  });
};

const productDetail = async(req,res) =>{
    const ID = req.params.id;

    const product = await ProductModel.findById(ID);
    
    if(!product){
        res.status(404).json({
            success : true,
            message : "No product found"
        })
        return;
    }
    res.json({
        success : true,
        message : "Check Details here",
        result : product,
    })
}

const productReview = async(req,res) =>{
    const userFetchFromDB = await UserModel.findById(req.body.userId);
    await ProductModel.findByIdAndUpdate(req.body.productId,
        {
            // this for single item push seperatly 
            $push : {
                reviews : {
                    rating : req.body.reviews.rating,
                    comment : req.body.reviews.comment,
                    reviewerName : `${userFetchFromDB.firstName} ${userFetchFromDB.lastName}`,
                    reviewerEmail : userFetchFromDB.email,
                }
            }
            // for multiple item push in db use $each
        })

        res.json({
            success : true,
            message : "Review added successfully"
        })
}


const productController = {
  productCreate,
  productList,
  productDetail,
  productReview
};

module.exports = productController;
