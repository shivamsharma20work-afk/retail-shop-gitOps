const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    contact: { type: String, required: true, unique: true },
    otp: { type: String },
    isVerified: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);