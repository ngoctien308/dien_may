import express from 'express';
import { getAllCategories, getCategory, createCategory, updateCategory, deleteCategory } from '../controllers/CategoryController.js';
const router = express.Router();

router.route('/:category_id').get(getCategory).put(updateCategory).delete(deleteCategory);
router.route('/').get(getAllCategories).post(createCategory);

export default router;