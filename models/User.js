const mongoose = require("mongoose");
const { Schema } = mongoose;

const User = new Schema({
    username : {type: String, required: true},
    password: {type: String, required: true},
    shoppingcart: {
      images: [{type: mongoose.Types.ObjectId, ref: 'image'}],
      total: {type: Number, required: true}
    },
    credits: {type: Number}
});

module.exports = mongoose.model("user", User);