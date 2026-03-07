import { Request, Response, NextFunction } from 'express';
import { sendSuccess, sendPaginated } from '../utils/apiResponse';
import { userService } from '../services/user.service';

// TODO: Implement user controller methods
export const userController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.getAll(req.query as Record<string, string>);
      sendPaginated(res, result.data, result.total, result.page, result.limit);
    } catch (error) {
      next(error);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.getById(req.params.id);
      sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.create(req.body);
      sendSuccess(res, result, 'User created successfully', 201);
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.update(req.params.id, req.body);
      sendSuccess(res, result, 'User updated successfully');
    } catch (error) {
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await userService.delete(req.params.id);
      sendSuccess(res, null, 'User deleted successfully');
    } catch (error) {
      next(error);
    }
  },
};
