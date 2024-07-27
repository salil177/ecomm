const express = require('express');
const User = require("../model/user");
const passport = require('passport');


register =  async (req, res) => {
  try {
    User.register({ username: req.body.username }, req.body.password, function (err, user) {
        if (err) {
            console.error('Error registering user:', err);
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


  module.exports = register;