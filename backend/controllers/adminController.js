import db from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Đăng nhập admin
export const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Vui lòng nhập đầy đủ thông tin' });
    }

    // Tìm admin theo username
    const [admins] = await db.execute(
      'SELECT * FROM admins WHERE admin_username = ?',
      [username]
    );

    if (admins.length === 0) {
      return res.status(401).json({ error: 'Tên đăng nhập hoặc mật khẩu không đúng' });
    }

    const admin = admins[0];

    // Kiểm tra mật khẩu
    const isPasswordValid = await bcrypt.compare(password, admin.admin_password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Tên đăng nhập hoặc mật khẩu không đúng' });
    }

    // Tạo JWT token
    const token = jwt.sign(
      { 
        adminId: admin.admin_id, 
        username: admin.admin_username 
      },
      process.env.JWT_SECRET || 'your-secret-key-change-in-production',
      { expiresIn: '24h' }
    );

    res.status(200).json({
      message: 'Đăng nhập thành công',
      token,
      admin: {
        id: admin.admin_id,
        username: admin.admin_username,
        name: admin.admin_name
      }
    });
  } catch (error) {
    console.error('Lỗi đăng nhập admin:', error);
    res.status(500).json({ error: 'Lỗi server' });
  }
};

// Xác thực token admin (middleware)
export const verifyAdminToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer token

    if (!token) {
      return res.status(401).json({ error: 'Không có token xác thực' });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your-secret-key-change-in-production'
    );

    // Kiểm tra admin có tồn tại không
    const [admins] = await db.execute(
      'SELECT * FROM admins WHERE admin_id = ?',
      [decoded.adminId]
    );

    if (admins.length === 0) {
      return res.status(401).json({ error: 'Admin không tồn tại' });
    }

    req.admin = admins[0];
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Token không hợp lệ' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token đã hết hạn' });
    }
    console.error('Lỗi xác thực token:', error);
    res.status(500).json({ error: 'Lỗi server' });
  }
};

// Lấy thông tin admin hiện tại
export const getCurrentAdmin = async (req, res) => {
  try {
    res.status(200).json({
      admin: {
        id: req.admin.admin_id,
        username: req.admin.admin_username,
        name: req.admin.admin_name
      }
    });
  } catch (error) {
    console.error('Lỗi lấy thông tin admin:', error);
    res.status(500).json({ error: 'Lỗi server' });
  }
};
