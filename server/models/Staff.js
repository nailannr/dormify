const mongoose = require('mongoose');

const StaffSchema = new mongoose.Schema({
  name: String,
  role: String,
  email: String,
  phone: String,
  office: String,
  dorm: String,
},{timestamps: true});

module.exports = mongoose.model('Staff', StaffSchema);
