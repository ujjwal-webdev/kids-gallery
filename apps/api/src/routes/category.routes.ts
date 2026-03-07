import { Router } from 'express';
import { categoryController } from '../controllers/category.controller';
import { authMiddleware } from '../middleware/auth.middleware';

export const categoryRoutes = Router();

// TODO: Implement category getAll
categoryRoutes.get('/', categoryController.getAll);

// TODO: Implement category getById
categoryRoutes.get('/:id', categoryController.getById);

// TODO: Implement category create
categoryRoutes.post('/', authMiddleware, categoryController.create);

// TODO: Implement category update
categoryRoutes.put('/:id', authMiddleware, categoryController.update);

// TODO: Implement category delete
categoryRoutes.delete('/:id', authMiddleware, categoryController.delete);
