const express = require("express");
const productController = require("../controllers/product.controller");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();

router.post("/create", roleMiddleware("SELLER","ADMIN") , productController.productCreate);

router.get("/list", roleMiddleware("CUSTOMER","ADMIN"), productController.productList);

router.get("/:id", roleMiddleware("CUSTOMER","ADMIN") ,productController.productDetail);

router.post("/review/detail", roleMiddleware("CUSTOMER","ADMIN"),  productController.productReview);



module.exports = router;
