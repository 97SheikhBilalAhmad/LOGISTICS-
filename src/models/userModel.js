// models/userModel.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['rider', 'customer', 'serviceprovider'],
    required: true,
  },
  otp: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Orders',
    },
  ],
  addresses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Addresses',
    },
  ],
  cards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cards',
    },
  ],
});

const UserModel = mongoose.model('Users', UserSchema);

module.exports = UserModel;
