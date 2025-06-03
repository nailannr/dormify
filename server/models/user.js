const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: {type: String, unique: true},
    password: { type: String, required: true },
    role: {type: String, enum: ['student','admin'], default: 'student'},
    isSelected: {type: Boolean, default: false}
})

module.exports = mongoose.model('user',userSchema)