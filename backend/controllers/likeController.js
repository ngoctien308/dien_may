import db from "../db.js";

export const addProductToFavorites = async (req, res) => {
    try {
        await db.query('insert into liked_products (user_id, product_id) values (?,?)', [req.body.userId, req.body.productId]);
        res.status(200).json({ message: 'Sản phẩm đã được thêm vào danh sách yêu thích.' });
    } catch (error) {
        res.status(500).json({ error: 'Lỗi thêm sản phẩm vào danh sách yêu thích.' });
    }
}

export const checkProductInFavorites = async (req, res) => {
    try {
        const { userId, productId } = req.params;

        const [rows] = await db.query(
            'SELECT 1 FROM liked_products WHERE user_id = ? AND product_id = ? LIMIT 1',
            [userId, productId]
        );

        // ✅ chỉ cần kiểm tra có dòng nào hay không
        const isLiked = rows.length > 0;

        res.status(200).json({ isLiked });
    } catch (error) {
        console.error('Lỗi kiểm tra sản phẩm yêu thích:', error);
        res.status(500).json({ error: 'Lỗi server' });
    }
};

export const removeProductFromFavorites = async (req, res) => {
    try {
        const { userId, productId } = req.params; // Lấy userId và productId từ body
        await db.query('delete from liked_products where user_id = ? and product_id = ?', [userId, productId]);
        res.status(200).json({ message: 'Sản phẩm đã được xóa khỏi danh sách yêu thích.' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Lỗi xóa sản phẩm khỏi danh sách yêu thích.' });
    }
}

export const getUserFavorites = async (req, res) => {
    try {
        const { userId } = req.params;
        const [likedProducts] = await db.query(`select * from liked_products inner join products on products.product_id = liked_products.product_id where user_id = ?`, [userId]);
        res.status(200).json({ likedProducts });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Lỗi.' });
    }
}