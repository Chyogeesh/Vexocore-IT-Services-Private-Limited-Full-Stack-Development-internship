require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const admin = require('firebase-admin');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.FCM_SERVER_KEY))
});

app.use(cors());
app.use(express.json());

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

app.use('/auth', authRoutes);
app.use('/tasks', verifyToken, taskRoutes);

// Send push notification
const sendNotification = async (userId, message) => {
  const user = await require('./models/User').findById(userId);
  if (user.fcmToken) {
    const payload = {
      notification: { title: 'New Task', body: message },
      token: user.fcmToken
    };
    await admin.messaging().send(payload);
  }
};

app.listen(process.env.PORT || 5000, () => console.log('Server running'));
</。正

module.exports = { verifyToken, sendNotification };
