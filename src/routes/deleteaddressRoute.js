// routes/addressRoute.js
const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const addressModel = require('../models/addressModel');

// Delete address for a user
router.delete('/address/:userId/:addressId', async (req, res) => {
    const { userId, addressId } = req.params;

    try {
        // Find the user by ID
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found', alert: false });
        }

        // Check if the address ID exists in the user's addresses array
        const addressIndex = user.addresses.indexOf(addressId);

        if (addressIndex === -1) {
            return res.status(404).json({ message: 'Address not found for the user', alert: false });
        }

        // Remove the address ID from the user's addresses array
        user.addresses.splice(addressIndex, 1);

        // Save the updated user
        await user.save();

        // Delete the address from the Addresses collection
        await addressModel.findByIdAndDelete(addressId);

        res.json({ message: 'Address deleted successfully', alert: true });
    } catch (err) {
        console.error('Error deleting address:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
