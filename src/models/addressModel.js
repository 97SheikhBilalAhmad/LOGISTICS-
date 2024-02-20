// models/addressModel.js
const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  location: {
    type: String,
    required: false,
  },
  
});

const AddressModel = mongoose.model('Addresses', AddressSchema);

module.exports = AddressModel;
