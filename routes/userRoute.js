const express = require("express");
const { loginUser, registerUser, getUserCredits, addUserCredits } = require("../controller/userController");
const { getCart, addToCart, checkoutUser, resetCart } = require("../controller/cartController");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser)
router.get("/:username/cart", getCart)
router.post("/:username/cart/add", addToCart)
router.post("/:username/cart/checkout", checkoutUser)
router.post("/:username/cart/reset", resetCart)

router.get("/:username/credits", getUserCredits)
router.post("/:username/credits/add", addUserCredits)
module.exports = router;