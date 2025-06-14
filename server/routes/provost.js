const express = require('express');
const router = express.Router();
const Provost = require('../models/Provost');
const auth = require('../middleware/auth')

router.get('/', auth, async (req, res) => {
  const { role, dorm } = req.user;
  const filter = role === 'admin' ? { dorm } : {}; // restrict for admin
  const provosts = await Provost.find(filter);
  res.json(provosts);
});

router.post('/', auth, async (req, res) => {
  const { role, dorm, id } = req.user;
  if (!['admin', 'superadmin'].includes(role)) return res.status(403).json({ message: 'Unauthorized' });

  const newProvost = new Provost({ ...req.body, dorm });
  await newProvost.save();
  res.status(201).json({ message: 'Provost added successfully' });
});

router.put('/:id', auth, async (req, res) => {
  const { role, dorm } = req.user;

  const existing = await Provost.findById(req.params.id);
  if (!existing) return res.status(404).json({ message: 'Provost not found' });

  if (role === 'admin' && existing.dorm !== dorm) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const updated = await Provost.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete('/:id', auth, async (req, res) => {
  const { role, dorm } = req.user;

  const existing = await Provost.findById(req.params.id);
  if (!existing) return res.status(404).json({ message: 'Provost not found' });

  if (role === 'admin' && existing.dorm !== dorm) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  await Provost.findByIdAndDelete(req.params.id);
  res.json({ message: 'Provost removed successfully' });
});

module.exports = router;
