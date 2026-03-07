import { Request, Response, NextFunction } from 'express';
import { sendSuccess } from '../utils/apiResponse';
import { deliveryService } from '../services/delivery.service';

export const deliveryController = {
  async checkServiceability(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await deliveryService.checkServiceability(req.params.pinCode);
      sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  },

  async getAllZones(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await deliveryService.getAllZones();
      sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  },

  async createZone(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await deliveryService.createZone(req.body);
      sendSuccess(res, result, 'Delivery zone created', 201);
    } catch (error) {
      next(error);
    }
  },

  async updateZone(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await deliveryService.updateZone(req.params.id, req.body);
      sendSuccess(res, result, 'Delivery zone updated');
    } catch (error) {
      next(error);
    }
  },

  async deleteZone(req: Request, res: Response, next: NextFunction) {
    try {
      await deliveryService.deleteZone(req.params.id);
      sendSuccess(res, null, 'Delivery zone deleted');
    } catch (error) {
      next(error);
    }
  },
};
