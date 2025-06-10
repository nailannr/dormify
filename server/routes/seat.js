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

//Assign a seat to a student
router.post('/assign', auth, async (req, res) => {
  try {
    const { seatId, studentId } = req.body;

    //Check seat existence and availability
    const seat = await Seat.findById(seatId);
    if (!seat) return res.status(404).json({ message: 'Seat not found' });
    if (seat.studentId) return res.status(400).json({ message: 'Seat already assigned' });

    console.log('Assigning seat to studentId:',studentId)
    //Check student application
    const app = await Application.findOne({ userId: new mongoose.Types.ObjectId(studentId), status: 'approved' });
    console.log('Matched Application:',app);
    if (!app) return res.status(400).json({ message: 'Student does not have approved application' });

    // Check if the student already has a seat
    const alreadyAssigned = await Seat.findOne({ studentId });
    if (alreadyAssigned) {
      return res.status(400).json({ message: 'Student already assigned to a seat' });
    }

    // Assign
    seat.studentId = studentId;
    seat.status = 'occupied';
    await seat.save();

    app.room ={
        block: seat.block,
        room: seat.room,
        seatNumber: seat.seatNumber,
    }

    await app.save();

    res.json({ message: 'Seat assigned successfully', seat });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to assign seat' });
  }
});

// Unassign a seat
router.post('/unassign', auth, async (req, res) => {
  try {
    const { seatId } = req.body;

    const seat = await Seat.findById(seatId);
    if (!seat) return res.status(404).json({ message: 'Seat not found' });

    seat.studentId = null;
    seat.status = 'vacant'; 
    await seat.save();

    res.json({ message: 'Seat unassigned successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to unassign seat' });
  }
});


module.exports = router;
