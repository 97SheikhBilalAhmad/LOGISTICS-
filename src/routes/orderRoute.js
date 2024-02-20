// routes/orderRoute.js
const express = require('express');
const router = express.Router();
const OrderModel = require('../models/orderModel');
const userModel = require('../models/userModel');

router.post('/place-order/:userId', async (req, res) => {
  const { userId } = req.params;
  const {
    itemName,
    parcelQuantity,
    totalWeight,
    pickUpTime,
    comment,
    fullName,
    mobileNumber,
    yourAddress,
    destinationsAddress,
    productPhoto,
  } = req.body; 
console.log(userId)
  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found', alert: false });
    }

    // Create a new order
    const newOrder = new OrderModel({
      userId: user._id,
      orderDetails: {
        itemName,
        parcelQuantity,
        totalWeight,
        pickUpTime,
        comment,
        recipientInfo: {
          fullName,
          mobileNumber,
        },
        deliveryRoute: {
          yourAddress,
          destinationsAddress,
          productPhoto,
        },
      },
    });

    // Save the order to the database
    await newOrder.save();

    // Update user's orders array
    user.orders.push(newOrder);

    // Save the updated user to the database
    await user.save();

    res.json({ message: 'Order placed successfully', alert: true, order: newOrder });
  } catch (err) {
    console.error('Error placing order:', err);
    res.status(500).json({ message: 'Internal Server Error'+err.message });
  }
});

module.exports = router;
