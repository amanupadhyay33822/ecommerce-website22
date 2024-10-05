const express = require('express');
const router = express.Router();
const { getCart, updateCartItem, removeCartItem, clearCart, addItemToCart } = require('../controllers/cart');
const { auth } = require('../middleware/auth');

// Add product to cart
router.post('/add', auth,addItemToCart);

// Get user's cart
router.get('/get',auth, getCart);
router.put('/update', updateCartItem);
router.delete('/remove',removeCartItem);
router.delete('/clear',auth, clearCart);

module.exports = router;
