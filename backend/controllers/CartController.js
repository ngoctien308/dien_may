import db from "../db.js";

export const getAllCartItemsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const [products] = await db.query(`select * from cart inner join products on cart.product_id = products.product_id inner join product_versions on cart.version_id = product_versions.version_id where cart.user_id = ?`, [userId]);
        res.status(200).json({ products });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Lỗi server' });
    }
};

export const addItemToCart = async (req, res) => {
    try {
        const { productId, quantity, versionId } = req.body;
        const { userId } = req.params;

        if (!productId || !quantity || !versionId) {
            return res.status(400).json({ error: 'Thiếu thông tin sản phẩm hoặc số lượng' });
        }

        const [product] = await db.query(`select * from cart where product_id = ?`, [productId]);
        if (product.length > 0) {
            await db.query(`update cart set quantity = quantity + ? where product_id = ?`, [quantity, productId]);
        }
        else
            await db.query(`insert into cart (user_id, product_id,quantity,version_id) values (?,?,?,?)`, [userId, productId, quantity, versionId]);

        res.status(201).json({ message: 'Thêm sản phẩm vào giỏ hàng thành công' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Lỗi server' });
    }
};

export const updateCartItemQuantity = async (req, res) => {
    try {
        const { cartId } = req.params;
        const { quantity } = req.body;
        await db.query(`update cart set quantity = ? where cart_id = ?`, [quantity, cartId]);
        res.status(200).json({ message: 'Cập nhật số lượng sản phẩm trong giỏ hàng thành công' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Lỗi server' });
    }
}

export const removeCartItemById = async (req, res) => {
    try {
        await db.query(`delete from cart where cart_id = ?`, [req.params.cartId]);
        res.status(200).json({ message: 'Xóa sản phẩm khỏi giỏ hàng thành công' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Lỗi server' });
    }
};