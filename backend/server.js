const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{res.send("app funcionando")})
// Rutas
const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

const productRoutes = require('./routes/product.routes');
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
