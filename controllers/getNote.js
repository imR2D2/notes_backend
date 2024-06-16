const jwt = require('jsonwebtoken');
const db = require('../routes/db-config');

const getNote = (req, res) => {

    if (!req.cookies.logUser) return res.json({ status: 0, message: 'Please login again!' });

    const user = jwt.verify(req.cookies.logUser, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return null;
        return decoded; // decoded contiene la información del token, incluyendo el id del usuario
    });

    if (!user) return res.json({ status: 0, message: 'Please login again!' });

    db.query('SELECT * FROM note WHERE user_id = ?', [user.id], (err, result) => {
        if (err) {
            console.error("Error inserting note:", err);
            return res.json({ status: 0, message: 'Failed to add note' });
        }
        return res.json({ status: 1, message: result });
    });
};

module.exports = getNote;
