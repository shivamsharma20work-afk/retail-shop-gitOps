// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { sendOTP, verifyOTP } = require('../controllers/authController');

// Routes ko controller functions se link karna
router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);

module.exports = router;