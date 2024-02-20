// routes/deleteRoute.js

const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');

// Delete user account
router.delete('/delete-account/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found', alert: false });
        }

        // Perform any additional cleanup or validation before deleting the user

        // Updated: Use the deleteOne method to remove the user
        await userModel.deleteOne({ _id: userId });

        res.json({ message: 'User account deleted successfully', alert: true });
    } catch (err) {
        console.error('Error deleting user account:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
