const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  dorm: { type: String, required: true }, 
  block: { type: String, required: true }, 
  room: { type: String, required: true },  
  seatNumber: { type: Number, required: true }, 
  status: {
    type: String,
    enum: ['vacant', 'occupied'],
    default: 'vacant'
  },
  studentStatus: {
    type: String,
    enum: ['Active', 'On Leave', 'Inactive'],
    default: 'Active'
  },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
}, { timestamps: true });

seatSchema.index({ dorm: 1, block: 1, room: 1, seatNumber: 1 }, { unique: true });

seatSchema.virtual('studentApplication', {
  ref: 'Application',
  localField: 'studentId',
  foreignField: 'userId',
  justOne: true,
});

seatSchema.set('toObject', { virtuals: true });
seatSchema.set('toJSON', { virtuals: true });


module.exports = mongoose.model('Seat', seatSchema);
