import { Router } from 'express';
import { reviewController } from '../controllers/review.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { createReviewSchema, updateReviewSchema } from '../validators/review.validator';

export const reviewRoutes = Router();

reviewRoutes.get('/product/:productId', reviewController.getProductReviews);
reviewRoutes.post('/product/:productId', authMiddleware, validate(createReviewSchema), reviewController.createReview);
reviewRoutes.put('/:id', authMiddleware, validate(updateReviewSchema), reviewController.updateReview);
reviewRoutes.delete('/:id', authMiddleware, reviewController.deleteReview);

