const mongoose = require("mongoose");
const cartModel = require("../models/cart.model");


const cartItem = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.body.userId)) {
            return res.status(400).json({ success: false, message: "Invalid userId format" });
        }


        // Check if user already has a cart
        let cartForUser = await cartModel.findOne({ userId: req.body.userId });
    
        if (cartForUser) {
            const newProductAdd = req.body.products.map((product) => {
                if (!mongoose.Types.ObjectId.isValid(product.productId)) {
                    throw new Error(`Invalid productId: ${product.productId}`);
                }
                return {
                    productId: new mongoose.Types.ObjectId(product.productId), // Convert to ObjectId
                    qty: product.qty
                };
            });

            // if product already exist in the card
            const existingProduct = cartForUser.products.find(
                (product) => product.productId.toString() === req.body.products[0].productId
                )

            if(existingProduct){
                await cartModel.updateOne({
                    userId : req.user._id,
                    "products.productId": req.body.products[0].productId
                },{
                    $inc : {"products.$.qty" : req.body.products[0].qty}
                })
            }
            else{
                await cartModel.findByIdAndUpdate(  cartForUser._id,
                    { $push: { products: { $each: newProductAdd } } },
                    { new: true }
                );
            }

            if (!cartForUser) {
                return res.status(500).json({ success: false, message: "Failed to update cart" });
            }
            
        } else {
            // If the Cart Does NOT Exist, Create One
            const productsWithValidIds = req.body.products.map((product) => {
                if (!mongoose.Types.ObjectId.isValid(product.productId)) {
                    throw new Error(`Invalid productId: ${product.productId}`);
                }
                return {
                    productId: new mongoose.Types.ObjectId(product.productId),
                    qty: product.qty
                };
            });

            const objectToInsert = {
                products: productsWithValidIds,
                userId: new mongoose.Types.ObjectId(req.user._id),
            };

            cartForUser = await cartModel.create(objectToInsert);
        }

        res.status(200).json({
            success: true,
            message: "Item added successfully",
            cart: cartForUser
        });
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
};

const cartChangeQty = async (req, res) => {
    try {
        const updatedCart = await cartModel.updateOne(
            {
                userId: req.body.userId, // Ensure we're updating the correct user's cart
                "products.productId": req.body.products[0].productId // Match the correct product
            }, 
            {
                $inc: { "products.$.qty": req.body.products[0].qty } // Update quantity correctly
            }
        );

        if (updatedCart.modifiedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Product not found in cart or quantity unchanged"
            });
        }

        res.json({
            success: true,
            message: "Cart updated successfully"
        });
    } catch (error) {
        console.error("Error updating cart quantity:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};


const cartDetail = (req,res) =>{
    res.json({
        success : true,
        message : "2 product in cart"
    })
}

const cartController = {
    cartItem,
    cartDetail,
    cartChangeQty,
}

module.exports = cartController;