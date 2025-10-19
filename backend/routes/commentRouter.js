import express from 'express';
import { 
  getAllComments, 
  getCommentsByProduct, 
  createComment, 
  updateComment, 
  deleteComment,
  getCommentStats 
} from '../controllers/CommentController.js';

const router = express.Router();

// Admin routes
router.route('/stats').get(getCommentStats);
router.route('/').get(getAllComments);

// Product-specific routes
router.route('/product/:product_id').get(getCommentsByProduct);
router.route('/product/:product_id').post(createComment);

// Individual comment routes
router.route('/:comment_id').put(updateComment).delete(deleteComment);

export default router;
