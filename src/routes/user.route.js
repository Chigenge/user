const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const { requireAuth } = require('../middleware/auth.middleware');
//const { sendPasswordResetEmail } = require('../email/passwordReset');

router.post("/User", async (req, res) => {
  const newUser = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };

  const user = new User(newUser);
  user.save();

  return res.status(201).json({
    success: true,
    user,
  });
  try {
  } catch (error) {
    throw new error(`error creating a user ${error.message}`);
  }
});

//Register a new user
router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error registering new user');
  }
});

// User Login
router.post('/login', async(req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.authenticate(email, password);
    req.session.userId = user._id;
    res.redirect('/profile');
  } catch (error) {
    cosole.error(error);
    res.status(401).send('Invalid email or password');
  }
});

//User Profile
router.get ('/profile', requireAuth, async (req, res) => {
  res.render('profile');
});

// Update user profile
router.post('/profile', requireAuth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.session.userId,
      req.body,
      { new: true}
    );
    res.redirect('/profile');
  } catch (error) {
    console.error (error);
    res.status(500).send('Error updating user profile');
  }
})

// send password reset email
router.post('/forgot-password', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email});  
  } catch (error) {
  console.error (error);
  res.status(500).send('Error updating user profile');
  
}
})
module.exports = router;

