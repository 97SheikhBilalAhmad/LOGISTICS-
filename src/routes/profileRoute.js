// routes/profileRoute.js
const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');

// Get user details for profile screen
router.get('/profile/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await userModel.findById(userId).populate('addresses').populate('cards');

        if (!user) {
            return res.status(404).json({ message: 'User not found', alert: false });
        }

        // Respond with the user details
        const userProfile = {
            fullName: `${user.firstName} ${user.lastName}`,
            email: user.email,
            phone: user.phone,
            cardDetails: [],
            addresses: [],
            profilePicture: user.profilePicture,
        };

        // Add all card details to the response
        if (user.cards && user.cards.length > 0) {
            userProfile.cardDetails = user.cards.map(card => ({
                bankName: card.bankName,
                cardholderName: card.cardholderName,
                accountNumber: card.accountNumber,
                IBAN: card.IBAN,
                expiryDate: card.expiryDate,
            }));
        }

        // Add all address details to the response
        if (user.addresses && user.addresses.length > 0) {
            userProfile.addresses = user.addresses.map(address => ({
                location: address.location,
                // Add other address details as needed
            }));
        }

        res.json({ user: userProfile, alert: true });
    } catch (err) {
        console.error('Error fetching user details:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
