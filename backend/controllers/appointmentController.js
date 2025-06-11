const Appointment = require('../models/Appointment');
const Manager = require('../models/Manager');


exports.list = async (req, res) => {
    let filter;
    if (req.user.isManager) {
        // נמצא את מסמך ה-Manager ששייך למשתמש המחובר
        const mgr = await Manager.findOne({ user: req.user.id }, '_id');
        if (!mgr) return res.json([]);            // אין מסמך מנהל – מחזירים ריק
        filter = { manager: mgr._id };
    } else {
        filter = { client: req.user.id };
    } const list = await Appointment.find(filter)
        .populate('client', 'name phone')
        .populate({ path: 'manager', populate: { path: 'user', select: 'name imageUrl' } });
    res.json(list);
};

exports.create = async (req, res) => {
    console.log('🔥 create appointment, body =', req.body);

    const { managerId, dateTime, serviceType } = req.body;
    const appointment = await Appointment.create({ client: req.user.id, manager: managerId, dateTime, serviceType });
    res.status(201).json(appointment);
};

exports.update = async (req, res) => {
    const { id } = req.params;
    // אם המשתמש מנהל – צריך להשיג את managerId שלו
    let managerFilter = null;
    if (req.user.isManager) {
        const mgr = await Manager.findOne({ user: req.user.id }, '_id');
        if (mgr) managerFilter = mgr._id;
    }

    const updated = await Appointment.findOneAndUpdate(
        { _id: id, $or: [{ client: req.user.id }, { manager: managerFilter }] },

        req.body,
        { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'תור לא נמצא' });
    res.json(updated);
};

exports.delete = async (req, res) => {
    const { id } = req.params;
    let managerFilter = null;
    if (req.user.isManager) {
        const mgr = await Manager.findOne({ user: req.user.id }, '_id');
        if (mgr) managerFilter = mgr._id;
    }
    const removed = await Appointment.findOneAndDelete(
        { _id: id, $or: [{ client: req.user.id }, { manager: managerFilter }] }
    );
    if (!removed) return res.status(404).json({ message: 'תור לא נמצא' });
    res.json({ message: 'התור בוטל' });
};
