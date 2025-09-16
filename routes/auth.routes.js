const { Router } = require('express');
const AuthController = require('../controllers/authController');

const router = Router();
console.log('auth.routes.js cargado'); 
router.post('/authenticate', AuthController.authenticate);
router.get('/authenticated', AuthController.getUserAuthenticated);
router.post('/forgotPassword', AuthController.forgotPassword);
router.post('/resetPassword', AuthController.resetPassword);

module.exports = router;
