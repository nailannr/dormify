const express = require('express')
const cors = require('cors')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const path = require('path');



const userRouter = require('./routes/user.routes')
const authRouter = require('./routes/auth')
const noticeRouter = require('./routes/notice')

const dbConnection = require('./config/db')
dbConnection()

// app.set('view engine','ejs')
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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
