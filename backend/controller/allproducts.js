const express = require('express');
const Product = require("../model/ecom");
const app = express();



allproducts = app.get('/products', async (req, res) => {

  try {
    if(req.isAuthenticated()){
      const products = await Product.find();
      res.status(200).json(products);
    }
    
  } catch (error) {
    console.error('Error fetching products from MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports =  allproducts;
