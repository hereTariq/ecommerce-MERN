import { Router } from 'express';
import { addProductToCart, deleteCart, getCart } from '../controllers/cart.js';

const router = Router();

router.route('/').post(addProductToCart).get(getCart).delete(deleteCart);

export default router;
