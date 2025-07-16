const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');
const authenticateToken = require("../middleware/auth");

// Add to Wishlist
router.post('/',authenticateToken, wishlistController.addToWishlist);

// Get Wishlist by User
router.get('/:userId',authenticateToken, wishlistController.getWishlistByUser);

// Remove from Wishlist
router.delete('/',authenticateToken, wishlistController.removeFromWishlist);

module.exports = router;
