const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: String,
    email: {type: String, unique: true},
    password: String,
    role: {type: String, enum: ['student','admin'], default: 'student'},
    isSelected: {type: Boolean, default: false}
})

module.exports = mongoose.model('user',userSchema)