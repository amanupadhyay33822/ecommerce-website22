const Cart = require("../models/CartItem");
const Order = require("../models/Order"); // Assuming Order model is in models folder
const Product = require("../models/Product");
// Create a new order


exports.createOrder = async (req, res) => {
  try {
    const { cartId } = req.body;

    // Fetch cart items based on the cartId
    const cart = await Cart.findById(cartId).populate('items.product');
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Initialize subtotal and total items count
    let subtotal = 0;
    let totalItems = 0;

    // Create an array to store products for the order
    const orderProducts = cart.items.map(item => {
      subtotal += item.product.discountedPrice * item.quantity;
      totalItems += item.quantity;

      return {
        product: item.product._id, // Store product ID
        quantity: item.quantity,
        price: item.product.discountedPrice, // Store the price at the time of order
      };
    });

    // Calculate the total (subtotal + any additional costs like shipping)
    const shippingCost = 50; // Example shipping cost (adjust as needed)
    const total = subtotal + shippingCost;

    // Create a new order with products and other details
    const order = new Order({
      user: req.user.id,
      products: orderProducts, // Array of products with their details // From the request body
      paymentMethod:  "Credit Card", // Default to COD if not provided
      subtotal,
      shippingCost,
      total,
      totalItems,
    });

    // Save the order to the database
    await order.save();

    // Return the newly created order
    return res.status(201).json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to create order", error: error.message });
  }
};


// Get all orders (admin access)
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        .populate({
          path: 'products.product',  // Path to populate only the product field
          select: 'name price images',  
          options: { slice: { images: 1 ,color:1} }     // Select specific fields to populate (name, price, etc.)
        }) // Populate user details (name, email)
        .exec(); 
        res.json(orders);
        // .populate('user', 'name email').
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to retrieve orders", error: error.message });
    }
};


// Get an order by ID
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email').populate('orderItems.product', 'name price');
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to retrieve order", error: error.message });
    }
};

// Update an order's status (admin access)
exports.updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        order.orderStatus = req.body.orderStatus || order.orderStatus;
        order.paymentStatus = req.body.paymentStatus || order.paymentStatus;

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update order", error: error.message });
    }
};

// Delete an order (admin access)
exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        await order.remove();
        res.json({ message: "Order deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete order", error: error.message });
    }
};
