const express = require("express");
const router = express.Router();
const productController = require('../controllers/productController');

// Route: GET /products
router.get('/', productController.getProducts);

// Route: GET /products/category/:categoryId/subcategory/:subcategoryId
router.get('/category/:categoryId/subcategory/:subcategoryId', productController.getByCategoryAndSubcategory);

module.exports = router;
