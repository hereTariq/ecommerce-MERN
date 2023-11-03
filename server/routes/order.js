import { Router } from 'express';
import { createOrder, getOrder } from '../controllers/order.js';
const router = Router();

router.route('/').post(createOrder).get(getOrder);

export default router;
