const mongoose = require('mongoose');
const Seat = require('../models/Seat');
const dotenv = require('dotenv');

dotenv.config(); 

const uri = process.env.MONGO_URI; 

mongoose.connect(uri, {});

const dorm = 'dorm1';
const blocks = ['A', 'B', 'C', 'D'];

(async () => {
  try {
    await Seat.deleteMany({ dorm }); // Optional: clear old seats

    for (let block of blocks) {
      let roomBase;
      if (block === 'A') roomBase = 100;
      else if (block === 'B') roomBase = 200;
      else if (block === 'C') roomBase = 300;
      else if (block === 'D') roomBase = 400;

      for (let i = 1; i <= 10; i++) {
        const room = `${roomBase + i}`; // e.g. 101–110
        for (let seatNumber = 1; seatNumber <= 4; seatNumber++) {
          await Seat.create({
            dorm,
            block,
            room,
            seatNumber,
            status: 'vacant'
          });
        }
      }
    }

    console.log('10 unique rooms per block seeded successfully');
    process.exit();
  } catch (err) {
    console.error('Failed to seed seats:', err);
    process.exit(1);
  }
})();
