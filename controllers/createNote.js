const jwt = require('jsonwebtoken');
const db = require('../routes/db-config');
const { format } = require('date-fns'); // Importa la función format de date-fns

const createNote = (req, res) => {
    if (!req.cookies.logUser) return res.json({ status: 0, message: 'Please login again!' });
    const user = jwt.verify(req.cookies.logUser, process.env.JWT_SECRET, (err, id) => {
        if (err) return null;
        else return id;
    });
    if (user == null) return res.json({ status: 0, message: 'Please login again!' });

    const { title, note } = req.body;

    // Formatea la fecha usando date-fns
    const date = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

    db.query('INSERT INTO note SET ?', { title, note, date, user_id: user.id }, (err, result) => {
        if (err) {
            console.error("Error inserting note:", err);
            return res.json({ status: 0, message: 'Failed to add note' });
        }
        return res.json({ status: 1, message: 'Note has been added!' });
    });
};

module.exports = createNote;
