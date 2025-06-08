const express = require('express');
const router = express.Router();
const Provost = require('../models/Provost');

router.get('/', async (req, res) => {
  const provosts = await Provost.find();
  res.json(provosts);
});

router.post('/', async (req, res) => {
  const newProvost = new Provost(req.body);
  await newProvost.save();
  res.status(201).json({ message: 'Provost added successfully' });
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await Provost.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Update failed' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Provost.findByIdAndDelete(req.params.id);
    res.json({ message: 'Provost removed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to remove provost' });
  }
});

module.exports = router;
