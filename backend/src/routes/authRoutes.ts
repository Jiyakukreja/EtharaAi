import { Router } from 'express';
import { login, logout, me, signup } from '../controllers/authController.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { validateBody } from '../middleware/validate.js';
import { loginSchema, signupSchema } from '../validators/authValidators.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.post('/signup', validateBody(signupSchema), asyncHandler(signup));
router.post('/login', validateBody(loginSchema), asyncHandler(login));
router.post('/logout', asyncHandler(logout));
router.get('/me', protect, asyncHandler(me));

export default router;
