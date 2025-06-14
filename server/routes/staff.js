const express = require('express');
const router = express.Router();
const Staff = require('../models/Staff');
const auth = require('../middleware/auth');


router.get('/', auth, async (req, res) => {
  const { role, dorm } = req.user;
  const filter = role === 'admin' ? { dorm } : {};
  const staffs = await Staff.find(filter);
  res.json(staffs);
});


router.post('/', auth, async (req, res) => {
  const { role, dorm } = req.user;
  if (!['admin', 'superadmin'].includes(role)) return res.status(403).json({ message: 'Unauthorized' });

  const newStaff = new Staff({ ...req.body, dorm });
  await newStaff.save();
  res.status(201).json({ message: 'Staff added successfully' });
});


router.put('/:id', auth, async (req, res) => {
  const { role, dorm } = req.user;

  const existing = await Staff.findById(req.params.id);
  if (!existing) return res.status(404).json({ message: 'Staff not found' });

  if (role === 'admin' && existing.dorm !== dorm) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const updated = await Staff.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});


router.delete('/:id', auth, async (req, res) => {
  const { role, dorm } = req.user;

  const existing = await Staff.findById(req.params.id);
  if (!existing) return res.status(404).json({ message: 'Staff not found' });

  if (role === 'admin' && existing.dorm !== dorm) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  await Staff.findByIdAndDelete(req.params.id);
  res.json({ message: 'Staff removed successfully' });
});

module.exports = router;
