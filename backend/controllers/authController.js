const User = require('../models/User')
const Manager = require('../models/Manager');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



exports.register = async (req, res) => {
    console.log('🟢 authController.register hit, body =', req.body);
    console.log('req.body =', req.body);
    const { name, phone, password } = req.body;
    try {
        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({ name, phone, password: hash });
        res.status(201).json({ id: user._id });
    } catch (err) {
        res.status(400).json({ message: 'נתונים שגויים בהרשמה', error: err });
    }
};

exports.login = async (req, res) => {
    const { phone, password } = req.body;
    try {
        const user = await User.findOne({ phone });
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ message: 'פרטי התחברות שגויים' });
        }
        const isManager = await Manager.exists({ user: user._id });
        const payload = { id: user._id, isManager: !!isManager };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'שגיאת שרת בכניסה', error: err });
    }
};
