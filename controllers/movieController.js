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
    const mysqlReview = 'SELECT * FROM reviews WHERE movie_id = ? '
    const { id } = req.params

    connection.query(mysql, [id], (err, result)=>{
        if(err) {
            console.error(err)
            return res.status(500).json({ error: 'Database error'})
        }
        
        if (result.length === 0) {
            return res.status(404).json({ error: 'Movie not found' })
        }
        
        connection.query(mysqlReview, [id], (err, resultReview)=>{
            if(err) {
                console.error(err)
                return res.status(500).json({ error: 'Database error'})
            }
            
            result[0].reviews = resultReview

            res.json(result[0])
        })
    })
}



module.exports = {
    index,
    show
}