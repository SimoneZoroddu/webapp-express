const express = require('express')
const app = express()
require('dotenv').config()

const PORT = process.env.PORT || "my_port"

const connection = require("./data/connnection")

app.listen(PORT, () => {
    console.log(`Post API listening on http://127.0.0.1:${PORT}`);
})

app.get('/', (req, res)=>{
    res.send("Tutto pronto")
})