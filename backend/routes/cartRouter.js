import express from 'express';
import { addItemToCart, getAllCartItemsByUserId } from '../controllers/CartController.js';
const router = express.Router();

router.route('/user/:userId').get(getAllCartItemsByUserId).post(addItemToCart);

export default router;