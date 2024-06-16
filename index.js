const express = require('express');
const dotenv = require('dotenv');
const db = require('./routes/db-config');
const cookieParser = require('cookie-parser');

const cors = require('cors'); // Importa el paquete cors

const app = express();

// Middleware para desactivar la caché
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store');
    res.setHeader('Pragma', 'no-cache');
    next();
});

// Cargar variables de entorno
dotenv.config();

// Configurar puerto
const PORT = process.env.PORT || 5001;

// Middlewares
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Rutas de la API
app.use('/api', require('./controllers/app'));

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
