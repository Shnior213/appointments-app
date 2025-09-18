const router = require('express').Router();
const { authenticate, requireManager } = require('../middleware/auth');
const ctrl = require('../controllers/workHourController');

router.get('/manager/:id', require('../controllers/workHourController').getAvailabilityByManager);
router.use(authenticate, requireManager);
router.get('/', ctrl.list);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.delete);

module.exports = router;
