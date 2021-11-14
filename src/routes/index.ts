import { Router } from 'express';
import productsRouter from './productos';
import cartRouter from './carrito';
import userRouter from  './user';
import authRouter from './auth';
import { isLoggedIn } from '../middleware/admin';

const router = Router();

router.use('/products', productsRouter);
router.use('/cart', isLoggedIn,cartRouter);
router.use('/user', userRouter);
router.use('/auth', authRouter)

export default router;
