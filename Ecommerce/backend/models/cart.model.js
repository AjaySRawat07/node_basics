const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    products: [
        {
            productId: {
                type: mongoose.Types.ObjectId,
                required: true,
                ref: "products"
            },
            qty: {
                type: Number,
                required: true,
                default: 1,
            }
        }
    ],
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "users"
    }
},{ timestamps : true });

const cartModel = mongoose.model("carts", cartSchema);

module.exports = cartModel;
