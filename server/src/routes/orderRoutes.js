import express from 'express';
import {
    addOrderItems,
    getOrderById,
    getMyOrders,
    getOrders,
} from '../controllers/orderController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);

export default router;
