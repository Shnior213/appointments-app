const router = require('express').Router();
const { register, login } = require('../controllers/authController');

console.log('🟢 auth routes loaded');

router.post('/register', register);
router.post('/login', login);

module.exports = router;
