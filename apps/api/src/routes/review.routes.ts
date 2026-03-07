import { Router } from 'express';
import { reviewController } from '../controllers/review.controller';
import { authMiddleware } from '../middleware/auth.middleware';

export const reviewRoutes = Router();

reviewRoutes.get('/product/:productId', reviewController.getProductReviews);
reviewRoutes.post('/product/:productId', authMiddleware, reviewController.createReview);
reviewRoutes.put('/:id', authMiddleware, reviewController.updateReview);
reviewRoutes.delete('/:id', authMiddleware, reviewController.deleteReview);

