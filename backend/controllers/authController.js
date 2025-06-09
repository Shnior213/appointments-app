const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    try {
        const { name, password, phone } = req.body;

        // בדיקה אם המשתמש כבר קיים
        const existingUser = await User.findOne({ phone });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // הצפנת סיסמה
        const hashedPassword = await bcrypt.hash(password, 10);

        // יצירת משתמש חדש
        const newUser = new User({
            name,
            phone,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Registration failed", error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // חיפוש המשתמש לפי פלפון
        const user = await User.findOne({ phone });
        if (!user) {
            return res.status(400).json({ message: "Invalid phone or password" });
        }

        // השוואת סיסמה
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // יצירת טוקן
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                isAdmin: user.isAdmin,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Login failed", error: error.message });
    }
};

module.exports = { registerUser, loginUser };
