import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import multer from 'multer';
import categoryRouter from './routes/categoryRouter.js';
import productRouter from './routes/productRouter.js';
import commentRouter from './routes/commentRouter.js';
import likeRouter from './routes/likeRouter.js';
import cartRouter from './routes/cartRouter.js';
import userRouter from './routes/userRouter.js';

const app = express();
const PORT = 3000;

// middlewares
app.use(express.json({ limit: '50mb' }));
app.use(cors());
app.use('/uploads', express.static('uploads')); // Cho phép truy cập ảnh tĩnh

// Cấu hình Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Lưu vào thư mục uploads
  },
  filename: (req, file, cb) => {
    // Đặt tên file duy nhất (timestamp + tên gốc)
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });
// API upload hình ảnh
app.post('/api/upload', upload.array('images', 3), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'Không có file nào được upload' });
    }

    // Trả về mảng link URL
    const fileUrls = req.files.map(file => `http://localhost:3000/uploads/${file.filename}`);

    res.json({
      message: 'Upload thành công',
      urls: fileUrls
    });
  } catch (error) {
    console.log('Upload error:', error);
    res.status(500).json({ error: 'Lỗi server' });
  }
})

// routes
app.use('/api/products', productRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/comments', commentRouter);
app.use('/api/like-product', likeRouter);
app.use('/api/cart', cartRouter);
app.use('/api/users', userRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:3000`);
});