import { Router } from 'express';
import { productController } from '../controllers/product.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { adminMiddleware } from '../middleware/admin.middleware';
import { validate } from '../middleware/validate.middleware';
import { createProductSchema, updateProductSchema } from '../validators/product.validator';

export const productRoutes = Router();

productRoutes.get('/', productController.getAll);
productRoutes.get('/featured', productController.getFeatured);
productRoutes.get('/search', productController.search);
productRoutes.get('/:slug', productController.getBySlug);
productRoutes.post('/', authMiddleware, adminMiddleware, validate(createProductSchema), productController.create);
productRoutes.put('/:id', authMiddleware, adminMiddleware, validate(updateProductSchema), productController.update);
productRoutes.delete('/:id', authMiddleware, adminMiddleware, productController.delete);

