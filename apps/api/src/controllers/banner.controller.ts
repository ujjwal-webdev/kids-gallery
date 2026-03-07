import { Request, Response, NextFunction } from 'express';
import { sendSuccess, sendPaginated } from '../utils/apiResponse';
import { bannerService } from '../services/banner.service';

// TODO: Implement banner controller methods
export const bannerController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await bannerService.getAll(req.query as Record<string, string>);
      sendPaginated(res, result.data, result.total, result.page, result.limit);
    } catch (error) {
      next(error);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await bannerService.getById(req.params.id);
      sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await bannerService.create(req.body);
      sendSuccess(res, result, 'Banner created successfully', 201);
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await bannerService.update(req.params.id, req.body);
      sendSuccess(res, result, 'Banner updated successfully');
    } catch (error) {
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await bannerService.delete(req.params.id);
      sendSuccess(res, null, 'Banner deleted successfully');
    } catch (error) {
      next(error);
    }
  },
};
