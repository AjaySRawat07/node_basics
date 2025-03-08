const express = require("express");
const authMiddleware = require("../middleware/auth.middleware")
const isAdmin = require("../middleware/role.middleware")
const {userDashboard,adminDashboard}= require("../controllers/home.controller")


const router = express.Router();

router.post("/user",authMiddleware,userDashboard);

router.post("/admin",authMiddleware,isAdmin,adminDashboard)

module.exports = router;