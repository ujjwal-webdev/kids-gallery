import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { addressSchema } from '../validators/common.validator';
import { updateProfileSchema } from '../validators/auth.validator';

export const userRoutes = Router();

userRoutes.get('/profile', authMiddleware, userController.getProfile);
userRoutes.put('/profile', authMiddleware, validate(updateProfileSchema), userController.updateProfile);
userRoutes.get('/addresses', authMiddleware, userController.getAddresses);
userRoutes.post('/addresses', authMiddleware, validate(addressSchema), userController.addAddress);
userRoutes.put('/addresses/:id', authMiddleware, validate(addressSchema.partial()), userController.updateAddress);
userRoutes.delete('/addresses/:id', authMiddleware, userController.deleteAddress);
userRoutes.patch('/addresses/:id/default', authMiddleware, userController.setDefaultAddress);

