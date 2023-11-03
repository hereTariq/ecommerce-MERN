import { Router } from 'express';
import { signup, login, logout } from '../controllers/auth.js';
import validate from '../middlewares/validate.js';
import { signupValidation } from '../validations/authValidation.js';
const router = Router();

router.post('/signup', validate(signupValidation), signup);
router.post('/login', login);
router.get('/logout', logout);

export default router;
