const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const OTPSchema = new mongoose.Schema({
code: String, 
expiresAt: Date
});


const ResetTokenSchema = new mongoose.Schema({
token: String, 
expiresAt: Date
});


const UserSchema = new mongoose.Schema({
loginId: { type: String, unique: true, required: true },
email: { type: String, required: true, unique: true },
password: { type: String },
googleId: { type: String },
isVerified: { type: Boolean, default: false },
otp: OTPSchema,
resetToken: ResetTokenSchema,
createdAt: { type: Date, default: Date.now }
});


UserSchema.pre('save', async function (next) {
if (!this.isModified('password')) return next();
const salt = await bcrypt.genSalt(10);
this.password = await bcrypt.hash(this.password, salt);
next();
});


UserSchema.methods.comparePassword = async function (candidate) {
if (!this.password) return false;
return await bcrypt.compare(candidate, this.password);
};


module.exports = mongoose.model('User', UserSchema);