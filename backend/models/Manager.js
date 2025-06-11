const { Schema, model, Types } = require('mongoose');

const managerSchema = new Schema({
    user: { type: Types.ObjectId, ref: 'User', required: true },
    imageUrl: { type: String }
}, { timestamps: true });

module.exports = model('Manager', managerSchema);
