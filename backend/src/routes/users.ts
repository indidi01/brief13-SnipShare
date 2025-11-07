import { Router } from 'express';
import { userController } from '../controllers/userController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.get('/me', authMiddleware, userController.getMe);
router.get('/:id', authMiddleware, userController.getById);

export default router;