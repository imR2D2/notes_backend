const jwt = require('jsonwebtoken');
const db = require('../routes/db-config');

const isLogged = (req, res) => {
    if (!req.cookies.logUser) {
        return res.json({ status: 0, message: 'User not logged in' });
    }

    // Verificar el token JWT
    jwt.verify(req.cookies.logUser, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error("Error verifying JWT:", err);
            return res.json({ status: 0, message: 'Please login again' });
        }

        const userId = decoded.id;

        // Consultar la base de datos para obtener el usuario
        db.query('SELECT username, id FROM users WHERE id = ?', [userId], (err, result) => {
            if (err) {
                console.error("Database query error:", err);
                return res.json({ status: 0, message: 'Database error' });
            }

            if (result.length === 0) {
                return res.json({ status: 0, message: 'User not found' });
            }

            const username = result[0].username;
            const id = result[0].id;
            return res.json({ status: 1, user: username, id: id });
        });
    });
};

module.exports = isLogged;
