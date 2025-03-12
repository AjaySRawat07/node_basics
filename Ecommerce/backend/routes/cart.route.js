const express = require("express");
const {cartItem,cartDetail , cartChangeQty} = require("../controllers/cart.controller");

const router = express.Router();

router.post("/add",cartItem);

router.post("/updateQty",cartChangeQty);

// todo
router.get("/detail",cartDetail);

module.exports = router;