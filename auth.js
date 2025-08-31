const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password, fcmToken } = req.body;
  try {
    const user = new User({ email, password, fcmToken });
    await user.save();
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user._id, email } });
  } catch (err) {
    res.status(400).json({ message: 'User exists' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password, fcmToken } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  if (fcmToken) {
    user.fcmToken = fcmToken;
    await user.save();
  }
  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token, user: { id: user._id, email } });
});

module.exports = router;
