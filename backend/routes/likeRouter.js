import express from 'express';
import { addProductToFavorites,checkProductInFavorites,removeProductFromFavorites,getUserFavorites } from '../controllers/likeController.js';
const router = express.Router();

router.route('/product/:productId/user/:userId').get(checkProductInFavorites).delete(removeProductFromFavorites);
router.route('/user/:userId').get(getUserFavorites);
router.route('/').post(addProductToFavorites);
export default router;