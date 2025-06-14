const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const auth = require('../middleware/auth');
const Seat = require('../models/Seat');
const Application = require('../models/Application');
const User = require('../models/user');

//GET all seats for the admin's or superadmin's dorm
router.get('/', auth, async (req, res) => {
    try {
        if (!['admin', 'superadmin'].includes(req.user.role)) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        let seats;

        if (req.user.role === 'admin') {
            const dorm = req.user.dorm;
            if (!dorm) return res.status(400).json({ message: 'Dorm not specified' });
            seats = await Seat.find({ dorm }).populate([
                {
                    path: 'studentId',
                    select: 'name department email',
                },
                {
                    path: 'studentApplication',
                    model: 'Application',
                    match: { status: 'approved' },
                    select: 'regNo userId',
                }
            ]);
        } else {
            //superadmin
            seats = await Seat.find().populate([
                {
                    path: 'studentId',
                    select: 'name department email',
                },
                {
                    path: 'studentApplication',
                    model: 'Application',
                    match: { status: 'approved' },
                    select: 'regNo userId',
                }
            ]);
        }

        res.json(seats);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch seat info' });
    }
});


router.get('/admitted', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', status = '' } = req.query;
    const skip = (page - 1) * limit;

    const baseFilter = { studentId: { $ne: null } };
    if (req.user.role === 'admin') {
      baseFilter.dorm = req.user.dorm;
    }

    if (status) {
      baseFilter.studentStatus = status;
    }

    const seats = await Seat.find(baseFilter)
      .populate('studentId', 'name email')
      .populate('studentApplication', 'regNo department createdAt')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ 'studentApplication.createdAt': -1 });

    
    const searched = seats.filter(seat => {
      const name = seat.studentId?.name || '';
      const regNo = seat.studentApplication?.regNo || '';
      const room = `${seat.block}-${seat.room}`;
      return (
        name.toLowerCase().includes(search.toLowerCase()) ||
        regNo.toLowerCase().includes(search.toLowerCase()) ||
        room.toLowerCase().includes(search.toLowerCase())
      );
    });

    const total = await Seat.countDocuments(baseFilter);
    
    res.json({
      students: searched.map(seat => ({
        _id: seat._id,
        name: seat.studentId?.name || '',
        department: seat.studentApplication?.department || '',
        email: seat.studentId?.email || '',
        regNo: seat.studentApplication?.regNo || '',
        room: `${seat.block}-${seat.room}`,
        joinDate: seat.studentApplication?.createdAt || '',
        status: seat.studentStatus || 'Active', // default fallback
      })),
      
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch admitted students' });
  }
});




//Assign a seat to a student
router.post('/assign', auth, async (req, res) => {
  try {
    const { seatId, studentId } = req.body;

    
    const seat = await Seat.findById(seatId);
    if (!seat) return res.status(404).json({ message: 'Seat not found' });
    if (seat.studentId) return res.status(400).json({ message: 'Seat already assigned' });
    
    const app = await Application.findOne({ userId: new mongoose.Types.ObjectId(studentId), status: 'approved' });

    if (!app) return res.status(400).json({ message: 'Student does not have approved application' });

    
    const alreadyAssigned = await Seat.findOne({ studentId });
    if (alreadyAssigned) {
      return res.status(400).json({ message: 'Student already assigned to a seat' });
    }

    seat.studentId = studentId;
    seat.status = 'occupied';
    seat.studentStatus = 'Active'
    await seat.save();

    app.room ={
        block: seat.block,
        room: seat.room,
        seatNumber: seat.seatNumber,
    }

    await app.save();

    await User.findByIdAndUpdate(studentId, {isSelected: true});

    res.json({ message: 'Seat assigned successfully', seat });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to assign seat' });
  }
});

//Unassign a seat
router.post('/unassign', auth, async (req, res) => {
  try {
    const { seatId } = req.body;

    const seat = await Seat.findById(seatId);
    if (!seat) return res.status(404).json({ message: 'Seat not found' });

    seat.studentId = null;
    seat.status = 'vacant'; 
    await seat.save();

    if(seat.studentId){
      await User.findByIdAndUpdate(studentId, {isSelected: false});
    }

    res.json({ message: 'Seat unassigned successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to unassign seat' });
  }
});

//to update student status
router.patch('/status/:seatId', auth, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Active', 'On Leave', 'Inactive'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const seat = await Seat.findByIdAndUpdate(
      req.params.seatId,
      { studentStatus: status },
      { new: true }
    ).populate('studentId', 'name department email')
     .populate('studentApplication', 'regNo createdAt');

    res.json(seat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update status' });
  }
});



module.exports = router;
