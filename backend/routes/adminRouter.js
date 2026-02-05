import express from 'express';
import { adminLogin, verifyAdminToken, getCurrentAdmin } from '../controllers/adminController.js';

const router = express.Router();

// Đăng nhập (không cần xác thực)
router.post('/login', adminLogin);

// Lấy thông tin admin hiện tại (cần xác thực)
router.get('/me', verifyAdminToken, getCurrentAdmin);

export default router;
