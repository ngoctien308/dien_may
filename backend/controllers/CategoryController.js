import db from "../db.js";

export const getAllCategories = async (req, res) => {
    try {
        const [categories] = await db.query(
            'SELECT * from categories'
        );
        res.status(200).json({ categories });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}