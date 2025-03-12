require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authMiddleware = require("./middlewares/authMiddleware");
// import routes
const userRouter = require("./routes/user.route");
const productRouter = require("./routes/product.route");
const cartRouter = require("./routes/cart.route");
const couponRouter = require("./routes/coupon.route");
const orderRouter = require("./routes/order.route");


const app = express();
const PORT = process.env.PORT_NO || 5000;
const  corsOptions = {
  origin: 'http://http://127.0.0.1:5500/'}

// global middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// using api
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product",authMiddleware ,productRouter);
app.use("/api/v1/cart",authMiddleware,cartRouter);
app.use("/api/v1/coupon",authMiddleware,couponRouter);
app.use("/api/v1/order",authMiddleware,orderRouter);

mongoose
  .connect(process.env.dbURL)
  .then(() => console.log("DB connected successfully"))
  .catch((err) => console.log("Error DB connection : ", err));

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
