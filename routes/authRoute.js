import express from 'express';
import AuthController from '../controllers/authController.js';
import { registerValidator } from '../validators/authValidator.js';
const router = express.Router();



router.post('/register', registerValidator, AuthController.register);
router.get('/login', AuthController.login);



export default router;