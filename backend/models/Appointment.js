const { Schema, model, Types } = require('mongoose');

const appointmentSchema = new Schema({
    client: { type: Types.ObjectId, ref: 'User', required: true },
    manager: { type: Types.ObjectId, ref: 'Manager', required: true },
    dateTime: { type: Date, required: true },
    serviceType: { type: String, required: true }
}, { timestamps: true });

module.exports = model('Appointment', appointmentSchema);
