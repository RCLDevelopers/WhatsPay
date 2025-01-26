const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true
    }
  }],
  total: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['paypal', 'mpesa'],
    required: true
  },
  paymentId: String,
  checkoutRequestId: String,
  phoneNumber: String,
  status: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'processing', 'ready', 'completed'],
    default: 'pending'
  },
  paymentError: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema); 