import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { addressSchema } from '../validators/common.validator';

export const userRoutes = Router();

userRoutes.get('/profile', authMiddleware, userController.getProfile);
userRoutes.put('/profile', authMiddleware, userController.updateProfile);
userRoutes.get('/addresses', authMiddleware, userController.getAddresses);
userRoutes.post('/addresses', authMiddleware, validate(addressSchema), userController.addAddress);
userRoutes.put('/addresses/:id', authMiddleware, userController.updateAddress);
userRoutes.delete('/addresses/:id', authMiddleware, userController.deleteAddress);
userRoutes.patch('/addresses/:id/default', authMiddleware, userController.setDefaultAddress);

