const jwt = require('jsonwebtoken');
const db = require('../routes/db-config');

const updateUser = (req, res) => {
    if (!req.cookies.logUser) return res.json({ status: 0, message: 'Please login again!' });

    const user = jwt.verify(req.cookies.logUser, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return null;
        return decoded; // decoded contiene la información del token, incluyendo el id del usuario
    });

    if (!user) return res.json({ status: 0, message: 'Please login again!' });

    const { username } = req.body; // Se espera que el nuevo nombre de usuario venga en el cuerpo de la solicitud

    db.query('UPDATE users SET username = ? WHERE id = ?', [username, user.id], (err, result) => {
        if (err) {
            console.error("Error updating user:", err);
            return res.json({ status: 0, message: 'Failed to update user' });
        }
        return res.json({ status: 1, message: 'User updated successfully!' });
    });
};

module.exports = updateUser;
