import { Request, Response, NextFunction } from 'express';
import { sendSuccess } from '../utils/apiResponse';
import { categoryService } from '../services/category.service';

export const categoryController = {
  async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const result = await categoryService.getAll();
      sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  },

  async getTree(_req: Request, res: Response, next: NextFunction) {
    try {
      const result = await categoryService.getTree();
      sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  },

  async getBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await categoryService.getBySlug(req.params.slug);
      sendSuccess(res, result);
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
      const result = await categoryService.create(req.body as Record<string, unknown>);
      sendSuccess(res, result, 'Category created successfully', 201);
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await categoryService.update(req.params.id, req.body as Record<string, unknown>);
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
