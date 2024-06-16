require('dotenv').config();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../routes/db-config');

const login = async (req, res) => {
    const { username, password } = req.body;

    // Consulta el usuario en la base de datos
    db.query('SELECT * FROM users WHERE username = ?', [username], async (error, chkuser) => {
        if(error) throw error
        if(!chkuser[0] || !await bcrypt.compare(password, chkuser[0].password)) return res.json({status:0,
            message: 'User is not registered'})

        // Genera el token JWT
        const token = jwt.sign({ id: chkuser[0].id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES
        });

        // Configura las opciones de la cookie
        const cookieOptions = {
            expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000), // en milisegundos
            httpOnly: true
            // secure: true, // si estás en HTTPS
            // sameSite: 'Strict' // dependiendo de tus necesidades de seguridad
        };

        // Configura la cookie en la respuesta
        res.cookie('logUser', token, cookieOptions);

        // Devuelve la respuesta JSON con el mensaje de éxito
        return res.json({ status: 1, message: 'User has been logged in!' });
    });
};

module.exports = login;
