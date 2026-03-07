import { Request, Response, NextFunction } from 'express';
import { sendSuccess, sendPaginated } from '../utils/apiResponse';
import { categoryService } from '../services/category.service';

// TODO: Implement category controller methods
export const categoryController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await categoryService.getAll(req.query as Record<string, string>);
      sendPaginated(res, result.data, result.total, result.page, result.limit);
    } catch (error) {
      next(error);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await categoryService.getById(req.params.id);
      sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await categoryService.create(req.body);
      sendSuccess(res, result, 'Category created successfully', 201);
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await categoryService.update(req.params.id, req.body);
      sendSuccess(res, result, 'Category updated successfully');
    } catch (error) {
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await categoryService.delete(req.params.id);
      sendSuccess(res, null, 'Category deleted successfully');
    } catch (error) {
      next(error);
    }
  },
};
