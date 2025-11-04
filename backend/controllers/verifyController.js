const bcrypt = require('bcryptjs');
const User = require("../models/user");

exports.sendCode = async (req, res) => {
  try {
    const { phone } = req.body;
    const user = await User.findOne({ phone });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const code = Math.floor(1000 + Math.random() * 9000).toString(); 
    const hash = await bcrypt.hash(code, 10);
    user.verificationCodeHash = hash;
    user.verificationExpires = Date.now() + 5 * 60 * 1000; 
    user.verificationAttempts = 0;
    await user.save();

    console.log(`Verification code for ${phone}: ${code}`); 
    res.json({ message: 'Verification code sent' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error sending code' });
  }
};

exports.verifyCode = async (req, res) => {
  try {
    const { phone, code } = req.body;
    const user = await User.findOne({ phone });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!user.verificationCodeHash || Date.now() > user.verificationExpires) {
      return res.status(400).json({ message: 'Code expired, please try again' });
    }

    const isMatch = await bcrypt.compare(code, user.verificationCodeHash);
    if (!isMatch) {
      user.verificationAttempts += 1;
      await user.save();
      return res.status(400).json({ message: 'Incorrect code' });
    }

    user.isVerified = true;
    user.verificationCodeHash = undefined;
    user.verificationExpires = undefined;
    await user.save();

    res.json({ message: 'Verification successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error verifying code' });
  }
};