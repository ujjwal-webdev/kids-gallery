import { Router } from 'express';
import { productController } from '../../controllers/product.controller';

export const adminProductRoutes = Router();

adminProductRoutes.get('/', productController.getAll);
adminProductRoutes.get('/:id', productController.getById);
adminProductRoutes.post('/', productController.create);
adminProductRoutes.put('/:id', productController.update);
adminProductRoutes.delete('/:id', productController.delete);

