import db from "../db.js";

export const getAllProducts = async (req, res) => {
  try {
    const [products] = await db.query(
      'SELECT * from products'
    );
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getProduct = async (req, res) => {
  try {
    const [product] = await db.query(
      'SELECT * from products where product_id = ?',
      [req.params.product_id]
    );

    const [versions] = await db.query(
      'SELECT * from product_versions where product_id = ?',
      [req.params.product_id]
    );

    const returnedProduct = { ...product[0], versions: versions };

    res.status(200).json({ product: returnedProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const versionString = req.body.versions;
    const versionsArray = versionString
      .split(',')
      .map(v => v.trim())
      .filter(v => v.length > 0); // loại bỏ chuỗi rỗng

    const [newProduct] = await db.query(
      'insert into products (product_name,product_price,product_discount,specifications,description,category_id,image1,image2,image3) values (?,?,?,?,?,?,?,?,?)',
      [
        req.body.product_name,
        req.body.product_price,
        req.body.product_discount,
        req.body.specifications,
        req.body.description,
        req.body.category_id,
        req.body.image1,
        req.body.image2,
        req.body.image3
      ]
    );
    versionsArray.forEach(async version => {
      await db.query('insert into product_versions (product_id, version_name) values (?,?)',
        [newProduct.insertId, version]
      )
    });
    res.status(200).json({ message: 'Thêm thành công.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};