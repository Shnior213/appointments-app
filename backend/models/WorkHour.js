const { Schema, model, Types } = require('mongoose');

const workHourSchema = new Schema({
    manager: { type: Types.ObjectId, ref: 'Manager', required: true },
    dayOfWeek: { type: Number, min: 0, max: 6, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true }
}, { timestamps: true });

module.exports = model('WorkHour', workHourSchema);
