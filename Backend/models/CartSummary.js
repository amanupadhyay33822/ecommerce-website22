const mongoose = require('mongoose');

// Define the Cart Summary Schema
const cartSummarySchema = new mongoose.Schema({
    items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CartItem',  // Reference to CartItem model
            required: true
        }
    ],
    subtotal: {
        type: Number,
        required: true,
        min: 0,  // Sum of the items' subtotals
        default: 0
    },
    shippingMethod: {
        type: String,
        enum: ['Free Shipping', 'Express Shipping', 'Pick Up'],  // Define shipping options
        default: 'Free Shipping'
    },
    shippingCost: {
        type: Number,
        required: true,
        default: 0  // Set default shipping cost (e.g., free shipping = $0)
    },
    total: {
        type: Number,
        required: true,
        min: 0  // Subtotal + shippingCost
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

// Export the Cart Summary model
module.exports = mongoose.model('CartSummary', cartSummarySchema);
