const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: {type: String, unique: true},
    password: { type: String, required: true },
    role: {
        type: String, 
        enum: ['student','admin', 'superadmin'], 
        default: 'student'},
    dorm: { type: String, enum: ['Dorm1', 'Dorm2', 'Dorm3'], required: function() { return this.role === 'admin'; } },
    isSelected: {type: Boolean, default: false}
})

module.exports = mongoose.model('user',userSchema)