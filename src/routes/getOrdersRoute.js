// routes/getOrdersRoute.js
const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const orderModel = require('../models/orderModel');

// Get specific information for orders related to a service provider user
router.get('/get-orders/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        // Find the user by ID
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found', alert: false });
        }

        // Check if the user is a service provider
        if (user.type !== 'serviceprovider') {
            return res.status(400).json({ message: 'User is not a service provider', alert: false });
        }

        // Populate the orders for the service provider with specific fields
        const serviceProviderOrders = await userModel
            .findById(userId)
            .populate({
                path: 'orders',
                select: 'orderDate orderDetails.itemName orderDetails.deliveryRoute.destinationsAddress -_id',
                populate: {
                    path: 'userId',
                    select: 'firstName lastName -_id',
                },
            });

        if (!serviceProviderOrders) {
            return res.status(404).json({ message: 'Orders not found for the service provider', alert: false });
        }

        const orders = serviceProviderOrders.orders;

        res.json({ orders, alert: true });
    } catch (err) {
        console.error('Error fetching service provider orders:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
