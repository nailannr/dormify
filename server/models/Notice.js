const mongoose = require('mongoose')

const NoticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  dorm: { 
    type: String, 
    required: true },
  status: { type: String, enum: ['Published', 'Draft'], default: 'Published' },
  createdAt: { type: Date, default: Date.now },
  fileUrl: { type: String }
})

module.exports = mongoose.model('Notice', NoticeSchema);
