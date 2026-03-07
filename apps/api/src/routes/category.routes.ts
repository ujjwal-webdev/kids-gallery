import { Router } from 'express';
import { categoryController } from '../controllers/category.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { adminMiddleware } from '../middleware/admin.middleware';

export const categoryRoutes = Router();

categoryRoutes.get('/', categoryController.getAll);
categoryRoutes.get('/tree', categoryController.getTree);
categoryRoutes.get('/:slug', categoryController.getBySlug);
categoryRoutes.post('/', authMiddleware, adminMiddleware, categoryController.create);
categoryRoutes.put('/:id', authMiddleware, adminMiddleware, categoryController.update);
categoryRoutes.delete('/:id', authMiddleware, adminMiddleware, categoryController.delete);

