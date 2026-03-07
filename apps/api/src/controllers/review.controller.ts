import { Request, Response, NextFunction } from 'express';
import { sendSuccess, sendPaginated } from '../utils/apiResponse';
import { reviewService } from '../services/review.service';
import { AuthRequest } from '../types';

export const reviewController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const productId = req.params.productId ?? (req.query.productId as string);
      const result = await reviewService.getProductReviews(productId, req.query as Record<string, string>);
      sendPaginated(res, result.data, result.total, result.page, result.limit);
    } catch (error) {
      next(error);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await reviewService.getReviewById(req.params.id);
      sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as AuthRequest).user!.id;
      const productId = req.params.productId ?? req.body.productId;
      const result = await reviewService.createReview(userId, productId, req.body);
      sendSuccess(res, result, 'Review created successfully', 201);
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as AuthRequest).user!.id;
      const result = await reviewService.updateReview(userId, req.params.id, req.body);
      sendSuccess(res, result, 'Review updated successfully');
    } catch (error) {
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as AuthRequest).user!.id;
      await reviewService.deleteReview(userId, req.params.id);
      sendSuccess(res, null, 'Review deleted successfully');
    } catch (error) {
      next(error);
    }
  },
};
