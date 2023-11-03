import { Router } from 'express';
import {
    createProduct,
    deleteProduct,
    getProductDetails,
    getProducts,
    updateProduct,
} from '../controllers/product.js';
import passport from 'passport';
const router = Router();

router.post(
    '/create',
    passport.authenticate('jwt', { session: false }),
    createProduct
);
router.get('/', getProducts);
router
    .route('/:productId')
    .get(getProductDetails)
    .patch(passport.authenticate('jwt', { session: false }), updateProduct)
    .delete(passport.authenticate('jwt', { session: false }), deleteProduct);

export default router;
