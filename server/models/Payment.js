const mongoose = require('mongoose')

const PaymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: Number,
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  transactionId: String,
  paymentDate: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Payment', PaymentSchema);
