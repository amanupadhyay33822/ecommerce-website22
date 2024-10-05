const Cart = require("../models/CartItem"); // Import the Cart model
const Product = require("../models/Product"); // Import the Product model

// Add item to cart
exports.addItemToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id; // Assuming user ID is available from auth middleware

        // Find the product details
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Calculate price and subtotal
        const price = product.discountedPrice; // Assuming price is available in the product model
        const subtotal = price * quantity;

        // Find or create a cart for the user
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            // Create a new cart if none exists
            cart = new Cart({
                user: userId,
                items: [{ product: productId, price, quantity, subtotal }],
                totalItems: quantity,
                totalPrice: subtotal
            });
        } else {
            // // Check if the product is already in the cart
            // const existingItem = cart.items.find(
            //     (item) => item.product.toString() === productId // Check only the product ID
            // );

            // if (existingItem) {
            //     // Return a message indicating that the item is already in the cart
            //     return res.status(400).json({ message: "This product is already in the cart." });
            // }

            // If the product is not in the cart, add new item to the cart
            cart.items.push({ product: productId, price, quantity, subtotal });

            // Recalculate totalItems and totalPrice
            cart.totalItems = cart.items.reduce(
                (sum, item) => sum + item.quantity,
                0
            );
            cart.totalPrice = cart.items.reduce(
                (sum, item) => sum + item.subtotal,
                0
            );
        }

        // Save the cart
        await cart.save();

        return res.status(200).json({
            success: true,
            cart
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is available from auth middleware

    // Find the cart for the user and populate product details
    const cart = await Cart.findOne({ user: userId }).populate({
      path: "items.product items.price",
      select: "name color discountedPrice images",
      options: { slice: { images: 1 ,color:1} }, // Limit image field to first image only
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart is empty" });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    // Find the user's cart
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the item in the cart
    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );
    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    // Update the quantity and subtotal
    item.quantity = quantity;
    item.subtotal = item.price * item.quantity;

    // Recalculate totalItems and totalPrice
    cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    cart.totalPrice = cart.items.reduce((sum, item) => sum + item.subtotal, 0);

    // Save the updated cart
    await cart.save();

    res.status(200).json({ message: "Cart updated", cart });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

exports.removeCartItem = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    // Find the user's cart
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    if(cart.items.length ==0){
        return res.status(500).json({
            success: false,
            message: "No item in cart found",
        });
    }
    // Remove the item from the cart
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    // Recalculate totalItems and totalPrice
    cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    cart.totalPrice = cart.items.reduce((sum, item) => sum + item.subtotal, 0);

    // Save the updated cart
    await cart.save();

    res.status(200).json({ message: "Item removed from cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};
exports.clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find the user's cart
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Clear all items in the cart
    cart.items = [];
    cart.totalItems = 0;
    cart.totalPrice = 0;

    // Save the cleared cart
    await cart.save();

    res.status(200).json({ message: "Cart cleared", cart });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};
