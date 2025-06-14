const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../models/user.model');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    console.log('Registrando:', name, email);

    const existing = await findUserByEmail(email);
    console.log('Usuario existente:', existing);

    if (existing) return res.status(400).json({ message: 'Usuario ya registrado' });

    const hashed = await bcrypt.hash(password, 10);
    console.log('Password hasheado');

    await createUser(name, email, hashed);
    console.log('Usuario creado');

    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (err) {
    console.error('Error en register:', err.message);
    res.status(500).json({ message: 'Error 500 en el servidor' });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Credenciales inválidas' });

    const token = jwt.sign(
      { id: user.id, role: user.role, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

const createDefaultAdmin = async (req, res) => {
  const email = 'admin@gmail.com';

  try {
    const existing = await findUserByEmail(email);
    if (existing) {
      return res.status(400).json({ message: 'El usuario admin ya existe.' });
    }

    const hashed = await bcrypt.hash('admin', 10);
    await createUser('Administrador', email, hashed, 'admin');

    res.status(201).json({ message: 'Usuario admin creado con éxito', email, password: 'admin' });
  } catch (err) {
    res.status(500).json({ message: 'Error al crear el admin' });
  }
};

module.exports = {
  register,
  login,
  createDefaultAdmin,
};
