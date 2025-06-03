const express = require('express')

const router = express.Router();
const authMiddleware = require('../middleware/auth')

router.get('/profile',authMiddleware,(req,res)=>{
    res.json({
        message: 'Welcome to your profile',
        user: req.user
    })
})

// router.post('/signup', (req,res) =>{
//     console.log(req.body)
//     res.json({message: 'user registered successfully'})
// })

module.exports = router;