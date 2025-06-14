const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');
const Application = require('../models/Application');
const Seat = require('../models/Seat')
const authMiddleware = require('../middleware/auth');

router.get('/mine', authMiddleware, async (req, res) => {
  try {
    const complaints = await Complaint.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch complaints.' });
  }
});



//complaints for the logged-in admin (by dorm)
router.get('/admin', authMiddleware, async (req, res) => {
  const { role, dorm } = req.user;
  const { page = 1, limit = 10, status, priority, search = '' } = req.query;
  if (!['admin', 'superadmin'].includes(role)) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  try {
    const appFilter = role === 'superadmin' ? { status: 'approved' } : { dorm, status: 'approved' };

    const applications = await Application.find(appFilter).select('userId regNo');
    const userIdToRegMap = {};
    applications.forEach(app => {
      if (app.userId) {
        userIdToRegMap[app.userId.toString()] = app.regNo;
      }
    });

    const userIds = applications.map(app => app.userId);

    //Complaint filter:
    const complaintFilter = { userId: { $in: userIds } };
    if (status) complaintFilter.status = status;
    if (priority) complaintFilter.priority = priority;
    if (search) complaintFilter.subject = { $regex: search, $options: 'i' };
    
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const total = await Complaint.countDocuments(complaintFilter);

    const complaints = await Complaint.find(complaintFilter)
      .populate('userId', 'name') 
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .lean(); 


    const complaintsWithRegNo = complaints.map(c => {
      const userIdStr = typeof c.userId === 'object' && c.userId !== null ? c.userId._id?.toString() : null;
      return {
        ...c,
        regNo: userIdToRegMap[userIdStr] || '-'
      };
    });


    // Summary counts
    const [pending, inProgress, resolved] = await Promise.all([
      Complaint.countDocuments({ userId: { $in: userIds }, status: 'Pending' }),
      Complaint.countDocuments({ userId: { $in: userIds }, status: 'In Progress' }),
      Complaint.countDocuments({ userId: { $in: userIds }, status: 'Resolved' }),
    ]);

    res.json({
      complaints: complaintsWithRegNo,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      summary: { pending, inProgress, resolved }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch complaints' });
  }
});


router.post('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    const { description, subject } = req.body;

    if (!description || description.trim().length < 5) {
      return res.status(400).json({ message: 'Complaint description too short.' });
    }

    //room info from seat model
    const seat = await Seat.findOne({ studentId: userId });
    if (!seat) return res.status(404).json({ message: 'No seat assigned to this user.' });


    const complaint = new Complaint({
      userId,
      subject,
      description,
      room: `${seat.block}-${seat.room}`, 
      priority: 'Low', 
      status: 'Pending' 
    });

    await complaint.save();

    res.status(201).json({ message: 'Complaint submitted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to submit complaint.' });
  }
});


router.patch('/:id/update', authMiddleware, async (req, res) => {
  try {
    const { status, priority } = req.body;
    const update = {};
    if (status) update.status = status;
    if (priority) update.priority = priority;

    const updated = await Complaint.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!updated) return res.status(404).json({ message: 'Complaint not found' });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update complaint' });
  }
});



module.exports = router;
