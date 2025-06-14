const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: {type: String, unique: true},
    password: { type: String, required: true },
    role: {
        type: String, 
        enum: ['student','admin', 'superadmin'], 
        default: 'student'},
    dorm: { type: String, enum: ['dorm1', 'dorm2', 'dorm3'], required: function() { return this.role === 'admin'; } },
    phone: {type: String, function() { return this.role === 'admin'; }},
    changePass: {type: Boolean, default: false, function() { return this.role === 'admin'; }},
    isSelected: {type: Boolean, default: false}
})

module.exports = mongoose.model('User',userSchema)