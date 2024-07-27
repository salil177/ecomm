const express = require('express');
const User = require('../model/user');
const nodemailer = require("nodemailer");
const crypto = require('crypto');

// Route to handle forget password request
const forgetpassword = async (req, res) => {
    const { username } = req.body;

    // Find the user by username (you might want to use email instead)
    const user = await User.findOne({ username });

    console.log(user);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Generate a unique token using crypto
    const resetToken = crypto.randomBytes(32).toString('hex');

    // Save the token in the user document (you need a field for this in your User model)
    user.resetToken = resetToken;

    console.log(resetToken);
    await user.save();

    // Configure nodemailer for Gmail
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
          user: 'chaudharysalil17@gmail.com',
          pass: process.env.PASSWORD
      },
    });

    const resetLink = `http://localhost:3000/resetpassword/${resetToken}`;
    const mailOptions = {
        from: 'chaudharysalil17@gmail.com',
        to: user.username,
        subject: 'Password Reset',
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.error(error);  // Log the specific error
          return res.status(500).json({ message: 'Error sending email' });
      }
      res.status(200).json({ message: 'Password reset email sent' });
  });
  
};

// Additional route to handle password reset

module.exports = forgetpassword;
