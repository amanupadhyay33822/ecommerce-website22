const mongoose = require('mongoose');

// Define the Review Schema
const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",  // Reference to the User who submitted the review
        required: true
    },
    rating: {
        type: Number,
        min: 1,  // Minimum rating of 1
        max: 5,  // Maximum rating of 5
        required: true
    },
    comment: {
        type: String,  // Optional comment for the review
    },
    createdAt: {
        type: Date,
        default: Date.now  // Automatically set the date when the review is created
    }
}, { timestamps: true });

// Export the Review model
module.exports = mongoose.model('Review', reviewSchema);
