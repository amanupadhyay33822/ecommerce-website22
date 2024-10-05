const mongoose = require('mongoose');

// Define the User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
    },
    password: {
        type: String,
        required: true,
        min: [5, 'Password must be at least 5 characters long'], 
    },
    image:{
        type:String,
        required:true
    },
    additionalDetails: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Profile"
    },
    wishlist: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      ],
   
}, { timestamps: true });

// Export the User model
module.exports = mongoose.model('User', userSchema);
