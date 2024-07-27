const mongoose = require('mongoose');
require("dotenv").config();


const { Schema } = mongoose;

const ProductSchema = new Schema({
  title: String,
  price: {type: Number},
});

 Product = mongoose.model('Product', ProductSchema);

 module.exports = Product;