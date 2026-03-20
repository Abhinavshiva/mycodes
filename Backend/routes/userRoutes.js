const express = require('express');
const User = require('../model/userModel');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, cpass } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
      name,
      email,
      cpass
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: newUser
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


router.post('/login', async (req, res) => {
  const { email, cpass } = req.body;

  try {
    const user = await User.findOne({ email, cpass });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({
      message: 'Login successful',
      userId: user._id
    });

  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;