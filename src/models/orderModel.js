// models/orderModel.js
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  orderDetails: {
    itemName: {
      type: String,
      required: true,
    },
    parcelQuantity: {
      type: Number,
      required: true,
    },
    totalWeight: {
      type: String,
      required: true,
    },
    pickUpTime: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: false,
    },
    recipientInfo: {
      fullName: {
        type: String,
        required: true,
      },
      mobileNumber: {
        type: String,
        required: true,
      },
    },
    deliveryRoute: {
      yourAddress: {
        type: String,
        required: true,
      },
      destinationsAddress: {
        type: String,
        required: true,
      },
      productPhoto: {
        type: String,
        required: false,
      },
    },
  },
});

const OrderModel = mongoose.model('Orders', OrderSchema);

module.exports = OrderModel;
