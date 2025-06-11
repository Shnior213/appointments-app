const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 }
}, { timestamps: true });

module.exports = model('User', userSchema);
