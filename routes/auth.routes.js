const { Router } = require('express');
const AuthController = require('../controllers/authController');

const router = Router();

router.post('/authenticate', AuthController.authenticate);
router.get('/authenticated', AuthController.getUserAuthenticated);
router.post('/forgotPassword', AuthController.forgotPassword);
router.post('/resetPassword', AuthController.resetPassword);

module.exports = router;
