const { imageUploadUtil } = require("../helper/cloudinary");
const Product = require("../models/Product"); // Import your Product model
const User = require("../models/User");


exports.handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    // Assuming `result` contains the URL of the uploaded image
    const newProduct = new Product({
      // other fields
      images: [{ url: result }], // Store as an object
    });

    await newProduct.save();

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occurred",
    });
  }
};


// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, originalPrice, discountedPrice, stock, category ,color,description ,} = req.body;

    // Validate input
    if (!name || !originalPrice || !discountedPrice || !category || !stock) {
      return res.status(400).json({
        success: false,
        message: "Name, original price, discounted price, category, and stock are required.",
      });
    }

    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      for (let file of req.files) {
        // Directly upload the file buffer to Cloudinary without converting to base64
        const uploadResult = await imageUploadUtil(file.buffer); // Adjust based on your upload utility
        imageUrls.push(uploadResult.secure_url); // Push the uploaded image URL to the array
      }
    }
    
    // Now, you can assign the imageUrls to the product model before saving
    const product = new Product({
      name,
      originalPrice,
      discountedPrice,
      category,
      stock,
      color,
      description,
      images: imageUrls, // Save the array of image URLs to the images field in the product model
      createdBy: req.user.id,
    });
    
    // Save the product to the database
    await product.save();

    return res.status(201).json({
      success: true,
      product,
      message: "Product created successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all products
// Get all products with optional search
// Get all products with optional search and price filtering
exports.getAllProducts = async (req, res) => {
  try {
      // Extract search query, price range, and category from request
      const { search, minPrice, maxPrice, category } = req.query;

      // Create a filter object for MongoDB query
      const filter = {};

      // Case-insensitive category filtering
      if (category) {
          filter.category = { $regex: category, $options: 'i' }; // Case-insensitive regex for category
      }

      // Search functionality (name and color)
      if (search) {
          filter.$or = [
              { name: { $regex: search, $options: 'i' } },  // Case insensitive search on name
              { color: { $regex: search, $options: 'i' } }, // Case insensitive search on color
          ];
      }

      // Price range filtering
      if (minPrice || maxPrice) {
          filter.discountedPrice = {}; // Initialize discountedPrice filter
          if (minPrice) {
              filter.discountedPrice.$gte = Number(minPrice); // Greater than or equal to minPrice
          }
          if (maxPrice) {
              filter.discountedPrice.$lte = Number(maxPrice); // Less than or equal to maxPrice
          }
      }

      // Fetch products with optional filtering (search, price range, category)
      const products = await Product.find(filter);

      return res.status(200).json({
          success: true,
          products,
      });
  } catch (error) {
      console.error(error);
      return res.status(500).json({
          success: false,
          message: "An error occurred while fetching products.",
      });
  }
};


// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    // Update product fields
    const {
      name,
      originalPrice,
      discountedPrice,
      color,
      images,
      reviews,
      packaging,
    } = req.body;

    product.name = name || product.name;
    product.originalPrice = originalPrice || product.originalPrice;
    product.discountedPrice = discountedPrice || product.discountedPrice;
    product.color = color || product.color;
    product.reviews = reviews || product.reviews;
    product.packaging = packaging || product.packaging;

    // Handle image upload if an image file is present
    if (req.files && req.files.length > 0) {
      for (let file of req.files) {
        const b64 = Buffer.from(file.buffer).toString("base64");
        const url = "data:" + file.mimetype + ";base64," + b64;
        const uploadResult = await imageUploadUtil(url);
        product.images.push(uploadResult.secure_url); // Add the new image URL to the array
      }
    }

    await product.save();

    return res.status(200).json({
      success: true,
      product,
      message: "Product updated successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the product.",
    });
  }
};


// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    await Product.findByIdAndDelete(productId);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the product.",
    });
  }
};

exports.addToWishlist = async (req, res) => {
    try {
        const { productId } = req.body; // Get product ID from request body
        const userId = req.user.id; // Assuming you have user ID from authentication middleware

        // Validate input
        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required.",
            });
        }

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found.",
            });
        }

        // Find the user and update their wishlist
        const user = await User.findById(userId);

        // Check if the product is already in the wishlist
        if (user.wishlist.includes(productId)) {
            return res.status(400).json({
                success: false,
                message: "Product is already in your wishlist.",
            });
        }

        // Add product to the user's wishlist
        user.wishlist.push(productId);
        await user.save(); // Save the updated user document

        return res.status(200).json({
            success: true,
            message: "Product added to wishlist successfully.",
            wishlist: user.wishlist, // Optionally return the updated wishlist
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while adding to the wishlist.",
        });
    }
};


exports.getWishlist = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming you have user ID from authentication middleware

        // Find the user and populate the wishlist with product details
        const user = await User.findById(userId).populate('wishlist'); // Populate with product details

        // Check if user exists
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        // Return the wishlist
        return res.status(200).json({
            success: true,
            wishlist: user.wishlist,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while retrieving the wishlist.",
        });
    }
};
