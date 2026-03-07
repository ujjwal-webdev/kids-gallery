import { Request, Response, NextFunction } from 'express';
import { sendSuccess, sendPaginated } from '../utils/apiResponse';
import { reviewService } from '../services/review.service';
import { AuthRequest } from '../types';

export const reviewController = {
  async getProductReviews(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await reviewService.getProductReviews(req.params.productId, req.query as Record<string, string>);
      sendPaginated(res, result.data, result.total, result.page, result.limit);
    } catch (error) {
      next(error);
    }
  },

  async createReview(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as AuthRequest).user!.id;
      const result = await reviewService.createReview(userId, req.params.productId, req.body);
      sendSuccess(res, result, 'Review submitted successfully', 201);
    } catch (error) {
      next(error);
    }
  },

  async updateReview(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as AuthRequest).user!.id;
      const result = await reviewService.updateReview(userId, req.params.id, req.body);
      sendSuccess(res, result, 'Review updated successfully');
    } catch (error) {
      next(error);
    }
  },

  async deleteReview(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as AuthRequest).user!.id;
      await reviewService.deleteReview(userId, req.params.id);
      sendSuccess(res, null, 'Review deleted successfully');
    } catch (error) {
      next(error);
    }
  },
};
