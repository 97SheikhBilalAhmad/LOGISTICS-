// models/tenderModel.js
const mongoose = require('mongoose');

const TenderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users', // Reference to the User model
    required: true,
  },
  cargo: {
    itemName: { type: String, required: true },
    outerPacking: { type: String, required: true },
    totalWeight: { type: Number, required: true },
    HSCode: { type: String, required: true },
    description: { type: String, required: true },
  },
  tenderAmount: {
    minAmount: { type: Number, required: true },
    offerAmount: { type: Number, required: true },
    maxOfferAmount: { type: Number, required: true },
  },
  deliveryRoute: {
    originalAddress: { type: mongoose.Schema.Types.ObjectId, ref: 'Addresses', required: true },
    destinationAddresses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Addresses', required: true }],
    productPic: { type: String, required: true },
  }
  
});

const TenderModel = mongoose.model('Tenders', TenderSchema);

module.exports = TenderModel;
