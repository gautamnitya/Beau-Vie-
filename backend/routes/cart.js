const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth");
const cartController = require("../controllers/cartController");

// Add to cart
router.post('/add', authenticateToken, cartController.addToCart);

// Get cart
router.get('/', authenticateToken, cartController.getCart);

// Update quantity
router.put('/update', authenticateToken, cartController.updateCart);

// Remove product
router.delete('/remove/:productId', authenticateToken, cartController.removeFromCart);

module.exports = router;
