import { Request, Response, NextFunction } from 'express';
import { sendSuccess } from '../utils/apiResponse';
import { bannerService } from '../services/banner.service';

export const bannerController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await bannerService.getAllBanners();
      sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await bannerService.getBannerById(req.params.id);
      sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await bannerService.createBanner(req.body);
      sendSuccess(res, result, 'Banner created successfully', 201);
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await bannerService.updateBanner(req.params.id, req.body);
      sendSuccess(res, result, 'Banner updated successfully');
    } catch (error) {
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await bannerService.deleteBanner(req.params.id);
      sendSuccess(res, null, 'Banner deleted successfully');
    } catch (error) {
      next(error);
    }
  },
};
