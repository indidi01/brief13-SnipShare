import { Router } from 'express';
import { snippetController } from '../controllers/snippetController';
import { authMiddleware } from '../middleware/auth';
import { validateSnippet } from '../middleware/validation';

const router = Router();

router.get('/', authMiddleware, snippetController.getAll);
router.get('/:id', authMiddleware, snippetController.getById);
router.post('/', authMiddleware, validateSnippet, snippetController.create);
router.get('/user/:userId?', authMiddleware, snippetController.getByUser);
router.post('/:id/like', authMiddleware, snippetController.toggleLike);

export default router;