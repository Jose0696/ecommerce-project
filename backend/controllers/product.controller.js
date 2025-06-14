// controllers/product.controller.js
const { v2: cloudinary } = require('cloudinary');
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../models/product.model');

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const create = async (req, res) => {
  const { name, description, price } = req.body;
  const file = req.file;

  if (!name || !price || !file) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  try {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'productos',
        resource_type: 'image',
      },
      async (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: 'Error al subir la imagen' });
        }

        const image_url = result.secure_url;
        const dbResult = await createProduct(name, description, price, image_url);
        res.status(201).json({ message: 'Producto creado', id: dbResult.insertId });
      }
    );

    uploadStream.end(file.buffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al crear producto' });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener productos' });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener producto' });
  }
};

const update = async (req, res) => {
  const { name, description, price } = req.body;
  const { id } = req.params;

  try {
    // 1. Obtener el producto actual para preservar image_url si no se reemplaza
    const current = await getProductById(id);
    if (!current) return res.status(404).json({ message: 'Producto no encontrado' });

    // 2. Si hay imagen nueva, subirla a Cloudinary
    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'productos',
            resource_type: 'image',
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      current.image_url = uploadResult.secure_url;
    }

    // 3. Actualizar en la base de datos con la imagen nueva o la actual
    await updateProduct(
      id,
      name,
      description,
      price,
      current.image_url // se mantiene la imagen si no se subió nueva
    );

    res.json({ message: 'Producto actualizado correctamente' });
  } catch (err) {
    console.error('Error al actualizar producto:', err.message);
    res.status(500).json({ message: 'Error al actualizar producto' });
  }
};

const remove = async (req, res) => {
  try {
    await deleteProduct(req.params.id);
    res.json({ message: 'Producto eliminado' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar producto' });
  }
};

module.exports = {
  getProducts,
  getProduct,
  create,
  update,
  remove,
};
