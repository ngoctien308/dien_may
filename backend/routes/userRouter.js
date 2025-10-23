import express from 'express';
import { getUserFromClerkById } from '../controllers/userController.js';
const router = express.Router();

router.get('/:userId', getUserFromClerkById)

export default router;