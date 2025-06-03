const mongoose = require('mongoose')

const ComplaintSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: String,
  status: { type: String, enum: ['pending', 'resolved'], default: 'pending' }
})

module.exports = mongoose.model('Complaint', ComplaintSchema);