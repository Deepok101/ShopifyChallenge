const mongoose = require("mongoose");
const { Schema } = mongoose;

const Image = new Schema({
    url: { type: String },
    description: { type: String },
    belongsTo: { type: String },
    title: {type: String},
    price: {type: Number},
    realprice: {type: Number},
    discount: {type: Number},
    inventory: {type: Number}
});

module.exports = mongoose.model("image", Image);