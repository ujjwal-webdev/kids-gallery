import { Router } from 'express';
import { productController } from '../controllers/product.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { adminMiddleware } from '../middleware/admin.middleware';

export const productRoutes = Router();

productRoutes.get('/', productController.getAll);
productRoutes.get('/featured', productController.getFeatured);
productRoutes.get('/search', productController.search);
productRoutes.get('/:slug', productController.getBySlug);
productRoutes.post('/', authMiddleware, adminMiddleware, productController.create);
productRoutes.put('/:id', authMiddleware, adminMiddleware, productController.update);
productRoutes.delete('/:id', authMiddleware, adminMiddleware, productController.delete);

