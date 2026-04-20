const notFound = (req, res, next) => {
    res.status(404).json({ error: 'Server error!'})
}

module.exports = notFound