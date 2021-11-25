const {Router} = require('express');
const {index, create, read, update, remove} = require('../controllers/AppointmentsController');
const validate = require('../middlewares/validationMiddleware');
const appointment = require('../validators/appointmentValidator');
const needsAuth = require('../middlewares/authMiddleware');
const router = Router();

router
    .route('/')
    .get([needsAuth()], index)
    .post([needsAuth(), validate(appointment)], create);

    router
    .route('/:id')
    .get(needsAuth(), index)
    .delete(needsAuth(), remove);

router
    .route('/update:id')
    .put([needsAuth(),  validate(appointment)], update);


module.exports = router;
