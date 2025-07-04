const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth");
const orderController = require("../controllers/orderController");

// Create an order
router.post("/create", authenticateToken, orderController.createOrder);

// Get user's orders
router.get("/", authenticateToken, orderController.getUserOrders);

// Get specific order details
router.get("/:orderId", authenticateToken, orderController.getOrderDetails);

// Cancel an order
router.delete("/:orderId/cancel", authenticateToken, orderController.cancelOrder);

module.exports = router;
