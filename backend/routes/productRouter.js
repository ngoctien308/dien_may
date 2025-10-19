import express from 'express';
import { createProduct, getAllProducts, getProduct, updateProduct, deleteProduct } from '../controllers/ProductController.js';
const router = express.Router();

router.route('/:product_id').get(getProduct).put(updateProduct).delete(deleteProduct);
router.route('/').get(getAllProducts).post(createProduct);

export default router;