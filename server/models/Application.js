const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  regNo: String,
  department: String,
  session: String,
  year: String,
  semester: String,
  phone: String,
  email: String,
  cgpa: Number,
  fatherProfession: String,
  motherProfession: String,
  fatherIncome: Number,
  motherIncome: Number,
  address: String,
  note: String,
  dorm: { 
    type: String,
    enum: ['first', 'second', 'third'], 
    required: true 
  },
  photo: String, //path to uploaded photo
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Application', ApplicationSchema);

