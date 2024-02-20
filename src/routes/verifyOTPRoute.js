// routes/verifyOTPRoute.js
const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');

router.post('/verify-otp', async (req, res) => {
  const { email,otp } = req.body;

  try {
    const user = await userModel.findOne({ email,otp });

    if (!user) {
      return res.status(401).json({ message: "user not found ", alert: false });
    }

    // TODO: You might want to add additional checks (e.g., OTP expiry)

    res.json({ message: "OTP verified successfully", alert: true });
  } catch (err) {
    console.error('Error in verify OTP route:', err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
