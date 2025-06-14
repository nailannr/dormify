const express = require('express');
const router = express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');

router.get('/', auth, async (req, res) => {
  if (req.user.role !== 'superadmin') return res.status(403).json({ message: 'Unauthorized' });

  const admins = await User.find({ role: 'admin' }).select('name email phone dorm');
  res.json(admins);
});

//to create admins
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'superadmin') return res.status(403).json({ message: 'Unauthorized' });

  const { name, email, phone, dorm, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: 'Email already in use' });

  const hashedPassword = await bcrypt.hash(password || 'admin123', 10);

  const newAdmin = new User({ 
    name, 
    email, 
    phone, 
    dorm, 
    role: 'admin', 
    password: hashedPassword ,
    changePass: true
  });
  await newAdmin.save();
  res.status(201).json({ message: 'Admin created' });
});

//update admin
router.put('/:id', auth, async (req, res) => {
  if (req.user.role !== 'superadmin') return res.status(403).json({ message: 'Unauthorized' });

  const { name, email, phone, dorm } = req.body;
  await User.findByIdAndUpdate(req.params.id, { name, email, phone, dorm });
  res.json({ message: 'Admin updated' });
});

//delete admin
router.delete('/:id', auth, async (req, res) => {
  if (req.user.role !== 'superadmin') return res.status(403).json({ message: 'Unauthorized' });

  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'Admin deleted' });
});

module.exports = router;
