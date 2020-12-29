const express = require("express");
const { loginUser, registerUser } = require("../controller/userController");
const { getCart, addToCart } = require("../controller/cartController");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser)
router.post("/cart", getCart)
router.post("/cart/add", addToCart)

module.exports = router;