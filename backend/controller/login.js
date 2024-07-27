const express = require('express');
const User = require("../model/user");
const passport = require('passport');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());


const login = async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });

    // Set your custom cookie here
  

    req.login(user, function (err) {
      if (err) {  
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      passport.authenticate('local')(req, res, function () {
        res.status(200).json({ message: 'Authentication successful' });
      });
      
      
    });
  } catch (error) {
    console.error('Error saving product:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = login;
