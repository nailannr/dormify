const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  roomNumber: String,
  capacity: Number,
  occupants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})

module.exports = mongoose.model('Room', RoomSchema);
