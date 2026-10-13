import { Router } from 'express';
import { loginUser, logoutUser, registerUser } from '../controllers/auth.controllers.js';
import verifyToken from '../middleware/auth.middleware.js';
const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', verifyToken, logoutUser);

export default router;
