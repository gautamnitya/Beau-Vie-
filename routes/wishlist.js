const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');

// Add to Wishlist
router.post('/', wishlistController.addToWishlist);

// Get Wishlist by User
router.get('/:userId', wishlistController.getWishlistByUser);

// Remove from Wishlist
router.delete('/', wishlistController.removeFromWishlist);

module.exports = router;
