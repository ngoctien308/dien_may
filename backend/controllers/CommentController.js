import db from "../db.js";

export const getAllComments = async (req, res) => {
  try {
    const [comments] = await db.query(`
      SELECT 
        c.*,
        p.product_name
      FROM comments c
      LEFT JOIN products p ON c.product_id = p.product_id      
    `);
    res.status(200).json({ comments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getCommentsByProduct = async (req, res) => {
  try {
    const productId = req.params.product_id;
    const [comments] = await db.query(`
      SELECT 
        c.*
      FROM comments c
      WHERE c.product_id = ?
    `, [productId]);
    res.status(200).json({ comments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const createComment = async (req, res) => {
  try {
    const { product_id, user_id, comment_content, comment_rating } = req.body;
    
    if (!product_id || !user_id || !comment_content) {
      return res.status(400).json({ message: 'Thiếu thông tin bắt buộc.' });
    }

    await db.query(
      'INSERT INTO comments (product_id, user_id, comment_content, comment_rating) VALUES (?, ?, ?, ?)',
      [product_id, user_id, comment_content, comment_rating || null]
    );

    res.status(201).json({ 
      message: 'Thêm bình luận thành công.'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const updateComment = async (req, res) => {
  try {
    const commentId = req.params.comment_id;
    const { comment_content, comment_rating } = req.body;
    
    // Kiểm tra comment có tồn tại không
    const [comment] = await db.query(
      'SELECT * FROM comments WHERE comment_id = ?',
      [commentId]
    );

    if (comment.length === 0) {
      return res.status(404).json({ message: 'Bình luận không tồn tại.' });
    }

    await db.query(
      'UPDATE comments SET comment_content = ?, comment_rating = ? WHERE comment_id = ?',
      [comment_content, comment_rating, commentId]
    );

    res.status(200).json({ message: 'Cập nhật bình luận thành công.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.comment_id;
    
    // Kiểm tra comment có tồn tại không
    const [comment] = await db.query(
      'SELECT * FROM comments WHERE comment_id = ?',
      [commentId]
    );

    if (comment.length === 0) {
      return res.status(404).json({ message: 'Bình luận không tồn tại.' });
    }

    await db.query(
      'DELETE FROM comments WHERE comment_id = ?',
      [commentId]
    );

    res.status(200).json({ message: 'Xóa bình luận thành công.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getCommentStats = async (req, res) => {
  try {
    const [stats] = await db.query(`
      SELECT 
        COUNT(*) as total_comments,
        AVG(comment_rating) as average_rating,
        COUNT(CASE WHEN comment_rating IS NOT NULL THEN 1 END) as rated_comments
      FROM comments
    `);
    
    const [recentComments] = await db.query(`
      SELECT COUNT(*) as recent_count
      FROM comments 
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
    `);

    res.status(200).json({ 
      stats: {
        ...stats[0],
        recent_comments: recentComments[0].recent_count
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
