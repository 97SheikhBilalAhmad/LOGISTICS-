// routes/cardRoute.js
const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const cardModel = require('../models/cardModel');

// Delete card for a user
router.delete('/card/:userId/:cardId', async (req, res) => {
    const { userId, cardId } = req.params;

    try {
        // Find the user by ID
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found', alert: false });
        }

        // Check if the card ID exists in the user's cards array
        const cardIndex = user.cards.indexOf(cardId);

        if (cardIndex === -1) {
            return res.status(404).json({ message: 'Card not found for the user', alert: false });
        }

        // Remove the card ID from the user's cards array
        user.cards.splice(cardIndex, 1);

        // Save the updated user
        await user.save();

        // Delete the card from the Cards collection
        await cardModel.findByIdAndDelete(cardId);

        res.json({ message: 'Card deleted successfully', alert: true });
    } catch (err) {
        console.error('Error deleting card:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
