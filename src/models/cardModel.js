// models/cardModel.js
const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  cardholderName: {
    type: String,
    required: false,
  },
  accountNumber: {
    type: String,
    required: false,
  },
  IBAN: {
    type: String,
    required: false,
  },
  expiryDate: {
    type: String,
    required: true,
  }
  
  // Add other card fields as needed
});

const CardModel = mongoose.model('Cards', CardSchema);

module.exports = CardModel;
