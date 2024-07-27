const express = require('express');

const app = express();


const logout = function(req, res) {
    // Assuming you have configured Passport.js in your application
    req.logout(function(err) {
      if (err) {
        return res.status(500).json({ message: 'Error during logout' });
      }
  
      req.session.destroy(function(err) {
        if (err) {
          return res.status(500).json({ message: 'Error destroying session' });
        }
  
        res.clearCookie('connect.sid'); 
        return res.status(200).json({ message: 'Logout successful' });
      });
    });
  };
  
  module.exports = logout;
  

module.exports = logout;

