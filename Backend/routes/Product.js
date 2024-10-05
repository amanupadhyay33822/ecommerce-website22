const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  addToWishlist,
  getWishlist,
} = require("../controllers/Product");
const { auth } = require("../middleware/auth");

// Create a new product
router.post("/create", auth,upload.array('images'),createProduct);

// Get all products
router.get("/get", getAllProducts);

// Get a single product by ID
router.get("/get/:productId", getProductById);

// Update a product by ID
router.put("/products/:productId", updateProduct);

// Delete a product by ID
router.delete("/products/:productId", deleteProduct);

router.post("/addToWishlist", auth, addToWishlist);

router.get("/wishlist", auth, getWishlist);

module.exports = router;
