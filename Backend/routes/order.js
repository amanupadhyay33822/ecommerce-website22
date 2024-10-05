const express = require("express");
const router = express.Router();
const { createOrder, getAllOrders, getOrderById, updateOrderStatus, deleteOrder } = require("../controllers/order");
const { isAuthenticatedUser, authorizeRoles, auth } = require("../middleware/auth"); // Assuming these middleware exist for authentication and role management

// Route to create a new order (user authenticated)
router.post("/create", auth, createOrder);

// Route to get all orders (admin access)
router.get("/get", auth,  getAllOrders);

// Route to get an order by ID (user or admin)
router.get("/orders/:id", auth, getOrderById);

// Route to update order status (admin access)
router.put("/orders/:id", auth, updateOrderStatus);

// Route to delete an order (admin access)
router.delete("/orders/:id", auth,  deleteOrder);

module.exports = router;
