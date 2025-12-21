import express from 'express';
import { getBrands, createBrand } from '../controllers/brandController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').get(getBrands).post(protect, admin, createBrand);

export default router;
