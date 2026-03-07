import { Router } from 'express';
import { deliveryController } from '../controllers/delivery.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { adminMiddleware } from '../middleware/admin.middleware';

export const deliveryRoutes = Router();

deliveryRoutes.get('/check/:pinCode', deliveryController.checkServiceability);
deliveryRoutes.get('/', authMiddleware, adminMiddleware, deliveryController.getAllZones);
deliveryRoutes.post('/', authMiddleware, adminMiddleware, deliveryController.createZone);
deliveryRoutes.put('/:id', authMiddleware, adminMiddleware, deliveryController.updateZone);
deliveryRoutes.delete('/:id', authMiddleware, adminMiddleware, deliveryController.deleteZone);
