import express from 'express';
import { createProduct, getAllProducts, getProduct } from '../controllers/ProductController.js';
const router = express.Router();

router.route('/:product_id').get(getProduct);
router.route('/').get(getAllProducts).post(createProduct);

export default router;