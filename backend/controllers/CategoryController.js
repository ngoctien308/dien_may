import db from "../db.js";

export const getAllCategories = async (req, res) => {
    try {
        const [categories] = await db.query(
            'SELECT * from categories ORDER BY category_id DESC'
        );
        res.status(200).json({ categories });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getCategory = async (req, res) => {
    try {
        const [category] = await db.query(
            'SELECT * FROM categories WHERE category_id = ?',
            [req.params.category_id]
        );
        
        if (category.length === 0) {
            return res.status(404).json({ message: 'Danh mục không tồn tại.' });
        }
        
        res.status(200).json({ category: category[0] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createCategory = async (req, res) => {
    try {
        const { category_name } = req.body;
        
        if (!category_name || category_name.trim() === '') {
            return res.status(400).json({ message: 'Tên danh mục không được để trống.' });
        }
        
        const [result] = await db.query(
            'INSERT INTO categories (category_name) VALUES (?)',
            [category_name.trim()]
        );
        
        res.status(201).json({ 
            message: 'Thêm danh mục thành công.',
            category_id: result.insertId 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateCategory = async (req, res) => {
    try {
        const categoryId = req.params.category_id;
        const { category_name } = req.body;
        
        if (!category_name || category_name.trim() === '') {
            return res.status(400).json({ message: 'Tên danh mục không được để trống.' });
        }
        
        // Kiểm tra danh mục có tồn tại không
        const [category] = await db.query(
            'SELECT * FROM categories WHERE category_id = ?',
            [categoryId]
        );
        
        if (category.length === 0) {
            return res.status(404).json({ message: 'Danh mục không tồn tại.' });
        }
        
        await db.query(
            'UPDATE categories SET category_name = ? WHERE category_id = ?',
            [category_name.trim(), categoryId]
        );
        
        res.status(200).json({ message: 'Cập nhật danh mục thành công.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.category_id;
        
        // Kiểm tra danh mục có tồn tại không
        const [category] = await db.query(
            'SELECT * FROM categories WHERE category_id = ?',
            [categoryId]
        );
        
        if (category.length === 0) {
            return res.status(404).json({ message: 'Danh mục không tồn tại.' });
        }
        
        await db.query(
            'DELETE FROM categories WHERE category_id = ?',
            [categoryId]
        );
        
        res.status(200).json({ message: 'Xóa danh mục thành công.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}