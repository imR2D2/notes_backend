const bcrypt = require('bcryptjs');
const db = require('../routes/db-config');
require('dotenv').config();

const register = async (req, res) => {
    const { username, password: rawPass } = req.body;

    // Verificar si el usuario ya existe
    db.query('SELECT username FROM users WHERE username = ?', [username], async (err, chkuser) => {
        if (err) {
            console.error('Error al verificar usuario existente:', err);
            return res.json({ status: 0, message: 'Error occurred while checking user existence.' });
        }

        if (chkuser.length > 0) {
            return res.json({ status: 0, message: 'User already exists with the username!' });
        }

        // Si el usuario no existe, procedemos a registrar
        const password = await bcrypt.hash(rawPass, 10);

        db.query('INSERT INTO users SET ?', { username, password }, (err, result) => {
            if (err) {
                console.error('Error al registrar usuario:', err);
                return res.json({ status: 0, message: 'Error occurred while registering user.' });
            }
            return res.json({ status: 1, message: 'User has been registered!' });
        });
    });
};

module.exports = register;
