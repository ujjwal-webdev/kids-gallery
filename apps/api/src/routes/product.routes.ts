import { Router } from 'express';
import { productController } from '../controllers/product.controller';
import { authMiddleware } from '../middleware/auth.middleware';

export const productRoutes = Router();

// TODO: Implement product getAll
productRoutes.get('/', productController.getAll);

// TODO: Implement product getById
productRoutes.get('/:id', productController.getById);

// TODO: Implement product create
productRoutes.post('/', authMiddleware, productController.create);

// TODO: Implement product update
productRoutes.put('/:id', authMiddleware, productController.update);

// TODO: Implement product delete
productRoutes.delete('/:id', authMiddleware, productController.delete);
