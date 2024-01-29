const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth.controller');
const ErrorHandler = require('../../../middleware/error.middleware');
const AuthGuard = require('../../../middleware/auth.middleware');
const schema = require('../validations/auth.validation');
const validate = require('../utils/validator.util'); 

router.post('/register', validate(schema.register), ErrorHandler(AuthController.register));
router.post('/login',    validate(schema.login),    ErrorHandler(AuthController.login));
router.post('/otp-verification', ErrorHandler(AuthController.otpVerification));
router.post('/change-password',  AuthGuard,   validate(schema.changePassword),     ErrorHandler(AuthController.changePassword));
router.post('/send-reset-password-email',  ErrorHandler(AuthController.sendUserPasswordResetEmail));
router.post('/reset-password/:id/:token', validate(schema.resetPassword), ErrorHandler(AuthController.updateResetPassword));
router.get('/user',      AuthGuard,                 ErrorHandler(AuthController.getUser));
router.get('/logout',    AuthGuard,                 ErrorHandler(AuthController.logout));

router.all('*',  (req, res) => res.status(400).json({ message: 'Bad Request. Wrong End-points'}))
module.exports = router;
