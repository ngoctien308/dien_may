import express from 'express';
import { addItemToCart, getAllCartItemsByUserId, removeCartItemById, updateCartItemQuantity } from '../controllers/CartController.js';
const router = express.Router();

router.route('/user/:userId').get(getAllCartItemsByUserId).post(addItemToCart);
router.route('/:cartId').delete(removeCartItemById).put(updateCartItemQuantity);

export default router;