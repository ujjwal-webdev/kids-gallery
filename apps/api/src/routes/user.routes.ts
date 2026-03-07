import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { authMiddleware } from '../middleware/auth.middleware';

export const userRoutes = Router();

// TODO: Implement user getById
userRoutes.get('/me', authMiddleware, userController.getById);

// TODO: Implement user update
userRoutes.put('/me', authMiddleware, userController.update);

// TODO: Implement user getAll
userRoutes.get('/me/addresses', authMiddleware, userController.getAll);

// TODO: Implement user create
userRoutes.post('/me/addresses', authMiddleware, userController.create);

// TODO: Implement user update
userRoutes.put('/me/addresses/:id', authMiddleware, userController.update);

// TODO: Implement user delete
userRoutes.delete('/me/addresses/:id', authMiddleware, userController.delete);
