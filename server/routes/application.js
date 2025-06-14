
const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const authMiddleware = require('../middleware/auth'); 
const multer = require('multer')
const path = require('path')
const User = require('../models/user'); 


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
    const { 
      name,
      regNo,
      department,
      session,
      year,
      semester,
      phone,
      email,
      cgpa,
      fatherProfession,
      motherProfession,
      fatherIncome,
      motherIncome,
      address,
      note,
      dorm, 
    } = req.body;


    if (!name || !regNo || !department || !session || !cgpa || !dorm) {
      console.log("Missing required fields:");
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // if (!department || !session || !cgpa || !dorm) {
    //   return res.status(400).json({ message: 'All fields are required.' });
    // }
    //Check if the user already applied
    const existing = await Application.findOne({ userId: req.user.id });
    if (existing) {
      return res.status(400).json({ message: 'You have already submitted an application.' });
    }

    const newApplication = new Application({
      userId: req.user.id,
      name,
      regNo,
      department,
      session,
      year,
      semester,
      phone,
      email,
      cgpa,
      fatherProfession,
      motherProfession,
      fatherIncome,
      motherIncome,
      address,
      note,
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


router.get('/', authMiddleware, async (req, res) => {
  try {
    const {role, dorm} = req.user;
    if (!role || (role !== 'admin' && role !== 'superadmin')) {
      return res.status(403).json({ message: 'Forbidden. Admin access only.' });
    }
    if (role === 'admin' && !dorm) {
      return res.status(403).json({ message: 'Dorm assignment missing for admin.' });
    }
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const filter = role === 'superadmin' ? {} : {dorm};

    

    const total = await Application.countDocuments(filter);

    const applications = await Application.find(filter)
      .populate('userId', 'name regNo email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      applications,
      currentPage: page,
      totalPages: Math.ceil(total / limit)
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch applications.' });
  }
});

router.get('/mine', authMiddleware, async (req, res) => {
  try {
    const app = await Application.findOne({ userId: req.user.id });
    if (!app) return res.status(404).json({ message: 'No application found.' });

    res.json(app);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch application.' });
  }
});



// Update application status (approve/reject)
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const app = await Application.findByIdAndUpdate(req.params.id, { status }, {new : true})
    .populate('userId', 'email');
    if (!app) return res.status(404).json({ message: 'Application not found' });

    if (status === 'approved' && app.userId?.email) {
      await sendEmail({
        to: app.userId.email,
        subject: '🎉 Your Dorm Application Has Been Approved!',
        html: `<p>Hello <strong>${application.name}</strong>,</p>
               <p>Your dorm admission application has been <strong>approved</strong>. Please proceed to the payment process in the website.</p>
               <p>– Dormify Team</p>`
      });
    }

    res.json({ message: 'Application status updated', application: app });
  } catch (err) {
    res.status(500).json({ message: 'Error updating application status' });
  }
});

module.exports = router;

