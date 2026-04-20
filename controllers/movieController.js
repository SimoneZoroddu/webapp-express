const connection = require("../data/connnection")

const index = (req, res) => {
    const mysql = 'SELECT * FROM movies'
    connection.query(mysql, (err, results) => {
        if (err) {
            console.error(err)
            return res.status(500).json({ error: "Database Error" })
        }
        res.json(results)
    })
}

const show = (req, res) => {

    const mysql = 'SELECT * FROM movies WHERE id = ?'
    const { id } = req.params

    connection.query(mysql, [id], (err, results)=>{
        if(err) {
            console.error(err)
            return res.status(500).json({ error: 'Database error'})
        }
        res.json(results[0])
    })
}



module.exports = {
    index,
    show
}