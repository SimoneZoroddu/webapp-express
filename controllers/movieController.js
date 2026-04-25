const connection = require("../data/connnection")


// INDEX    //      GET    (all)
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


//    SHOW  //    GET:id     (single by id)
const show = (req, res) => {

    const mysql = 'SELECT * FROM movies WHERE id = ?'
    const mysqlReview = 'SELECT * FROM reviews WHERE movie_id = ? '
    const { id } = req.params

    connection.query(mysql, [id], (err, result) => {
        if (err) {
            console.error(err)
            return res.status(500).json({ error: 'Database error' })
        }

        if (result.length === 0) {
            return res.status(404).json({ error: 'Movie not found' })
        }

        connection.query(mysqlReview, [id], (err, resultReview) => {
            if (err) {
                console.error(err)
                return res.status(500).json({ error: 'Database error' })
            }

            result[0].reviews = resultReview

            res.json(result[0])
        })
    })
}





// STORE    /       POST      (add new at server)
const store = (req, res) => {

    const { title, director, image } = req.body

    const mysql = `
    INSERT INTO movies (title, director, image)
    VALUES (?, ?, ?)
  `

    connection.query(mysql, [title, director, image], (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" })

        const newMovies = {
            id: results.insertId,
            title,
            director,
            image
        }

        res.status(201).json(newMovies)

    })


}

module.exports = {
    index,
    show,
    store
}