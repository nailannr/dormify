const mongoose = require('mongoose');

const ProvostSchema = new mongoose.Schema({
  name: String,
  role: String,
  department: String,
  email: String,
  phone: String,
  office: String,
  dorm: String, 
}, {timestamps: true});

module.exports = mongoose.model('Provost', ProvostSchema);
