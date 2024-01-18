import express from 'express';
const router = express.Router();
import  AuthController from '../controllers/auth.controller.js';
import ErrorHandler from '../middleware/error.middleware.js';
import AuthGuard from '../middleware/auth.middleware.js';
import schema from '../validations/auth.validation.js';
import validate from '../utils/validator.util.js'; 

router.post('/register', validate(schema.register), ErrorHandler(AuthController.register));
router.post('/login',    validate(schema.login),    ErrorHandler(AuthController.login));
router.get('/user',      AuthGuard,                 ErrorHandler(AuthController.getUser));
router.get('/logout',    AuthGuard,                 ErrorHandler(AuthController.logout));

router.all('*',  (req, res) => res.status(400).json({ message: 'Bad Request.'}))

export default router;
