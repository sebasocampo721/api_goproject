require('dotenv').config();
console.log('JWT_SECRET:', process.env.JWT_SECRET);
const express = require('express');
const cors = require('cors');
const app = express();


// Habilitar CORS para cualquier origen y métodos especificados
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware para parsear JSON
app.use(express.json());

// Importar todas las rutas desde routes.js
const routes = require('./routes/routes'); // Ajusta la ruta si tu archivo está en otro lugar
app.use('/api', routes);

// Ruta de prueba para verificar que la API está activa
app.get('/', (req, res) => {
  res.json({ message: "API activa" });
});

// Configuración del puerto y levantar servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
