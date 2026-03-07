import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { authMiddleware } from '../middleware/auth.middleware';

export const userRoutes = Router();

userRoutes.get('/me', authMiddleware, userController.getProfile);
userRoutes.put('/me', authMiddleware, userController.updateProfile);
userRoutes.get('/me/addresses', authMiddleware, userController.getAddresses);
userRoutes.post('/me/addresses', authMiddleware, userController.addAddress);
userRoutes.put('/me/addresses/:id', authMiddleware, userController.updateAddress);
userRoutes.delete('/me/addresses/:id', authMiddleware, userController.deleteAddress);
userRoutes.patch('/me/addresses/:id/default', authMiddleware, userController.setDefaultAddress);
