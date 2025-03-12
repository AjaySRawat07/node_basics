const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    num: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0, // Prevents negative prices
    },
    discountPercentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100, // Ensures valid discount range
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    stock: {
      type: Number,
      required: true,
      min: 0, // Prevents negative stock values
    },
    tags: {
      type: [String],
      default: [], // Ensures no undefined errors
    },
    brand: {
      type: String,
      required: true,
    },
    sku: {
      type: String,
      required: true,
      unique: true, // Ensures uniqueness
      trim: true,
    },
    weight: {
      type: Number,
      min: 0, // Ensures weight cannot be negative
    },
    dimensions: {
      type: Object,
      properties: {
        width: { type: Number, min: 0 },
        height: { type: Number, min: 0 },
        depth: { type: Number, min: 0 },
      },
      default: {}, // Avoids undefined errors
    },
    warrantyInformation: {
      type: String,
      default: "No warranty provided.",
    },
    shippingInformation: {
      type: String,
    },
    availabilityStatus: {
      type: String,
      enum: ["In Stock", "Out of Stock", "Limited Stock"],
      required: true,
    },
    reviews: [
      {
        rating: Number,
        comment: String,
        date: Date,
        reviewerName: String,
        reviewerEmail: String,
      },
    ],
    returnPolicy: {
      type: String,
      default: "No return policy available.",
    },
    minimumOrderQuantity: {
      type: Number,
      required: true,
      min: 1, // Ensures at least one item per order
    },
    meta: {
      type: Object,
      default: {}, // Avoids undefined values
    },
    images: {
      type: [String],
      default: [], // Ensures it's always an array
    },
    thumbnail: {
      type: String,
    },
  },
  { timestamps: true } // Adds createdAt & updatedAt automatically
);

const ProductModel = mongoose.model("products", productSchema);

module.exports = ProductModel;
