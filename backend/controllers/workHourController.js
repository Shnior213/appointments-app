const WorkHour = require('../models/WorkHour');

exports.list = async (req, res) => {
    const hours = await WorkHour.find({ manager: req.user.id });
    res.json(hours);
};

exports.create = async (req, res) => {
    const { dayOfWeek, from, to } = req.body;
    const hour = await WorkHour.create({ manager: req.user.id, dayOfWeek, from, to });
    res.status(201).json(hour);
};

exports.update = async (req, res) => {
    const { id } = req.params;
    const updated = await WorkHour.findOneAndUpdate(
        { _id: id, manager: req.user.id },
        req.body,
        { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'שעות עבודה לא נמצאו' });
    res.json(updated);
};

exports.delete = async (req, res) => {
    const { id } = req.params;
    const removed = await WorkHour.findOneAndDelete({ _id: id, manager: req.user.id });
    if (!removed) return res.status(404).json({ message: 'שעות עבודה לא נמצאו' });
    res.json({ message: 'נמחק בהצלחה' });
};
