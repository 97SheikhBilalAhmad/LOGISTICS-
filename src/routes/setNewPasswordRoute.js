// routes/setNewPasswordRoute.js
const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');

router.post('/set-new-password', async (req, res) => {
  const { email,newPassword, confirmPassword } = req.body;

  try {
    // Validate if newPassword and confirmPassword match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match", alert: false });
    }

    const user = await userModel.findOneAndUpdate(
      { email },
      { password: newPassword },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found", alert: false });
    }

    res.json({ message: "Password changed successfully", alert: true });
  } catch (err) {
    console.error('Error in set new password route:', err);
    res.status(500).json({ message: "plzzz fill all fileds" });
  }
});

module.exports = router;
