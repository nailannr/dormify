const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path');

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('MongoDB connection failed:', err));


const userRouter = require('./routes/user')
const authRouter = require('./routes/auth')
const noticeRouter = require('./routes/notice')
const provostRouter = require('./routes/provost')
const staffRouter = require('./routes/staff')
const applicationRouter = require('./routes/application')
const complaintRouter = require('./routes/complaint')
const seatRouter = require('./routes/seat')

const dbConnection = require('./config/db')
dbConnection()

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)
app.use('/api/notice', noticeRouter)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/provosts', provostRouter)
app.use('/api/staffs', staffRouter)
app.use('/api/application', applicationRouter)
app.use('/api/complaint', complaintRouter)
app.use('/api/seat',seatRouter)


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
