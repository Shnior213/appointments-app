const { authenticate } = require('../middleware/auth');
const User = require('../models/User');
const router = require('express').Router();
const { register, login, update, getAllUsers } = require('../controllers/authController');

console.log('🟢 auth routes loaded');

router.post('/register', register);
router.post('/login', login);

router.put('/user', authenticate, update);

router.get('/users', getAllUsers);

module.exports = router;
