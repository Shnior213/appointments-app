const router = require('express').Router();
const { authenticate } = require('../middleware/auth');
const ctrl = require('../controllers/appointmentController');

router.use(authenticate);
router.get('/my', ctrl.getMyAppointments);
router.get('/manager/:managerId', ctrl.getByManagerAndDate);
router.get('/', ctrl.list);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.delete);

module.exports = router;
