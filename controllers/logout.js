const logout = (req, res) => {
    res.clearCookie('logUser')
    res.send('ok')
}

module.exports = logout