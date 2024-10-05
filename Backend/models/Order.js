const mongoose = require("mongoose");

// Define the Order Schema
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model (who placed the order)
    },
    cartId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CartSummary", // Reference to the User model (who placed the order)
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product", // Reference to the Product model
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1, // Default quantity is 1
        },
        price: {
          type: Number,
          required: true, // Store the price at the time of order
        },
      },
    ],
    shippingAddress: {
      address: { type: String,},
      city: { type: String,},
      zipCode: { type: String },
      country: { type: String },
      state: { type: String,},
    },
    paymentMethod: {
      type: String,
      enum: ["Credit Card", "PayPal", "Stripe", "Cash on Delivery"],
  
    },
    couponCode: {
      type: String, // Field for the coupon code
       // Optional if not every order uses a coupon
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    shippingMethod: {
      type: String,
      enum: ["Free Shipping", "Express Shipping", "Pick Up"],
      required: true,
      default: "Free Shipping",
    },
    shippingCost: {
      type: Number,
      required: true,
      default: 0,
    },
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
    total: {
      type: Number,
      required: true,
      min: 0, // subtotal + shippingCost
    },
    TotalItems:{
      type: Number,
      default: 0, 
    },
    orderStatus: {
      type: String,
      enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Processing",
    },
    orderedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Export the Order model
module.exports = mongoose.model("Order", orderSchema);
