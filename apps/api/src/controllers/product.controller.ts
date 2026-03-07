import { Request, Response, NextFunction } from 'express';
import { sendSuccess, sendPaginated } from '../utils/apiResponse';
import { productService } from '../services/product.service';

export const productController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await productService.getAll(req.query as Record<string, string>);
      sendPaginated(res, result.data, result.total, result.page, result.limit);
    } catch (error) {
      next(error);
    }
  },

  async getFeatured(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await productService.getFeatured();
      sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  },

  async search(req: Request, res: Response, next: NextFunction) {
    try {
      const { q, ...pagination } = req.query as Record<string, string>;
      const result = await productService.search(q || '', pagination);
      sendPaginated(res, result.data, result.total, result.page, result.limit);
    } catch (error) {
      next(error);
    }
  },

  async getBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await productService.getBySlug(req.params.slug);
      sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await productService.getById(req.params.id);
      sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await productService.create(req.body);
      sendSuccess(res, result, 'Product created successfully', 201);
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await productService.update(req.params.id, req.body);
      sendSuccess(res, result, 'Product updated successfully');
    } catch (error) {
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await productService.delete(req.params.id);
      sendSuccess(res, null, 'Product deleted successfully');
    } catch (error) {
      next(error);
    }
  },
};
