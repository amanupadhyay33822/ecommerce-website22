const mongoose = require('mongoose');

// Define the CartItem Schema
const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',  // Reference to the Product model
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0  // Price at the time of adding to cart (discounted or original)
    },
    color: {
        type: [String],
       // Store the selected color
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,  // Quantity should be at least 1
        default: 1
    },
    subtotal: {
        type: Number,
        required: true,
        min: 0  // Subtotal = price * quantity
    },
    addedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

// Define the Cart Schema
const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Reference to the User model
        required: true
    },
    items: [cartItemSchema],  // Array of cart items
    totalItems: {
        type: Number,
        default: 0  // Automatically calculated based on cart items
    },
    totalPrice: {
        type: Number,
        default: 0  // Automatically calculated based on cart items' subtotal
    }
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);
