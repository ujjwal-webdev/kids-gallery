import { Router } from 'express';
import { wishlistController } from '../controllers/wishlist.controller';
import { authMiddleware } from '../middleware/auth.middleware';

export const wishlistRoutes = Router();

// All wishlist routes require authentication
wishlistRoutes.use(authMiddleware);

wishlistRoutes.get('/', wishlistController.getWishlist);
wishlistRoutes.post('/:productId', wishlistController.toggle);
wishlistRoutes.delete('/:productId', wishlistController.remove);
wishlistRoutes.get('/check/:productId', wishlistController.check);
