import { Router } from 'express';
import { reviewController } from '../controllers/review.controller';
import { authMiddleware } from '../middleware/auth.middleware';

export const reviewRoutes = Router();

// TODO: Implement review getAll
reviewRoutes.get('/product/:productId', reviewController.getAll);

// TODO: Implement review create
reviewRoutes.post('/', authMiddleware, reviewController.create);

// TODO: Implement review update
reviewRoutes.put('/:id', authMiddleware, reviewController.update);

// TODO: Implement review delete
reviewRoutes.delete('/:id', authMiddleware, reviewController.delete);
