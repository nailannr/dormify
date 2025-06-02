const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  department: String,
  session: String,
  cgpa: Number,
  hallChoice: String,
  status: {type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
})

module.exports = mongoose.model('Application', ApplicationSchema);
