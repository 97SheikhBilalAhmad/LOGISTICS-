// routes/tenderRoute.js
const express = require('express');
const router = express.Router();
const tenderModel = require('../models/tenderModel');

// Create a new tender
router.post('/tenders', async (req, res) => {
  const { user, cargo, tenderAmount, deliveryRoute } = req.body;

  try {
    const newTender = new tenderModel({
      user,
      cargo,
      tenderAmount,
      deliveryRoute,
    });

    const savedTender = await newTender.save();

    res.json({ tender: savedTender, message: 'Tender created successfully', alert: true });
  } catch (err) {
    console.error('Error creating tender:', err);
    res.status(500).json({ message: 'Internal Server Error' +err.message});
  }
});

module.exports = router;
