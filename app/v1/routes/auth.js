const {Router} = require('express');
const {login, register, logout} = require('../controllers/AuthController');
const validate = require('../middlewares/validationMiddleware');
const auth = require('../validators/authValidator');
const needsAuth = require('../middlewares/authMiddleware');
 const router = Router();

console.log(__dirname);

router
    .route('/login')
    .post(login);

router
    .route('/register')
    .post(validate(auth), register);

router
    .route('/logout')
    .post(needsAuth(), logout);

module.exports = router;
