// routes/forgetPasswordRoute.js
const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const generateOTP = require('../utils/generateOTP');
const sendEmail = require('../utils/sendEmail');

router.post('/forget-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Email not found", alert: false });
    }

    // Generate and save a new OTP to the user document
    const newOTP = generateOTP();
    console.log('Generated new OTP for forget password:', newOTP);

    user.otp = newOTP;
    await user.save();

    // Send the new OTP to the user's email
    const emailSubject = 'Forget Password OTP';
    const emailBody = ` ${newOTP}`;
    await sendEmail(user.email, emailSubject, emailBody);

    res.json({ message: "New OTP for forget password sent successfully", alert: true });
  } catch (err) {
    console.error('Error in forget password route:', err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
