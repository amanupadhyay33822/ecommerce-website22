const express = require('express');
const { updateProfile, deleteAccount, getAllUserDetails } = require('../controllers/Profile');
const router = express.Router();

const { auth } = require("../middleware/auth")
// Update user profile route
router.delete("/deleteProfile", auth, deleteAccount)
router.put("/updateProfile", auth, updateProfile)
router.get("/getUserDetails", auth, getAllUserDetails)// Assuming user ID is in the URL

module.exports = router;
