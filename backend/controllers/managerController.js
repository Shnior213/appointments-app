const Manager = require('../models/Manager');
const User = require('../models/User');

// list all managers
exports.list = async (req, res) => {
    const list = await Manager.find().populate('user', 'name phone');
    res.json(list);
};

// create a manager (promote user)
exports.create = async (req, res) => {
    const { userId, imageUrl } = req.body;
    try {
        if (await Manager.exists({ user: userId }))
            return res.status(400).json({ message: 'משתמש כבר מנהל' });
        const manager = await Manager.create({ user: userId, imageUrl });
        res.status(201).json(manager);
    } catch (err) {
        res.status(400).json({ message: 'שגיאה ביצירת מנהל', error: err });
    }
};

// delete manager (demote)
exports.delete = async (req, res) => {
    const { id } = req.params;
    const removed = await Manager.findByIdAndDelete(id);
    if (!removed) return res.status(404).json({ message: 'מנהל לא נמצא' });
    res.json({ message: 'מנהל הוסר' });
};
