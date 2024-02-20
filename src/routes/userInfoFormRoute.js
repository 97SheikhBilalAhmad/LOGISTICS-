// routes/userInfoFormRoute.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); // Import mongoose
const userModel = require('../models/userModel');
const addressModel = require('../models/addressModel');
const cardModel = require('../models/cardModel');
const upload = require('../middleware/fileUploadMiddleware');

router.put('/user-info/:userId', upload.single('profilePicture'), async (req, res) => {
    const { userId } = req.params;
    const { phone, addresses, cards } = req.body;

    try {
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found', alert: false });
        }

        // Update common user information for all user types
        user.phone = phone || user.phone;

        // Handle user addresses
        if (addresses && addresses.length > 0) {
            const addressIds = await Promise.all(
                addresses.map(async (address) => {
                    const newAddress = new addressModel({ ...address, userId, _id: new mongoose.Types.ObjectId() });
                    await newAddress.save();
                    return newAddress._id;
                })
            );

            user.addresses = addressIds;
        }

        // Handle user cards only for customers and service providers
        if ((user.type === 'customer' || user.type === 'serviceprovider') && cards && cards.length > 0) {
            const cardIds = await Promise.all(
                cards.map(async (card) => {
                    const newCard = new cardModel({ ...card, userId, _id: new mongoose.Types.ObjectId() });
                    await newCard.save();
                    return newCard._id;
                })
            );

            user.cards = cardIds;
        }

        // Handle file upload (if a picture is provided)
        if (req.file) {
            user.profilePicture = req.file.path;
        }

        await user.save();

        res.json({ message: 'User information updated successfully', alert: true });
    } catch (err) {
        console.error('Error updating user information:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
