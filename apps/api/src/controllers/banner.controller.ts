import { Request, Response, NextFunction } from 'express';
import { sendSuccess } from '../utils/apiResponse';
import { bannerService } from '../services/banner.service';

export const bannerController = {
  async getActiveBanners(req: Request, res: Response, next: NextFunction) {
    try {
      const { platform } = req.query as { platform?: string };
      const result = await bannerService.getActiveBanners(platform);
      sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  },

  async getAllBanners(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await bannerService.getAllBanners();
      sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  },

  async createBanner(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await bannerService.createBanner(req.body);
      sendSuccess(res, result, 'Banner created successfully', 201);
    } catch (error) {
      next(error);
    }
  },

  async updateBanner(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await bannerService.updateBanner(req.params.id, req.body);
      sendSuccess(res, result, 'Banner updated successfully');
    } catch (error) {
      next(error);
    }
  },

  async deleteBanner(req: Request, res: Response, next: NextFunction) {
    try {
      await bannerService.deleteBanner(req.params.id);
      sendSuccess(res, null, 'Banner deleted successfully');
    } catch (error) {
      next(error);
    }
  },
};
