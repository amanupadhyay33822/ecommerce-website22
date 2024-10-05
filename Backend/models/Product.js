const mongoose = require("mongoose");

// Define the Product Schema
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    originalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    discountedPrice: {
      type: Number,
      min: 0,
      validate: {
        validator: function (value) {
          return value < this.originalPrice; // discounted price should be less than original price
        },
        message: "Discounted price should be less than the original price",
      },
    },
    
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    images: {
      type: [String], // This should be an array of strings
      required: true,
    },
    packaging: {
      width: { type: String }, // Width of the package (e.g., '20 "')
      height: { type: String }, // Height of the package (e.g., '1 1/2 "')
      length: { type: String }, // Length of the package (e.g., '21 h "')
      weight: { type: String }, // Weight of the package (e.g., '7 lb 8 oz')
      packages: { type: Number, default: 1 }, // Number of packages (default is 1)
    },
    details: {
      type: String,
      trim: true,
    },
    questions: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        question: { type: String, required: true },
        answer: { type: String },
      },
    ],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
      },
    ],
    color: {
      type: [String],
        // Array to support multiple color options
  },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
    
  },
  { timestamps: true }
);

// Export the Product model
module.exports = mongoose.model("Product", productSchema);
