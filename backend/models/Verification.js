const mongoose = require('mongoose');

const verificationSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  codeHash: { type: String, required: true },
  expires: { type: Date, required: true }, 
  attempts: { type: Number, default: 0 },
});

module.exports = mongoose.model('Verification', verificationSchema);