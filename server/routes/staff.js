const express = require('express');
const router = express.Router();
const Provost = require('../models/Staff');
const Staff = require('../models/Staff');

router.get('/', async (req, res) => {
  const staffs = await Staff.find();
  res.json(staffs);
});

router.post('/', async (req, res) => {
  const newStaff = new Staff(req.body);
  await newStaff.save();
  res.status(201).json({ message: 'Staff added successfully' });
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await Staff.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Update failed' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Staff.findByIdAndDelete(req.params.id);
    res.json({ message: 'Staff removed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to remove staff' });
  }
});
module.exports = router;
