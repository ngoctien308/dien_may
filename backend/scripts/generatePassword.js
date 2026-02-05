import bcrypt from 'bcrypt';

// Script để tạo password hash cho admin
const password = process.argv[2] || 'admin123';

bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error('Lỗi tạo hash:', err);
    return;
  }
  console.log('Password:', password);
  console.log('Hash:', hash);
  console.log('\nCopy hash này vào SQL file để tạo admin mặc định.');
});
