const { authenticate } = require('../middleware/auth');
const User = require('../models/user');
const router = require('express').Router();
const { register, login, update, getAllUsers } = require('../controllers/authController');
const { sendCode, verifyCode } = require('../controllers/verifyController');

console.log('🟢 auth routes loaded');

router.post('/register', register);
router.post('/login', login);

router.post('/send-code', sendCode);
router.post('/verify', verifyCode);

router.put('/user', authenticate, update);

router.get('/users', getAllUsers);

module.exports = router;
