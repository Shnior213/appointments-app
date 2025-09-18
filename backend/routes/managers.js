const router = require('express').Router();
const { authenticate, requireManager } = require('../middleware/auth');
const ctrl = require('../controllers/managerController');

// router.use(authenticate, requireManager);
router.get('/', ctrl.list);
router.post('/', authenticate, requireManager, ctrl.create);
router.delete('/:id', authenticate, requireManager, ctrl.delete);

module.exports = router;
