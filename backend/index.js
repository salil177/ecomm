const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors');
const Product = require("./model/ecom");
const PORT = process.env.PORT;
const allproducts = require("./controller/allproducts");
const register = require("./controller/register");
const passport = require("passport");
const session = require("express-session");
const User = require('./model/user');
const login = require('./controller/login');
const connectDB = require("./connectmongo");
const logout = require('./controller/logout');
const cookieParser = require('cookie-parser');
const forgetpassword = require('./controller/forgetpass');






const app = express();

app.use(cors(
  {
    origin: 'http://localhost:3000',
    credentials: true,
  }
));

app.use(express.json());


app.use(cookieParser());
app.use(session({
  secret: 'My Very First Project In',
  resave: false,
  saveUninitialized: true,
  cookie: { httpOnly: false }
}));


app.use(passport.initialize());
app.use(passport.session());

connectDB();

passport.use(User.createStrategy());


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/products', async (req, res) => {

  try {

    console.log(req.isAuthenticated());

    if( req.isAuthenticated()){
      
      const products = await Product.find();
      res.status(200).json(products);
    }
    
  } catch (error) {
    console.error('Error fetching products from MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/resetpassword/:token', async (req, res) => {
  // Implement password reset logic here using the provided token
});


app.post('/forgetpassword' , forgetpassword);

app.post('/register', register);

app.post('/login', login);

app.get('/logo  ut', logout);

app.listen(PORT,()=>{
console.log("server started");
});