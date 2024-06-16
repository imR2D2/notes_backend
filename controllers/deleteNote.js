const jwt = require('jsonwebtoken')
const db = require('../routes/db-config');

const deleteNote = (req, res) => {
    if (!req.cookies.logUser) return res.json({ status: 0, message: 'Please login again!' })
    const user = jwt.verify(req.cookies.logUser, process.env.JWT_SECRET, (err, id) => {
        if (err) return null
        else return id
    })

    if (user == null) res.json({ status: 0, message: 'Please login again!' })
    
    const {id} = req.body
    db.query('DELETE FROM note WHERE note_id = ?', [req.body.note_id], (err, result)=> {
        if(err) throw err
        return res.json({status:1, message: 'Note deleted!'})
    })
}

module.exports = deleteNote