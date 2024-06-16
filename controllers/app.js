const express = require('express');
const router = express.Router();

const register = require('./register');
const login = require('./login');
const logout = require('./logout');
const createNote = require('./createNote');
const deleteNote = require('./deleteNote');
const updateNote = require('./updateNote');
const isLogged = require('./isLogged');
const getNote = require('./getNote');
const updateUser = require('./updateUser');

// Middleware de autenticación
function verificarAutenticacion(req, res, next) {
    // Aquí verificamos si la cookie de usuario o el token JWT están presentes y son válidos
    if (req.cookies.logUser || req.headers['authorization']) {
        // El usuario está autenticado, pasa al siguiente middleware o controlador
        next();
    } else {
        // El usuario no está autenticado, redirigir al inicio de sesión
        res.redirect('/login');
    }
}

// Rutas públicas (no requieren autenticación)
router.post('/register', register);
router.post('/login', login);
router.get('/isLogged', isLogged); // Por lo general, esta ruta verifica si el usuario está autenticado

// Rutas protegidas (requieren autenticación)
router.post('/createNote', verificarAutenticacion, createNote);
router.post('/deleteNote', verificarAutenticacion, deleteNote);
router.post('/updateNote', verificarAutenticacion, updateNote);
router.get('/getNotes', verificarAutenticacion, getNote);
router.post('/updateUser', verificarAutenticacion, updateUser);
router.get('/logout', verificarAutenticacion, logout); // Ejemplo de ruta de logout protegida

module.exports = router;
