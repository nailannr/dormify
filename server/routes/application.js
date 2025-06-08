const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const authMiddleware = require('../middleware/auth'); 
const multer = require('multer')
const path = require('path')

// File upload config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/applications/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, req.user._id + '-' + uniqueSuffix + ext);
  }
});
const upload = multer({ storage });

// Submit a new application
router.post('/', authMiddleware, upload.single('photo'), async (req, res) => {
  try {
    const { department, session, cgpa, dorm } = req.body;

    if (!department || !session || !cgpa || !dorm) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    //Check if the user already applied
    const existing = await Application.findOne({ userId: req.user.id });
    if (existing) {
      return res.status(400).json({ message: 'You have already submitted an application.' });
    }

    const newApplication = new Application({
      userId: req.user._id,
      department,
      session,
      cgpa,
      dorm,
      photo: req.file?.filename || ''
    });

    await newApplication.save();
    res.status(201).json({ message: 'Application submitted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while submitting application.' });
  }
});

// Get all applications for a specific dorm (for admin)
router.get('/dorm/:dorm', authMiddleware, async (req, res) => {
  try {
    const { dorm } = req.params;
    const applications = await Application.find({ dorm }).populate('userId', 'name email');
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch applications.' });
  }
});

// Update application status (approve/reject)
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const app = await Application.findByIdAndUpdate(req.params.id, { status }, {new : true});
    if (!app) return res.status(404).json({ message: 'Application not found' });
    res.json({ message: 'Application status updated', application: app });
  } catch (err) {
    res.status(500).json({ message: 'Error updating application status' });
  }
});

module.exports = router;

