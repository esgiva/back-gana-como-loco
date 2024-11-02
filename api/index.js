const express = require('express');
const cors = require('cors');
const connectDB = require('../config/db');
const userRoutes = require('../routes/userRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'https://tu-frontend-url.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true
}));
app.use(express.json());

// Conexión a la base de datos
connectDB();

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API de Gana Como Loco funcionando correctamente' });
});

// Rutas
app.use('/v1/drivers', userRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Algo salió mal!' });
});

// Puerto
const PORT = process.env.PORT || 4000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
}

module.exports = app;