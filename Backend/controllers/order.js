const Cart = require("../models/CartItem");
const CartSummary = require("../models/CartSummary");
const Order = require("../models/Order"); // Assuming Order model is in models folder
const Product = require("../models/Product");
// Create a new order

exports.placeOrder = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      streetAddress,
      country,
      townCity,
      state,
      zipCode,
      cardNumber,
      expirationDate,
      cvvCode,
      cartItems,
      totalPrice,
      paymentMethod
    } = req.body;

    // Validate request body
    if (
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !email ||
      !streetAddress ||
      !country ||
      !townCity ||
      !state ||
      !zipCode ||
      !cardNumber ||
      !expirationDate ||
      !cvvCode ||
      !cartItems ||
      !paymentMethod || 
      totalPrice === undefined // Using `undefined` to also check for 0
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new order
    const newOrder = new Order({
      firstName,
      lastName,
      phoneNumber,
      email,
      streetAddress,
      country,
      townCity,
      state,
      zipCode,
      cardNumber,
      expirationDate,
      cvvCode,
      cartItems,
      totalPrice,
      paymentMethod
    });

    // Save the order to the database
    const savedOrder = await newOrder.save();

    // Return the saved order in response
    return res.status(201).json({
      message: "Order placed successfully!",
      order: savedOrder,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get all orders (admin access)
// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate({
      path:"cartItems",
      select:"images",
      options: { slice: { images: 1} },
    })
    return res.status(200).json(orders);
  } catch (error) {
    console.error('Error retrieving orders:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};




// Get an order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("orderItems.product", "name price");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to retrieve order", error: error.message });
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
    res
      .status(500)
      .json({ message: "Failed to update order", error: error.message });
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
    res
      .status(500)
      .json({ message: "Failed to delete order", error: error.message });
  }
};

exports.checkoutOrder = async (req, res) => {
  try {
    const { items, shippingCost, subtotal } = req.body;
    const total = subtotal + shippingCost;

    const newCartSummary = new CartSummary({
      items,
      shippingCost,
      subtotal,
      total,
    });

    // Save to the database
    const savedSummary = await newCartSummary.save();
    return res.status(200).json({
      success: true,
      savedSummary,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getCartSummary = async (req, res) => {
  try {
    const orderSummary = await CartSummary.find({}).populate().exec();
    orderSummary.map((item) => {
      console.log(item.items[0]);
    }); // Populate items to get detailed information
    res.status(200).json(orderSummary);
  } catch (error) {
    console.error("Error fetching order summary:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
