const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userRouter = require('./routes/user');
const productRouter = require('./routes/products');
const profileRouter = require('./routes/profile');
const cartRouter = require('./routes/cart');
const orderRouter = require('./routes/orders');
const wishListRouter = require('./routes/wishlist');
const categoryRouter = require('./routes/categories');

dotenv.config(); 

const app = express();


// Middlewares
app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json());


// routes
app.use('/api/products', productRouter);
app.use('/api/user', userRouter);
app.use('/api/profile', profileRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', orderRouter);
app.use('/api/wishlist', wishListRouter);
app.use('/api/categories', categoryRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
