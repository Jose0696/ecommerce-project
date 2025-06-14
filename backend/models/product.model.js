const db = require('../config/db');

const getAllProducts = async () => {
  const [rows] = await db.query('SELECT * FROM products ORDER BY created_at DESC');
  return rows;
};

const getProductById = async (id) => {
  const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
  return rows[0];
};

const createProduct = async (name, description, price, image_url) => {
  const [result] = await db.query(
    'INSERT INTO products (name, description, price, image_url) VALUES (?, ?, ?, ?)',
    [name, description, price, image_url]
  );
  return result;
};

const updateProduct = async (id, name, description, price, image_url) => {
  const [result] = await db.query(
    'UPDATE products SET name = ?, description = ?, price = ?, image_url = ? WHERE id = ?',
    [name, description, price, image_url, id]
  );
  return result;
};

const deleteProduct = async (id) => {
  const [result] = await db.query('DELETE FROM products WHERE id = ?', [id]);
  return result;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
