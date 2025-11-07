import { Router } from 'express';
import { commentController } from '../controllers/commentController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.get('/:id/comments', authMiddleware, commentController.getBySnippetId);
router.post('/:id/comments', authMiddleware, commentController.create);

export default router;