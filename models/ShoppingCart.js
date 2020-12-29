const mongoose = require("mongoose");
const { Schema } = mongoose;

const ShoppingCart = new Schema({
    images : [{type: mongoose.Types.ObjectId, ref: 'image'}]
});

module.exports = mongoose.model("shoppingcart", ShoppingCart);